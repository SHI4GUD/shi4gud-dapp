import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { type Address } from 'viem';
import { Trophy, UserX } from 'lucide-react';
import { childContractABI } from '../../../config/contracts';
import { useReadContract } from 'wagmi';

interface WinningPreferenceSectionProps {
  ktv2ContractAddress: Address | undefined;
  targetChainId: number | undefined;
  isConnected: boolean;
}

const WinningPreferenceSection: React.FC<WinningPreferenceSectionProps> = ({
  ktv2ContractAddress,
  targetChainId,
  isConnected,
}) => {
  const { address: userAddress } = useAccount();
  const [txHash, setTxHash] = useState<Address | undefined>();

  const { data: isDeclined, refetch: refetchDeclines } = useReadContract({
    address: ktv2ContractAddress,
    abi: childContractABI,
    functionName: 'declines',
    args: userAddress ? [userAddress] as const : undefined,
    chainId: targetChainId,
    query: { enabled: !!ktv2ContractAddress && !!userAddress && !!targetChainId && isConnected },
  });

  const { writeContractAsync, isPending: isWritePending, reset: resetWrite } = useWriteContract();
  const { isLoading: isLoadingReceipt, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });

  useEffect(() => {
    if (isTxSuccess && txHash) {
      toast.dismiss('winningPref');
      toast.success('Preference updated');
      setTxHash(undefined);
      refetchDeclines();
      resetWrite();
    }
  }, [isTxSuccess, txHash, refetchDeclines, resetWrite]);

  const handleDecline = async () => {
    if (!ktv2ContractAddress) return;
    try {
      const hash = await writeContractAsync({
        address: ktv2ContractAddress,
        abi: childContractABI,
        functionName: 'decline',
      });
      setTxHash(hash);
      toast.loading('Updating preference...', { id: 'winningPref' });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Transaction failed');
    }
  };

  const handleAllow = async () => {
    if (!ktv2ContractAddress) return;
    try {
      const hash = await writeContractAsync({
        address: ktv2ContractAddress,
        abi: childContractABI,
        functionName: 'allow',
      });
      setTxHash(hash);
      toast.loading('Updating preference...', { id: 'winningPref' });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Transaction failed');
    }
  };

  const isBusy = isWritePending || isLoadingReceipt;

  if (!isConnected || !userAddress || !ktv2ContractAddress) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center justify-center gap-1">
        {isDeclined ? (
          <UserX className="text-amber-500 w-5 h-5" />
        ) : (
          <Trophy className="text-green-500 w-5 h-5" />
        )}
        <span className="text-sm text-white font-medium">{isDeclined === false ? 'Enabled' : isDeclined === true ? 'Disabled' : 'Winning'}</span>
      </div>
      <p className="text-sm text-zinc-300 text-center max-w-md whitespace-pre-line">
        {isDeclined === true
          ? 'You are not currently eligible for rewards.\nYou can opt in at any time.'
          : isDeclined === false
            ? 'You are currently eligible for rewards.\nYou can opt out at any time.'
            : 'Loading...'}
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          type="button"
          onClick={handleAllow}
          disabled={isBusy || isDeclined === false}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500/20 text-green-500 border border-green-500/40 hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Opt in
        </button>
        <button
          type="button"
          onClick={handleDecline}
          disabled={isBusy || isDeclined === true}
          className="px-3 py-1.5 rounded-lg text-sm font-medium bg-amber-500/20 text-amber-500 border border-amber-500/40 hover:bg-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Opt out
        </button>
      </div>
    </div>
  );
};

export default WinningPreferenceSection;
