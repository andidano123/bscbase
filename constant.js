// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

// Addresses

export const POOL_FACTORY_CONTRACT_ADDRESS =
  '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7'
export const NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS =
  '0x7b8A01B39D58278b5DE7e48c8449c9f4F5170613'

// Transactions

export const MAX_FEE_PER_GAS = '100000000000'
export const MAX_PRIORITY_FEE_PER_GAS = '100000000000'
export const TOKEN_AMOUNT_TO_APPROVE_FOR_TRANSFER = 1000000000000
export const QUOTER_CONTRACT_ADDRESS = '0x78D78E420Da98ad378D7799bE8f4AF69033EB077'
export const SWAP_ROUTER_ADDRESS = '0xB971eF87ede563556b2ED4b1C0b0019111Dd85d2'

// ABI's

export const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [
            { "name": "account", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [
            { "name": "", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "spender", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [
            { "name": "", "type": "bool" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "recipient", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [
            { "name": "", "type": "bool" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            { "name": "sender", "type": "address" },
            { "name": "recipient", "type": "address" },
            { "name": "amount", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [
            { "name": "", "type": "bool" }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            { "name": "", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            { "name": "owner", "type": "address" },
            { "name": "spender", "type": "address" }
        ],
        "name": "allowance",
        "outputs": [
            { "name": "", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            { "name": "", "type": "string" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            { "name": "", "type": "string" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            { "name": "", "type": "uint8" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];


export const NONFUNGIBLE_POSITION_MANAGER_ABI = [
  // Read-Only Functions
  'function balanceOf(address _owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address _owner, uint256 _index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string memory)',

  'function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)',
]