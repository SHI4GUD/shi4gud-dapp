import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { type Address } from 'viem';
import { getChainName } from '../../../config/chains';
import { DEFAULT_DISPLAY_CHILD_CONTRACT } from '../../../config/contracts';
import { useKtv2TokenData } from '../../../hooks/useKtv2TokenData';
import Ktv2Actions from './Ktv2Actions';
import Ktv2Selector, { type Ktv2SelectionDetails } from './Ktv2Selector';
import { ContractSourceMode } from './Ktv2SelectorTypes';
import Ktv2ContractDetails from './Ktv2ContractDetails';
import WinningPreferenceSection from './WinningPreferenceSection';
import { useViewingChain } from '../../../contexts/ViewingChainContext';

const WINNING_PREFERENCE_ENABLED = import.meta.env.VITE_WINNING_PREFERENCE_ENABLED === 'true';

interface Ktv2DashboardProps {
    onSymbolLoaded?: (symbol: string | null) => void;
}

// Main function
const Ktv2Dashboard: React.FC<Ktv2DashboardProps> = ({ onSymbolLoaded }) => {

    // Manage chains
    const { chain: connectedChain, isConnected } = useAccount();
    const toastedLoadRef = useRef<{ address: string; chainId: number } | null>(null);
    const [isComingSoon, setIsComingSoon] = useState(false);
    const { viewingChainId, setViewingChainId, viewingChain, supportedChains } = useViewingChain();

    const { targetChainId, isChainSupported, currentChainName } = useMemo(() => {
        if (isConnected && connectedChain) { // Check if connected first
            const supported = supportedChains.some(sc => sc.id === connectedChain.id);
            return {
                targetChainId: connectedChain.id,
                isChainSupported: supported,
                currentChainName: connectedChain.name,
            };
        }
        // Fallback for disconnected state
        return {
            targetChainId: viewingChainId,
            isChainSupported: true, // Always considered "supported" for viewing
            currentChainName: viewingChain.name,
        };
    }, [isConnected, connectedChain, viewingChainId, viewingChain, supportedChains]);

    useEffect(() => {
        if (isConnected && connectedChain && supportedChains.some(c => c.id === connectedChain.id)) {
            if (viewingChainId !== connectedChain.id) {
                setViewingChainId(connectedChain.id);
            }
        }
    }, [isConnected, connectedChain, viewingChainId, setViewingChainId, supportedChains]);

    // State for the details selected by Ktv2Selector
    const [selectedKtv2Details, setSelectedKtv2Details] = useState<Ktv2SelectionDetails | null>(null);

    // Determine the preferred default contract address for the current chain
    const preferredDefaultAddress = useMemo(() => {
        if (targetChainId && DEFAULT_DISPLAY_CHILD_CONTRACT[targetChainId]) {
            return DEFAULT_DISPLAY_CHILD_CONTRACT[targetChainId]!.address;
        }
        return null;
    }, [targetChainId]);

    // Use the custom hook to fetch only necessary data for this component
    const {
        childTokenAddress,
        childContractReadError,
        childContractReadSuccess,
        ktv2TokenSymbol,
    } = useKtv2TokenData({
        contractAddress: selectedKtv2Details?.address ?? null,
        targetChainId,
        isChainSupported, // Pass the support status to the hook
    });

    // Pass symbol to parent
    useEffect(() => {
        if (onSymbolLoaded) {
            onSymbolLoaded(selectedKtv2Details?.symbol || ktv2TokenSymbol || null);
        }
    }, [selectedKtv2Details?.symbol, ktv2TokenSymbol, onSymbolLoaded]);

    // Toast notifications
    useEffect(() => {
        const currentAddress = selectedKtv2Details?.address;
        const currentChainId = targetChainId;

        if (childContractReadSuccess && typeof childTokenAddress === 'string' && currentAddress && currentChainId) {
            const hasToastedForCurrentLoad = toastedLoadRef.current?.address === currentAddress &&
                                             toastedLoadRef.current?.chainId === currentChainId;

            if (!hasToastedForCurrentLoad) {
                const networkName = getChainName(currentChainId) || 'the network';
                const tokenSymbol = selectedKtv2Details!.symbol || ktv2TokenSymbol;
                const symbolPrefix = tokenSymbol ? `${tokenSymbol} ` : '';
                toast.success(`Selected ${symbolPrefix} Burn Bank on ${networkName}.`);
                toastedLoadRef.current = { address: currentAddress, chainId: currentChainId };
            }
        } else if (!currentAddress) {
            // Reset if no contract is selected
            toastedLoadRef.current = null;
        }
    }, [childContractReadSuccess, childTokenAddress, selectedKtv2Details?.address, selectedKtv2Details?.symbol, ktv2TokenSymbol, targetChainId]);

    useEffect(() => {
        if (childContractReadError) {
            toast.error(`Error reading from selected Burn Bank: ${childContractReadError.shortMessage || 'Failed to fetch data.'}`);
        }
    }, [childContractReadError]);
    
    const handleContractSelected = useCallback((details: Ktv2SelectionDetails | null) => {
        setSelectedKtv2Details(details);
    }, []);

    // Build Burn Bank Details link from ticker when config has details: true (no hardcoded URL)
    const detailsLink = useMemo(() => {
        if (selectedKtv2Details?.details !== true || !selectedKtv2Details?.symbol) return undefined;
        const base = import.meta.env.VITE_WEBSITE_URL;
        if (!base) return undefined;
        return `${String(base).replace(/\/$/, '')}/bank/${selectedKtv2Details.symbol.toLowerCase()}`;
    }, [selectedKtv2Details?.details, selectedKtv2Details?.symbol]);

    // Render Logic
    if (!targetChainId) {
        return (
            <div className="p-4 border rounded-lg shadow-md my-4 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <p>Determining target network...</p>
            </div>
        );
    }

    if (isConnected && !isChainSupported) {
        return (
            <div className="p-4 border rounded-lg shadow-md my-4 bg-red-50 text-red-700">
                <h2 className="text-xl font-semibold mb-2">Unsupported Network</h2>
                <p>Your wallet is connected to "{currentChainName}" (ID: {connectedChain?.id}), which is not supported by this application's contract configurations.</p>
                <p className="mt-2">Please switch to one of the supported networks: {supportedChains.map(sc => sc.name).join(', ')}.</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col w-full justify-center'>
            <div className="py-4 grid grid-cols-1 lg:grid-cols-2 lg:items-stretch gap-6 w-full max-w-6xl mx-auto relative">
                <div className='flex flex-col min-h-0 w-full p-3 bg-linear-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] border border-[rgba(255,107,107,0.15)] rounded-xl'>
                    <div className="mb-6">
                        <Ktv2Selector 
                            targetChainId={targetChainId!}
                            onContractSelected={handleContractSelected}
                            contractSourceMode={ContractSourceMode.HARDCODED_ONLY}
                            preferredDefaultContractAddress={preferredDefaultAddress}
                            onComingSoonChange={setIsComingSoon}
                        />
                    </div>
                    
                    {selectedKtv2Details?.address && (
                        <Ktv2ContractDetails
                            selectedContractAddress={selectedKtv2Details.address as Address}
                            targetChainId={targetChainId}
                            isChainSupported={isChainSupported}
                            detailsLink={detailsLink}
                        />
                    )}
                </div>
                
                {selectedKtv2Details?.address ? (
                    <div className='flex flex-col min-h-0 w-full h-full'>
                        <Ktv2Actions 
                            ktv2ContractAddress={selectedKtv2Details.address as Address} 
                            targetChainId={targetChainId} 
                            logoUrl={selectedKtv2Details.logoUrl}
                            officialName={selectedKtv2Details.name}
                            officialSymbol={selectedKtv2Details.symbol}
                        />
                    </div>
                ) : (
                    !isComingSoon && (
                        <p className="text-amber-400 absolute bottom-[-13px] text-center text-sm sm:text-base left-1/2 -translate-x-1/2 w-full">
                            Please select a contract from the dropdown.
                        </p>
                    )
                )}
            </div>

            {WINNING_PREFERENCE_ENABLED && isConnected && selectedKtv2Details?.address && (
                <div className="w-full max-w-6xl mx-auto mt-4 p-4 flex flex-col items-center justify-center text-center bg-linear-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] border border-[rgba(255,107,107,0.15)] rounded-xl">
                    <WinningPreferenceSection
                        ktv2ContractAddress={selectedKtv2Details.address as Address}
                        targetChainId={targetChainId}
                        isConnected={isConnected}
                    />
                </div>
            )}
        </div>
    );
};

export default Ktv2Dashboard;
