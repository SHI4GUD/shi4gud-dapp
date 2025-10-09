import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { CHAINLINK_NATIVE_TOKEN_PRICE_FEEDS } from '../config/contracts';
import { chainlinkPriceFeedAbi } from '../abis/chainlinkPriceFeedAbi';

export const useNativeUsdPrice = (targetChainId: number | undefined) => {
  const ethUsdPriceFeedAddress = useMemo(() => {
    if (targetChainId) {
      return CHAINLINK_NATIVE_TOKEN_PRICE_FEEDS[targetChainId];
    }
    return undefined;
  }, [targetChainId]);

  const {
    data: ethPriceData,
    error: ethPriceError,
    isLoading: isLoadingEthPrice,
  } = useReadContract({
    address: ethUsdPriceFeedAddress,
    abi: chainlinkPriceFeedAbi,
    functionName: 'latestRoundData',
    chainId: targetChainId,
    query: {
      enabled: !!ethUsdPriceFeedAddress && !!targetChainId,
    },
  });

  const {
    data: ethPriceDecimals,
    error: ethPriceDecimalsError,
    isLoading: isLoadingEthPriceDecimals,
  } = useReadContract({
    address: ethUsdPriceFeedAddress,
    abi: chainlinkPriceFeedAbi,
    functionName: 'decimals',
    chainId: targetChainId,
    query: {
      enabled: !!ethUsdPriceFeedAddress && !!targetChainId,
    },
  });

  return {
    ethPriceData,
    ethPriceError,
    isLoadingEthPrice,
    ethPriceDecimals,
    ethPriceDecimalsError,
    isLoadingEthPriceDecimals,
  };
}; 