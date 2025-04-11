import React, { useEffect, useState } from 'react';
import styles from './CreatePool.module.css';
import { Button, Form, Spin, Select, Modal, InputNumber, AutoComplete, Input, Divider } from 'antd';
import copy from 'copy-to-clipboard';
const fetch = require("node-fetch");
const axios = require('axios');
import BN from 'bn.js'
import Decimal from 'decimal.js'
import { useConnectWallet } from '@web3-onboard/react';

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

    const openPosition = async (e) => {
        console.log("openPosition");
        if (poolId == '') {
            alert("先开池子");
            return;
        }

        try {
            const owner = Keypair.fromSecretKey(bs58.decode(feeSecret))
            setMessage("开仓位中");
            const raydium = await Raydium.load({
                owner: new PublicKey(wallet.publicKey.toString()),
                signAllTransactions: wallet.signAllTransactions,
                connection,
                cluster,
                disableFeatureCheck: true,
                disableLoadToken: true,
                blockhashCommitment: 'finalized',
                // urlConfigs: {
                //   BASE_HOST: '<API_HOST>', // api url configs, currently api doesn't support devnet
                // },
            })
            let poolInfo = null;
            let poolKeys = null;
            let tickCache = null;
            let clmmPoolInfo = null;

            // note: api doesn't support get devnet pool info, so in devnet else we go rpc method
            // if you wish to get pool info from rpc, also can modify logic to go rpc method directly
            try {
                const data = await raydium.clmm.getPoolInfoFromRpc(poolId)
                poolInfo = data.poolInfo
                poolKeys = data.poolKeys
                clmmPoolInfo = data.computePoolInfo
                tickCache = data.tickData
            } catch (e) {
                console.log(e);
                console.log("池子还没反应过来，等几秒后再来");
                setTimeout(() => {
                    openPosition();
                }, 5000);
                return;
            }
            console.log("poolInfo", poolInfo);
            console.log("check", priceList[currentTempId] < 1, poolInfo.mintB.address == tokenData.mint, tokenData.mint);
            // 价格大于1， mintA为基础币， 价格小于1， mintB为基础币
            const txVersion1 = TxVersion.V0;
            if (priceList[currentTempId] > 1) {
                let price = 0;
                if (poolInfo.mintA.address == tokenData.mint)
                    price = Number(priceList[currentTempId].toFixed(9));
                else
                    price = Number((1.0 / Number(priceList[currentTempId])).toFixed(9));
                console.log("price first case", price);
                const inputAmount = Math.floor(tokenData.amount / (10 ** tokenData.decimals) - 1000000 / Number(priceList[currentTempId]));
                // const inputAmount = 1000;
                const [startPrice, endPrice] = [price, price];
                const { tick: lowerTick } = TickUtils.getPriceAndTick({
                    poolInfo,
                    price: new Decimal(startPrice),
                    baseIn: true,
                })
                const { tick: upperTick } = TickUtils.getPriceAndTick({
                    poolInfo,
                    price: new Decimal(endPrice),
                    baseIn: true,
                })
                const epochInfo = await raydium.fetchEpochInfo();
                lowerTick = lowerTick - 1;
                upperTick = upperTick
                const res = await PoolUtils.getLiquidityAmountOutFromAmountIn({
                    poolInfo,
                    slippage: 0,
                    inputA: poolInfo.mintA.address == tokenData.mint,
                    tickUpper: Math.max(lowerTick, upperTick),
                    tickLower: Math.min(lowerTick, upperTick),
                    amount: new BN(new Decimal(inputAmount || '0').mul(10 ** tokenData.decimals).toFixed(0)),
                    add: true,
                    amountHasFee: true,
                    epochInfo: epochInfo,
                })
                const { execute, extInfo, transaction } = await raydium.clmm.openPositionFromBase({
                    poolInfo,
                    poolKeys,
                    tickUpper: Math.max(lowerTick, upperTick),
                    tickLower: Math.min(lowerTick, upperTick),
                    base: poolInfo.mintA.address == tokenData.mint ? "MintA" : "MintB",
                    ownerInfo: {
                        useSOLBalance: true,
                    },
                    baseAmount: new BN(new Decimal(inputAmount || '0').mul(10 ** tokenData.decimals).toFixed(0)),
                    otherAmountMax: poolInfo.mintA.address == tokenData.mint ? res.amountSlippageB.amount : res.amountSlippageA.amount,
                    txVersion: txVersion1,
                    // optional: set up priority fee here
                    computeBudgetConfig: {
                        units: 600000,
                        microLamports: 100000,
                    },
                })
                const request1 = {
                    method: "getTipAccounts",
                    params: [],
                };
                const result1 = await connection._rpcRequest(request1.method, request1.params);
                const { blockhash, lastValidBlockHeight } = await umi.rpc.getLatestBlockhash({ commitment: "processed" });
                const transaction1 = new Transaction({
                    recentBlockhash: blockhash,
                    feePayer: owner.publicKey,
                });
                transaction1 = transaction1.add(
                    SystemProgram.transfer({
                        fromPubkey: owner.publicKey,
                        toPubkey: new PublicKey(result1.result[1]),
                        lamports: 0.0001 * LAMPORTS_PER_SOL, // 转账 0.1 SOL
                    })
                );
                transaction1.sign(owner);
                // const sss = await wallet.signTransaction(transaction1);
                // const serializedTransaction = sss.serialize({ verifySignatures: false });
                const serializedTransaction = transaction1.serialize();
                // const base58EncodedTransaction = bs58.encode(serializedTransaction);
                const params = [];
                params.push(serializedTransaction);

                const ttt = await wallet.signTransaction(transaction);
                const serializedTransaction1 = ttt.serialize({ verifySignatures: false });
                params.push(serializedTransaction1);
                const bundlePayload = [];
                for (let i = 0; i < params.length; i++)
                    bundlePayload.push(Buffer.from(params[i]).toString('base64'));
                const request2 = {
                    method: "simulateBundle",
                    params: [{
                        encodedTransactions: bundlePayload
                    }]
                };
                const result2 = await connection._rpcRequest(request2.method, request2.params);
                console.log("result", result2);
                if (result2.result.value.summary == "succeeded") {

                } else {
                    setMessage("开仓位失败，请稍后再试");
                    console.log("sinboss", "交易失败" + JSON.stringify(result2));
                    setWorking(false);
                    doNext();
                    return;
                }
                const params3 = [];
                for (let i = 0; i < params.length; i++)
                    params3.push(bs58.encode(params[i]));
                const request3 = {
                    method: "sendBundle",
                    params: [
                        params3
                    ],
                };
                const result3 = await connection._rpcRequest(request3.method, request3.params);
                console.log("result3", result3);
                setMessage("开仓位成功");
                setWorking(false);
                doNext();
            } else {
                // 价格小于1
                console.log("second case");
                let price = 0;
                const txVersion1 = TxVersion.V0;
                if (poolInfo.mintA.address == tokenData.mint)
                    price = Number(priceList[currentTempId].toFixed(9));
                else
                    price = Number((1.0 / Number(priceList[currentTempId])).toFixed(9));
                console.log("price second case", price);
                // const price = Number(tokenData.price.toFixed(9));
                const inputAmount = 50;
                const [startPrice, endPrice] = [price, price];
                const { tick: lowerTick } = TickUtils.getPriceAndTick({
                    poolInfo,
                    price: new Decimal(startPrice),
                    baseIn: true,
                })

                const { tick: upperTick } = TickUtils.getPriceAndTick({
                    poolInfo,
                    price: new Decimal(endPrice),
                    baseIn: true,
                })

                const epochInfo = await raydium.fetchEpochInfo();
                lowerTick = lowerTick - 1;
                upperTick = upperTick
                const res = await PoolUtils.getLiquidityAmountOutFromAmountIn({
                    poolInfo,
                    slippage: 0,
                    inputA: poolInfo.mintA.address == tokenData.mint,
                    tickUpper: Math.max(lowerTick, upperTick),
                    tickLower: Math.min(lowerTick, upperTick),
                    amount: new BN(new Decimal(inputAmount || '0').mul(10 ** quotoTokenData.decimals).toFixed(0)),
                    add: true,
                    amountHasFee: true,
                    epochInfo: epochInfo,
                })
                const params = [];
                const { execute, extInfo, transaction } = await raydium.clmm.openPositionFromBase({
                    poolInfo,
                    poolKeys,
                    tickUpper: Math.max(lowerTick, upperTick),
                    tickLower: Math.min(lowerTick, upperTick),
                    base: poolInfo.mintA.address == tokenData.mint ? "MintB" : "MintA",
                    ownerInfo: {
                        useSOLBalance: true,
                    },
                    baseAmount: new BN(new Decimal(inputAmount || '0').mul(10 ** quotoTokenData.decimals).toFixed(0)),
                    otherAmountMax: res.amountSlippageA.amount,
                    txVersion: txVersion1,
                    computeBudgetConfig: {
                        units: 600000,
                        microLamports: 100000,
                    },
                })
                const request1 = {
                    method: "getTipAccounts",
                    params: [],
                };
                const result1 = await connection._rpcRequest(request1.method, request1.params);
                const { blockhash, lastValidBlockHeight } = await umi.rpc.getLatestBlockhash({ commitment: "processed" });
                const transaction1 = new Transaction({
                    recentBlockhash: blockhash,
                    feePayer: owner.publicKey,
                });
                transaction1 = transaction1.add(
                    SystemProgram.transfer({
                        fromPubkey: new PublicKey(owner.publicKey.toString()),
                        toPubkey: new PublicKey(result1.result[1]),
                        lamports: 0.0001 * LAMPORTS_PER_SOL, // 转账 0.1 SOL
                    })
                );
                console.log("owner", owner.publicKey.toString());
                transaction1.sign(owner);
                // const sss = await wallet.signTransaction(transaction1);
                // const serializedTransaction = sss.serialize({ verifySignatures: false });
                const serializedTransaction = transaction1.serialize();
                params.push(serializedTransaction);

                const ttt = await wallet.signTransaction(transaction);
                const serializedTransaction1 = ttt.serialize({ verifySignatures: false });
                params.push(serializedTransaction1);

                const bundlePayload = [];
                for (let i = 0; i < params.length; i++)
                    bundlePayload.push(Buffer.from(params[i]).toString('base64'));
                const request2 = {
                    method: "simulateBundle",
                    params: [{
                        encodedTransactions: bundlePayload
                    }]
                };
                const result2 = await connection._rpcRequest(request2.method, request2.params);
                console.log("result", result2);
                if (result2.result.value.summary == "succeeded") {

                } else {
                    alert("交易失败" + JSON.stringify(result2));
                    console.log("sinboss", "交易失败" + JSON.stringify(result2));
                    return;
                }
                const params3 = [];
                for (let i = 0; i < params.length; i++)
                    params3.push(bs58.encode(params[i]));
                const request3 = {
                    method: "sendBundle",
                    params: [
                        params3
                    ],
                };
                const result3 = await connection._rpcRequest(request3.method, request3.params);
                console.log("result3", result3);
                // setMessage("开仓位成功");
                // setWorking(false);
                // doNext();
                setTimeout(() => {
                    doSwap();
                }, 5000);
            }

        } catch (e) {
            console.log(e);
            setMessage("开仓位失败，请稍后再试");
            setWorking(false);
            doNext();
        }
    }
    const doSwap = async (e) => {
        try {
            setMessage("兑换中");
            const owner = Keypair.fromSecretKey(bs58.decode(feeSecret))
            const txVersion1 = TxVersion.V0;
            const raydium = await Raydium.load({
                owner: new PublicKey(wallet.publicKey.toString()),
                signAllTransactions: wallet.signAllTransactions,
                connection,
                cluster,
                disableFeatureCheck: true,
                disableLoadToken: true,
                blockhashCommitment: 'finalized',
                // urlConfigs: {
                //   BASE_HOST: '<API_HOST>', // api url configs, currently api doesn't support devnet
                // },
            })
            let poolInfo = null;
            let poolKeys = null;
            let clmmPoolInfo = null;
            let tickCache = null;

            const outputMint = new PublicKey(quotoTokenData.mint);
            let amountOut = new BN(50).mul(new BN(10 ** quotoTokenData.decimals)).sub(new BN(1));
            const data = await raydium.clmm.getPoolInfoFromRpc(poolId)
            poolInfo = data.poolInfo
            poolKeys = data.poolKeys
            clmmPoolInfo = data.computePoolInfo
            tickCache = data.tickData
            if (Object.keys(tickCache).length === 0) {
                console.log("sinboss", "池子同步慢");
                setTimeout(() => {
                    doSwap();
                }, 5000);
                return;
            }
            console.log("tickCache", tickCache);
            if (outputMint.toBase58() !== poolInfo.mintA.address && outputMint.toBase58() !== poolInfo.mintB.address)
                throw new Error('input mint does not match pool')

            const { remainingAccounts, ...res } = await PoolUtils.computeAmountIn({
                poolInfo: clmmPoolInfo,
                tickArrayCache: tickCache[poolId],
                amountOut,
                baseMint: outputMint,
                slippage: 0.01,
                epochInfo: await raydium.fetchEpochInfo(),
            })

            const [mintIn, mintOut] =
                outputMint.toBase58() === poolInfo.mintB.address
                    ? [poolInfo.mintA, poolInfo.mintB]
                    : [poolInfo.mintB, poolInfo.mintA]

            console.log({
                amountIn: `${new Decimal(res.amountIn.amount.toString()).div(10 ** mintIn.decimals).toString()} ${mintIn.symbol}`,
                maxAmountIn: `${new Decimal(res.maxAmountIn.amount.toString()).div(10 ** mintIn.decimals).toString()} ${mintIn.symbol
                    }`,
                realAmountOut: `${new Decimal(res.realAmountOut.amount.toString()).div(10 ** mintOut.decimals).toString()} ${mintOut.symbol
                    }`,
            })

            const { execute, transaction } = await raydium.clmm.swapBaseOut({
                poolInfo,
                poolKeys,
                outputMint,
                amountInMax: res.maxAmountIn.amount,
                amountOut: res.realAmountOut.amount,
                observationId: clmmPoolInfo.observationId,
                ownerInfo: {
                    useSOLBalance: true, // if wish to use existed wsol token account, pass false
                },
                remainingAccounts,
                txVersion: txVersion1,

                // optional: set up priority fee here
                computeBudgetConfig: {
                    units: 9000000,
                    microLamports: 1000000,
                },
            })

            const params = [];
            const ttt = await wallet.signTransaction(transaction);
            const serializedTransaction1 = ttt.serialize({ verifySignatures: false });
            params.push(serializedTransaction1);

            // 添加流动池
            {
                let price = Number(priceList[currentTempId].toFixed(9));
                console.log("add liquidity");
                const inputAmount = Math.floor(tokenData.amount / (10 ** tokenData.decimals) - 1000000 / price);
                const allPosition = await raydium.clmm.getOwnerPositionInfo({ programId: poolInfo.programId })
                const position = allPosition.find((p) => p.poolId.toBase58() === poolInfo.id)
                const slippage = 0.05
                const res = await PoolUtils.getLiquidityAmountOutFromAmountIn({
                    poolInfo,
                    slippage: 0,
                    inputA: poolInfo.mintA.address == tokenData.mint,
                    tickUpper: Math.max(position.tickLower, position.tickUpper),
                    tickLower: Math.min(position.tickLower, position.tickUpper),
                    amount: new BN(new Decimal(inputAmount || '0').mul(10 ** tokenData.decimals).toFixed(0)),
                    add: true,
                    amountHasFee: true,
                    epochInfo: await raydium.fetchEpochInfo(),
                })
                console.log("poolInfo", poolInfo);
                console.log("res", res, inputAmount);
                const { execute, transaction } = await raydium.clmm.increasePositionFromBase({
                    poolInfo,
                    ownerPosition: position,
                    ownerInfo: {
                        useSOLBalance: true,
                    },
                    base: poolInfo.mintA.address == tokenData.mint ? "MintA" : "MintB",
                    baseAmount: new BN(new Decimal(inputAmount || '0').mul(10 ** tokenData.decimals).toFixed(0)),
                    otherAmountMax: new BN(1),
                    associatedOnly: false,
                    checkCreateATAOwner: true,
                    txVersion: txVersion1,
                    computeBudgetConfig: {
                        units: 9000000,
                        microLamports: 1000000,
                    },
                })

                const ttt = await wallet.signTransaction(transaction);
                const serializedTransaction1 = ttt.serialize({ verifySignatures: false });
                params.push(serializedTransaction1);
            }
            const request1 = {
                method: "getTipAccounts",
                params: [],
            };
            const result1 = await connection._rpcRequest(request1.method, request1.params);
            const { blockhash, lastValidBlockHeight } = await umi.rpc.getLatestBlockhash({ commitment: "processed" });
            const transaction1 = new Transaction({
                recentBlockhash: blockhash,
                feePayer: owner.publicKey,
            });
            transaction1 = transaction1.add(
                SystemProgram.transfer({
                    fromPubkey: owner.publicKey,
                    toPubkey: new PublicKey(result1.result[1]),
                    lamports: 0.0001 * LAMPORTS_PER_SOL, // 转账 0.1 SOL
                })
            );
            transaction1.sign(owner);
            // const sss = await wallet.signTransaction(transaction1);
            // const serializedTransaction = sss.serialize({ verifySignatures: false });
            const serializedTransaction = transaction1.serialize();
            params.push(serializedTransaction);

            const bundlePayload = [];
            for (let i = 0; i < params.length; i++)
                bundlePayload.push(Buffer.from(params[i]).toString('base64'));
            const request2 = {
                method: "simulateBundle",
                params: [{
                    encodedTransactions: bundlePayload
                }]
            };
            const result2 = await connection._rpcRequest(request2.method, request2.params);
            console.log("result", result2);
            if (result2.result.value.summary == "succeeded") {

            } else {
                alert("交易失败" + JSON.stringify(result2));
                console.log("sinboss", "交易失败" + JSON.stringify(result2));
                return;
            }
            const params3 = [];
            for (let i = 0; i < params.length; i++)
                params3.push(bs58.encode(params[i]));
            const request3 = {
                method: "sendBundle",
                params: [
                    params3
                ],
            };
            const result3 = await connection._rpcRequest(request3.method, request3.params);
            console.log("result3", result3);
            setMessage("收尾成功");
            setWorking(false);
            doNext();
            // alert("兑换成功");
        } catch (e) {
            console.log(e);
            setMessage("兑换失败");
            setWorking(false);
            doNext();
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

            setWorking(true);
            try {
                setMessage("开池子中");

                const raydium = await Raydium.load({
                    owner: new PublicKey(wallet.publicKey.toString()),
                    signAllTransactions: wallet.signAllTransactions,
                    connection,
                    cluster,
                    disableFeatureCheck: true,
                    disableLoadToken: true,
                    blockhashCommitment: 'finalized',
                })

                const mint1 = await raydium.token.getTokenInfo(tokenData.mint)
                const mint2 = await raydium.token.getTokenInfo(quotoTokenData.mint)

                const clmmConfigs = await raydium.api.getClmmConfigs()
                // const clmmConfigs = devConfigs // devnet configs
                console.log("mint1, mint2", mint1, mint2);
                const { execute, extInfo, transaction } = await raydium.clmm.createPool({
                    programId: CLMM_PROGRAM_ID,
                    // programId: DEVNET_PROGRAM_ID.CLMM,
                    mint1,
                    mint2,
                    ammConfig: { ...clmmConfigs[0], id: new PublicKey(clmmConfigs[0].id), fundOwner: '', description: '' },
                    initialPrice: new Decimal(1),
                    startTime: new BN(0),
                    txVersion,
                    // optional: set up priority fee here
                    computeBudgetConfig: {
                        units: 600000,
                        microLamports: 46591500,
                    },
                })
                console.log("transaction", transaction);
                const request1 = {
                    method: "getTipAccounts",
                    params: [],
                };
                const result1 = await connection._rpcRequest(request1.method, request1.params);
                const { blockhash, lastValidBlockHeight } = await umi.rpc.getLatestBlockhash({ commitment: "processed" });
                const transaction1 = new Transaction({
                    recentBlockhash: blockhash,
                    feePayer: wallet.publicKey,
                });
                // transaction.sign([umi]);
                transaction1 = transaction1.add(transaction);
                transaction1 = transaction1.add(
                    SystemProgram.transfer({
                        fromPubkey: new PublicKey(wallet.publicKey.toString()),
                        toPubkey: new PublicKey(result1.result[0]),
                        lamports: 0.0001 * LAMPORTS_PER_SOL, // 转账 0.1 SOL
                    })
                );
                const sss = await wallet.signTransaction(transaction1);
                console.log("sss", sss);
                console.log("extInfo", extInfo);
                poolId = extInfo.address.id;
                console.log("sinboss pool id", poolId);
                setPoolId(poolId);

                const serializedTransaction = sss.serialize({ verifySignatures: false });
                const base58EncodedTransaction = bs58.encode(serializedTransaction);
                const request = {
                    method: "sendTransaction",
                    params: [
                        base58EncodedTransaction
                    ],
                };
                const result = await connection._rpcRequest(request.method, request.params);
                console.log("result", result);
                openPosition();
            } catch (e) {
                console.log(e);
                setMessage("开池子失败");
                setWorking(false);
                doNext();
            }
        }
        else {
            alert("请选择代币");
        }
    };
    const handleChangeTemplate = async (e) => {
        console.log("handleChangeTemplate", e);
        try {            
            const token = { ... tokenList[e]};
            tokenData = token;
            setTokenData(token);
        } catch (e) {
            console.log(e);
            setTokenData({});
        }
    }
    const handleChangeTemplate1 = async (e) => {
        try {
            const token = { ... tokenList[e]};
            setQuotoTokenData(token);
        } catch (e) {
            console.log(e);
            setQuotoTokenData({});
        }
    }

    useEffect(() => {
        for (let i = 0; i < tokenList.length; i++) {
            if (tokenList[i].mint == "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d") {
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
        await axios.get('/ethscanapi?chainid=56&module=account&action=addresstokenbalance&address='+wallet.accounts[0].address+'&page=1&offset=100&apikey=PBW3EJKK38ERG55VYRX43777BRHAJYHC81',
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
                if (token_id > 0) {
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

            <div>池子ID：
                <Input value={poolId} onChange={(e) => {
                    setPoolId(e.target.value);
                }} />
            </div>
            {working && <Spin />}
            <div>日志：{message}</div>
            {/* <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={openPosition} >单个存币</Button> */}
            <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={doSwap} >补操作</Button>
            {/* <Button style={{ marginTop: "20px" }} type="primary" htmlType="submit" onClick={addLiquidity} >加流动池</Button> */}


        </div >
    );
};
export default CreatePool;
// 