import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { type Address } from 'viem';
import { childContractABI } from '../config/contracts';
import { useNativeUsdPrice } from './useNativeUsdPrice';
import { useKtv2TokenData } from './useKtv2TokenData';
import { calculateUsdValue, calculateTokenUsdValue } from '../utils/conversionHelpers';

interface UseKtv2MetricsProps {
  contractAddress: Address | null;
  targetChainId: number | undefined;
  isChainSupported: boolean;
}

export const useKtv2Metrics = ({ contractAddress, targetChainId, isChainSupported }: UseKtv2MetricsProps) => {
  const queryOptions = {
    enabled: !!contractAddress && isChainSupported && !!targetChainId,
  };

  const {
    data: totalDonatedDataResult,
    error: totalDonatedError,
    isLoading: isLoadingTotalDonated,
  } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'totalGvn',
    chainId: targetChainId,
    query: queryOptions,
  });
  const totalDonatedData = totalDonatedDataResult as bigint | undefined;

  const {
    data: totalBurnedDataResult,
    error: totalBurnedError,
    isLoading: isLoadingTotalBurned,
  } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'totalBurned',
    chainId: targetChainId,
    query: queryOptions,
  });
  const totalBurnedData = totalBurnedDataResult as bigint | undefined;

  const {
    data: totalStakedDataResult,
    error: totalStakedError,
    isLoading: isLoadingTotalStaked,
  } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'totalStk',
    chainId: targetChainId,
    query: queryOptions,
  });
  const totalStakedData = totalStakedDataResult as bigint | undefined;
  
  // Dependencies for USD calculations
  const { ethPriceData, ethPriceDecimals, isLoadingEthPrice, isLoadingEthPriceDecimals } = useNativeUsdPrice(targetChainId);
  const { ktv2TokenDecimals, ktv2TokenPriceInNative, isLoading: isLoadingTokenData } = useKtv2TokenData({ contractAddress, targetChainId, isChainSupported });

  // USD Calculations
  const totalDonatedUsd = useMemo(() =>
    calculateUsdValue(totalDonatedData, ethPriceData, ethPriceDecimals)
  , [totalDonatedData, ethPriceData, ethPriceDecimals]);

  const totalBurnedUsd = useMemo(() =>
    calculateTokenUsdValue(totalBurnedData, ktv2TokenDecimals, ktv2TokenPriceInNative, 18, ethPriceData, ethPriceDecimals)
  , [totalBurnedData, ktv2TokenDecimals, ktv2TokenPriceInNative, ethPriceData, ethPriceDecimals]);

  const totalStakedUsd = useMemo(() =>
    calculateTokenUsdValue(totalStakedData, ktv2TokenDecimals, ktv2TokenPriceInNative, 18, ethPriceData, ethPriceDecimals)
  , [totalStakedData, ktv2TokenDecimals, ktv2TokenPriceInNative, ethPriceData, ethPriceDecimals]);

  const isLoadingUsd = isLoadingEthPrice || isLoadingEthPriceDecimals || isLoadingTokenData;

  return {
    totalDonatedData,
    totalDonatedError,
    isLoadingTotalDonated,
    totalDonatedUsd,
    totalBurnedData,
    totalBurnedError,
    isLoadingTotalBurned,
    totalBurnedUsd,
    totalStakedData,
    totalStakedError,
    isLoadingTotalStaked,
    totalStakedUsd,
    isLoading: isLoadingTotalDonated || isLoadingTotalBurned || isLoadingTotalStaked || isLoadingUsd,
  };
}; 