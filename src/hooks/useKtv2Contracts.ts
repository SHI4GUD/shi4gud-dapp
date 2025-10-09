import { useState, useEffect, useMemo } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import { type Address } from 'viem';
import { ktv2FactoryAbi } from '../abis/ktv2FactoryAbi';
import { officialKtv2Contracts } from '../config/officialContracts';
import { FACTORY_CONTRACTS } from '../config/contracts';
import { ContractSourceMode } from '../components/features/ktv2/Ktv2SelectorTypes';
import { getChainName } from '../config/chains';

export function useKtv2Contracts(
  targetChainId: number,
  contractSourceMode: ContractSourceMode
) {
  const [fetchedContractAddresses, setFetchedContractAddresses] = useState<Address[]>([]);
  const [isLoadingContracts, setIsLoadingContracts] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isComingSoon, setIsComingSoon] = useState<boolean>(false);

  const KTV2_FACTORY_ADDRESS = useMemo(() => {
    const factoryInfo = FACTORY_CONTRACTS[targetChainId];
    if (factoryInfo) {
      return factoryInfo.address;
    }
    console.warn(`No Ktv2Factory address configured for chainId: ${targetChainId}`);
    return undefined;
  }, [targetChainId]);

  const { data: childContractCount, isLoading: isLoadingCount, error: countError } = useReadContract({
    address: KTV2_FACTORY_ADDRESS,
    abi: ktv2FactoryAbi,
    functionName: 'count',
    chainId: targetChainId,
    query: {
      enabled: (contractSourceMode === ContractSourceMode.FETCHED_ONLY || contractSourceMode === ContractSourceMode.BOTH_MERGED) && !!KTV2_FACTORY_ADDRESS,
    },
  });

  const childContractCalls = useMemo(() => {
    if (!KTV2_FACTORY_ADDRESS || childContractCount === undefined || Number(childContractCount) === 0) {
      return [];
    }
    const count = Number(childContractCount);
    return Array.from({ length: count }, (_, index) => ({
      address: KTV2_FACTORY_ADDRESS,
      abi: ktv2FactoryAbi,
      functionName: 'created',
      args: [BigInt(index)],
      chainId: targetChainId,
    }));
  }, [KTV2_FACTORY_ADDRESS, childContractCount, targetChainId]);

  const {
    data: fetchedChildContractsData,
    isLoading: isLoadingChildContracts,
    error: childContractsError,
    isFetched: areChildContractsFetched,
  } = useReadContracts({
    contracts: childContractCalls,
    query: {
      enabled: childContractCalls.length > 0 && (contractSourceMode === ContractSourceMode.FETCHED_ONLY || contractSourceMode === ContractSourceMode.BOTH_MERGED),
    },
  });

  useEffect(() => {
    if (!isLoadingChildContracts && areChildContractsFetched && fetchedChildContractsData) {
      const addresses = fetchedChildContractsData
        .map(item => (item.status === 'success' ? (item.result as unknown as Address) : null))
        .filter((address): address is Address => address !== null);
      setFetchedContractAddresses(addresses);
      setIsLoadingContracts(false);
      setFetchError(null);
    } else if (childContractsError) {
      setFetchError(`Error fetching child contracts: ${childContractsError.message}`);
      setIsLoadingContracts(false);
    } else if (isLoadingChildContracts) {
      setIsLoadingContracts(true);
      setFetchError(null);
    }
  }, [fetchedChildContractsData, isLoadingChildContracts, childContractsError, areChildContractsFetched]);

  useEffect(() => {
    if (contractSourceMode === ContractSourceMode.HARDCODED_ONLY || !KTV2_FACTORY_ADDRESS) {
      setFetchedContractAddresses([]);
      setIsLoadingContracts(false);
      if (!KTV2_FACTORY_ADDRESS) {
        setIsComingSoon(true);
        setFetchError(`Coming Soon on ${getChainName(targetChainId) || `Chain ID ${targetChainId}`}!`);
      } else {
        setIsComingSoon(false);
        setFetchError(null);
      }
      return;
    }

    if (isLoadingCount) {
      setIsLoadingContracts(true);
      setFetchError(null);
      return;
    }

    if (countError) {
      setFetchError(`Error fetching contract count: ${countError.message}`);
      setIsLoadingContracts(false);
      return;
    }

    if (childContractCount !== undefined && Number(childContractCount) === 0) {
      setFetchedContractAddresses([]);
      setIsLoadingContracts(false);
    }
  }, [childContractCount, isLoadingCount, countError, contractSourceMode, KTV2_FACTORY_ADDRESS, targetChainId]);

  const finalContractList = useMemo(() => {
    const hardcodedForChain = officialKtv2Contracts[targetChainId] || [];
    if (contractSourceMode === ContractSourceMode.FETCHED_ONLY) {
      return fetchedContractAddresses;
    } else if (contractSourceMode === ContractSourceMode.HARDCODED_ONLY) {
      return hardcodedForChain;
    } else if (contractSourceMode === ContractSourceMode.BOTH_MERGED) {
      const combined = new Set([...hardcodedForChain, ...fetchedContractAddresses]);
      return Array.from(combined);
    }
    return [];
  }, [fetchedContractAddresses, targetChainId, contractSourceMode]);

  return { finalContractList, isLoadingContracts, fetchError, isComingSoon };
} 