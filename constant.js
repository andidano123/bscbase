// This file stores web3 related constants such as addresses, token definitions, ETH currency references and ABI's

// v4
export const POOL_MANAGER_ADDRESS = "0x28e2ea090877bf75740558f6bfb36a5ffee9e9df";
export const POSITION_MANAGER_ADDRESS = "0x7a4a5c919ae2541aed11041a1aeee68f1287f95b";

// pancake
export const PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS = "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
export const PANCAKE_tv3PoolStateABI = [
  {
    inputs: [],
    name: 'feeGrowthGlobal0X128',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeGrowthGlobal1X128',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liquidity',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'observations',
    outputs: [
      {
        internalType: 'uint32',
        name: 'blockTimestamp',
        type: 'uint32',
      },
      {
        internalType: 'int56',
        name: 'tickCumulative',
        type: 'int56',
      },
      {
        internalType: 'uint160',
        name: 'secondsPerLiquidityCumulativeX128',
        type: 'uint160',
      },
      {
        internalType: 'bool',
        name: 'initialized',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'key',
        type: 'bytes32',
      },
    ],
    name: 'positions',
    outputs: [
      {
        internalType: 'uint128',
        name: '_liquidity',
        type: 'uint128',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
      },
      {
        internalType: 'uint128',
        name: 'tokensOwed0',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'tokensOwed1',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'protocolFees',
    outputs: [
      {
        internalType: 'uint128',
        name: 'token0',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'token1',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'slot0',
    outputs: [
      {
        internalType: 'uint160',
        name: 'sqrtPriceX96',
        type: 'uint160',
      },
      {
        internalType: 'int24',
        name: 'tick',
        type: 'int24',
      },
      {
        internalType: 'uint16',
        name: 'observationIndex',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'observationCardinality',
        type: 'uint16',
      },
      {
        internalType: 'uint16',
        name: 'observationCardinalityNext',
        type: 'uint16',
      },
      {
        internalType: 'uint32',
        name: 'feeProtocol',
        type: 'uint32',
      },
      {
        internalType: 'bool',
        name: 'unlocked',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int16',
        name: 'wordPosition',
        type: 'int16',
      },
    ],
    name: 'tickBitmap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'int24',
        name: 'tick',
        type: 'int24',
      },
    ],
    name: 'ticks',
    outputs: [
      {
        internalType: 'uint128',
        name: 'liquidityGross',
        type: 'uint128',
      },
      {
        internalType: 'int128',
        name: 'liquidityNet',
        type: 'int128',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthOutside0X128',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'feeGrowthOutside1X128',
        type: 'uint256',
      },
      {
        internalType: 'int56',
        name: 'tickCumulativeOutside',
        type: 'int56',
      },
      {
        internalType: 'uint160',
        name: 'secondsPerLiquidityOutsideX128',
        type: 'uint160',
      },
      {
        internalType: 'uint32',
        name: 'secondsOutside',
        type: 'uint32',
      },
      {
        internalType: 'bool',
        name: 'initialized',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
export const PANCAKE_masterChefV3ABI = [
  {
    inputs: [
      { internalType: 'contract IERC20', name: '_CAKE', type: 'address' },
      {
        internalType: 'contract INonfungiblePositionManager',
        name: '_nonfungiblePositionManager',
        type: 'address',
      },
      { internalType: 'address', name: '_WETH', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'pid', type: 'uint256' }],
    name: 'DuplicatedPool',
    type: 'error',
  },
  { inputs: [], name: 'InconsistentAmount', type: 'error' },
  { inputs: [], name: 'InsufficientAmount', type: 'error' },
  { inputs: [], name: 'InvalidNFT', type: 'error' },
  { inputs: [], name: 'InvalidPeriodDuration', type: 'error' },
  { inputs: [], name: 'InvalidPid', type: 'error' },
  { inputs: [], name: 'NoBalance', type: 'error' },
  { inputs: [], name: 'NoLMPool', type: 'error' },
  { inputs: [], name: 'NoLiquidity', type: 'error' },
  { inputs: [], name: 'NotEmpty', type: 'error' },
  { inputs: [], name: 'NotOwner', type: 'error' },
  { inputs: [], name: 'NotOwnerOrOperator', type: 'error' },
  { inputs: [], name: 'NotPancakeNFT', type: 'error' },
  { inputs: [], name: 'WrongReceiver', type: 'error' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
      { indexed: true, internalType: 'contract IPancakeV3Pool', name: 'v3Pool', type: 'address' },
      { indexed: true, internalType: 'contract ILMPool', name: 'lmPool', type: 'address' },
    ],
    name: 'AddPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      { indexed: false, internalType: 'int24', name: 'tickLower', type: 'int24' },
      { indexed: false, internalType: 'int24', name: 'tickUpper', type: 'int24' },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    name: 'Harvest',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'deployer', type: 'address' }],
    name: 'NewLMPoolDeployerAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'operator', type: 'address' }],
    name: 'NewOperatorAddress',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'uint256', name: 'periodDuration', type: 'uint256' }],
    name: 'NewPeriodDuration',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'NewReceiver',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'periodNumber', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'endTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'cakePerSecond', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'cakeAmount', type: 'uint256' },
    ],
    name: 'NewUpkeepPeriod',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'bool', name: 'emergency', type: 'bool' }],
    name: 'SetEmergency',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
    ],
    name: 'SetPool',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address', name: 'farmBoostContract', type: 'address' }],
    name: 'UpdateFarmBoostContract',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'int128', name: 'liquidity', type: 'int128' },
      { indexed: false, internalType: 'int24', name: 'tickLower', type: 'int24' },
      { indexed: false, internalType: 'int24', name: 'tickUpper', type: 'int24' },
    ],
    name: 'UpdateLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'periodNumber', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'oldEndTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'newEndTime', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'remainingCake', type: 'uint256' },
    ],
    name: 'UpdateUpkeepPeriod',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'pid', type: 'uint256' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [],
    name: 'BOOST_PRECISION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'CAKE',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'FARM_BOOSTER',
    outputs: [{ internalType: 'contract IFarmBooster', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'LMPoolDeployer',
    outputs: [{ internalType: 'contract ILMPoolDeployer', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_BOOST_PRECISION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_DURATION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MIN_DURATION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PERIOD_DURATION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'PRECISION',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'WETH',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_allocPoint', type: 'uint256' },
      { internalType: 'contract IPancakeV3Pool', name: '_v3Pool', type: 'address' },
      { internalType: 'bool', name: '_withUpdate', type: 'bool' },
    ],
    name: 'add',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cakeAmountBelongToMC',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint128', name: 'amount0Max', type: 'uint128' },
          { internalType: 'uint128', name: 'amount1Max', type: 'uint128' },
        ],
        internalType: 'struct INonfungiblePositionManagerStruct.CollectParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'collect',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint128', name: 'amount0Max', type: 'uint128' },
          { internalType: 'uint128', name: 'amount1Max', type: 'uint128' },
        ],
        internalType: 'struct INonfungiblePositionManagerStruct.CollectParams',
        name: 'params',
        type: 'tuple',
      },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'collectTo',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
          { internalType: 'uint256', name: 'amount0Min', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1Min', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct INonfungiblePositionManagerStruct.DecreaseLiquidityParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'decreaseLiquidity',
    outputs: [
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'emergency',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_v3Pool', type: 'address' }],
    name: 'getLatestPeriodInfo',
    outputs: [
      { internalType: 'uint256', name: 'cakePerSecond', type: 'uint256' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_pid', type: 'uint256' }],
    name: 'getLatestPeriodInfoByPid',
    outputs: [
      { internalType: 'uint256', name: 'cakePerSecond', type: 'uint256' },
      { internalType: 'uint256', name: 'endTime', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'address', name: '_to', type: 'address' },
    ],
    name: 'harvest',
    outputs: [{ internalType: 'uint256', name: 'reward', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'amount0Desired', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1Desired', type: 'uint256' },
          { internalType: 'uint256', name: 'amount0Min', type: 'uint256' },
          { internalType: 'uint256', name: 'amount1Min', type: 'uint256' },
          { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        internalType: 'struct INonfungiblePositionManagerStruct.IncreaseLiquidityParams',
        name: 'params',
        type: 'tuple',
      },
    ],
    name: 'increaseLiquidity',
    outputs: [
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint256', name: 'amount0', type: 'uint256' },
      { internalType: 'uint256', name: 'amount1', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestPeriodCakePerSecond',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestPeriodEndTime',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestPeriodNumber',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'latestPeriodStartTime',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes[]', name: 'data', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ internalType: 'bytes[]', name: 'results', type: 'bytes[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nonfungiblePositionManager',
    outputs: [{ internalType: 'contract INonfungiblePositionManager', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operatorAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
    name: 'pendingCake',
    outputs: [{ internalType: 'uint256', name: 'reward', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'poolInfo',
    outputs: [
      { internalType: 'uint256', name: 'allocPoint', type: 'uint256' },
      { internalType: 'contract IPancakeV3Pool', name: 'v3Pool', type: 'address' },
      { internalType: 'address', name: 'token0', type: 'address' },
      { internalType: 'address', name: 'token1', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
      { internalType: 'uint256', name: 'totalLiquidity', type: 'uint256' },
      { internalType: 'uint256', name: 'totalBoostLiquidity', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLength',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'receiver',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'uint256', name: '_pid', type: 'uint256' },
      { internalType: 'uint256', name: '_allocPoint', type: 'uint256' },
      { internalType: 'bool', name: '_withUpdate', type: 'bool' },
    ],
    name: 'set',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bool', name: '_emergency', type: 'bool' }],
    name: 'setEmergency',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'contract ILMPoolDeployer', name: '_LMPoolDeployer', type: 'address' }],
    name: 'setLMPoolDeployer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_operatorAddress', type: 'address' }],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_periodDuration', type: 'uint256' }],
    name: 'setPeriodDuration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_receiver', type: 'address' }],
    name: 'setReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'uint256', name: 'amountMinimum', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'sweepToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalAllocPoint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountMinimum', type: 'uint256' },
      { internalType: 'address', name: 'recipient', type: 'address' },
    ],
    name: 'unwrapWETH9',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'uint256', name: '_newMultiplier', type: 'uint256' },
    ],
    name: 'updateBoostMultiplier',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_newFarmBoostContract', type: 'address' }],
    name: 'updateFarmBoostContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
    name: 'updateLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256[]', name: 'pids', type: 'uint256[]' }],
    name: 'updatePools',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'uint256', name: '_duration', type: 'uint256' },
      { internalType: 'bool', name: '_withUpdate', type: 'bool' },
    ],
    name: 'upkeep',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'userPositionInfos',
    outputs: [
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint128', name: 'boostLiquidity', type: 'uint128' },
      { internalType: 'int24', name: 'tickLower', type: 'int24' },
      { internalType: 'int24', name: 'tickUpper', type: 'int24' },
      { internalType: 'uint256', name: 'rewardGrowthInside', type: 'uint256' },
      { internalType: 'uint256', name: 'reward', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
      { internalType: 'uint256', name: 'pid', type: 'uint256' },
      { internalType: 'uint256', name: 'boostMultiplier', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'v3PoolAddressPid',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'address', name: '_to', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ internalType: 'uint256', name: 'reward', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]

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

// TODO: import this from npm
export const positionManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_poolManager',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
      {
        name: '_permit2',
        type: 'address',
        internalType: 'contract IAllowanceTransfer',
      },
      {
        name: '_unsubscribeGasLimit',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '_tokenDescriptor',
        type: 'address',
        internalType: 'contract IPositionDescriptor',
      },
      {
        name: '_weth9',
        type: 'address',
        internalType: 'contract IWETH9',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'receive',
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'WETH9',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IWETH9',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getApproved',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPoolAndPositionInfo',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'poolKey',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'fee',
            type: 'uint24',
            internalType: 'uint24',
          },
          {
            name: 'tickSpacing',
            type: 'int24',
            internalType: 'int24',
          },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {
        name: 'info',
        type: 'uint256',
        internalType: 'PositionInfo',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPositionLiquidity',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'liquidity',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initializePool',
    inputs: [
      {
        name: 'key',
        type: 'tuple',
        internalType: 'struct PoolKey',
        components: [
          {
            name: 'currency0',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'currency1',
            type: 'address',
            internalType: 'Currency',
          },
          {
            name: 'fee',
            type: 'uint24',
            internalType: 'uint24',
          },
          {
            name: 'tickSpacing',
            type: 'int24',
            internalType: 'int24',
          },
          {
            name: 'hooks',
            type: 'address',
            internalType: 'contract IHooks',
          },
        ],
      },
      {
        name: 'sqrtPriceX96',
        type: 'uint160',
        internalType: 'uint160',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'int24',
        internalType: 'int24',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'isApprovedForAll',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'modifyLiquidities',
    inputs: [
      {
        name: 'unlockData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'deadline',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'modifyLiquiditiesWithoutUnlock',
    inputs: [
      {
        name: 'actions',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'params',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'msgSender',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'multicall',
    inputs: [
      {
        name: 'data',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [
      {
        name: 'results',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nextTokenId',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nonces',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'word',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'bitmap',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownerOf',
    inputs: [
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'permit',
    inputs: [
      {
        name: 'spender',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'deadline',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'permit',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'permitSingle',
        type: 'tuple',
        internalType: 'struct IAllowanceTransfer.PermitSingle',
        components: [
          {
            name: 'details',
            type: 'tuple',
            internalType: 'struct IAllowanceTransfer.PermitDetails',
            components: [
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'amount',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'expiration',
                type: 'uint48',
                internalType: 'uint48',
              },
              {
                name: 'nonce',
                type: 'uint48',
                internalType: 'uint48',
              },
            ],
          },
          {
            name: 'spender',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'sigDeadline',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'err',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'permit2',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IAllowanceTransfer',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'permitBatch',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_permitBatch',
        type: 'tuple',
        internalType: 'struct IAllowanceTransfer.PermitBatch',
        components: [
          {
            name: 'details',
            type: 'tuple[]',
            internalType: 'struct IAllowanceTransfer.PermitDetails[]',
            components: [
              {
                name: 'token',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'amount',
                type: 'uint160',
                internalType: 'uint160',
              },
              {
                name: 'expiration',
                type: 'uint48',
                internalType: 'uint48',
              },
              {
                name: 'nonce',
                type: 'uint48',
                internalType: 'uint48',
              },
            ],
          },
          {
            name: 'spender',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'sigDeadline',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
      {
        name: 'signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'err',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'permitForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        internalType: 'bool',
      },
      {
        name: 'deadline',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'nonce',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'poolKeys',
    inputs: [
      {
        name: 'poolId',
        type: 'bytes25',
        internalType: 'bytes25',
      },
    ],
    outputs: [
      {
        name: 'currency0',
        type: 'address',
        internalType: 'Currency',
      },
      {
        name: 'currency1',
        type: 'address',
        internalType: 'Currency',
      },
      {
        name: 'fee',
        type: 'uint24',
        internalType: 'uint24',
      },
      {
        name: 'tickSpacing',
        type: 'int24',
        internalType: 'int24',
      },
      {
        name: 'hooks',
        type: 'address',
        internalType: 'contract IHooks',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'poolManager',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IPoolManager',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'positionInfo',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'info',
        type: 'uint256',
        internalType: 'PositionInfo',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'revokeNonce',
    inputs: [
      {
        name: 'nonce',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'safeTransferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setApprovalForAll',
    inputs: [
      {
        name: 'operator',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'subscribe',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'newSubscriber',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'subscriber',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'subscriber',
        type: 'address',
        internalType: 'contract ISubscriber',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [
      {
        name: 'interfaceId',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'symbol',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenDescriptor',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IPositionDescriptor',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenURI',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'string',
        internalType: 'string',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {
        name: 'from',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unlockCallback',
    inputs: [
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unsubscribe',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'unsubscribeGasLimit',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ApprovalForAll',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Subscription',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'subscriber',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unsubscription',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'subscriber',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadySubscribed',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'subscriber',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'BurnNotificationReverted',
    inputs: [
      {
        name: 'subscriber',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'reason',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'ContractLocked',
    inputs: [],
  },
  {
    type: 'error',
    name: 'DeadlinePassed',
    inputs: [
      {
        name: 'deadline',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
  {
    type: 'error',
    name: 'DeltaNotNegative',
    inputs: [
      {
        name: 'currency',
        type: 'address',
        internalType: 'Currency',
      },
    ],
  },
  {
    type: 'error',
    name: 'DeltaNotPositive',
    inputs: [
      {
        name: 'currency',
        type: 'address',
        internalType: 'Currency',
      },
    ],
  },
  {
    type: 'error',
    name: 'GasLimitTooLow',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InputLengthMismatch',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InsufficientBalance',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidContractSignature',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidEthSender',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSignature',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSignatureLength',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidSigner',
    inputs: [],
  },
  {
    type: 'error',
    name: 'MaximumAmountExceeded',
    inputs: [
      {
        name: 'maximumAmount',
        type: 'uint128',
        internalType: 'uint128',
      },
      {
        name: 'amountRequested',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
  },
  {
    type: 'error',
    name: 'MinimumAmountInsufficient',
    inputs: [
      {
        name: 'minimumAmount',
        type: 'uint128',
        internalType: 'uint128',
      },
      {
        name: 'amountReceived',
        type: 'uint128',
        internalType: 'uint128',
      },
    ],
  },
  {
    type: 'error',
    name: 'ModifyLiquidityNotificationReverted',
    inputs: [
      {
        name: 'subscriber',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'reason',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'NoCodeSubscriber',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoSelfPermit',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NonceAlreadyUsed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotApproved',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        internalType: 'address',
      },
    ],
  },
  {
    type: 'error',
    name: 'NotPoolManager',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NotSubscribed',
    inputs: [],
  },
  {
    type: 'error',
    name: 'PoolManagerMustBeLocked',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SignatureDeadlineExpired',
    inputs: [],
  },
  {
    type: 'error',
    name: 'SubscriptionReverted',
    inputs: [
      {
        name: 'subscriber',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'reason',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'TransferNotificationReverted',
    inputs: [
      {
        name: 'subscriber',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'reason',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UnsupportedAction',
    inputs: [
      {
        name: 'action',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
];

export const poolManagerAbi =
  [{ "inputs": [{ "internalType": "address", "name": "initialOwner", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "AlreadyUnlocked", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "currency0", "type": "address" }, { "internalType": "address", "name": "currency1", "type": "address" }], "name": "CurrenciesOutOfOrderOrEqual", "type": "error" }, { "inputs": [], "name": "CurrencyNotSettled", "type": "error" }, { "inputs": [], "name": "DelegateCallNotAllowed", "type": "error" }, { "inputs": [], "name": "InvalidCaller", "type": "error" }, { "inputs": [], "name": "ManagerLocked", "type": "error" }, { "inputs": [], "name": "MustClearExactPositiveDelta", "type": "error" }, { "inputs": [], "name": "NonzeroNativeValue", "type": "error" }, { "inputs": [], "name": "PoolNotInitialized", "type": "error" }, { "inputs": [], "name": "ProtocolFeeCurrencySynced", "type": "error" }, { "inputs": [{ "internalType": "uint24", "name": "fee", "type": "uint24" }], "name": "ProtocolFeeTooLarge", "type": "error" }, { "inputs": [], "name": "SwapAmountCannotBeZero", "type": "error" }, { "inputs": [{ "internalType": "int24", "name": "tickSpacing", "type": "int24" }], "name": "TickSpacingTooLarge", "type": "error" }, { "inputs": [{ "internalType": "int24", "name": "tickSpacing", "type": "int24" }], "name": "TickSpacingTooSmall", "type": "error" }, { "inputs": [], "name": "UnauthorizedDynamicLPFeeUpdate", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "PoolId", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }], "name": "Donate", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "PoolId", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "Currency", "name": "currency0", "type": "address" }, { "indexed": true, "internalType": "Currency", "name": "currency1", "type": "address" }, { "indexed": false, "internalType": "uint24", "name": "fee", "type": "uint24" }, { "indexed": false, "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "indexed": false, "internalType": "contract IHooks", "name": "hooks", "type": "address" }, { "indexed": false, "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" }, { "indexed": false, "internalType": "int24", "name": "tick", "type": "int24" }], "name": "Initialize", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "PoolId", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "int24", "name": "tickLower", "type": "int24" }, { "indexed": false, "internalType": "int24", "name": "tickUpper", "type": "int24" }, { "indexed": false, "internalType": "int256", "name": "liquidityDelta", "type": "int256" }, { "indexed": false, "internalType": "bytes32", "name": "salt", "type": "bytes32" }], "name": "ModifyLiquidity", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "OperatorSet", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "protocolFeeController", "type": "address" }], "name": "ProtocolFeeControllerUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "PoolId", "name": "id", "type": "bytes32" }, { "indexed": false, "internalType": "uint24", "name": "protocolFee", "type": "uint24" }], "name": "ProtocolFeeUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "PoolId", "name": "id", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "int128", "name": "amount0", "type": "int128" }, { "indexed": false, "internalType": "int128", "name": "amount1", "type": "int128" }, { "indexed": false, "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" }, { "indexed": false, "internalType": "uint128", "name": "liquidity", "type": "uint128" }, { "indexed": false, "internalType": "int24", "name": "tick", "type": "int24" }, { "indexed": false, "internalType": "uint24", "name": "fee", "type": "uint24" }], "name": "Swap", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "caller", "type": "address" }, { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "Currency", "name": "currency", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "clear", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "Currency", "name": "currency", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "collectProtocolFees", "outputs": [{ "internalType": "uint256", "name": "amountCollected", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "Currency", "name": "currency0", "type": "address" }, { "internalType": "Currency", "name": "currency1", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "internalType": "contract IHooks", "name": "hooks", "type": "address" }], "internalType": "struct PoolKey", "name": "key", "type": "tuple" }, { "internalType": "uint256", "name": "amount0", "type": "uint256" }, { "internalType": "uint256", "name": "amount1", "type": "uint256" }, { "internalType": "bytes", "name": "hookData", "type": "bytes" }], "name": "donate", "outputs": [{ "internalType": "BalanceDelta", "name": "delta", "type": "int256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "slot", "type": "bytes32" }], "name": "extsload", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "startSlot", "type": "bytes32" }, { "internalType": "uint256", "name": "nSlots", "type": "uint256" }], "name": "extsload", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "slots", "type": "bytes32[]" }], "name": "extsload", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "slots", "type": "bytes32[]" }], "name": "exttload", "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "slot", "type": "bytes32" }], "name": "exttload", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "Currency", "name": "currency0", "type": "address" }, { "internalType": "Currency", "name": "currency1", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "internalType": "contract IHooks", "name": "hooks", "type": "address" }], "internalType": "struct PoolKey", "name": "key", "type": "tuple" }, { "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" }], "name": "initialize", "outputs": [{ "internalType": "int24", "name": "tick", "type": "int24" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isOperator", "outputs": [{ "internalType": "bool", "name": "isOperator", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "Currency", "name": "currency0", "type": "address" }, { "internalType": "Currency", "name": "currency1", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "internalType": "contract IHooks", "name": "hooks", "type": "address" }], "internalType": "struct PoolKey", "name": "key", "type": "tuple" }, { "components": [{ "internalType": "int24", "name": "tickLower", "type": "int24" }, { "internalType": "int24", "name": "tickUpper", "type": "int24" }, { "internalType": "int256", "name": "liquidityDelta", "type": "int256" }, { "internalType": "bytes32", "name": "salt", "type": "bytes32" }], "internalType": "struct IPoolManager.ModifyLiquidityParams", "name": "params", "type": "tuple" }, { "internalType": "bytes", "name": "hookData", "type": "bytes" }], "name": "modifyLiquidity", "outputs": [{ "internalType": "BalanceDelta", "name": "callerDelta", "type": "int256" }, { "internalType": "BalanceDelta", "name": "feesAccrued", "type": "int256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "protocolFeeController", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "Currency", "name": "currency", "type": "address" }], "name": "protocolFeesAccrued", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setOperator", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "Currency", "name": "currency0", "type": "address" }, { "internalType": "Currency", "name": "currency1", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "internalType": "contract IHooks", "name": "hooks", "type": "address" }], "internalType": "struct PoolKey", "name": "key", "type": "tuple" }, { "internalType": "uint24", "name": "newProtocolFee", "type": "uint24" }], "name": "setProtocolFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "controller", "type": "address" }], "name": "setProtocolFeeController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "settle", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }], "name": "settleFor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "Currency", "name": "currency0", "type": "address" }, { "internalType": "Currency", "name": "currency1", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "internalType": "contract IHooks", "name": "hooks", "type": "address" }], "internalType": "struct PoolKey", "name": "key", "type": "tuple" }, { "components": [{ "internalType": "bool", "name": "zeroForOne", "type": "bool" }, { "internalType": "int256", "name": "amountSpecified", "type": "int256" }, { "internalType": "uint160", "name": "sqrtPriceLimitX96", "type": "uint160" }], "internalType": "struct IPoolManager.SwapParams", "name": "params", "type": "tuple" }, { "internalType": "bytes", "name": "hookData", "type": "bytes" }], "name": "swap", "outputs": [{ "internalType": "BalanceDelta", "name": "swapDelta", "type": "int256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "Currency", "name": "currency", "type": "address" }], "name": "sync", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "Currency", "name": "currency", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "take", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes", "name": "data", "type": "bytes" }], "name": "unlock", "outputs": [{ "internalType": "bytes", "name": "result", "type": "bytes" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "Currency", "name": "currency0", "type": "address" }, { "internalType": "Currency", "name": "currency1", "type": "address" }, { "internalType": "uint24", "name": "fee", "type": "uint24" }, { "internalType": "int24", "name": "tickSpacing", "type": "int24" }, { "internalType": "contract IHooks", "name": "hooks", "type": "address" }], "internalType": "struct PoolKey", "name": "key", "type": "tuple" }, { "internalType": "uint24", "name": "newDynamicLPFee", "type": "uint24" }], "name": "updateDynamicLPFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]