import React, { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { type Address, type BaseError, parseUnits } from 'viem';
import { childContractABI, erc20ABI } from '../../../config/contracts';
import { getChainName } from '../../../config/chains';
import { calculateTokenUsdValue } from '../../../utils/conversionHelpers';
import { useKtv2TokenData } from '../../../hooks/useKtv2TokenData';
import { useNativeUsdPrice } from '../../../hooks/useNativeUsdPrice';

// Enable/disable staking (from environment variable)
const STAKE_DISABLED = import.meta.env.VITE_STAKE_DISABLED === 'true';

interface StakeSectionProps {
  ktv2ContractAddress: Address | undefined;
  targetChainId: number | undefined;
  defaultErc20Symbol: string;
  userErc20Balance: bigint | undefined;
  currentAllowance: bigint | undefined;
  isConnected: boolean;
  refetchUserErc20Balance: () => void;
  refetchUserStakedBalance: () => void;
  refetchAllowance: () => void;
  nativeDecimals: number | undefined;
}

const StakeSection: React.FC<StakeSectionProps> = ({
  ktv2ContractAddress,
  targetChainId,
  defaultErc20Symbol,
  userErc20Balance,
  currentAllowance,
  isConnected,
  refetchUserErc20Balance,
  refetchUserStakedBalance,
  refetchAllowance,
  nativeDecimals,
}) => {
  const { chain } = useAccount();
  const isChainSupported = useMemo(() => chain?.id === targetChainId, [chain, targetChainId]);

  // --- Data Fetching via Hooks ---
  const {
    childTokenAddress: erc20TokenAddress,
    ktv2TokenDecimals: erc20Decimals,
    ktv2TokenSymbol: erc20Symbol,
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
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [stakeAmountUsd, setStakeAmountUsd] = useState<string>('');
  const [isApproving, setIsApproving] = useState(false);
  const [approveTxHash, setApproveTxHash] = useState<Address | undefined>();
  const [isStaking, setIsStaking] = useState(false);
  const [stakeTxHash, setStakeTxHash] = useState<Address | undefined>();

  // Reset input when contract or chain changes
  useEffect(() => {
    setStakeAmount('');
  }, [ktv2ContractAddress, targetChainId]);
  
  // Calculate USD value of input
  useEffect(() => {
    if (!stakeAmount || typeof erc20Decimals !== 'number' || parseFloat(stakeAmount) <= 0) {
      setStakeAmountUsd('');
      return;
    }

    try {
      const parsedAmount = parseUnits(stakeAmount, erc20Decimals);
      const usdValueString = calculateTokenUsdValue(
        parsedAmount,
        erc20Decimals,
        erc20PriceInNative,
        nativeDecimals ?? 18,
        nativeTokenPriceData,
        nativeTokenPriceFeedDecimals
      );
      
      setStakeAmountUsd(usdValueString ?? '');

    } catch (e) {
        console.error("Error calculating stake USD value:", e);
        setStakeAmountUsd('');
    }
  }, [stakeAmount, erc20Decimals, erc20PriceInNative, nativeTokenPriceData, nativeTokenPriceFeedDecimals, nativeDecimals]);
  
  // Derived state for approval
  const parsedStakeAmount = useMemo(() => {
    if (!stakeAmount || typeof erc20Decimals !== 'number') return 0n;
    try {
      return parseUnits(stakeAmount, erc20Decimals);
    } catch {
      return 0n;
    }
  }, [stakeAmount, erc20Decimals]);

  const needsApproval = useMemo(() => {
    if (!isConnected || currentAllowance === undefined || parsedStakeAmount === 0n) return false;
    return currentAllowance < parsedStakeAmount;
  }, [isConnected, currentAllowance, parsedStakeAmount]);
  
  // Wagmi hooks for transactions
  const { writeContractAsync: approveAsync, error: approveErrorHook, isPending: isApprovingWrite } = useWriteContract();
  const { writeContractAsync: stakeAsync, error: stakeErrorHook, isPending: isStakingWrite } = useWriteContract();

  const { isLoading: isLoadingApproveReceipt, isSuccess: isApproveSuccess, error: approveReceiptError } = useWaitForTransactionReceipt({ hash: approveTxHash, query: { enabled: !!approveTxHash } });
  const { isLoading: isLoadingStakeReceipt, isSuccess: isStakeSuccess, error: stakeReceiptError } = useWaitForTransactionReceipt({ hash: stakeTxHash, query: { enabled: !!stakeTxHash } });

  // Effect for Approval transaction
  useEffect(() => {
    const finalApproveError = approveErrorHook || approveReceiptError;
    if (isApproveSuccess) {
      toast.dismiss('approvalWait');
      toast.success('Approval successful! You can now stake.');
      refetchAllowance();
      setApproveTxHash(undefined);
    }
    if (finalApproveError) {
      toast.dismiss('approvalWait');
      toast.error(`Approval failed: ${(finalApproveError as BaseError)?.shortMessage || (finalApproveError as Error)?.message}`);
      setApproveTxHash(undefined);
    }
    setIsApproving(isApprovingWrite || isLoadingApproveReceipt);
  }, [isApproveSuccess, approveErrorHook, approveReceiptError, refetchAllowance, isApprovingWrite, isLoadingApproveReceipt]);

  // Effect for Staking transaction
  useEffect(() => {
    const finalStakeError = stakeErrorHook || stakeReceiptError;
    if (isStakeSuccess) {
      toast.dismiss('stakeWait');
      toast.success('Stake successful!');
      refetchUserErc20Balance();
      refetchUserStakedBalance();
      refetchAllowance();
      setStakeAmount('');
      setStakeTxHash(undefined);
    }
    if (finalStakeError) {
      toast.dismiss('stakeWait');
      toast.error(`Stake failed: ${(finalStakeError as BaseError)?.shortMessage || (finalStakeError as Error)?.message}`);
      setStakeTxHash(undefined);
    }
    setIsStaking(isStakingWrite || isLoadingStakeReceipt);
  }, [isStakeSuccess, stakeErrorHook, stakeReceiptError, refetchUserErc20Balance, refetchUserStakedBalance, refetchAllowance, isStakingWrite, isLoadingStakeReceipt]);

  // Input validation
  const validateAmount = (amount: string): boolean => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // This regex allows empty string, numbers, and a single decimal point.
    // It prevents multiple decimals and non-numeric characters (except the dot).
    if (/^\d*\.?\d*$/.test(value)) {
      setStakeAmount(value);
    }
  };
  
  // Transaction Handlers
  const handleApprove = async () => {
    if (STAKE_DISABLED) {
      toast.error("Staking is temporarily disabled.");
      return;
    }
    if (!erc20TokenAddress || !ktv2ContractAddress || !validateAmount(stakeAmount) || typeof erc20Decimals !== 'number') {
      toast.error('Please enter a valid amount to approve.');
      return;
    }
    if (chain?.id !== targetChainId) {
      toast.error(`Please switch your wallet to ${getChainName(targetChainId)} to approve.`);
      return;
    }
    
    let loadingToastId: string | undefined;
    try {
      const amountToApprove = parseUnits(stakeAmount, erc20Decimals);
      loadingToastId = toast.loading(`Requesting approval for ${stakeAmount} ${erc20Symbol || defaultErc20Symbol}...`);
      const txHash = await approveAsync({
        address: erc20TokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [ktv2ContractAddress, amountToApprove],
      });
      toast.dismiss(loadingToastId);
      setApproveTxHash(txHash);
      if (txHash) {
        toast.loading('Approval submitted! Waiting for confirmation...', { id: 'approvalWait' });
      }
    } catch (err) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.error(`Approval submission failed: ${(err as BaseError)?.shortMessage || (err as Error)?.message}`);
    }
  };

  const handleStake = async () => {
    if (STAKE_DISABLED) {
      toast.error("Staking is temporarily disabled.");
      return;
    }
    if (!ktv2ContractAddress || !validateAmount(stakeAmount) || typeof erc20Decimals !== 'number') {
      toast.error("Enter a valid amount to stake.");
      return;
    }
    if (chain?.id !== targetChainId) {
      toast.error(`Please switch your wallet to ${getChainName(targetChainId)} to stake.`);
      return;
    }
    const amountToStake = parseUnits(stakeAmount, erc20Decimals);
    if (userErc20Balance === undefined || amountToStake > userErc20Balance) {
      toast.error("Stake amount exceeds your available balance.");
      return;
    }
    if (needsApproval) {
      toast.error('Please approve the token amount before staking.');
      return;
    }
    
    let loadingToastId: string | undefined;
    try {
      loadingToastId = toast.loading('Preparing stake transaction...');
      const txHash = await stakeAsync({
        address: ktv2ContractAddress,
        abi: childContractABI,
        functionName: 'stake',
        args: [amountToStake],
      });
      toast.dismiss(loadingToastId);
      setStakeTxHash(txHash);
      if (txHash) {
        toast.loading('Stake transaction submitted! Waiting for confirmation...', { id: 'stakeWait' });
      }
    } catch (err: any) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.error(`Stake submission failed: ${(err as BaseError)?.shortMessage || err.message}`);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-end space-x-2">
        <div className="relative grow">
          <div className="relative">
            <input
              type="number"
              id="stakeAmount"
              value={stakeAmount}
              onChange={handleStakeAmountChange}
              placeholder="0.0"
              min="0"
              step="any"
              className="w-full bg-zinc-950/80 border border-white/10 text-white text-md p-3 transition-colors duration-200 hover:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none font-medium placeholder-white pt-1 pb-4 pr-12 rounded-lg"
              disabled={isApproving || isStaking || !erc20TokenAddress || !isConnected}
            />
            <span className="absolute right-4 top-2 text-gray-400 text-sm pointer-events-none">
              {defaultErc20Symbol}
            </span>
            {stakeAmount && parseFloat(stakeAmount) > 0 && stakeAmountUsd !== '' && (
              <span className="absolute left-3 bottom-1 text-[11px] text-gray-400 pointer-events-none">
                ~${stakeAmountUsd}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1 md:space-x-2 shrink-0">
          {needsApproval && (
            <button
              onClick={handleApprove}
              disabled={STAKE_DISABLED || isApproving || isStaking || !erc20TokenAddress || !isConnected || !validateAmount(stakeAmount)}
              className="flex-1 px-2 md:px-3 py-4 md:py-3 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-500 hover:via-blue-600 hover:to-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-[20px] md:w-[110px] text-xs md:text-base"
            >
              {isApproving ? 'Approving...' : `Approve`}
            </button>
          )}
          <button
            onClick={handleStake}
            disabled={STAKE_DISABLED || isApproving || isStaking || needsApproval || !validateAmount(stakeAmount) || !erc20TokenAddress || !isConnected}
            className="flex-1 px-3 py-3 bg-linear-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-[110px]"
          >
            {isStaking ? 'Staking...' : 'Stake'}
          </button>
        </div>
      </div>
      {STAKE_DISABLED && (
        <div className="mt-2 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-amber-400 text-sm text-center font-medium">
            🚀 Staking paused for launch preparation. Launch imminent!
          </p>
        </div>
      )}
    </div>
  );
};

export default StakeSection; 