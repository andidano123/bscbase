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

export const permit2Abi = [
    {
      inputs: [{ internalType: "uint256", name: "deadline", type: "uint256" }],
      name: "AllowanceExpired",
      type: "error",
    },
    { inputs: [], name: "ExcessiveInvalidation", type: "error" },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [{ internalType: "uint256", name: "maxAmount", type: "uint256" }],
      name: "InvalidAmount",
      type: "error",
    },
    { inputs: [], name: "InvalidContractSignature", type: "error" },
    { inputs: [], name: "InvalidNonce", type: "error" },
    { inputs: [], name: "InvalidSignature", type: "error" },
    { inputs: [], name: "InvalidSignatureLength", type: "error" },
    { inputs: [], name: "InvalidSigner", type: "error" },
    { inputs: [], name: "LengthMismatch", type: "error" },
    {
      inputs: [
        { internalType: "uint256", name: "signatureDeadline", type: "uint256" },
      ],
      name: "SignatureExpired",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "Lockdown",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "newNonce",
          type: "uint48",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "oldNonce",
          type: "uint48",
        },
      ],
      name: "NonceInvalidation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint160",
          name: "amount",
          type: "uint160",
        },
        {
          indexed: false,
          internalType: "uint48",
          name: "expiration",
          type: "uint48",
        },
        { indexed: false, internalType: "uint48", name: "nonce", type: "uint48" },
      ],
      name: "Permit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "word",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "mask",
          type: "uint256",
        },
      ],
      name: "UnorderedNonceInvalidation",
      type: "event",
    },
    {
      inputs: [],
      name: "DOMAIN_SEPARATOR",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "allowance",
      outputs: [
        { internalType: "uint160", name: "amount", type: "uint160" },
        { internalType: "uint48", name: "expiration", type: "uint48" },
        { internalType: "uint48", name: "nonce", type: "uint48" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint160", name: "amount", type: "uint160" },
        { internalType: "uint48", name: "expiration", type: "uint48" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint48", name: "newNonce", type: "uint48" },
      ],
      name: "invalidateNonces",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "wordPos", type: "uint256" },
        { internalType: "uint256", name: "mask", type: "uint256" },
      ],
      name: "invalidateUnorderedNonces",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
          ],
          internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
          name: "approvals",
          type: "tuple[]",
        },
      ],
      name: "lockdown",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "uint256", name: "", type: "uint256" },
      ],
      name: "nonceBitmap",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint160", name: "amount", type: "uint160" },
                { internalType: "uint48", name: "expiration", type: "uint48" },
                { internalType: "uint48", name: "nonce", type: "uint48" },
              ],
              internalType: "struct IAllowanceTransfer.PermitDetails[]",
              name: "details",
              type: "tuple[]",
            },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "sigDeadline", type: "uint256" },
          ],
          internalType: "struct IAllowanceTransfer.PermitBatch",
          name: "permitBatch",
          type: "tuple",
        },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint160", name: "amount", type: "uint160" },
                { internalType: "uint48", name: "expiration", type: "uint48" },
                { internalType: "uint48", name: "nonce", type: "uint48" },
              ],
              internalType: "struct IAllowanceTransfer.PermitDetails",
              name: "details",
              type: "tuple",
            },
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "sigDeadline", type: "uint256" },
          ],
          internalType: "struct IAllowanceTransfer.PermitSingle",
          name: "permitSingle",
          type: "tuple",
        },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions",
              name: "permitted",
              type: "tuple",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "requestedAmount", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails",
          name: "transferDetails",
          type: "tuple",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions[]",
              name: "permitted",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "requestedAmount", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions",
              name: "permitted",
              type: "tuple",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "requestedAmount", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails",
          name: "transferDetails",
          type: "tuple",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes32", name: "witness", type: "bytes32" },
        { internalType: "string", name: "witnessTypeString", type: "string" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitWitnessTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            {
              components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
              ],
              internalType: "struct ISignatureTransfer.TokenPermissions[]",
              name: "permitted",
              type: "tuple[]",
            },
            { internalType: "uint256", name: "nonce", type: "uint256" },
            { internalType: "uint256", name: "deadline", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
          name: "permit",
          type: "tuple",
        },
        {
          components: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "requestedAmount", type: "uint256" },
          ],
          internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "bytes32", name: "witness", type: "bytes32" },
        { internalType: "string", name: "witnessTypeString", type: "string" },
        { internalType: "bytes", name: "signature", type: "bytes" },
      ],
      name: "permitWitnessTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint160", name: "amount", type: "uint160" },
            { internalType: "address", name: "token", type: "address" },
          ],
          internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
          name: "transferDetails",
          type: "tuple[]",
        },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint160", name: "amount", type: "uint160" },
        { internalType: "address", name: "token", type: "address" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];