import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { type Address, type BaseError, parseUnits } from 'viem';
import { childContractABI } from '../../../config/contracts';
import { getChainName } from '../../../config/chains';
import { calculateUsdValue } from '../../../utils/conversionHelpers';
import { useNativeUsdPrice } from '../../../hooks/useNativeUsdPrice';

interface DonateSectionProps {
  ktv2ContractAddress: Address | undefined;
  targetChainId: number | undefined;
  nativeCurrencySymbol: string;
  userNativeBalance: bigint | undefined;
  nativeDecimals: number | undefined;
  isConnected: boolean;
  refetchNativeBalance: () => void;
}

const DonateSection: React.FC<DonateSectionProps> = ({
  ktv2ContractAddress,
  targetChainId,
  nativeCurrencySymbol,
  userNativeBalance,
  nativeDecimals,
  isConnected,
  refetchNativeBalance,
}) => {
  const { chain: connectedWalletChain } = useAccount();

    // --- Data Fetching via Hooks ---
    const {
      ethPriceData: nativeTokenPriceData,
      ethPriceDecimals: nativeTokenPriceFeedDecimals,
    } = useNativeUsdPrice(targetChainId);

  // Component-specific state
  const [donateAmount, setDonateAmount] = useState<string>('');
  const [donateAmountUsd, setDonateAmountUsd] = useState<string>('');
  const [isDonating, setIsDonating] = useState(false);
  const [donateTxHash, setDonateTxHash] = useState<Address | undefined>();

  // Reset input when contract or chain changes
  useEffect(() => {
    setDonateAmount('');
  }, [ktv2ContractAddress, targetChainId]);

  // Calculate USD value of input
  useEffect(() => {
    if (!donateAmount || typeof nativeDecimals !== 'number' || parseFloat(donateAmount) <= 0) {
      setDonateAmountUsd('');
      return;
    }
    
    try {
      const parsedAmount = parseUnits(donateAmount, nativeDecimals);
      const usdValueString = calculateUsdValue(
        parsedAmount,
        nativeTokenPriceData,
        nativeTokenPriceFeedDecimals,
        nativeDecimals
      );
      
      setDonateAmountUsd(usdValueString ?? '');

    } catch (e) {
      console.error("Error calculating donate USD value:", e);
      setDonateAmountUsd('');
    }
  }, [donateAmount, nativeDecimals, nativeTokenPriceData, nativeTokenPriceFeedDecimals]);
  
  // wagmi hooks for write transaction
  const { writeContractAsync: donateAsync, error: donateErrorHook, isPending: isDonatingWrite } = useWriteContract();
  const { isLoading: isLoadingDonateReceipt, isSuccess: isDonateSuccess, error: donateReceiptError } = useWaitForTransactionReceipt({ 
    hash: donateTxHash, 
    query: { enabled: !!donateTxHash } 
  });
  
  // Effect to watch for transaction completion and show toasts
  useEffect(() => {
    const finalDonateError = donateErrorHook || donateReceiptError;
    if (isDonateSuccess) {
      toast.dismiss('donateWait');
      toast.success('Donation successful! Thank you.');
      refetchNativeBalance();
      setDonateAmount('');
      setDonateTxHash(undefined);
    }
    if (finalDonateError) {
      toast.dismiss('donateWait');
      toast.error(`Donation failed: ${(finalDonateError as BaseError)?.shortMessage || (finalDonateError as Error)?.message}`);
      setDonateTxHash(undefined);
    }
    setIsDonating(isDonatingWrite || isLoadingDonateReceipt);
  }, [isDonateSuccess, donateErrorHook, donateReceiptError, refetchNativeBalance, isDonatingWrite, isLoadingDonateReceipt]);
  
  // Input validation
  const validateAmount = (amount: string): boolean => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleDonateAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // This regex allows empty string, numbers, and a single decimal point.
    // It prevents multiple decimals and non-numeric characters (except the dot).
    if (/^\d*\.?\d*$/.test(value)) {
      setDonateAmount(value);
    }
  };

  // Transaction submission handler
  const handleDonate = async () => {
    if (!isConnected || !ktv2ContractAddress || !validateAmount(donateAmount)) {
      toast.error("Connect wallet and enter a valid amount to donate.");
      return;
    }
    if (connectedWalletChain?.id !== targetChainId) {
      toast.error(`Please switch your wallet to ${getChainName(targetChainId)} to donate.`);
      return;
    }
    if (userNativeBalance === undefined || nativeDecimals === undefined) {
      toast.error("Cannot determine native token balance or decimals.");
      return;
    }
    const amountToDonate = parseUnits(donateAmount, nativeDecimals);
    if (userNativeBalance < amountToDonate) {
      toast.error("Insufficient native token balance for this donation.");
      return;
    }

    let loadingToastId: string | undefined;
    try {
      loadingToastId = toast.loading('Preparing donation...');
      const txHash = await donateAsync({
        address: ktv2ContractAddress,
        abi: childContractABI,
        functionName: 'give',
        value: amountToDonate,
      });
      toast.dismiss(loadingToastId);
      setDonateTxHash(txHash);
      if (txHash) {
        toast.loading('Donation transaction submitted! Waiting for confirmation...', { id: 'donateWait' });
      }
    } catch (err: any) {
      if (loadingToastId) toast.dismiss(loadingToastId);
      toast.error(`Donation submission failed: ${(err as BaseError)?.shortMessage || err.message}`);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-end space-x-2">
        <div className="relative grow">
          <div className="relative">
            <input
              type="number"
              id="donateAmount"
              value={donateAmount}
              onChange={handleDonateAmountChange}
              placeholder="0.0"
              min="0"
              step="any"
              className="w-full bg-zinc-950/80 border border-white/10 text-white text-md p-3 transition-colors duration-200 hover:border-pink-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none font-medium placeholder-white pt-1 pb-4 pr-12 rounded-lg"
              disabled={isDonating || !isConnected}
            />
            <span className="absolute right-4 top-2 text-gray-400 text-sm pointer-events-none">
              {nativeCurrencySymbol}
            </span>
            {donateAmountUsd && parseFloat(donateAmountUsd) > 0 && (
              <span className="absolute left-3 bottom-1 text-[11px] text-gray-400 pointer-events-none">
                ~${donateAmountUsd}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0">
          <button 
            onClick={handleDonate} 
            disabled={isDonating || !validateAmount(donateAmount) || !isConnected} 
            className="px-3 py-3 bg-linear-to-r from-pink-500 to-orange-500 text-white rounded-xl hover:opacity-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer w-[110px]"
          >
            {isDonating ? 'Donating...' : 'Donate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateSection; 