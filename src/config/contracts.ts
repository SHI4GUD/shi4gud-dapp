import {
  mainnet,
  sepolia,
  base,
  shibarium
} from './chains';
import { type Abi } from 'viem';
import { ktv2FactoryAbi } from '../abis/ktv2FactoryAbi';
import { ktv2Abi } from '../abis/ktv2Abi';
import { erc20Abi } from '../abis/erc20Abi';
import { chainlinkPriceFeedAbi } from '../abis/chainlinkPriceFeedAbi';
import { tpAbi } from '../abis/tpAbi';

// Export ABIs
export const factoryABI = ktv2FactoryAbi as Abi;
export const childContractABI = ktv2Abi as Abi;
export const erc20ABI = erc20Abi as Abi;
export const chainlinkPriceFeedABI = chainlinkPriceFeedAbi as Abi;
export const tpABI = tpAbi as Abi;

// Interfaces
interface FactoryContractInfo {
  address: `0x${string}`;
}

interface ChildContracts {
  [chainId: number]: FactoryContractInfo | undefined;
}

interface ChildContractPlaceholder {
  address: `0x${string}`;
  abi: Abi;
}

interface PriceFeedAddresses {
  [chainId: number]: `0x${string}` | undefined;
}

// Factory contracts per chains
export const FACTORY_CONTRACTS: ChildContracts = {
  [mainnet.id]: {
    address: '0xfB348f3975A7BE030a2F672E1eE0265fb5dBF2e2',
  },
  [sepolia.id]: {
    address: '0xC4C00ad9E1cA3876079f1EC60cE679201ff6d694',
  },
};

// Default child contracts per chains
export const DEFAULT_DISPLAY_CHILD_CONTRACT: { [chainId: number]: ChildContractPlaceholder | undefined } = {
  [mainnet.id]: {
    address: '0x0B0b9dCac89Cb585fAc7fC7F7A625870Ac8d9693', 
    abi: childContractABI,
  },
  [sepolia.id]: {
    address: '0x6A653395F0CA00205427D98BE7A8947D1b8F82E8', 
    abi: childContractABI,
  }
};

// Chainlink price feeds per chains
export const CHAINLINK_NATIVE_TOKEN_PRICE_FEEDS: PriceFeedAddresses = {
  [mainnet.id]: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  [sepolia.id]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  [base.id]: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
  [shibarium.id]: undefined,
};
