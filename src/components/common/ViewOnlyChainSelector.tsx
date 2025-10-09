import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useViewingChain, type AppChain } from '../../contexts/ViewingChainContext';
import { mainnet, sepolia, base, shibarium } from '../../config/chains';

const customIcons: { [chainId: number]: string } = {
  [mainnet.id]: '/assets/chains/ethereum.svg',
  [sepolia.id]: '/assets/chains/ethereum.svg',
  [base.id]: '/assets/chains/base.svg',
  [shibarium.id]: '/assets/chains/shibarium.svg',
};

// Modal Component
interface CustomChainSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  supportedChains: readonly AppChain[];
  viewingChainId: number;
  onSelectChain: (chainId: number) => void;
}

const CustomChainSelectorModal: React.FC<CustomChainSelectorModalProps> = ({
  isOpen,
  onClose,
  supportedChains,
  viewingChainId,
  onSelectChain,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1A1B1F] rounded-2xl p-2 sm:p-4 w-full max-w-sm border border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pt-2 pb-4 px-2">
          <h2 className="text-white text-lg font-bold">Switch Networks</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-2">
          {supportedChains.map((supportedChain) => {
            const isSelected = supportedChain.id === viewingChainId;
            return (
              <li key={supportedChain.id}>
                <button
                  onClick={() => onSelectChain(supportedChain.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-white transition-colors cursor-pointer ${isSelected ? 'bg-orange-600' : 'hover:bg-white/10'}`}
                >
                  <div className="flex items-center gap-3 font-semibold">
                    {(() => {
                        const iconUrl = customIcons[supportedChain.id] || supportedChain.iconUrl;
                        if (iconUrl) {
                            return <img
                                src={iconUrl}
                                alt={`${supportedChain.name} logo`}
                                className="w-7 h-7 rounded-full"
                            />;
                        }
                        return null;
                    })()}
                    <span>{supportedChain.name}</span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};


// Main Component
interface ViewOnlyChainSelectorProps {
  isMobile?: boolean;
}

const ViewOnlyChainSelector: React.FC<ViewOnlyChainSelectorProps> = ({ isMobile = false }) => {
  const [isChainSelectorOpen, setChainSelectorOpen] = useState(false);
  const { viewingChain, setViewingChainId, supportedChains } = useViewingChain();

  const handleChainSelect = (chainId: number) => {
    setViewingChainId(chainId);
    setChainSelectorOpen(false);
  };

  const connectButtonBaseClass = "py-3 px-2 rounded-lg text-white bg-zinc-900 hover:opacity-90 focus:outline-none flex items-center justify-center space-x-1 text-sm font-medium transition-colors cursor-pointer border border-zinc-800";

  return (
    <>
      <button
        onClick={() => setChainSelectorOpen(true)}
        type="button"
        className={`${connectButtonBaseClass} ${isMobile ? 'py-3 px-2' : ''}`}
      >
        {(() => {
            const iconUrl = customIcons[viewingChain.id] || viewingChain.iconUrl;
            if (iconUrl) {
                return <img
                    alt={`${viewingChain.name} icon`}
                    src={iconUrl}
                    className={`w-5 h-5 rounded-full ${!isMobile && 'mr-2'}`}
                />;
            }
            return null;
        })()}
        {!isMobile && <span>{viewingChain.name}</span>}
        <ChevronDown className={`h-4 w-4 ${isMobile ? '' : 'ml-1'}`} />
      </button>

      <CustomChainSelectorModal
        isOpen={isChainSelectorOpen}
        onClose={() => setChainSelectorOpen(false)}
        supportedChains={supportedChains}
        viewingChainId={viewingChain.id}
        onSelectChain={handleChainSelect}
      />
    </>
  );
};

export default ViewOnlyChainSelector; 