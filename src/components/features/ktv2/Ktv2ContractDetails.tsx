import React from 'react';
import { type Address, formatUnits } from 'viem';
import { formatCompactNumber } from '../../../utils/conversionHelpers';
import { useEpochCountdown } from '../../../hooks/useEpochCountdown';
import { Gift, Heart, Flame, Layers, Clock, Hourglass, ExternalLink } from 'lucide-react';

import { useKtv2Jackpot } from '../../../hooks/useKtv2Jackpot';
import { useKtv2Metrics } from '../../../hooks/useKtv2Metrics';
import { useKtv2EpochData } from '../../../hooks/useKtv2EpochData';
import { useKtv2TokenData } from '../../../hooks/useKtv2TokenData';

/** Set to true to show compact numbers (e.g. 1.2M), false to show whole numbers only (no decimals). */
const FORMAT_METRICS_NUMBERS = false;

interface Ktv2ContractDetailsProps {
  selectedContractAddress: Address | null;
  targetChainId: number | undefined;
  isChainSupported: boolean;
  detailsLink?: string;
}

const Ktv2ContractDetails: React.FC<Ktv2ContractDetailsProps> = ({
  selectedContractAddress,
  targetChainId,
  isChainSupported,
  detailsLink,
}) => {
  const hookProps = { contractAddress: selectedContractAddress, targetChainId, isChainSupported };

  const {
    childContractBalance,
    childContractBalanceSuccess,
    contractBalanceUsd,
    isLoading: isLoadingJackpot,
    isLoadingUsdValue,
  } = useKtv2Jackpot(hookProps);

  const {
    totalDonatedData,
    totalDonatedUsd,
    isLoadingTotalDonated,
    totalBurnedData,
    totalBurnedUsd,
    isLoadingTotalBurned,
    totalStakedData,
    totalStakedUsd,
    isLoadingTotalStaked,
    isLoading: isLoadingMetricsUsd,
  } = useKtv2Metrics(hookProps);
  
  const {
    ktv2TokenDecimals,
    ktv2TokenSymbol,
    isLoading: isLoadingTokenData,
    isLoadingKtv2TokenPriceInNative,
  } = useKtv2TokenData(hookProps);

  const {
    epochInterval,
    startBlock,
    isLoading: isLoadingEpochData,
    isLoadingEpochInterval
  } = useKtv2EpochData(hookProps);

  const { 
    countdown,
    formattedEpochIntervalTime,
    isLoadingEpochDisplay 
  } = useEpochCountdown({
    epochInterval,
    startBlock,
    targetChainId,
    isChainSupported,
    isLoadingEpochData,
  });

  if (!selectedContractAddress) {
    return null;
  }

  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:gap-y-4 lg:gap-x-6 text-white">
        {/* Jackpot */}
        <div>
          <div className="flex items-center gap-1">
            <Gift className="text-green-400 w-5 h-5" />
            <span className="text-sm text-zinc-400">Rewards</span>
          </div>
          <div className="text-base sm:text-lg font-semibold">
            {childContractBalanceSuccess && childContractBalance ? (
              <>{Number(childContractBalance.formatted).toFixed(4)} <span className="text-xs font-semibold">{childContractBalance.symbol}</span></>
            ) : isLoadingJackpot ? (
              <span className="text-xs text-gray-500">Loading...</span>
            ) : (
              <span className="text-xs text-red-500">--</span>
            )}
          </div>
          <div className="text-sm text-zinc-400">
            {contractBalanceUsd ? `$${contractBalanceUsd}` : isLoadingUsdValue ? 'Loading...' : '--'}
          </div>
        </div>
        {/* Total Donated */}
        <div>
          <div className="flex items-center gap-1">
            <Heart className="text-red-400 w-5 h-5" />
            <span className="text-sm text-zinc-400">Charity</span>
          </div>
          <div className="text-base sm:text-lg font-semibold">
            {totalDonatedData !== undefined ? (
              <>{Number(formatUnits(totalDonatedData, 18)).toFixed(4)} <span className="text-xs font-semibold">ETH</span></>
            ) : isLoadingTotalDonated ? (
              <span className="text-xs text-gray-500">Loading...</span>
            ) : (
              <span className="text-xs text-red-500">--</span>
            )}
          </div>
          <div className="text-sm text-zinc-400">
            {totalDonatedUsd ? `$${totalDonatedUsd}` : isLoadingMetricsUsd ? 'Loading...' : '--'}
          </div>
        </div>
        {/* Total Burned */}
        <div>
          <div className="flex items-center gap-1">
            <Flame className="text-orange-400 w-5 h-5" />
            <span className="text-sm text-zinc-400">Total Burned</span>
          </div>
          <div className="text-base sm:text-lg font-semibold">
            {totalBurnedData !== undefined && ktv2TokenDecimals !== undefined ? (
              <>{FORMAT_METRICS_NUMBERS ? formatCompactNumber(formatUnits(totalBurnedData, ktv2TokenDecimals)) : Math.round(Number(formatUnits(totalBurnedData, ktv2TokenDecimals))).toLocaleString('en-US')} <span className="text-xs font-semibold">{ktv2TokenSymbol || 'Tokens'}</span></>
            ) : isLoadingTotalBurned || isLoadingTokenData ? (
              <span className="text-xs text-gray-500">Loading...</span>
            ) : (
              <span className="text-xs text-red-500">--</span>
            )}
          </div>
          <div className="text-sm text-zinc-400">
            {totalBurnedUsd ? `$${totalBurnedUsd}` : isLoadingMetricsUsd || isLoadingKtv2TokenPriceInNative ? 'Loading...' : '--'}
          </div>
        </div>
        {/* Total Staked */}
        <div>
          <div className="flex items-center gap-1">
            <Layers className="text-purple-400 w-5 h-5" />
            <span className="text-sm text-zinc-400">Total Staked</span>
          </div>
          <div className="text-base sm:text-lg font-semibold">
            {totalStakedData !== undefined && ktv2TokenDecimals !== undefined ? (
              <>{FORMAT_METRICS_NUMBERS ? formatCompactNumber(formatUnits(totalStakedData, ktv2TokenDecimals)) : Math.round(Number(formatUnits(totalStakedData, ktv2TokenDecimals))).toLocaleString('en-US')} <span className="text-xs font-semibold">{ktv2TokenSymbol || 'Tokens'}</span></>
            ) : isLoadingTotalStaked || isLoadingTokenData ? (
              <span className="text-xs text-gray-500">Loading...</span>
            ) : (
              <span className="text-xs text-red-500">--</span>
            )}
          </div>
          <div className="text-sm text-zinc-400">
            {totalStakedUsd ? `$${totalStakedUsd}` : isLoadingMetricsUsd || isLoadingKtv2TokenPriceInNative ? 'Loading...' : '--'}
          </div>
        </div>
        {/* Epoch Interval */}
        <div>
          <div className="flex items-center gap-1">
            <Clock className="text-blue-400 w-5 h-5" />
            <span className="text-sm text-zinc-400">Epoch Interval</span>
          </div>
          <div className="text-base sm:text-lg font-semibold">
            {isLoadingEpochInterval ? 'Loading...' : epochInterval !== undefined ? formattedEpochIntervalTime : '--'}
          </div>
        </div>
        {/* Next Epoch */}
        <div>
          <div className="flex items-center gap-1">
            <Hourglass className="text-yellow-400 w-5 h-5" />
            <span className="text-sm text-zinc-400">Next Epoch</span>
          </div>
          <div className="text-base sm:text-lg font-semibold">
            {isLoadingEpochDisplay ? 'Loading...' : countdown || '--'}
          </div>
        </div>
      </div>

      {detailsLink && (
        <div className="mt-5 flex justify-center">
          <a
            href={detailsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full bg-linear-to-r from-[rgba(255,107,107,0.1)] to-[rgba(255,142,83,0.1)] border border-[rgba(255,107,107,0.3)] py-2 px-8 rounded-xl no-underline text-orange-500 font-semibold transition-all duration-300 ease-in-out hover:brightness-110 hover:-translate-y-1 cursor-pointer"
          >
            <span>More details</span>
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          </a>
        </div>
      )}
    </div>
  );
};

export default Ktv2ContractDetails; 