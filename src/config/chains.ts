import {
  mainnet as wagmiMainnet,
  sepolia as wagmiSepolia,
  base as wagmiBase,
} from 'wagmi/chains';
import type { Chain } from 'viem';

// Standard chains
export const mainnet = wagmiMainnet;
export const sepolia = wagmiSepolia;
export const base = wagmiBase;

// Custom Chains
export const shibarium: Chain = {
  id: 109,
  name: 'Shibarium',
  nativeCurrency: { name: 'Bone ShibaSwap', symbol: 'BONE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.shibarium.shib.io'] },
    public: { http: ['https://rpc.shibarium.shib.io'] }
  },
  blockExplorers: {
    default: { name: 'ShibariumScan', url: 'https://shibariumscan.io' }
  },
};

// Export Supported Chains
export const supportedChains = [
  mainnet,
  sepolia,
  base,
  {
    ...shibarium,
    iconUrl: '/assets/chains/shibarium.svg',
  }
] as const;

// Helper to get chain name, useful for UI messages
export const getChainName = (chainId: number | undefined): string | undefined => {
  return supportedChains.find(chain => chain.id === chainId)?.name;
};

// Average Block Times (in seconds)
export const AVERAGE_BLOCK_TIMES: { [chainId: number]: number } = {
  [mainnet.id]: 12,
  [sepolia.id]: 12,
  [base.id]: 2,
  [shibarium.id]: 5,
};

export const getAverageBlockTime = (chainId: number | undefined): number | undefined => {
  if (chainId === undefined) return undefined;
  return AVERAGE_BLOCK_TIMES[chainId];
};
