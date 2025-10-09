import { useReadContract } from 'wagmi';
import { type Address } from 'viem';
import { childContractABI } from '../config/contracts';

interface UseKtv2EpochDataProps {
  contractAddress: Address | null;
  targetChainId: number | undefined;
  isChainSupported: boolean;
}

export const useKtv2EpochData = ({ contractAddress, targetChainId, isChainSupported }: UseKtv2EpochDataProps) => {
  const queryOptions = {
    enabled: !!contractAddress && isChainSupported && !!targetChainId,
  };

  const {
    data: epochIntervalData,
    error: epochIntervalError,
    isLoading: isLoadingEpochInterval,
  } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'epochInterval',
    chainId: targetChainId,
    query: queryOptions,
  });
  const epochInterval = epochIntervalData as number | undefined;

  const {
    data: startBlockData,
    error: startBlockError,
    isLoading: isLoadingStartBlock,
  } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'startBlock',
    chainId: targetChainId,
    query: queryOptions,
  });
  const startBlock = startBlockData as bigint | undefined;

  return {
    epochInterval,
    epochIntervalError,
    isLoadingEpochInterval,
    startBlock,
    startBlockError,
    isLoadingStartBlock,
    isLoading: isLoadingEpochInterval || isLoadingStartBlock,
  };
}; 