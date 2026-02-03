import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { type Address, type BaseError, parseUnits } from 'viem';
import { childContractABI } from '../../../config/contracts';
import { getChainName } from '../../../config/chains';
import { calculateTokenUsdValue } from '../../../utils/conversionHelpers';
import { useKtv2TokenData } from '../../../hooks/useKtv2TokenData';
import { useNativeUsdPrice } from '../../../hooks/useNativeUsdPrice';

interface WithdrawSectionProps {
  ktv2ContractAddress: Address | undefined;
  targetChainId: number | undefined;
  defaultErc20Symbol: string;
  userStakedBalance: bigint | undefined;
  isConnected: boolean;
  refetchUserStakedBalance: () => void;
  refetchUserErc20Balance: () => void;
  nativeDecimals: number | undefined;
}

const WithdrawSection: React.FC<WithdrawSectionProps> = ({
  ktv2ContractAddress,
  targetChainId,
  defaultErc20Symbol,
  userStakedBalance,
  isConnected,
  refetchUserStakedBalance,
  refetchUserErc20Balance,
  nativeDecimals,
}) => {
  const { chain } = useAccount();
  const isChainSupported = useMemo(() => chain?.id === targetChainId, [chain, targetChainId]);

  // --- Data Fetching via Hooks ---
  const {
    childTokenAddress: erc20TokenAddress,
    ktv2TokenDecimals: erc20Decimals,
    ktv2TokenPriceInNative: erc20PriceInNative,
  } = useKtv2TokenData({
    contractAddress: ktv2ContractAddress ?? null,
    targetChainId,
    isChainSupported,
  });

  const {
    ethPriceData: nativeTokenPriceData,
    ethPriceDecimals: nativeTokenPriceFeedDecimals,
  } = useNativeUsdPrice(targetChainId);


  // Component-specific state
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawAmountUsd, setWithdrawAmountUsd] = useState<string>('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawTxHash, setWithdrawTxHash] = useState<Address | undefined>();
  
  // Reset input when contract or chain changes
  useEffect(() => {
    setWithdrawAmount('');
  }, [ktv2ContractAddress, targetChainId]);

  // Calculate USD value of input
  useEffect(() => {
    if (!withdrawAmount || typeof erc20Decimals !== 'number' || parseFloat(withdrawAmount) <= 0) {
      setWithdrawAmountUsd('');
      return;
    }
    
    try {
      const parsedAmount = parseUnits(withdrawAmount, erc20Decimals);
      const usdValueString = calculateTokenUsdValue(
        parsedAmount,
        erc20Decimals,
        erc20PriceInNative,
        nativeDecimals ?? 18,
        nativeTokenPriceData,
        nativeTokenPriceFeedDecimals
      );
      
      setWithdrawAmountUsd(usdValueString ?? '');

    } catch (e) {
        console.error("Error calculating withdraw USD value:", e);
        setWithdrawAmountUsd('');
    }
  }, [withdrawAmount, erc20Decimals, erc20PriceInNative, nativeTokenPriceData, nativeTokenPriceFeedDecimals, nativeDecimals]);

  // wagmi hooks for write transaction
  const { writeContractAsync: withdrawAsync, error: withdrawErrorHook, isPending: isWithdrawingWrite } = useWriteContract();
  const { isLoading: isLoadingWithdrawReceipt, isSuccess: isWithdrawSuccess, error: withdrawReceiptError } = useWaitForTransactionReceipt({ 
    hash: withdrawTxHash, 
    query: { enabled: !!withdrawTxHash } 
  });
  
  // Effect to watch for transaction completion and show toasts
  useEffect(() => {
    const finalWithdrawError = withdrawErrorHook || withdrawReceiptError;
    if (isWithdrawSuccess) {
      toast.dismiss('withdrawWait');
      toast.success('Withdrawal successful!');
      refetchUserErc20Balance();
      refetchUserStakedBalance();
      setWithdrawAmount('');
      setWithdrawTxHash(undefined);
    }
    if (finalWithdrawError) {
      toast.dismiss('withdrawWait');
      toast.error(`Withdrawal failed: ${(finalWithdrawError as BaseError)?.shortMessage || (finalWithdrawError as Error)?.message}`);
      setWithdrawTxHash(undefined);
    }
    setIsWithdrawing(isWithdrawingWrite || isLoadingWithdrawReceipt);
  }, [isWithdrawSuccess, withdrawErrorHook, withdrawReceiptError, refetchUserErc20Balance, refetchUserStakedBalance, isWithdrawingWrite, isLoadingWithdrawReceipt]);
  
  // Input validation
  const validateAmount = (amount: string): boolean => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // This regex allows empty string, numbers, and a single decimal point.
    // It prevents multiple decimals and non-numeric characters (except the dot).
    if (/^\d*\.?\d*$/.test(value)) {
      setWithdrawAmount(value);
    }
  };

  // Transaction submission handler
  const handleWithdraw = async () => {
    // Pre-flight checks
    if (!isConnected || !ktv2ContractAddress || typeof erc20Decimals !== 'number' || !validateAmount(withdrawAmount)) {
      toast.error("Connect wallet and enter a valid amount.");
      return;
    }
    if (chain?.id !== targetChainId) {
      toast.error(`Please switch your wallet to ${getChainName(targetChainId)} to withdraw.`);
      return;
    }
    const amountToWithdraw = parseUnits(withdrawAmount, erc20Decimals);
    if (userStakedBalance === undefined || amountToWithdraw > userStakedBalance) {
      toast.error("Withdraw amount exceeds your staked balance.");
      return;
    }

    let loadingToastId: string | undefined;
    try {
      loadingToastId = toast.loading('Preparing withdrawal...');
      const txHash = await withdrawAsync({
        address: ktv2ContractAddress,
        abi: childContractABI,
        functionName: 'withdraw',
        args: [amountToWithdraw],
      });
      toast.dismiss(loadingToastId);
      setWithdrawTxHash(txHash);
      if (txHash) {
        toast.loading('Withdrawal transaction submitted! Waiting for confirmation...', { id: 'withdrawWait' });
      }
    } catch (err: any) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.error(`Withdrawal submission failed: ${(err as BaseError)?.shortMessage || err.message}`);
    }
  };

  const isButtonDisabled = useMemo(() => {
    if (isWithdrawing || !isConnected || !erc20TokenAddress) return true;
    if (!validateAmount(withdrawAmount)) return true;
    if (userStakedBalance === undefined) return true;
    try {
      const amount = parseUnits(withdrawAmount, erc20Decimals || 18);
      return amount > userStakedBalance;
    } catch {
      return true;
    }
  }, [withdrawAmount, isWithdrawing, isConnected, erc20TokenAddress, userStakedBalance, erc20Decimals]);

  return (
    <div className="space-y-1">
      <div className="flex items-end space-x-2">
        <div className="relative grow">
          <div className="relative">
            <input
              type="number"
              id="withdrawAmount"
              value={withdrawAmount}
              onChange={handleWithdrawAmountChange}
              placeholder="0.0"
              min="0"
              step="any"
              className="w-full bg-zinc-950/80 border border-white/10 text-white text-md p-3 transition-colors duration-200 hover:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none font-medium placeholder-white pt-1 pb-4 pr-12 rounded-lg"
              disabled={isWithdrawing || !erc20TokenAddress || !isConnected}
            />
            <span className="absolute right-4 top-2 text-gray-400 text-sm pointer-events-none">
              {defaultErc20Symbol}
            </span>
            {withdrawAmount && parseFloat(withdrawAmount) > 0 && withdrawAmountUsd !== '' && (
              <span className="absolute left-3 bottom-1 text-[11px] text-gray-400 pointer-events-none">
                ~${withdrawAmountUsd}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <button 
            onClick={handleWithdraw} 
            disabled={isButtonDisabled} 
            className="px-3 py-3 bg-linear-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-[110px]"
          >
            {isWithdrawing ? 'Withdrawing...' : 'Withdraw'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawSection; 