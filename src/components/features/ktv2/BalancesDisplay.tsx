import React from 'react';
import { formatUnits } from 'viem';

interface BalancesDisplayProps {
  isConnected: boolean;
  nativeCurrencySymbol: string;
  defaultErc20Symbol: string;
  
  // Native Balance
  nativeBalanceData: { value: bigint; decimals: number; } | undefined;
  isLoadingNativeBalance: boolean;

  // ERC20 Wallet Balance
  userErc20Balance: bigint | undefined;
  isLoadingUserErc20Balance: boolean;

  // Staked Balance
  userStakedBalance: bigint | undefined;
  isLoadingUserStakedBalance: boolean;

  // Shared ERC20 info
  erc20Decimals: number | undefined;
  erc20Symbol: string | undefined; // For allowance text
  
  // Allowance
  currentAllowance: bigint | undefined;
  isLoadingAllowance: boolean;
}

const BalanceRow: React.FC<{
    label: string;
    isLoading: boolean;
    value: bigint | undefined;
    decimals: number | undefined;
    isConnected: boolean;
}> = ({ label, isLoading, value, decimals, isConnected }) => {
    
    const displayValue = () => {
        if (!isConnected) return <span className="text-gray-400 text-sm">Connect wallet</span>;
        if (isLoading) return <span className="text-gray-400 text-sm">Loading...</span>;
        if (value === undefined || decimals === undefined) return <span className="text-gray-400 text-sm">N/A</span>;
        
        try {
            const formatted = parseFloat(formatUnits(value, decimals)).toFixed(4);
            const display = Number(formatted) < 0.0001 && Number(formatted) > 0 ? `< 0.0001` : formatted;
            
            return <>{`${display}`}</>;
        } catch {
            return <span className="text-red-500 text-sm">Error</span>;
        }
    };

    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-white text-base">{label}:</span>
            <span className="text-amber-400 text-base font-medium">
                {displayValue()}
            </span>
        </div>
    );
};

const BalancesDisplay: React.FC<BalancesDisplayProps> = ({
  isConnected,
  nativeCurrencySymbol,
  defaultErc20Symbol,
  nativeBalanceData,
  isLoadingNativeBalance,
  userErc20Balance,
  erc20Decimals,
  isLoadingUserErc20Balance,
  userStakedBalance,
  isLoadingUserStakedBalance,
  currentAllowance,
  isLoadingAllowance,
  erc20Symbol,
}) => { 

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
        <BalanceRow 
            label={`Wallet ${nativeCurrencySymbol}`}
            isLoading={isLoadingNativeBalance}
            value={nativeBalanceData?.value}
            decimals={nativeBalanceData?.decimals}
            isConnected={isConnected}
        />
        <BalanceRow 
            label={`Wallet ${defaultErc20Symbol}`}
            isLoading={isLoadingUserErc20Balance}
            value={userErc20Balance}
            decimals={erc20Decimals}
            isConnected={isConnected}
        />
       <BalanceRow 
            label={`Staked ${defaultErc20Symbol}`}
            isLoading={isLoadingUserStakedBalance}
            value={userStakedBalance}
            decimals={erc20Decimals}
            isConnected={isConnected}
        />
      
      {isConnected && !isLoadingAllowance && currentAllowance !== undefined && typeof erc20Decimals === 'number' && (
        <div>
            <p className="text-xs">
            <span className="text-gray-400">Token Allowance: </span>
            <span className="text-amber-400 font-mono">
                {currentAllowance > (2n ** 96n) ? 'Infinite' : parseFloat(formatUnits(currentAllowance, erc20Decimals)).toFixed(2)} {erc20Symbol || 'Tokens'}
            </span>
            </p>
        </div>
      )}
    </div>
  );
};

export default BalancesDisplay; 