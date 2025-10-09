import { useState, useEffect, useMemo } from 'react';
import { useBlockNumber } from 'wagmi';
import { getAverageBlockTime } from '../config/chains';
import { formatSecondsToTime } from '../utils/conversionHelpers';

interface UseEpochCountdownProps {
  epochInterval: number | undefined;
  startBlock: bigint | undefined;
  targetChainId: number | undefined;
  isChainSupported: boolean;
  isLoadingEpochData: boolean; // True if epochInterval or startBlock are loading
}

export const useEpochCountdown = ({
  epochInterval,
  startBlock,
  targetChainId,
  isChainSupported,
  isLoadingEpochData,
}: UseEpochCountdownProps) => {
  const { data: currentBlockNumber, isLoading: isLoadingCurrentBlockNumber } = useBlockNumber({
    watch: true,
    chainId: targetChainId,
    query: { enabled: isChainSupported && !!targetChainId && !isLoadingEpochData && epochInterval !== undefined && startBlock !== undefined },
  });

  const formattedEpochIntervalTime = useMemo(() => {
    if (epochInterval === undefined) return "--d --h --m --s";
    const averageBlockTime = getAverageBlockTime(targetChainId);
    if (averageBlockTime === undefined) return "(avg block time N/A)";
    const intervalInSeconds = epochInterval * averageBlockTime;
    return formatSecondsToTime(intervalInSeconds);
  }, [epochInterval, targetChainId]);

  const timeUntilNextEpochInSeconds = useMemo(() => {
    if (startBlock === undefined || epochInterval === undefined || currentBlockNumber === undefined) return undefined;
    if (epochInterval === 0) return 0; // Avoid division by zero
    const averageBlockTime = getAverageBlockTime(targetChainId);
    if (averageBlockTime === undefined) return undefined;

    const blocksSinceStart = currentBlockNumber - startBlock;
    if (blocksSinceStart < 0) {
        return undefined;
    }

    const currentEpochCycle = Math.floor(Number(blocksSinceStart) / epochInterval);
    const nextEpochStartBlock = startBlock + BigInt((currentEpochCycle + 1) * epochInterval);
    const blocksUntilNextEpoch = nextEpochStartBlock - currentBlockNumber;

    if (blocksUntilNextEpoch <= 0) return 0; // Already past or at the next epoch start
    return Number(blocksUntilNextEpoch) * averageBlockTime;
  }, [startBlock, epochInterval, currentBlockNumber, targetChainId]);

  const [countdown, setCountdown] = useState("--d --h --m --s");

  useEffect(() => {
    if (timeUntilNextEpochInSeconds === undefined) {
      setCountdown("--d --h --m --s");
      return;
    }
    if (timeUntilNextEpochInSeconds <= 0) {
      setCountdown("0d 0h 0m 0s"); // Epoch reached or passed
      return;
    }

    let remainingSeconds = Math.max(0, Math.floor(timeUntilNextEpochInSeconds));
    setCountdown(formatSecondsToTime(remainingSeconds)); // Set initial countdown immediately

    const intervalId = setInterval(() => {
      remainingSeconds -= 1;
      if (remainingSeconds <= 0) {
        setCountdown("0d 0h 0m 0s");
        clearInterval(intervalId);
      } else {
        setCountdown(formatSecondsToTime(remainingSeconds));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeUntilNextEpochInSeconds]);

  const isLoadingDisplay = isLoadingEpochData || isLoadingCurrentBlockNumber || 
                           (epochInterval !== undefined && startBlock !== undefined && currentBlockNumber === undefined && isChainSupported);


  return {
    countdown,
    formattedEpochIntervalTime,
    isLoadingEpochDisplay: !!isLoadingDisplay,
    currentBlockNumber
  };
}; 