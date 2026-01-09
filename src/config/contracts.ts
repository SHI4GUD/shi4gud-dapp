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
    address: '0x71B9a8Cdc785Dac637056D371e762CDc0f0d9385',
  },
  [sepolia.id]: {
    address: '0x8cCaaA26014285dAF6cDeF0e6a51C15198E5936c',
  },
};

// Default child contracts per chains
export const DEFAULT_DISPLAY_CHILD_CONTRACT: { [chainId: number]: ChildContractPlaceholder | undefined } = {
  [mainnet.id]: {
    address: '0xB1511DfE756342CA14a858B4896983095fEc1B51', 
    abi: childContractABI,
  },
  [sepolia.id]: {
    address: '0x4a889E3B1feebeABDe205097a87bF9f6FBe51D1B', 
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
