import { useMemo } from 'react';
import { useBalance } from 'wagmi';
import { type Address } from 'viem';
import { useNativeUsdPrice } from './useNativeUsdPrice';
import { calculateUsdValue } from '../utils/conversionHelpers';

interface UseKtv2JackpotProps {
  contractAddress: Address | null;
  targetChainId: number | undefined;
  isChainSupported: boolean;
}

export const useKtv2Jackpot = ({ contractAddress, targetChainId, isChainSupported }: UseKtv2JackpotProps) => {
  const {
    data: childContractBalance,
    error: childContractBalanceError,
    isLoading: isLoadingChildContractBalance,
    isSuccess: childContractBalanceSuccess,
  } = useBalance({
    address: contractAddress ?? undefined,
    chainId: targetChainId,
    query: {
      enabled: !!contractAddress && isChainSupported && !!targetChainId,
    },
  });

  const { ethPriceData, ethPriceDecimals, isLoadingEthPrice, isLoadingEthPriceDecimals } = useNativeUsdPrice(targetChainId);
  
  const contractBalanceUsd = useMemo(() =>
    calculateUsdValue(childContractBalance?.value, ethPriceData, ethPriceDecimals, childContractBalance?.decimals)
  , [childContractBalance, ethPriceData, ethPriceDecimals]);

  return {
    childContractBalance,
    childContractBalanceError,
    isLoadingChildContractBalance,
    childContractBalanceSuccess,
    contractBalanceUsd,
    isLoadingUsdValue: isLoadingEthPrice || isLoadingEthPriceDecimals,
    isLoading: isLoadingChildContractBalance || isLoadingEthPrice || isLoadingEthPriceDecimals,
  };
}; 