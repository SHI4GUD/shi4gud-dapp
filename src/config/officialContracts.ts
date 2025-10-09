export const officialKtv2Contracts: { [chainId: number]: readonly `0x${string}`[] } = {
  // Mainnet
  1: [
    "0x0B0b9dCac89Cb585fAc7fC7F7A625870Ac8d9693", // SHI
    "0x3A8c5868B9625B8C82650C6B25cE0E6e55c767B4", // SHIB
  ],
  // Sepolia
  11155111: [
    "0x6A653395F0CA00205427D98BE7A8947D1b8F82E8", // TEST
  ],
  // Base
  8453: [],
  // Shibarium
  109: [],
}; 

// --- Helper for chain ID to path segment ---
export const getChainPathSegment = (chainId: number): string | null => {
  const map: Record<number, string> = {
    1: 'eth', // Mainnet
    11155111: 'sepolia', // Sepolia
    8453: 'base', // Base
    109: 'shibarium', // Shibarium
  };
  return map[chainId] || null;
};

import type { Ktv2Config } from '../types/ktv2Config';

interface ChainConfigs {
  [tokenSymbolOrFolderName: string]: Ktv2Config;
}

interface AllChainConfigs {
  [chainPathSegment: string]: ChainConfigs;
}

const configModules = import.meta.glob('../assets/ktv2/official/*/*/config.json', { eager: true });
const logoModules = import.meta.glob('../assets/ktv2/official/*/*/logo.png', { 
  eager: true, 
  query: '?url',
  import: 'default'
});

export const officialKtv2TokenConfigurations: AllChainConfigs = (() => {
  const allConfigs: AllChainConfigs = {};
  for (const path in configModules) {
    const parts = path.split('/');
    if (parts.length >= 7) {
      const chainPathSegment = parts[parts.length - 3];
      const tokenFolderName = parts[parts.length - 2];
      const moduleContent = configModules[path] as any;
      const configData = (moduleContent.default || moduleContent) as Ktv2Config;

      const logoPathKey = `../assets/ktv2/official/${chainPathSegment}/${tokenFolderName}/logo.png`;
      
      if (logoModules[logoPathKey]) {
        configData.logoUrl = logoModules[logoPathKey] as string;
      }

      if (!allConfigs[chainPathSegment]) {
        allConfigs[chainPathSegment] = {};
      }
      allConfigs[chainPathSegment][tokenFolderName] = configData;
    }
  }
  return allConfigs;
})();

export const getOfficialKtv2ConfigByAddress = (chainPath: string, ktv2Address: string): Ktv2Config | undefined => {
  const chainConfigs = officialKtv2TokenConfigurations[chainPath];
  if (!chainConfigs) {
    console.warn(`No configs found for chainPath: ${chainPath}`);
    return undefined;
  }
  for (const tokenFolderName in chainConfigs) {
    const config = chainConfigs[tokenFolderName];
    if (config && config.address && config.address.toLowerCase() === ktv2Address.toLowerCase()) {
      return config;
    }
  }
  return undefined;
};