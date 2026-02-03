import { formatUnits } from 'viem';

/**
 * Calculates the USD value of a given amount in Wei, using Chainlink price data.
 * @param amountInWei The amount in Wei (as a bigint).
 * @param ethPriceData The raw price data from Chainlink's latestRoundData (tuple).
 * @param ethPriceDecimals The number of decimals for the price feed.
 * @param nativeTokenDecimals The number of decimals for the native token (e.g., 18 for ETH).
 * @returns The formatted USD value string (e.g., "123.45") or null if inputs are invalid.
 */
export const calculateUsdValue = (
  amountInWei: bigint | undefined | null,
  ethPriceData: readonly [bigint, bigint, bigint, bigint, bigint] | undefined | null,
  ethPriceDecimals: number | undefined | null,
  nativeTokenDecimals: number = 18 // Default to 18 for ETH
): string | null => {
  if (
    amountInWei === undefined || amountInWei === null ||
    !ethPriceData ||
    ethPriceDecimals === undefined || ethPriceDecimals === null
  ) {
    return null;
  }

  try {
    // The price (answer) is the second element (index 1).
    const price = ethPriceData[1];

    const scaleFactor = 10n ** 18n;

    const amountScaled = amountInWei * price * scaleFactor;
    const divisor = (10n ** BigInt(nativeTokenDecimals)) * (10n ** BigInt(ethPriceDecimals));
    
    const usdValueBigInt = amountScaled / divisor;

    // Format the BigInt result into a string with 2 decimal places.
    const fullString = formatUnits(usdValueBigInt, 18); // 18 is because of our scaleFactor
    
    // Manual toFixed(2)
    const dotIndex = fullString.indexOf('.');
    if (dotIndex === -1) {
      return fullString + '.00';
    }
    const decimals = fullString.substring(dotIndex + 1);
    if (decimals.length < 2) {
      return fullString + '0'.repeat(2 - decimals.length);
    }
    return fullString.substring(0, dotIndex + 3);

  } catch (error) {
    console.error("Error calculating USD value:", error);
    return null;
  }
};

/**
 * Calculates the USD value of a given amount of a specific token.
 * @param tokenAmount The amount of the token (as a bigint, in smallest units).
 * @param tokenDecimals The number of decimals for the token.
 * @param tokenPriceInNative The price of one whole token in the native currency (e.g., ETH), as a bigint (in smallest units of native currency).
 * @param nativePriceDecimals The number of decimals for the native currency price (e.g., 18 for ETH price).
 * @param nativeToUsdPriceData The raw price data for native currency to USD from Chainlink (tuple).
 * @param nativeToUsdPriceFeedDecimals The number of decimals for the native to USD price feed.
 * @returns The formatted USD value string or null if inputs are invalid.
 */
export const calculateTokenUsdValue = (
  tokenAmount: bigint | undefined | null,
  tokenDecimals: number | undefined | null,
  tokenPriceInNative: bigint | undefined | null, // Price of 1 whole token in native currency (e.g., ETH), in wei
  nativePriceDecimals: number = 18, // Decimals for tokenPriceInNative (e.g., 18 if price is in ETH/wei)
  nativeToUsdPriceData: readonly [bigint, bigint, bigint, bigint, bigint] | undefined | null,
  nativeToUsdPriceFeedDecimals: number | undefined | null
): string | null => {
  if (
    tokenAmount === undefined || tokenAmount === null ||
    tokenDecimals === undefined || tokenDecimals === null ||
    tokenPriceInNative === undefined || tokenPriceInNative === null ||
    !nativeToUsdPriceData ||
    nativeToUsdPriceFeedDecimals === undefined || nativeToUsdPriceFeedDecimals === null
  ) {
    return null;
  }

  try {
    const nativePriceInUsd = nativeToUsdPriceData[1];
    const scaleFactor = 10n ** 18n;
    const oneNativeToken = 10n ** BigInt(nativePriceDecimals);

    // Heuristic: If 1 token is priced at more than 1 native token, assume the price is inverted.
    // This works because a direct price (native/token) for a memecoin will be a small fraction,
    // while an inverted price (token/native) will be a large number.
    const isPriceInverted = tokenPriceInNative > oneNativeToken;

    let numerator: bigint;
    let denominator: bigint;

    if (isPriceInverted) {
      // Handle inverted price: (amount / price)
      if (tokenPriceInNative === 0n) return null;
      numerator = tokenAmount * nativePriceInUsd * oneNativeToken * scaleFactor;
      denominator = (10n ** BigInt(tokenDecimals)) * tokenPriceInNative * (10n ** BigInt(nativeToUsdPriceFeedDecimals));
    } else {
      // Handle direct price: (amount * price).
      if (tokenPriceInNative === 0n) return null; // Explicitly handle zero price
      numerator = tokenAmount * tokenPriceInNative * nativePriceInUsd * scaleFactor;
      denominator = (10n ** BigInt(tokenDecimals)) * oneNativeToken * (10n ** BigInt(nativeToUsdPriceFeedDecimals));
    }

    if (denominator === 0n) return null;

    const finalUsdValueBigInt = numerator / denominator;
    
    const fullString = formatUnits(finalUsdValueBigInt, 18); // 18 is from scaleFactor

    const dotIndex = fullString.indexOf('.');
    if (dotIndex === -1) {
      return fullString + '.00';
    }
    const decimals = fullString.substring(dotIndex + 1);
    if (decimals.length < 2) {
      return fullString + '0'.repeat(2 - decimals.length);
    }
    return fullString.substring(0, dotIndex + 3);

  } catch (error) {
    console.error("Error calculating token USD value:", error);
    return null;
  }
};

const COMPACT_SUFFIXES = [
  { threshold: 1e12, suffix: 'T' },
  { threshold: 1e9, suffix: 'B' },
  { threshold: 1e6, suffix: 'M' },
  { threshold: 1e3, suffix: 'K' },
] as const;

/**
 * Formats a number with compact suffixes (k, m, b, t).
 * @param value The numeric value (number or string).
 * @param decimals Max decimal places when using a suffix (default 2).
 * @returns Formatted string, e.g. "1.23m", "456.78k", "12.34b".
 */
export const formatCompactNumber = (
  value: number | string | undefined | null,
  decimals: number = 2
): string => {
  if (value === undefined || value === null || value === '') {
    return '0';
  }
  const num = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(num) || num < 0) {
    return '0';
  }
  if (num < 1000) {
    return num.toFixed(decimals).replace(/\.?0+$/, '') || '0';
  }
  for (const { threshold, suffix } of COMPACT_SUFFIXES) {
    if (num >= threshold) {
      const scaled = num / threshold;
      const formatted = scaled >= 10
        ? scaled.toFixed(0)
        : scaled.toFixed(decimals).replace(/\.?0+$/, '') || scaled.toFixed(0);
      return `${formatted}${suffix}`;
    }
  }
  return num.toFixed(decimals).replace(/\.?0+$/, '') || '0';
};

/**
 * Formats a total number of seconds into a string like "Xd Yh Zm Ws".
 * @param totalSeconds The total number of seconds.
 * @returns A string representing the formatted time, or an empty string if input is invalid.
 */
export const formatSecondsToTime = (totalSeconds: number | undefined | null): string => {
  if (totalSeconds === undefined || totalSeconds === null || totalSeconds < 0) {
    return "--d --h --m --s";
  }

  if (totalSeconds === 0) {
    return "0d 0h 0m 0s";
  }

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}; 