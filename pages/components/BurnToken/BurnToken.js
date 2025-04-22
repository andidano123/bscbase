import React, { useEffect, useState } from 'react';
import styles from './BurnToken.module.css';
import { Button, Form, Spin, Select, Modal, InputNumber, AutoComplete, Input, Divider } from 'antd';
import copy from 'copy-to-clipboard';
const fetch = require("node-fetch");
const axios = require('axios');
import BN from 'bn.js'
import Decimal from 'decimal.js'
import { useConnectWallet } from '@web3-onboard/react';
import Web3 from 'web3';
const qs = require('qs');
import { concat, numberToHex, size, zeroAddress } from 'viem';
import { ethers } from 'ethers';
import { ERC20_ABI, PANCAKE_masterChefV3ABI, PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, PANCAKE_tv3PoolStateABI } from '../../../constant';
import { computePoolAddress, DEPLOYER_ADDRESSES, encodeSqrtRatioX96, FeeAmount, nearestUsableTick, NonfungiblePositionManager, Pool, Position, priceToClosestTick, TickMath } from '@pancakeswap/v3-sdk';
import { CurrencyAmount, Percent, Price, Token } from '@pancakeswap/swap-sdk-core';

// const URL = "http://localhost";
const BurnToken = () => {
    const [selectedBase, setSelectedBase] = useState([]);
    const [currentDoing, setCurrentDoing] = useState(0);
    const [tokenList, setTokenList] = useState([]);
    const [tokenData, setTokenData] = useState({});
    const [priceList, setPriceList] = useState([]);
    const [quotoTokenData, setQuotoTokenData] = useState({});
    const [working, setWorking] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [tokenWorking, setTokenWorking] = useState(false);
    const [templateList, setTemplateList] = useState([]);
    const [currentTempId, setCurrentTempId] = useState(-1);
    const [selectedTemplateList, setSelectedTemplateList] = useState([]);
    const [
        {
            wallet, // the wallet that has been connected or null if not yet connected
            connecting // boolean indicating if connection is in progress
        },
    ] = useConnectWallet()
    const MAX_UINT256 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const usdtValue = 50;
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
        if (templateList.length > 0) refreshTokenList();
    }, [wallet, templateList]);
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
                status = "开始";
                setStatus(status);
                let address = wallet.accounts[0].address;
                const web3 = new Web3(wallet.provider);


                // 授权合约可以转移代币
                const token0Contract = new web3.eth.Contract(ERC20_ABI, tokenData.mint);
                const token1Contract = new web3.eth.Contract(ERC20_ABI, quotoTokenData.mint);
                const allowNum0 = await token0Contract.methods.allowance(address, PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS).call();
                if (allowNum0 < 10 ** 30)
                    await token0Contract.methods.approve(PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, MAX_UINT256).send({ from: address });
                const allowNum1 = await token1Contract.methods.allowance(address, PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS).call();
                if (allowNum1 < 10 ** 30)
                    await token1Contract.methods.approve(PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS, MAX_UINT256).send({ from: address });

                const tokenA = new Token(Number(wallet.chains[0].id), tokenData.mint, Number(tokenData.decimals));
                const tokenB = new Token(Number(wallet.chains[0].id), quotoTokenData.mint, Number(quotoTokenData.decimals));
                let inverted = !tokenA.sortsBefore(tokenB);
                const poolFee = FeeAmount.LOW;
                const gasPrice = await web3.eth.getGasPrice();
                const token0 = inverted ? new Token(Number(wallet.chains[0].id), quotoTokenData.mint, Number(quotoTokenData.decimals)) : new Token(Number(wallet.chains[0].id), tokenData.mint, Number(tokenData.decimals));
                const token1 = !inverted ? new Token(Number(wallet.chains[0].id), quotoTokenData.mint, Number(quotoTokenData.decimals)) : new Token(Number(wallet.chains[0].id), tokenData.mint, Number(tokenData.decimals));
                const price = priceList[currentTempId];
                const baseAmount = inverted ? CurrencyAmount.fromRawAmount(token1, 10 ** token1.decimals) : CurrencyAmount.fromRawAmount(token0, 10 ** token0.decimals);
                const parsedQuoteAmount = inverted ? CurrencyAmount.fromRawAmount(token0, Math.floor(price * 10 ** token0.decimals)) : CurrencyAmount.fromRawAmount(token1, Math.floor(price * 10 ** token1.decimals));
                const currentTick = priceToClosestTick(new Price(baseAmount.currency, parsedQuoteAmount.currency, baseAmount.quotient, parsedQuoteAmount.quotient))
                const currentSqrt = TickMath.getSqrtRatioAtTick(currentTick)
                const configuredPool = new Pool(token0, token1, poolFee, currentSqrt, 0n, currentTick, [])


                const chainId = 56;
                const v3CoreDeployerAddress = chainId && DEPLOYER_ADDRESSES[chainId]
                const currentPoolAddress = computePoolAddress({
                    deployerAddress: v3CoreDeployerAddress,
                    tokenA: token0,
                    tokenB: token1,
                    fee: poolFee,
                    // chainId: ChainId.BNB
                })
                const code = await web3.eth.getCode(currentPoolAddress);

                // 创建池子
                if (code && code !== '0x') {
                } else {
                    status = status + "\n开池子并且首次添加流动性";
                    setStatus(status);
                    // const amount0 = tokenData.amount;
                    // const amount1 = usdtValue * (10 ** quotoTokenData.decimals);
                    const amount0 = usdtValue * (10 ** quotoTokenData.decimals);
                    const position = inverted ? Position.fromAmount0({
                        pool: configuredPool,
                        tickLower:
                            nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) -
                            configuredPool.tickSpacing * 2,
                        tickUpper:
                            nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) +
                            configuredPool.tickSpacing * 2,
                        amount0: amount0,
                        // amount1: amount1,
                        useFullPrecision: true,
                    }) : Position.fromAmount1({
                        pool: configuredPool,
                        tickLower:
                            nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) -
                            configuredPool.tickSpacing * 2,
                        tickUpper:
                            nearestUsableTick(configuredPool.tickCurrent, configuredPool.tickSpacing) +
                            configuredPool.tickSpacing * 2,
                        amount1: amount0,
                        // amount1: amount1,
                        // useFullPrecision: true,
                    })
                    console.log("position", position);
                    const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
                        slippageTolerance: new Percent(50, 10_000),
                        recipient: address,
                        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
                        useNative: false,
                        BurnToken: true,
                    })
                    const transaction = {
                        data: calldata,
                        to: PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
                        value: value,
                        from: address,
                        gas: 10000000,
                        gasPrice,
                    }
                    const txRes = await web3.eth.sendTransaction(transaction);
                    console.log("添加仓位", txRes);                    
                }

                const poolInfo = await getPoolInfo(token0, token1, poolFee, currentPoolAddress)
                console.log("poolInfo", poolInfo);
                const pool = new Pool(
                    token0,
                    token1,
                    poolFee,
                    poolInfo.sqrtPriceX96.toString(),
                    poolInfo.liquidity.toString(),
                    Number(poolInfo.tick)
                )

                // 0x.org swap api
                while (true) {
                    await swapOutAllUSDT(web3, token0Contract, token1Contract, currentPoolAddress, address, price, false);
                    let currentUsdtBalance = 10000000000;
                    while (currentUsdtBalance > usdtValue * 0.1) {
                        currentUsdtBalance = await token1Contract.methods.balanceOf(currentPoolAddress).call();
                        currentUsdtBalance = Number(currentUsdtBalance) / 10 ** quotoTokenData.decimals;
                        await sleep(1 * 1000)
                        status = status + "*";
                        setStatus(status);
                    }
                    let fastBreak = false
                    let currentTokenBalance = await token0Contract.methods.balanceOf(currentPoolAddress).call();
                    currentTokenBalance = Number(currentTokenBalance) / 10 ** tokenData.decimals;
                    let currentAddressTokenBalance = await token0Contract.methods.balanceOf(address).call();
                    currentAddressTokenBalance = Number(currentAddressTokenBalance) / 10 ** tokenData.decimals;
                    console.log("currentAddressTokenBalance", currentAddressTokenBalance, Math.floor(1000000 / price));
                    if (currentAddressTokenBalance <= Math.floor(1000000 / price)) break;
                    console.log("currentTokenBalance, currentUsdtBalance", currentTokenBalance, currentUsdtBalance);
                    // 添加流动池                    
                    let addAmount = Math.floor(usdtValue * currentTokenBalance / currentUsdtBalance)
                    if (addAmount >= currentAddressTokenBalance) {
                        addAmount = currentAddressTokenBalance - Math.floor(1000000 / price);
                        fastBreak = true;
                    }
                    status = status + "\n添加流动池，当前余额：" + currentAddressTokenBalance + ", 添加数量：" + addAmount;
                    setStatus(status);
                    const amount0Increased = fromReadableAmount(
                        addAmount,
                        tokenData.decimals
                    )
                    const positionToIncreaseBy = inverted ? Position.fromAmount1({
                        pool,
                        tickLower:
                            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) -
                            pool.tickSpacing * 2,
                        tickUpper:
                            nearestUsableTick(pool.tickCurrent, pool.tickSpacing) +
                            pool.tickSpacing * 2,
                        amount1: amount0Increased,
                    }) : Position.fromAmount0({
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
                    const nfpm = new web3.eth.Contract(PANCAKE_masterChefV3ABI, PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS);
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
                    const { calldata, value } = NonfungiblePositionManager.addCallParameters(positionToIncreaseBy, {
                        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
                        slippageTolerance: new Percent(50, 10_000),
                        tokenId: Number(tokenIds[tokenIds.length - 1]),
                        useNative: false,
                    });
                    const transaction = {
                        data: calldata,
                        to: PANCAKE_NONFUNGIBLE_POSITION_MANAGER_CONTRACT_ADDRESS,
                        value: value,
                        from: address,
                        gas: 10000000,
                        gasPrice,
                    }
                    const txRes2 = await web3.eth.sendTransaction(transaction);
                    console.log("交易成功，交易哈希：", txRes2);
                    if (fastBreak) break;
                }
                await swapOutAllUSDT(web3, token0Contract, token1Contract, currentPoolAddress, address, price, true);
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
    async function getPoolInfo(token0, token1, poolFee, currentPoolAddress) {        
        const web3 = new Web3(wallet.provider);
        console.log("currentPoolAddress", currentPoolAddress);
        while(true){
            try{
                const poolContract = new web3.eth.Contract(PANCAKE_tv3PoolStateABI, currentPoolAddress);

                const [liquidity, slot0] =
                    await Promise.all([
                        poolContract.methods.liquidity().call(),
                        poolContract.methods.slot0().call(),
                    ])
                return {
                    liquidity,
                    sqrtPriceX96: slot0[0],
                    tick: slot0[1],
                }
            }catch(e){
                console.log("sinboss", e);
            }
            await sleep(1 * 1000);
        }        
    }
    async function swapOutAllUSDT(web3, token0Contract, token1Contract, currentPoolAddress, address, price, islast) {
        if (islast)
            status = status + "\n最后取U";
        else
            status = status + "\n取U";
        setStatus(status);
        let currentUsdtBalance = 0;
        if (islast)
            await sleep(5 * 1000);
        else
            while (currentUsdtBalance < usdtValue * 0.9) {
                currentUsdtBalance = await token1Contract.methods.balanceOf(currentPoolAddress).call();
                currentUsdtBalance = Number(currentUsdtBalance) / 10 ** quotoTokenData.decimals;
                status = status + "*";
                setStatus(status);
                await sleep(1 * 1000)
            }

        console.log("currentUsdtBalance", currentUsdtBalance);
        status = status + "池子里U余额：" + currentUsdtBalance;
        setStatus(status);
        let currentAddressTokenBalance = await token0Contract.methods.balanceOf(address).call();
        currentAddressTokenBalance = Number(currentAddressTokenBalance) / 10 ** tokenData.decimals;
        console.log("currentAddressTokenBalance", currentAddressTokenBalance);
        let sellAmount = (currentUsdtBalance - 1.5) / priceList[currentTempId];
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
                // if (token_id > 0) {
                //     await axios.get('/v2/cryptocurrency/quotes/latest?id=' + token_id, {
                //         headers: {
                //             'X-CMC_PRO_API_KEY': '1a40082b-7b15-4c78-8b14-a972d3c47df9',
                //         },
                //     }).then((response) => {
                //         console.log(response.data);
                //         tempList[i].price0 = response.data.data[token_id].quote?.USD?.price;
                //     }).catch((e) => {

                //     });
                //     await sleep(3000);
                // }
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
            <div style={{ fontWeight: "bold", fontSize: "20px", width: "100%", textAlign: "center" }}>烧池子</div>
            <Divider />
            {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
            <div style={{ width: "100%" }}>
                <div>LP币</div>
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
            }} >烧池子</Button>

            {working && <Spin />}
            <div style={{ whiteSpace: "pre-wrap" }}>进度：{status}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>日志：{message}</div>
            {/* <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={openPosition} >单个存币</Button> */}
            {/* <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={addLiquidity} >加流动池</Button> */}


        </div >
    );
};
export default BurnToken;
// 