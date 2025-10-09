import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { wagmiConfig } from './config/wagmi.ts';
import { globalToastOptions } from './config/toastConfig';
import App from './App.tsx';
import CustomAvatar from './components/common/CustomAvatar.tsx';
import ErrorBoundary from './components/common/ErrorBoundary.tsx';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider 
            locale="en-US"
            modalSize="compact"
            theme={darkTheme({
              accentColor: '#ff6900',
              accentColorForeground: '#fff',
              borderRadius: 'large',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            initialChain={1}
            appInfo={{
              appName: 'SHI4GUD',
            }}
            avatar={CustomAvatar}
          >
            <BrowserRouter>
              <App />
              <Toaster 
                position="bottom-center" 
                reverseOrder={false}
                toastOptions={globalToastOptions}
              /> 
            </BrowserRouter>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>
);