export const ktv2Abi = [
  {
    "inputs": [
      { "internalType": "address", "name": "_burnDest", "type": "address" },
      { "internalType": "address", "name": "_token", "type": "address" },
      { "internalType": "address payable", "name": "_dest", "type": "address" },
      { "internalType": "address", "name": "_pool", "type": "address" },
      { "internalType": "address", "name": "_ocPrcAddr", "type": "address" },
      { "internalType": "address", "name": "_tp", "type": "address" },
      { "internalType": "bool", "name": "_v2", "type": "bool" }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "Gave",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "newOC", "type": "address" }
    ],
    "name": "NodeAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "oldOC", "type": "address" }
    ],
    "name": "NodeRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "Rwd",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "Staked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "", "type": "string" }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "voter", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "newOC", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "data", "type": "string" }
    ],
    "name": "VotedToAdd",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "voter", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "existingOC", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "data", "type": "string" }
    ],
    "name": "VotedToRemove",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "Withdrew",
    "type": "event"
  },
  {
    "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
    "name": "addOCRwdr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "addVotes",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "allow",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "blockRwd",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "burnDest",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "burnFactor",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "consensusReq",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decline",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "declines",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "dest",
    "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "donationPrc",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "epochInterval",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "give",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "name": "hasVoted",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxBrnPrc",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ocFee",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "ocFees",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "ocRwdrVote",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "ocRwdrs",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pool",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
    "name": "removeOCRwdr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "removeVotes",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }],
    "name": "resetVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "newOC", "type": "address" }],
    "name": "resetVoteToAdd",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "existingOC", "type": "address" }],
    "name": "resetVoteToRemove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address payable", "name": "_to", "type": "address" },
      { "internalType": "uint256", "name": "_amt", "type": "uint256" }
    ],
    "name": "rwd",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "amt", "type": "uint16" }],
    "name": "setBurnFactor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "req", "type": "uint16" }],
    "name": "setConsensusReq",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "addr", "type": "address" }],
    "name": "setDest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "amt", "type": "uint16" }],
    "name": "setDonationPrc",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "interval", "type": "uint16" }],
    "name": "setEpochInterval",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "amt", "type": "uint16" }],
    "name": "setMaxBurnPrc",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint16", "name": "fee", "type": "uint16" }],
    "name": "setOCFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_pool", "type": "address" }],
    "name": "setPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bool", "name": "_v2", "type": "bool" }],
    "name": "setV2",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amt", "type": "uint256" }],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startBlock",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tlOcFees",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenAddr",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalBurned",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalGvn",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalOC",
    "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalStk",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tp",
    "outputs": [{ "internalType": "contract TPI", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "userStks",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "v2",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address payable", "name": "_to", "type": "address" },
      { "internalType": "string", "name": "data", "type": "string" }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOC", "type": "address" },
      { "internalType": "string", "name": "data", "type": "string" }
    ],
    "name": "voteToAdd",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "existingOC", "type": "address" },
      { "internalType": "string", "name": "data", "type": "string" }
    ],
    "name": "voteToRemove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "amt", "type": "uint256" }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint32[]", "name": "blocks", "type": "uint32[]" }],
    "name": "withdrawOCFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_to", "type": "address" },
      { "internalType": "address", "name": "addr", "type": "address" }
    ],
    "name": "withdrawTkn",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  { "stateMutability": "payable", "type": "receive" }
] as const;