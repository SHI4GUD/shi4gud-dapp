import { useState, useEffect } from 'react';
import { type Address } from 'viem';
import { getOfficialKtv2ConfigByAddress, getChainPathSegment } from '../config/officialContracts';
import { ContractSourceMode } from '../components/features/ktv2/Ktv2SelectorTypes';

interface TokenInfo {
  tokenSymbol: string;
  tokenName: string;
  tokenAddress?: string;
  logoUrl?: string;
  details?: boolean;
}

export function useOfficialTokenInfo(
  currentHardcodedContracts: readonly Address[],
  targetChainId: number,
  contractSourceMode: ContractSourceMode
) {
  const [officialTokenInfoMap, setOfficialTokenInfoMap] = useState<Record<string, TokenInfo>>({});

  useEffect(() => {
    if (
      contractSourceMode === ContractSourceMode.HARDCODED_ONLY ||
      contractSourceMode === ContractSourceMode.BOTH_MERGED
    ) {
      const newInfoMap: Record<string, TokenInfo> = {};
      const chainPathSegment = getChainPathSegment(targetChainId);

      if (chainPathSegment && currentHardcodedContracts.length > 0) {
        for (const ktv2Address of currentHardcodedContracts) {
          const config = getOfficialKtv2ConfigByAddress(chainPathSegment, ktv2Address);
          if (config) {
            newInfoMap[ktv2Address] = {
              tokenSymbol: config.tokenSymbol,
              tokenName: config.tokenName,
              tokenAddress: config.tokenAddress,
              logoUrl: config.logoUrl,
              details: config.details,
            };
          }
        }
      }
      setOfficialTokenInfoMap(newInfoMap);
    } else {
      setOfficialTokenInfoMap({});
    }
  }, [currentHardcodedContracts, targetChainId, contractSourceMode]);

  return officialTokenInfoMap;
} 