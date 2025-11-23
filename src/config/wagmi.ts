import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { http, fallback } from 'wagmi';
import { mainnet, sepolia, base, shibarium, supportedChains } from './chains';

// API Keys
const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const alchemyKey = import.meta.env.VITE_ALCHEMY_ID;
const infuraKey = import.meta.env.VITE_INFURA_ID;
const appUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

if (!walletConnectProjectId) {
  throw new Error("The WalletConnect Project ID is not set.");
}
if (!alchemyKey) {
  throw new Error("The Alchemy API Key is not set.");
}
if (!infuraKey) {
  console.warn("The Infura API Key is not set. Performance may be degraded.");
}

// Config
export const wagmiConfig = getDefaultConfig({
  appName: 'SHI4GUD',
  appUrl: appUrl,
  appDescription: 'Shina Inu Burn Bank',
  appIcon: `${appUrl}/assets/logos/shi4gud-favicon.svg`,
  projectId: walletConnectProjectId,
  chains: supportedChains,
  wallets: [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet,
        walletConnectWallet,
        metaMaskWallet,
        coinbaseWallet,
        trustWallet,
        rainbowWallet
      ],
    },
  ],
  ssr: false,
  transports: {
    [mainnet.id]: fallback([
      http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`),
      ...(infuraKey ? [http(`https://mainnet.infura.io/v3/${infuraKey}`)] : []),
    ]),
    [sepolia.id]: fallback([
      http(`https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`),
      ...(infuraKey ? [http(`https://sepolia.infura.io/v3/${infuraKey}`)] : []),
    ]),
    [base.id]: fallback([
      http(`https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`),
      ...(infuraKey ? [http(`https://base-mainnet.infura.io/v3/${infuraKey}`)] : []),
    ]),
    [shibarium.id]: http('https://rpc.shibarium.shib.io'),
  }
});