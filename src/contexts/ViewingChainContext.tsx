import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { mainnet } from '../config/chains';
import { type Chain } from 'viem';
import { useConfig } from 'wagmi';

export interface AppChain extends Chain {
  iconUrl?: string;
  iconBackground?: string;
}

interface ViewingChainContextType {
  viewingChainId: number;
  setViewingChainId: (chainId: number) => void;
  viewingChain: AppChain;
  supportedChains: readonly AppChain[];
}

const ViewingChainContext = createContext<ViewingChainContextType | undefined>(undefined);

export const ViewingChainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { chains } = useConfig();
  const [viewingChainId, setViewingChainId] = useState<number>(mainnet.id);

  const viewingChain = useMemo(() => {
    return (chains.find(c => c.id === viewingChainId) || chains[0] || mainnet) as AppChain;
  }, [viewingChainId, chains]);

  const value = { 
    viewingChainId, 
    setViewingChainId, 
    viewingChain, 
    supportedChains: chains as readonly AppChain[] 
  };

  return (
    <ViewingChainContext.Provider value={value}>
      {children}
    </ViewingChainContext.Provider>
  );
};

export const useViewingChain = (): ViewingChainContextType => {
  const context = useContext(ViewingChainContext);
  if (!context) {
    throw new Error('useViewingChain must be used within a ViewingChainProvider');
  }
  return context;
}; 