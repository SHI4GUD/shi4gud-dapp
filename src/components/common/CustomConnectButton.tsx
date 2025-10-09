import React from 'react';
import toast from 'react-hot-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, ChevronDown } from 'lucide-react';
import ViewOnlyChainSelector from './ViewOnlyChainSelector';

// Enable/disable wallet connection
const WALLET_CONNECTION_DISABLED = import.meta.env.VITE_WALLET_CONNECTION_DISABLED === 'true';

interface CustomConnectButtonProps {
  isMobile?: boolean;
}

const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({ isMobile = false }) => {
  const connectButtonBaseClass = "py-3 px-2 rounded-lg text-white bg-zinc-900 hover:opacity-90 focus:outline-none flex items-center justify-center space-x-1 text-sm font-medium transition-colors cursor-pointer border border-zinc-800";
  const walletIconClass = "h-5 w-5";
  const connectWalletButtonSpecificStyles = "text-white rounded-lg hover:opacity-90 transition-colors font-medium cursor-pointer";
  const connectWalletButtonStyle = { background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)' };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        if (!ready) {
          return (
            <button type="button" className={`${connectButtonBaseClass} ${isMobile ? 'px-3' : ''} opacity-50 cursor-not-allowed`} aria-hidden="true" disabled>
              <Wallet className={walletIconClass} />
              {!isMobile && <span>Loading...</span>}
            </button>
          );
        }

        if (!connected) {
          return (
            <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
              <ViewOnlyChainSelector isMobile={isMobile} />
              <button
                onClick={WALLET_CONNECTION_DISABLED ? (e) => {
                  e.preventDefault();
                  toast('Wallet connection is temporarily disabled while we upgrade. Please check back soon.', {
                    style: { background: '#ff6900', color: '#fff' }
                  });
                } : openConnectModal}
                type="button"
                className={`focus:outline-none flex items-center justify-center ${connectWalletButtonSpecificStyles} ${isMobile ? 'py-2.5 px-2 text-xs space-x-1' : 'py-3 px-2 text-sm space-x-2'}`}
                style={connectWalletButtonStyle}
                title={WALLET_CONNECTION_DISABLED ? "Wallet connection temporarily disabled" : "Connect Wallet"}
              >
                <Wallet className={walletIconClass} />
                <span>Connect Wallet</span>
              </button>
            </div>
          );
        }

        if (chain.unsupported) {
          return (
            <button onClick={openChainModal} type="button" className={`${connectButtonBaseClass} ${isMobile ? 'px-1.5 flex items-center space-x-1' : ''}`}>
               {!isMobile && <Wallet className={`${walletIconClass} mr-2`} />}
              <span className="text-red-500">Wrong network</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          );
        }

        return (
          <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
            <button
              onClick={openChainModal}
              type="button"
              className={`${connectButtonBaseClass} ${isMobile ? 'py-3 px-2 bg-zinc-900' : ''}`}
            >
              {chain.hasIcon && chain.iconUrl && (
                <img
                  alt={chain.name ?? 'Chain icon'}
                  src={chain.iconUrl}
                  className={`w-5 h-5 rounded-full ${!isMobile && 'mr-2'}`}
                />
              )}
              {!isMobile && <span>{chain.name}</span>}
              <ChevronDown className="h-4 w-4" />
              {isMobile && <span className="sr-only">{chain.name}</span>}
            </button>
            {!isMobile && (<button
              onClick={openAccountModal}
              type="button"
              className={`flex items-center justify-center py-3 px-2 space-x-2 text-sm ${connectWalletButtonSpecificStyles}`}
              style={connectWalletButtonStyle}
            >
              <Wallet className={walletIconClass} />
              <span>
                {account.displayName}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>)}
            {isMobile && (
                 <button
                 onClick={openAccountModal}
                 type="button"
                 className={`flex items-center justify-center py-3 px-2 space-x-1 ${connectWalletButtonSpecificStyles}`}
                 style={connectWalletButtonStyle}
               >
                 <Wallet className={walletIconClass} />
                 <ChevronDown className="h-4 w-4" />
               </button>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton; 