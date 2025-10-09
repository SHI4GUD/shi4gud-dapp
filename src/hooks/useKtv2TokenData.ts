import { useReadContract } from 'wagmi';
import { type Address } from 'viem';
import { childContractABI, erc20ABI, tpABI } from '../config/contracts';

interface UseKtv2TokenDataProps {
  contractAddress: Address | null;
  targetChainId: number | undefined;
  isChainSupported: boolean;
}

export const useKtv2TokenData = ({ contractAddress, targetChainId, isChainSupported }: UseKtv2TokenDataProps) => {
  const baseQueryOptions = {
    enabled: !!contractAddress && isChainSupported && !!targetChainId,
  };

  const {
    data: childTokenAddressData,
    error: childContractReadError,
    isLoading: isLoadingChildContractData,
    isSuccess: childContractReadSuccess,
  } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'tokenAddr',
    chainId: targetChainId,
    query: baseQueryOptions,
  });
  const childTokenAddress = childTokenAddressData as Address | undefined;

  const tokenQueryOptions = {
    enabled: !!childTokenAddress && isChainSupported && !!targetChainId,
  };

  const {
    data: ktv2TokenDecimalsData,
    error: ktv2TokenDecimalsError,
    isLoading: isLoadingKtv2TokenDecimals,
  } = useReadContract({
    address: childTokenAddress,
    abi: erc20ABI,
    functionName: 'decimals',
    chainId: targetChainId,
    query: tokenQueryOptions,
  });
  const ktv2TokenDecimals = ktv2TokenDecimalsData as number | undefined;

  const {
    data: ktv2TokenSymbolData,
    error: ktv2TokenSymbolError,
    isLoading: isLoadingKtv2TokenSymbol,
  } = useReadContract({
    address: childTokenAddress,
    abi: erc20ABI,
    functionName: 'symbol',
    chainId: targetChainId,
    query: tokenQueryOptions,
  });
  const ktv2TokenSymbol = ktv2TokenSymbolData as string | undefined;

  const {
    data: ktv2TokenNameData,
    error: ktv2TokenNameError,
    isLoading: isLoadingKtv2TokenName,
  } = useReadContract({
    address: childTokenAddress,
    abi: erc20ABI,
    functionName: 'name',
    chainId: targetChainId,
    query: tokenQueryOptions,
  });
  const ktv2TokenName = ktv2TokenNameData as string | undefined;

  // --- Price in native (Uniswap v2/v3) ---
  const { data: poolAddressData, isLoading: isLoadingPoolAddress } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'pool', // Address used as pair (Uni v2) or pool (Uni v3)
    chainId: targetChainId,
    query: baseQueryOptions,
  });
  const poolAddress = poolAddressData as Address | undefined;

  const { data: tpContractAddressData, isLoading: isLoadingTpContractAddress } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'tp',
    chainId: targetChainId,
    query: baseQueryOptions,
  });
  const tpContractAddress = tpContractAddressData as Address | undefined;

  // KTV2 version flag (true => Uniswap v2, false => Uniswap v3)
  const { data: isV2Data } = useReadContract({
    address: contractAddress ?? undefined,
    abi: childContractABI,
    functionName: 'v2',
    chainId: targetChainId,
    query: baseQueryOptions,
  });
  const isV2 = isV2Data as boolean | undefined;

  // Read token price: v2 -> priceV2 (Uniswap v2), otherwise -> price (Uniswap v3)
  const {
    data: ktv2TokenPriceInNativeData,
    error: ktv2TokenPriceInNativeError,
    isLoading: isLoadingKtv2TokenPriceInNative,
  } = useReadContract({
    address: tpContractAddress,
    abi: tpABI,
    functionName: isV2 ? 'priceV2' : 'price',
    args: poolAddress ? [poolAddress] : undefined,
    chainId: targetChainId,
    query: {
      enabled: isV2 !== undefined && !!tpContractAddress && !!poolAddress && isChainSupported && !!targetChainId,
    },
  });
  const ktv2TokenPriceInNative = ktv2TokenPriceInNativeData as bigint | undefined;

  return {
    childTokenAddress,
    childContractReadError,
    isLoadingChildContractData,
    childContractReadSuccess,
    ktv2TokenDecimals,
    ktv2TokenDecimalsError,
    isLoadingKtv2TokenDecimals,
    ktv2TokenSymbol,
    ktv2TokenSymbolError,
    isLoadingKtv2TokenSymbol,
    ktv2TokenName,
    ktv2TokenNameError,
    isLoadingKtv2TokenName,
    ktv2TokenPriceInNative,
    ktv2TokenPriceInNativeError,
    isLoadingKtv2TokenPriceInNative: isLoadingKtv2TokenPriceInNative || isLoadingPoolAddress || isLoadingTpContractAddress,
    isLoading: isLoadingChildContractData || isLoadingKtv2TokenDecimals || isLoadingKtv2TokenSymbol || isLoadingKtv2TokenName || isLoadingKtv2TokenPriceInNative,
  };
}; 