import React, { useMemo } from 'react';
import { useAccount, useReadContract, useBalance } from 'wagmi';
import { type Address } from 'viem';
import { Copy, ExternalLink, Landmark } from 'lucide-react';
import toast from 'react-hot-toast';

// Import ABIs, configs, and components
import {
    childContractABI,
    erc20ABI,
} from '../../../config/contracts';
import { supportedChains } from '../../../config/chains';
import { useNativeUsdPrice } from '../../../hooks/useNativeUsdPrice';
import { useKtv2TokenData } from '../../../hooks/useKtv2TokenData';
import BalancesDisplay from './BalancesDisplay';
import StakeSection from './StakeSection';
import WithdrawSection from './WithdrawSection';
import DonateSection from './DonateSection';

// Interfaces
export interface LatestRoundDataOutput {
    roundId: bigint;
    answer: bigint;
    startedAt: bigint;
    updatedAt: bigint;
    answeredInRound: bigint;
}

interface Ktv2ActionsProps {
    ktv2ContractAddress: Address | undefined;
    targetChainId: number | undefined;
    logoUrl?: string;
    officialName?: string;
    officialSymbol?: string;
}

// Main Component
const Ktv2Actions: React.FC<Ktv2ActionsProps> = ({
    ktv2ContractAddress,
    targetChainId,
    logoUrl,
    officialName,
    officialSymbol
}) => {
    // Hooks for wallet and chain state
    const { address: userAddress, isConnected, chain } = useAccount();
    const isChainSupported = useMemo(() => chain?.id === targetChainId, [chain, targetChainId]);

    // --- READ-ONLY DATA FETCHING ---
    // All data fetching remains here as it's shared across multiple child components.
    const { data: nativeBalanceData, isLoading: isLoadingNativeBalance, refetch: refetchNativeBalance } = useBalance({
        address: userAddress, chainId: targetChainId,
        query: { enabled: !!userAddress && !!targetChainId && isConnected },
    });

    // --- PRICE & TOKEN DATA ---
    useNativeUsdPrice(targetChainId);

    const {
        childTokenAddress: erc20TokenAddress,
        ktv2TokenDecimals: erc20Decimals,
        ktv2TokenSymbol: erc20Symbol,
        ktv2TokenName: erc20Name,
        isLoading: isLoadingTokenData,
    } = useKtv2TokenData({
        contractAddress: ktv2ContractAddress ?? null,
        targetChainId,
        isChainSupported
    });

    const { data: userErc20BalanceResult, isLoading: isLoadingUserErc20Balance, refetch: refetchUserErc20Balance } = useReadContract({
        address: erc20TokenAddress, abi: erc20ABI, functionName: 'balanceOf',
        args: userAddress ? [userAddress] as const : undefined, chainId: targetChainId,
        query: { enabled: !!erc20TokenAddress && !!userAddress && !!targetChainId && isConnected },
    });
    const userErc20Balance = userErc20BalanceResult as bigint | undefined;
    
    const { data: userStakedBalanceResult, isLoading: isLoadingUserStakedBalance, refetch: refetchUserStakedBalance } = useReadContract({
        address: ktv2ContractAddress, abi: childContractABI, functionName: 'userStks',
        args: userAddress ? [userAddress] as const : undefined, chainId: targetChainId,
        query: { enabled: !!ktv2ContractAddress && !!userAddress && !!targetChainId && isConnected },
    });
    const userStakedBalance = userStakedBalanceResult as bigint | undefined;

    const { data: currentAllowanceResult, isLoading: isLoadingAllowance, refetch: refetchAllowance } = useReadContract({
        address: erc20TokenAddress, abi: erc20ABI, functionName: 'allowance',
        args: userAddress && ktv2ContractAddress ? [userAddress, ktv2ContractAddress] as const : undefined,
        chainId: targetChainId, query: { enabled: !!erc20TokenAddress && !!userAddress && !!ktv2ContractAddress && !!targetChainId && isConnected }
    });
    const currentAllowance = currentAllowanceResult as bigint | undefined;

    // --- DERIVED VALUES & UI HELPERS ---
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => toast.success('Address copied!'), () => toast.error('Failed to copy.'));
    };

    const getBlockExplorerUrl = (address?: Address) => {
        if (!targetChainId || !address) return "#";
        const chain = supportedChains.find(c => c.id === targetChainId);
        return chain?.blockExplorers?.default?.url ? `${chain.blockExplorers.default.url}/address/${address}` : `https://etherscan.io/address/${address}`;
    };
    
    const nativeCurrencySymbol = useMemo(() => (isConnected && nativeBalanceData?.symbol) || supportedChains.find(c => c.id === targetChainId)?.nativeCurrency.symbol || 'Native', [isConnected, nativeBalanceData, targetChainId]);
    const displayedName = officialName || erc20Name || 'Token';
    const displayedSymbol = officialSymbol || erc20Symbol || 'TKN';
    const defaultErc20Symbol = officialSymbol || erc20Symbol || 'Token';

    if (!ktv2ContractAddress || !targetChainId) {
        return <p className="text-center text-amber-400">No Burn Bank selected or chain identified.</p>;
    }

    return (
        <div className="w-full h-full flex flex-col lg:justify-between space-y-5 lg:space-y-4 relative p-3 bg-linear-to-r from-[rgba(255,107,107,0.06)] to-[rgba(255,142,83,0.06)] border border-[rgba(255,107,107,0.15)] rounded-xl">
            {/* Header Display */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {logoUrl ? <img src={logoUrl} alt={`${displayedName} logo`} className="w-10 h-10 md:w-12 md:h-12 object-cover shrink-0" /> : <Landmark size={48} className="text-orange-500 shrink-0 w-10 h-10 md:w-12 md:h-12" />}
                <div className="grow">
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                        {isLoadingTokenData ? 'Loading...' : <a href={getBlockExplorerUrl(erc20TokenAddress)} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500" title={`View ${displayedName} on block explorer`}>{`${displayedName} (${displayedSymbol})`}</a>}
                    </h3>
                    <div className="flex items-baseline space-x-2 text-sm text-gray-400">
                        <span className="font-medium text-orange-500">Burn Bank:</span>
                        <span className="font-mono text-xs">{`${ktv2ContractAddress.substring(0, 6)}...${ktv2ContractAddress.substring(ktv2ContractAddress.length - 4)}`}</span>
                        <button onClick={() => copyToClipboard(ktv2ContractAddress)} title="Copy address" className="cursor-pointer hover:text-pink-500"><Copy size={13} /></button>
                        <a href={getBlockExplorerUrl(ktv2ContractAddress)} target="_blank" rel="noopener noreferrer" title="View on explorer" className="cursor-pointer hover:text-pink-500"><ExternalLink size={13} /></a>
                    </div>
                </div>
            </div>

            {/* Balances Section (Passes read-only data) */}
            <BalancesDisplay
                isConnected={isConnected}
                nativeCurrencySymbol={nativeCurrencySymbol}
                defaultErc20Symbol={defaultErc20Symbol}
                nativeBalanceData={nativeBalanceData}
                isLoadingNativeBalance={isLoadingNativeBalance}
                userErc20Balance={userErc20Balance}
                erc20Decimals={erc20Decimals}
                isLoadingUserErc20Balance={isLoadingUserErc20Balance}
                userStakedBalance={userStakedBalance}
                isLoadingUserStakedBalance={isLoadingUserStakedBalance}
                currentAllowance={currentAllowance}
                isLoadingAllowance={isLoadingAllowance}
                erc20Symbol={erc20Symbol}
            />

            {/* Stake Section */}
            <StakeSection
                ktv2ContractAddress={ktv2ContractAddress}
                targetChainId={targetChainId}
                defaultErc20Symbol={defaultErc20Symbol}
                userErc20Balance={userErc20Balance}
                currentAllowance={currentAllowance}
                isConnected={isConnected}
                refetchUserErc20Balance={refetchUserErc20Balance}
                refetchUserStakedBalance={refetchUserStakedBalance}
                refetchAllowance={refetchAllowance}
                nativeDecimals={nativeBalanceData?.decimals}
            />

            {/* Withdraw Section */}
            <WithdrawSection
                ktv2ContractAddress={ktv2ContractAddress}
                targetChainId={targetChainId}
                defaultErc20Symbol={defaultErc20Symbol}
                userStakedBalance={userStakedBalance}
                isConnected={isConnected}
                refetchUserStakedBalance={refetchUserStakedBalance}
                refetchUserErc20Balance={refetchUserErc20Balance}
                nativeDecimals={nativeBalanceData?.decimals}
            />

            {/* Donate Section */}
            <DonateSection
                ktv2ContractAddress={ktv2ContractAddress}
                targetChainId={targetChainId}
                nativeCurrencySymbol={nativeCurrencySymbol}
                userNativeBalance={nativeBalanceData?.value}
                nativeDecimals={nativeBalanceData?.decimals}
                isConnected={isConnected}
                refetchNativeBalance={refetchNativeBalance}
            />
        </div>
    );
};

export default Ktv2Actions;