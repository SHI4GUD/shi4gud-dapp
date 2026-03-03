export interface Ktv2Config {
  /** Contract address; optional when comingSoon is true */
  address?: string;
  tokenAddress?: string;
  tokenSymbol: string;
  tokenName: string;
  tokenDecimals?: number;
  charity?: string;
  logoUrl?: string;
  details?: boolean;
  /** When true, bank appears in dropdown as "Coming Soon" and shows Coming Soon panel when selected */
  comingSoon?: boolean;
  /** When true, show Official badge (e.g. for Coming Soon banks that are official) */
  official?: boolean;
} 