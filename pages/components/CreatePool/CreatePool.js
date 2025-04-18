import React, { useEffect, useState } from 'react';
import styles from './CreatePool.module.css';
import { Button, Form, Spin, Select, Modal, InputNumber, AutoComplete, Input, Divider } from 'antd';
import copy from 'copy-to-clipboard';
const fetch = require("node-fetch");
const axios = require('axios');
import BN from 'bn.js'
import Decimal from 'decimal.js'
import { useConnectWallet } from '@web3-onboard/react';
import Web3 from 'web3';
import { ChainId, CurrencyAmount, Percent, SWAP_ROUTER_02_ADDRESSES, Token, TradeType } from '@uniswap/sdk-core'
import { computePoolAddress, FeeAmount, nearestUsableTick, NonfungiblePositionManager, Pool, Position, Route, SwapQuoter, SwapRouter, TickMath, Trade } from '@uniswap/v3-sdk'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'
import JSBI from 'jsbi'
const { abi: nfpmAbi } = require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json");
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json'
const qs = require('qs');
import { concat, numberToHex, size } from 'viem';

import { ethers } from 'ethers';
import { ERC20_ABI, MAX_FEE_PER_GAS, MAX_PRIORITY_FEE_PER_GAS, NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, permit2Abi, POOL_FACTORY_CONTRACT_ADDRESS, QUOTER_CONTRACT_ADDRESS, SWAP_ROUTER_ADDRESS } from '../../../constant';
// const URL = "http://localhost";
const CreatePool = () => {
    const [selectedBase, setSelectedBase] = useState([]);
    const [currentDoing, setCurrentDoing] = useState(0);
    const [tokenList, setTokenList] = useState([]);
    const [tokenData, setTokenData] = useState({});
    const [priceList, setPriceList] = useState([]);
    const [quotoTokenData, setQuotoTokenData] = useState({});
    const [working, setWorking] = useState(false);
    const [message, setMessage] = useState('');
    const [tokenWorking, setTokenWorking] = useState(false);
    const [poolId, setPoolId] = useState("");
    const [templateList, setTemplateList] = useState([]);
    const [currentTempId, setCurrentTempId] = useState(-1);
    const [selectedTemplateList, setSelectedTemplateList] = useState([]);
    const [
        {
            wallet, // the wallet that has been connected or null if not yet connected
            connecting // boolean indicating if connection is in progress
        },
    ] = useConnectWallet()

    const getTemplateList = () => {
        axios.get(
            "/api/template_all"
        ).then((response) => {
            setTemplateList(response.data);
        })
    }
    useEffect(() => {
        getTemplateList();
    }, []);
    useEffect(() => {
        refreshTokenList();
    }, [wallet]);
    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }
    const doNext = async () => {
        console.log("selected index", currentDoing, selectedBase.length);
        if (currentDoing < selectedBase.length - 1) {
            currentDoing++;
            setCurrentDoing(currentDoing);
            let e = selectedBase[currentDoing];
            console.log("selected id", e);
            currentTempId = e;
            setCurrentTempId(e);
            await handleChangeTemplate(e);
            setTimeout(onSubmit, 1000);
        } else {
            alert("操作结束");
        }
    }
    // 初始价格（必须以 sqrtPriceX96 格式传入）
    function encodeSqrtPriceX96(amount1, amount0) {
        const ratio = amount1 / amount0;
        const sqrt = Math.sqrt(ratio);
        const sqrtPriceX96 = Math.floor(sqrt * Math.pow(2, 96));
        console.log("sqrtPriceX96", new Decimal(sqrtPriceX96).toHex());
        return new Decimal(sqrtPriceX96).toHex();
    }
    async function getPoolInfo() {
        const poolFee = FeeAmount.LOWEST;
        const web3 = new Web3(wallet.provider);
        const currentPoolAddress = computePoolAddress({
            factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
            tokenA: new Token(Number(wallet.chains[0].id), tokenData.mint, Number(tokenData.decimals)),
            tokenB: new Token(Number(wallet.chains[0].id), quotoTokenData.mint, Number(quotoTokenData.decimals)),
            fee: poolFee,
            chainId: ChainId.BNB
        })
        console.log("currentPoolAddress", currentPoolAddress);
        const poolContract = new web3.eth.Contract(IUniswapV3PoolABI.abi, currentPoolAddress);

        const [fee, liquidity, slot0] =
            await Promise.all([
                poolContract.methods.fee().call(),
                poolContract.methods.liquidity().call(),
                poolContract.methods.slot0().call(),
            ])
        console.log("slot0", slot0);
        return {
            fee,
            liquidity,
            sqrtPriceX96: slot0[0],
            tick: slot0[1],
        }
    }

    const onSubmit = async (e) => {
        console.log("tokenData", tokenData);
        if (tokenData?.mint && quotoTokenData?.mint) {
            if (priceList[currentTempId] <= 0) {
                setMessage(tokenData.mint + "：同名代币价格获取失败");
                doNext();
                return;
            }
            // 
            setWorking(true);
            try {
                setMessage("开池子中");
                let address = wallet.accounts[0].address;
                const web3 = new Web3(wallet.provider);
                const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
                const usdtValue = 50;
                // 授权合约可以转移代币
                const token0Contract = new web3.eth.Contract(ERC20_ABI, tokenData.mint);
                const token1Contract = new web3.eth.Contract(ERC20_ABI, quotoTokenData.mint);
                const allowNum0 = await token0Contract.methods.allowance(address, NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS).call();
                if (allowNum0 < 10 ** 30)
                    await token0Contract.methods.approve(NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, MAX_UINT256).send({ from: address });
                const allowNum1 = await token1Contract.methods.allowance(address, NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS).call();
                if (allowNum1 < 10 ** 30)
                    await token1Contract.methods.approve(NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, MAX_UINT256).send({ from: address });

                const token0 = new Token(Number(wallet.chains[0].id), tokenData.mint, Number(tokenData.decimals));
                const token1 = new Token(Number(wallet.chains[0].id), quotoTokenData.mint, Number(quotoTokenData.decimals));
                const poolFee = FeeAmount.LOWEST;
                const currentPoolAddress = computePoolAddress({
                    factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
                    tokenA: token0,
                    tokenB: token1,
                    fee: poolFee,
                    chainId: ChainId.BNB
                })
                console.log("currentPoolAddress", currentPoolAddress);
                const poolContract = new web3.eth.Contract(IUniswapV3PoolABI.abi, currentPoolAddress);
                const code = await web3.eth.getCode(currentPoolAddress);
                if (code && code !== '0x') {

                } else {
                    // 创建pool
                    const nfpm = new web3.eth.Contract(nfpmAbi, NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS);
                    const sqrtPriceX96 = encodeSqrtPriceX96(priceList[currentTempId] * (10 ** quotoTokenData.decimals), 10 ** tokenData.decimals);

                    const tx = nfpm.methods.createAndInitializePoolIfNecessary(tokenData.mint, quotoTokenData.mint, 100, web3.utils.hexToNumber(sqrtPriceX96));
                    const gas = await tx.estimateGas({ from: address });
                    const gasPrice = await web3.eth.getGasPrice();
                    await tx.send({
                        from: address,
                        to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
                        gas,
                        gasPrice,
                    });
                }

                const [liquidity, slot0] =
                    await Promise.all([
                        poolContract.methods.liquidity().call(),
                        poolContract.methods.slot0().call(),
                    ])

                console.log(TickMath.MIN_TICK, TickMath.MAX_TICK, slot0);
                const configuredPool = new Pool(
                    token0,
                    token1,
                    poolFee,
                    slot0.sqrtPriceX96.toString(),
                    liquidity.toString(),
                    Number(slot0.tick)
                )
                console.log("configuredPool ", configuredPool);
                const gasPrice = await web3.eth.getGasPrice();

                // get calldata for minting a position
                {
                    // 设置流动性数量
                    const amount0 = tokenData.amount;
                    const amount1 = usdtValue * (10 ** quotoTokenData.decimals);

                    const position = Position.fromAmounts({
                        pool: configuredPool,
                        tickLower:
                            nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) -
                            configuredPool.tickSpacing * 2,
                        tickUpper:
                            nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) +
                            configuredPool.tickSpacing * 2,
                        amount0: amount0,
                        amount1: amount1,
                        useFullPrecision: true,
                    })
                    const mintOptions = {
                        recipient: address,
                        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
                        slippageTolerance: new Percent(50, 10_000),
                    }

                    const { calldata, value } = NonfungiblePositionManager.addCallParameters(
                        position,
                        mintOptions
                    )
                    console.log("position", position);
                    console.log("getting amount", position.amount0.toExact(), position.amount1.toExact());
                    console.log("getting amount1", position.mintAmounts.amount0.toString(), position.mintAmounts.amount1.toString());
                    const transaction = {
                        data: calldata,
                        to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
                        value: value,
                        from: address,
                        gas: 10000000,
                        gasPrice,
                    }
                    const txRes = await web3.eth.sendTransaction(transaction);
                    console.log("添加仓位", txRes);
                }

                // const provider = new ethers.providers.Web3Provider(web3.currentProvider);
                // swap
                const poolInfo = await getPoolInfo()
                const pool = new Pool(
                    token0,
                    token1,
                    poolFee,
                    poolInfo.sqrtPriceX96.toString(),
                    poolInfo.liquidity.toString(),
                    Number(poolInfo.tick)
                )

                // const swapRoute = new Route(
                //     [pool],
                //     token0,
                //     token1
                // )
                // const outUSDT = "8";
                // const inputAmount = (8 / priceList[currentTempId]).toFixed(2);

                // const { calldata } = await SwapQuoter.quoteCallParameters(
                //     swapRoute,
                //     CurrencyAmount.fromRawAmount(
                //         token0,
                //         ethers.utils.parseUnits(inputAmount, tokenData.decimals)
                //         // ethers.utils.parseUnits(outUSDT, quotoTokenData.decimals)
                //     ),
                //     TradeType.EXACT_INPUT,
                //     {
                //         useQuoterV2: true,
                //     }
                // );
                // const quoteCallReturnData = await provider.call({
                //     to: QUOTER_CONTRACT_ADDRESS,
                //     data: calldata,
                // })
                // const amountOut = ethers.utils.defaultAbiCoder.decode(['uint256'], quoteCallReturnData)
                // console.log("amountOut", amountOut.toString());

                // const uncheckedTrade = Trade.createUncheckedTrade({
                //     route: swapRoute,
                //     inputAmount: CurrencyAmount.fromRawAmount(
                //         token0,
                //         ethers.utils.parseUnits(inputAmount, tokenData.decimals)
                //     ),
                //     outputAmount: CurrencyAmount.fromRawAmount(
                //         token1,
                //         // ethers.utils.parseUnits(outUSDT, quotoTokenData.decimals)
                //         JSBI.BigInt(amountOut)
                //     ),
                //     tradeType: TradeType.EXACT_INPUT,
                // })
                // console.log("uncheckedTrade", uncheckedTrade);
                // console.log(uncheckedTrade.inputAmount.toExact(), uncheckedTrade.outputAmount.toExact());
                // const options = {
                //     slippageTolerance: new Percent(50, 10_000), // 50 bips, or 0.50%
                //     deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes from the current Unix time
                //     recipient: address,
                // }
                // const methodParameters = SwapRouter.swapCallParameters([uncheckedTrade], options)

                // // approve to swap route
                // const allowNum3 = await token0Contract.methods.allowance(address, SWAP_ROUTER_ADDRESS).call();
                // if (allowNum3 < 10 ** 30)
                //     await token0Contract.methods.approve(SWAP_ROUTER_ADDRESS, MAX_UINT256).send({ from: address });
                // const allowNum4 = await token1Contract.methods.allowance(address, SWAP_ROUTER_ADDRESS).call();
                // if (allowNum4 < 10 ** 30)
                //     await token1Contract.methods.approve(SWAP_ROUTER_ADDRESS, MAX_UINT256).send({ from: address });
                // console.log("SWAP_ROUTER_02_ADDRESSES(ChainId.BNB),", SWAP_ROUTER_02_ADDRESSES(ChainId.BNB));
                // const transaction = {
                //     data: methodParameters.calldata,
                //     to: SWAP_ROUTER_ADDRESS,
                //     value: methodParameters.value,
                //     from: address,
                //     gas: 10000000,
                //     gasPrice,
                // }

                // const txRes = await web3.eth.sendTransaction(transaction);
                const price = priceList[currentTempId];
                // 0x.org swap api
                while (true) {
                    
                    await swapOutAllUSDT(web3, token0Contract, token1Contract, currentPoolAddress, address, price);
                    let currentTokenBalance = await token0Contract.methods.balanceOf(currentPoolAddress).call();
                    currentTokenBalance = Number(currentTokenBalance) / 10 ** tokenData.decimals;
                    let currentAddressTokenBalance = await token0Contract.methods.balanceOf(address).call();
                    currentAddressTokenBalance = Number(currentAddressTokenBalance) / 10 ** tokenData.decimals;
                    console.log("currentAddressTokenBalance", currentAddressTokenBalance, Math.floor(1000000 / price));
                    if (currentAddressTokenBalance <= Math.floor(1000000 / price)) break;
                    let currentUsdtBalance = await token1Contract.methods.balanceOf(currentPoolAddress).call();
                    currentUsdtBalance = Number(currentUsdtBalance) / 10 ** quotoTokenData.decimals;
                    console.log("currentTokenBalance, currentUsdtBalance", currentTokenBalance, currentUsdtBalance);
                    // 添加流动池
                    let addAmount = Math.floor(usdtValue * currentTokenBalance / currentUsdtBalance)
                    if (addAmount >= currentAddressTokenBalance) {
                        addAmount = currentAddressTokenBalance - Math.floor(1000000 / price);
                    }
                    const amount0Increased = fromReadableAmount(
                        addAmount,
                        token0.decimals
                    )
                    const positionToIncreaseBy = Position.fromAmount0({
                        pool,
                        tickLower:
                            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) -
                            pool.tickSpacing * 2,
                        tickUpper:
                            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) +
                            pool.tickSpacing * 2,
                        amount0: amount0Increased,
                        useFullPrecision: true,
                    })
                    console.log("positionToIncreaseBy", positionToIncreaseBy, positionToIncreaseBy.amount0.toExact(), positionToIncreaseBy.amount1.toExact(), positionToIncreaseBy.mintAmounts.amount0.toString()
                        , positionToIncreaseBy.mintAmounts.amount1.toString());
                    const nfpm = new web3.eth.Contract(nfpmAbi, NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS);
                    // Get number of positions
                    const balance = await nfpm.methods.balanceOf(address).call();
                    // Get all positions
                    const tokenIds = []
                    for (let i = 0; i < balance; i++) {
                        const tokenOfOwnerByIndex =
                            await nfpm.methods.tokenOfOwnerByIndex(address, i).call();
                        tokenIds.push(tokenOfOwnerByIndex)
                    }
                    console.log("tokenIds", tokenIds);
                    const addLiquidityOptions = {
                        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
                        slippageTolerance: new Percent(50, 10_000),
                        tokenId: Number(tokenIds[tokenIds.length - 1]),
                    }
                    const { calldata, value } = NonfungiblePositionManager.addCallParameters(
                        positionToIncreaseBy,
                        addLiquidityOptions
                    )
                    const transaction = {
                        data: calldata,
                        to: NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
                        value: value,
                        from: address,
                        gas: 10000000,
                        gasPrice,
                    }
                    const txRes2 = await web3.eth.sendTransaction(transaction);
                    console.log("交易成功，交易哈希：", txRes2);
                }
                await swapOutAllUSDT(web3, token0Contract, token1Contract, currentPoolAddress, address, price);
                setMessage("开仓位成功");
                setWorking(false);
                doNext();
            } catch (err) {
                console.error("交易失败：", err);
                setMessage(tokenData.mint + "交易失败：");
                setWorking(false);
                doNext();
            }
        }
        else {
            setMessage(tokenData.mint + "：请选择代币");
            doNext();
        }
    };
    async function swapOutAllUSDT(web3, token0Contract, token1Contract, currentPoolAddress, address, price) {
        let currentUsdtBalance = await token1Contract.methods.balanceOf(currentPoolAddress).call();
        currentUsdtBalance = Number(currentUsdtBalance) / 10 ** quotoTokenData.decimals;
        console.log("currentUsdtBalance", currentUsdtBalance);
        let currentAddressTokenBalance = await token0Contract.methods.balanceOf(address).call();
        currentAddressTokenBalance = Number(currentAddressTokenBalance) / 10 ** tokenData.decimals;
        console.log("currentAddressTokenBalance", currentAddressTokenBalance);
        let sellAmount = (currentUsdtBalance - 1) / priceList[currentTempId];
        console.log("sellAmount", sellAmount);
        if (currentAddressTokenBalance <= Math.floor(1000000 / price)) return;
        if (currentAddressTokenBalance < sellAmount) {
            sellAmount = currentAddressTokenBalance - Math.floor(1000000 / price);
        }
        const priceParams = new URLSearchParams({
            chainId: '56', // / Ethereum mainnet. See the 0x Cheat Sheet for all supported endpoints: https://0x.org/docs/introduction/0x-cheat-sheet
            sellToken: tokenData.mint, //ETH
            buyToken: quotoTokenData.mint, //DAI
            sellAmount: Math.floor(sellAmount * (10 ** tokenData.decimals)), // Note that the WETH token uses 18 decimal places, so `sellAmount` is `100 * 10^18`.
            taker: address, //Address that will make the trade
        });
        const priceResponse = await fetch('/api/get_swap_tx?' + priceParams.toString());
        let res = await priceResponse.json()
        // 要进行授权
        if (res.price.issues.allowance != null) {
            // const Permit2 = new web3.eth.Contract(permit2Abi, res.issues.allowance.spender);
            const allowNum3 = await token0Contract.methods.allowance(address, res.price.issues.allowance.spender).call();
            if (allowNum3 < 10 ** 30)
                await token0Contract.methods.approve(res.price.issues.allowance.spender, MAX_UINT256).send({ from: address });
        }
        // let signature = await signTypedData(quote.permit2.eip712);
        if (res.quote.permit2?.eip712) {
            console.log("sss", address, res.quote.permit2.eip712);
            const signature = await wallet.provider.request({
                method: 'eth_signTypedData_v4',
                params: [address, JSON.stringify(res.quote.permit2.eip712)],
            });

            // let signature = await web3.eth.signTypedData(address, res.quote.permit2.eip712)
            console.log("sss", signature);
            const signatureLengthInHex = numberToHex(size(signature), {
                signed: false,
                size: 32,
            });
            res.quote.transaction.data = concat([res.quote.transaction.data, signatureLengthInHex, signature]);
        }
        const txRes1 = await web3.eth.sendTransaction({
            from: address,
            gas: res.quote.transaction.gas,
            gasPrice: res.quote.transaction.gasPrice,
            to: res.quote.transaction.to,
            data: res.quote.transaction.data,
        });
        console.log("交易成功，交易哈希：", txRes1);
    }
    function fromReadableAmount(
        amount,
        decimals
    ) {
        return ethers.utils.parseUnits(amount.toString(), decimals)
    }
    const handleChangeTemplate = async (e) => {
        console.log("handleChangeTemplate", e);
        try {
            const token = { ...tokenList[e] };
            tokenData = token;
            setTokenData(token);
        } catch (e) {
            console.log(e);
            setTokenData({});
        }
    }
    const handleChangeTemplate1 = async (e) => {
        try {
            const token = { ...tokenList[e] };
            setQuotoTokenData(token);
        } catch (e) {
            console.log(e);
            setQuotoTokenData({});
        }
    }

    useEffect(() => {
        for (let i = 0; i < tokenList.length; i++) {
            if (tokenList[i].mint.toLowerCase() == "0x55d398326f99059fF775485246999027B3197955".toLowerCase()) {
                handleChangeTemplate1(i);
                return;
            }
        }
    }, [tokenList]);

    const refreshTokenList = async () => {
        setTokenWorking(true);
        if (wallet == null) return;
        const tempList = [];
        let cnt = 0;
        await axios.get('/ethscanapi?chainid=56&module=account&action=addresstokenbalance&address=' + wallet.accounts[0].address + '&page=1&offset=100&apikey=PBW3EJKK38ERG55VYRX43777BRHAJYHC81',
            {}).then((response) => {
                console.log(response.data);
                response.data.result.forEach((accountInfo) => {
                    tempList.push({
                        mint: accountInfo.TokenAddress,
                        amount: accountInfo.TokenQuantity,
                        id: cnt++,
                        name: accountInfo.TokenName,
                        symbol: accountInfo.TokenSymbol,
                        decimals: accountInfo.TokenDivisor,
                    });
                });
            }).catch((e) => {
                console.log(e);
            });

        // tempList.sort((a, b) => {
        //     return a.mint > b.mint;
        // })
        const tempPriceList = [];
        // for (let i = 0; i < 2; i++) {
        for (let i = 0; i < tempList.length; i++) {
            try {
                // tempList[i].supp = asset.mint.supply.toString();
                tempList[i].price0 = 0;
                let token_id = 0;
                for (let kk = 0; kk < templateList.length; kk++) {
                    if (templateList[kk].token_id != undefined && templateList[kk].symbol == tempList[i].symbol) {
                        token_id = templateList[kk].token_id;
                    }
                }
                console.log("token_id", token_id);
                if (token_id > 0 && tempList[i].symbol == "ZEN") {
                    await axios.get('/v2/cryptocurrency/quotes/latest?id=' + token_id, {
                        headers: {
                            'X-CMC_PRO_API_KEY': '1a40082b-7b15-4c78-8b14-a972d3c47df9',
                        },
                    }).then((response) => {
                        console.log(response.data);
                        tempList[i].price0 = response.data.data[token_id].quote?.USD?.price;
                    }).catch((e) => {

                    });
                    await sleep(3000);
                }
                tempPriceList.push(Number(tempList[i].price0));
            } catch (e) {
                console.log("eee", e);
                tempList[i].price0 = 0;
                tempList[i].name = "失败";
                tempPriceList.push(tempList[i].price0);
            }
        }

        setTokenList(tempList);
        setPriceList(tempPriceList);
        console.log("tempList", tempList);
        console.log("priceList", tempPriceList);
        setTokenWorking(false);

    }
    return (
        <div className={styles.mainpage}>
            <div style={{ fontWeight: "bold", fontSize: "20px", width: "100%", textAlign: "center" }}>开池子</div>
            <Divider />
            {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
            <div style={{ width: "100%" }}>
                <div>基础币</div>
                {tokenWorking && <Spin></Spin>}
                {!tokenWorking && tokenList && tokenList.length > 0 && <div style={{ width: "100%", textAlign: "center" }} >
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "10%" }}>币种</div>
                        <div style={{ width: "10%" }}>余额</div>
                        <div style={{ width: "30%" }}>合约</div>
                        <div style={{ width: "10%" }}>价格</div>
                        <div style={{ width: "20%" }}>预留数量预估</div>
                        <div style={{ width: "20%" }}>修改价格</div>
                    </div>
                    {tokenList.map((item, indexCrn) => {
                        return (
                            <div style={{ display: "flex", alignItems: "center" }} key={"template" + indexCrn}>
                                <div style={{ width: "10%", display: "flex", alignItems: "center" }}>
                                    <div className={(selectedTemplateList.indexOf(indexCrn) >= 0) ? styles.template_item_active : styles.template_item}
                                        value={indexCrn} onClick={async () => {
                                            let temp = []; let flag = false;
                                            for (let i = 0; i < selectedTemplateList.length; i++)
                                                if (selectedTemplateList[i] != indexCrn)
                                                    temp.push(selectedTemplateList[i]);
                                                else
                                                    flag = true;
                                            !flag && temp.push(indexCrn);
                                            selectedTemplateList = temp;
                                            setSelectedTemplateList(temp);
                                            setCurrentTempId(indexCrn);
                                            await handleChangeTemplate(indexCrn);
                                        }}>
                                        <img key={'img' + item?.id} style={{ width: "24px", marginRight: "5px" }} src={item.img} />
                                        {item.symbol}
                                    </div>
                                </div>
                                <div style={{ width: "10%" }}>{(item.amount / (10 ** item.decimals)).toFixed(2)}</div>
                                <div style={{ width: "30%" }}>{item.mint}</div>
                                <div style={{ width: "10%" }}>{item.price0}</div>
                                <div style={{ width: "20%" }}>{priceList[indexCrn] == 0 ? "未知" : (1000000 / priceList[indexCrn]).toFixed(2)}</div>
                                <div style={{ width: "20%" }}><Input style={{ width: "200px" }} value={priceList[indexCrn]} onChange={(e) => {
                                    let temp = [];
                                    for (let i = 0; i < priceList.length; i++)
                                        temp.push(priceList[i]);
                                    temp[indexCrn] = Number(e.target.value);
                                    priceList[indexCrn] = Number(e.target.value);
                                    setPriceList(temp);
                                }} /></div>
                            </div>
                        )
                    })} </div>}


            </div>
            {/* {currentTempId != -1 && <>
                <div>合约地址：{tokenData.mint}</div>
                <div>代币名称：{tokenData.name}</div>
                <div>代币符号：{tokenData.symbol}</div>
                <div>供应量：{tokenData.supp}</div>
                <div>头像：<img style={{ width: 50 }} src={tokenData.img} /></div>
                <div>持币数量：{tokenData.amount / (10 ** tokenData.decimals)}</div>
                <div>价格：<Input style={{ width: "200px" }} value={priceList[currentTempId]} onChange={(e) => {
                    let temp = [];
                    for (let i = 0; i < priceList.length; i++)
                        temp.push(priceList[i]);
                    temp[currentTempId] = e.target.value;
                    setPriceList(temp);
                }} /></div></>} */}

            {/* <div>市场价格：{tokenData.price}</div> */}

            <div style={{ width: "100%", display: "flex", alignItems: "flex-start", marginBlock: "20px" }}>
                <div>报价币</div>
                {/* {tokenWorking && <Spin></Spin>}
                {!tokenWorking && <Select
                    style={{ width: "80%", marginLeft: "10px" }}
                    onChange={handleChangeTemplate1}
                >
                    {tokenList && tokenList.length > 0 && tokenList.map((item, indexCrn) => {
                        if (item?.mint == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" || item?.mint == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
                            return (
                                <Select.Option key={indexCrn} value={indexCrn}>{item?.name}-{item?.symbol}-{item?.mint}</Select.Option>
                            )
                    })}
                </Select>
                } */}
            </div>
            <div>合约地址：{quotoTokenData.mint}</div>
            <div>代币名称：{quotoTokenData.name}</div>
            <div>代币符号：{quotoTokenData.symbol}</div>
            <div>持币数量：{quotoTokenData.amount / (10 ** quotoTokenData.decimals)}</div>
            <div>市场价格：{quotoTokenData.price0}</div>
            <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={async () => {
                if (selectedTemplateList.length == 0) {
                    alert("请先选择基础币");
                    return;
                }

                if (wallet == null) {
                    alert("请连接钱包");
                    return;
                }
                let temp = [];
                for (let i = 0; i < selectedTemplateList.length; i++) {
                    if (priceList[selectedTemplateList[i]] == 0) {
                        setCurrentTempId(selectedTemplateList[i]);
                        await handleChangeTemplate(selectedTemplateList[i]);
                        alert("价格必须要设置");
                        return;
                    }
                    temp.push(selectedTemplateList[i]);
                }
                console.log("selected list", temp);
                selectedBase = temp;
                setSelectedBase(temp);
                currentDoing = -1;
                setCurrentDoing(currentDoing);
                doNext();
            }} >开池子</Button>

            <Button style={{ marginLeft: "10px", marginTop: "20px" }} type="primary" onClick={() => {
                let str = "";
                for (let i = 0; i < tokenList.length; i++) {
                    str += tokenList[i].symbol + "\n" + tokenList[i].mint + "\n" + "\n";
                }
                copy(str);
                alert("复制成功");
            }} >一键复制</Button>
            {working && <Spin />}
            <div>日志：{message}</div>
            {/* <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={openPosition} >单个存币</Button> */}
            {/* <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={addLiquidity} >加流动池</Button> */}


        </div >
    );
};
export default CreatePool;
// 