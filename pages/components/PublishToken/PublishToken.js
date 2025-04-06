import React, { useContext, useEffect, useState } from 'react';
import styles from './PublishToken.module.css';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Switch, Upload, Select, Modal, InputNumber, Divider } from 'antd';
const fetch = require("node-fetch");
import BN from 'bn.js'
const bs58 = require("bs58");
const axios = require('axios');
import { AccountContext } from '../../../context/context'
import { useConnectWallet} from '@web3-onboard/react'
import Web3 from 'web3';
import { ethers } from 'ethers';
const { TextArea } = Input;
const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}
const PublishToken = () => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isFreezeAuth, setIsFreezeAuth] = useState(false);
    const [isMintAuth, setIsMintAuth] = useState(false);
    const [isUpdateAuth, setIsUpdateAuth] = useState(true);
    const [templateList, setTemplateList] = useState([]);
    const [currentTempId, setCurrentTempId] = useState(-1);
    const [saveTemplateName, setSaveTemplateName] = useState([]);
    const [currentPicUrl, setCurrentPicUrl] = useState('');
    const [message, setMessage] = useState('');
    const [tokenID, setTokenID] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [multipleToken, setMultipleToken] = useState(false);
    const [selectedTemplateList, setSelectedTemplateList] = useState([]);
    const [isCollapse, setIsCollapse] = useState(true);
    // const { account, web3 } = useContext(AccountContext);
    const [
        {
          wallet, // the wallet that has been connected or null if not yet connected
          connecting // boolean indicating if connection is in progress
        },
      ] = useConnectWallet()
    const onSubmit = async (e) => {

        if (!wallet) {
            alert("请连接钱包");
            return;
        }

        if (multipleToken) {
            // 批量发布
            for (let i = 0; i < selectedTemplateList.length; i++) {
                const template = templateList[selectedTemplateList[i]];
                if (template.name == '' || template.nameoc == ''
                    || template.symboloc == '' || template.symbol == ''
                    || template.decimals == '' || template.supplies == ''
                    || template.picurl == ''
                ) {
                    alert(template.template_name + "信息不全");
                    return;
                }
                if (template.meta_url == '' || template.meta_url == undefined
                ) {
                    alert(template.template_name + "元数据没生成");
                    return;
                }
            }
            for (let i = 0; i < selectedTemplateList.length; i++) {
                const template = templateList[selectedTemplateList[i]];
                setIsFreezeAuth(template.is_freeze_auth);
                setIsMintAuth(template.is_mint_auth);
                setIsUpdateAuth(template.is_update_auth);
                setCurrentPicUrl(template.picurl);
                form.setFieldsValue(template);
                await publishTokenLogic(template);
            }
            alert('批量发币成功');
            return;
        }
        await publishTokenLogic(null);
    };
    async function fetchComputePrice() {
        try {
            const res = (await axios.get(`https://solanacompass.com/api/fees?cacheFreshTime=${5 * 60 * 1000}`, {
                timeout: 3 * 1000,
                skipError: true
            }));
            return res.data
        } catch {
            return undefined
        }
    }
    async function publishTokenLogic(template) {

        const tokenInfo = await form.validateFields();
        if (multipleToken) {
            tokenInfo.is_mint_auth = template.is_mint_auth ? 1 : 0;
            tokenInfo.is_update_auth = template.is_update_auth ? 1 : 0;
            tokenInfo.is_freeze_auth = template.is_freeze_auth ? 1 : 0;
            tokenInfo.pub_count = 1;
            tokenInfo.picurl = template.picurl;
        } else {
            tokenInfo.is_mint_auth = isMintAuth ? 1 : 0;
            tokenInfo.is_update_auth = isUpdateAuth ? 1 : 0;
            tokenInfo.is_freeze_auth = isFreezeAuth ? 1 : 0;
            tokenInfo.pub_count = 1;
            tokenInfo.picurl = currentPicUrl;

        }

        tokenInfo.publish_addr = wallet.accounts[0].address;
        tokenInfo.tabs = "";
        console.log("sinboss token info", tokenInfo);
        try {

            setMessage(message + "\n发币中");

            if (!tokenInfo.is_freeze_auth) {

            }
            if (!tokenInfo.is_mint_auth) {

            }
            const abi = [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "allowance",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "needed",
                            "type": "uint256"
                        }
                    ],
                    "name": "ERC20InsufficientAllowance",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "balance",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "needed",
                            "type": "uint256"
                        }
                    ],
                    "name": "ERC20InsufficientBalance",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "approver",
                            "type": "address"
                        }
                    ],
                    "name": "ERC20InvalidApprover",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "receiver",
                            "type": "address"
                        }
                    ],
                    "name": "ERC20InvalidReceiver",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "sender",
                            "type": "address"
                        }
                    ],
                    "name": "ERC20InvalidSender",
                    "type": "error"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "ERC20InvalidSpender",
                    "type": "error"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "account",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "internalType": "uint8",
                            "name": "",
                            "type": "uint8"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "nonpayable",
                    "type": "function"
                }
            ]
            const bytecode = "0x608060405234801561001057600080fd5b506040518060400160405280600781526020017f4d79546f6b656e000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4d544b0000000000000000000000000000000000000000000000000000000000815250816003908161008c91906102f4565b50806004908161009c91906102f4565b5050506103c6565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061012557607f821691505b602082108103610138576101376100de565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026101a07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610163565b6101aa8683610163565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006101f16101ec6101e7846101c2565b6101cc565b6101c2565b9050919050565b6000819050919050565b61020b836101d6565b61021f610217826101f8565b848454610170565b825550505050565b600090565b610234610227565b61023f818484610202565b505050565b5b818110156102635761025860008261022c565b600181019050610245565b5050565b601f8211156102a8576102798161013e565b61028284610153565b81016020851015610291578190505b6102a561029d85610153565b830182610244565b50505b505050565b600082821c905092915050565b60006102cb600019846008026102ad565b1980831691505092915050565b60006102e483836102ba565b9150826002028217905092915050565b6102fd826100a4565b67ffffffffffffffff811115610316576103156100af565b5b610320825461010d565b61032b828285610267565b600060209050601f83116001811461035e576000841561034c578287015190505b61035685826102d8565b8655506103be565b601f19841661036c8661013e565b60005b828110156103945784890151825560018201915060208501945060208101905061036f565b868310156103b157848901516103ad601f8916826102ba565b8355505b6001600288020188555050505b505050505050565b610e56806103d56000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610aaa565b60405180910390f35b6100d060048036038101906100cb9190610b65565b610292565b6040516100dd9190610bc0565b60405180910390f35b6100ee6102b5565b6040516100fb9190610bea565b60405180910390f35b61011e60048036038101906101199190610c05565b6102bf565b60405161012b9190610bc0565b60405180910390f35b61013c6102ee565b6040516101499190610c74565b60405180910390f35b61016c60048036038101906101679190610c8f565b6102f7565b6040516101799190610bea565b60405180910390f35b61018a61033f565b6040516101979190610aaa565b60405180910390f35b6101ba60048036038101906101b59190610b65565b6103d1565b6040516101c79190610bc0565b60405180910390f35b6101ea60048036038101906101e59190610cbc565b6103f4565b6040516101f79190610bea565b60405180910390f35b60606003805461020f90610d2b565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610d2b565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b60008061029d61047b565b90506102aa818585610483565b600191505092915050565b6000600254905090565b6000806102ca61047b565b90506102d7858285610495565b6102e285858561052a565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461034e90610d2b565b80601f016020809104026020016040519081016040528092919081815260200182805461037a90610d2b565b80156103c75780601f1061039c576101008083540402835291602001916103c7565b820191906000526020600020905b8154815290600101906020018083116103aa57829003601f168201915b5050505050905090565b6000806103dc61047b565b90506103e981858561052a565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b610490838383600161061e565b505050565b60006104a184846103f4565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156105245781811015610514578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161050b93929190610d6b565b60405180910390fd5b6105238484848403600061061e565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361059c5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016105939190610da2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361060e5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106059190610da2565b60405180910390fd5b6106198383836107f5565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036106905760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016106879190610da2565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107025760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016106f99190610da2565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156107ef578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107e69190610bea565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361084757806002600082825461083b9190610dec565b9250508190555061091a565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156108d3578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108ca93929190610d6b565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361096357806002600082825403925050819055506109b0565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a0d9190610bea565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a54578082015181840152602081019050610a39565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a7c82610a1a565b610a868185610a25565b9350610a96818560208601610a36565b610a9f81610a60565b840191505092915050565b60006020820190508181036000830152610ac48184610a71565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610afc82610ad1565b9050919050565b610b0c81610af1565b8114610b1757600080fd5b50565b600081359050610b2981610b03565b92915050565b6000819050919050565b610b4281610b2f565b8114610b4d57600080fd5b50565b600081359050610b5f81610b39565b92915050565b60008060408385031215610b7c57610b7b610acc565b5b6000610b8a85828601610b1a565b9250506020610b9b85828601610b50565b9150509250929050565b60008115159050919050565b610bba81610ba5565b82525050565b6000602082019050610bd56000830184610bb1565b92915050565b610be481610b2f565b82525050565b6000602082019050610bff6000830184610bdb565b92915050565b600080600060608486031215610c1e57610c1d610acc565b5b6000610c2c86828701610b1a565b9350506020610c3d86828701610b1a565b9250506040610c4e86828701610b50565b9150509250925092565b600060ff82169050919050565b610c6e81610c58565b82525050565b6000602082019050610c896000830184610c65565b92915050565b600060208284031215610ca557610ca4610acc565b5b6000610cb384828501610b1a565b91505092915050565b60008060408385031215610cd357610cd2610acc565b5b6000610ce185828601610b1a565b9250506020610cf285828601610b1a565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610d4357607f821691505b602082108103610d5657610d55610cfc565b5b50919050565b610d6581610af1565b82525050565b6000606082019050610d806000830186610d5c565b610d8d6020830185610bdb565b610d9a6040830184610bdb565b949350505050565b6000602082019050610db76000830184610d5c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610df782610b2f565b9150610e0283610b2f565b9250828201905080821115610e1a57610e19610dbd565b5b9291505056fea2646970667358221220f0c30a6b55171082218e973ff7c24e56413c2eaa56c15ce3c9779c387248e01164736f6c634300081c0033";
            const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')            
            const web3 = new Web3(wallet.provider);
            const myContract = new web3.eth.Contract(abi);

            const contractDeployer = myContract.deploy({
                data: bytecode,
                arguments: [],
            });
            const gas = await contractDeployer.estimateGas({
                from: wallet.accounts[0].address,
            });
            console.log('Estimated gas:', gas);
            try {
                const tx = await contractDeployer.send({
                    from: wallet.accounts[0].address,
                    gas : 100000,
                    gasPrice: 10000000000,
                });
                console.log('Contract deployed at address: ' + tx.options.address);                
            } catch (error) {
                console.error(error);
            }
            await axios.post("/api/insert", tokenInfo);
        } catch (e) {
            setMessage(message + "\n" + e.toString());
            console.log("sinboss", e);
            tokenInfo.reason = e.toString();
            await axios.post("/api/insert", tokenInfo);
        }
        if (!multipleToken) {
            if (tokenInfo.contract != undefined) {
                if (tokenInfo.reason == undefined)
                    alert("发币成功");
                else
                    alert("发币成功。不过有些权限转移失败，具体在浏览器查看");
                setMessage(tokenInfo.contract);
                // window.open("https://solscan.io/account/"+tokenInfo.publish_addr+"#portfolio");
                window.open("https://solscan.io/token/" + tokenInfo.contract);
            } else {
                alert("发币失败");
            }
        }

    }
    async function fetchRemoteImage(url) {
        try {
            // Fetch image using axios
            const response = await axios.get(url, { responseType: 'arraybuffer' });

            // Convert the response to a Buffer
            const imageBuffer = Buffer.from(response.data);

            // Log the image buffer or save it to a file
            console.log('Image buffer:', imageBuffer);
            // Optionally, save the image locally
            return imageBuffer;
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }
    const handleChangeTemplate = (e) => {
        let id = 0;
        if (!multipleToken) {
            id = e;
        }
        setCurrentTempId(id);
        setIsFreezeAuth(templateList[id].is_freeze_auth);
        setIsMintAuth(templateList[id].is_mint_auth);
        setIsUpdateAuth(templateList[id].is_update_auth);
        setCurrentPicUrl(templateList[id].picurl);
        setTokenID(templateList[id].token_id);
        form.setFieldsValue(templateList[id]);
    }
    useEffect(() => {
        refreshTemplateList();
    }, []);
    const refreshTemplateList = () => {
        axios.get(
            "/api/template_all"
        ).then((response) => {
            setTemplateList(response.data);
        })
    }
    return (
        <div className={styles.mainpage}>
            <div style={{ fontWeight: "bold", fontSize: "20px", width: "100%", textAlign: "center" }}>发币</div>
            <Divider />
            {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
            <div style={{ width: "100%", display: "flex", alignItems: "flex-start", marginBlock: "20px" }}>
                <Input style={{ width: "50%" }} value={tokenID} placeholder="请输入代币ID" onChange={(e) => {
                    setTokenID(e.target.value);
                }} />
                <div style={{ marginLeft: '20px' }}>
                    <Button type="primary" onClick={async () => {
                        await axios.get('/v2/cryptocurrency/info?id=' + tokenID, {
                            headers: {
                                'X-CMC_PRO_API_KEY': '1a40082b-7b15-4c78-8b14-a972d3c47df9',
                            },
                        }).then((response) => {
                            console.log(response.data.data[tokenID]);
                            form.setFieldsValue(
                                {
                                    ...
                                    response.data.data[tokenID],
                                    nameoc: response.data.data[tokenID].name,
                                    symboloc: response.data.data[tokenID].symbol,
                                    website: response.data.data[tokenID].urls.website[0],
                                    reddit: response.data.data[tokenID].urls.reddit[0],
                                    twitter: response.data.data[tokenID].urls.twitter[0],
                                    facebook: response.data.data[tokenID].urls.facebook[0],
                                    github: response.data.data[tokenID].urls.source_code[0],
                                    whitepaper: response.data.data[tokenID].urls.technical_doc[0],
                                    tg: response.data.data[tokenID].urls.chat[0],
                                }
                            );
                            setCurrentPicUrl(response.data.data[tokenID].logo);
                        })
                        await axios.get('/v2/cryptocurrency/quotes/latest?id=' + tokenID, {
                            headers: {
                                'X-CMC_PRO_API_KEY': '1a40082b-7b15-4c78-8b14-a972d3c47df9',
                            },
                        }).then((response) => {
                            console.log(response.data.data[tokenID]);
                            const supply = Math.floor(response.data.data[tokenID].max_supply ? response.data.data[tokenID].max_supply : response.data.data[tokenID].circulating_supply);
                            form.setFieldsValue(
                                {
                                    supplies: supply,
                                    decimals: supply > 1000000000 ? 6 : 8

                                }
                            );
                        })

                    }} >查询</Button>
                    <Button type="primary" style={{ marginLeft: "20px" }} onClick={async () => {
                        const list = tokenID.split(" ");
                        for (let i = 0; i < list.length; i++) {
                            if (list[i] == ' ') continue;
                            const token = list[i];
                            let picurl = '';
                            let values = null;
                            await axios.get('/v2/cryptocurrency/info?id=' + token, {
                                headers: {
                                    'X-CMC_PRO_API_KEY': '1a40082b-7b15-4c78-8b14-a972d3c47df9',
                                },
                            }).then((response) => {
                                values = {
                                    ...
                                    response.data.data[token],
                                    nameoc: response.data.data[token].name,
                                    symboloc: response.data.data[token].symbol,
                                    website: response.data.data[token].urls.website[0],
                                    reddit: response.data.data[token].urls.reddit[0],
                                    twitter: response.data.data[token].urls.twitter[0],
                                    facebook: response.data.data[token].urls.facebook[0],
                                    github: response.data.data[token].urls.source_code[0],
                                    whitepaper: response.data.data[token].urls.technical_doc[0],
                                    tg: response.data.data[token].urls.chat[0],
                                }
                                setCurrentPicUrl(response.data.data[token].logo);
                                picurl = response.data.data[token].logo;
                            })
                            await axios.get('/v2/cryptocurrency/quotes/latest?id=' + token, {
                                headers: {
                                    'X-CMC_PRO_API_KEY': '1a40082b-7b15-4c78-8b14-a972d3c47df9',
                                },
                            }).then((response) => {
                                const supply = Math.floor(response.data.data[token].max_supply ? response.data.data[token].max_supply : response.data.data[token].circulating_supply);
                                values.supplies = supply;
                                values.decimals = supply > 1000000000 ? 6 : 8;
                            })
                            if (values != null) {
                                values.is_mint_auth = 0;
                                values.is_update_auth = 0;
                                values.is_freeze_auth = 1;
                                values.pub_count = 1;
                                values.template_name = values.symbol;
                                values.picurl = picurl;
                                values.token_id = token;
                                await axios.post(
                                    "/api/template", values
                                ).then((response) => {
                                })
                            }
                        }
                        alert("批量导入成功");
                        refreshTemplateList();
                    }} >批量导入</Button>
                </div>
            </div>

            <div style={{ width: "100%", display: "flex", alignItems: "flex-start", marginBlock: "20px" }}>
                {!isCollapse && <div style={{ width: "100%", textAlign: "center" }} >
                    {templateList && templateList.length > 0 && templateList.map((item, indexCrn) => {
                        return (
                            <span key={'template' + item?.id}>
                                <div className={(indexCrn == currentTempId || selectedTemplateList.indexOf(indexCrn) >= 0) ? styles.template_item_active : styles.template_item}
                                    value={indexCrn} onClick={() => {
                                        if (!multipleToken)
                                            handleChangeTemplate(indexCrn)
                                        else {
                                            let temp = []; let flag = true;
                                            for (let i = 0; i < selectedTemplateList.length; i++)
                                                if (selectedTemplateList[i] != indexCrn)
                                                    temp.push(selectedTemplateList[i]);
                                                else
                                                    flag = false;
                                            flag && temp.push(indexCrn);
                                            setSelectedTemplateList(temp);
                                            if (temp.length > 0) {
                                                const id = temp[0];
                                                setIsFreezeAuth(templateList[id].is_freeze_auth);
                                                setIsMintAuth(templateList[id].is_mint_auth);
                                                setIsUpdateAuth(templateList[id].is_update_auth);
                                                setCurrentPicUrl(templateList[id].picurl);
                                                setTokenID(templateList[id].token_id);
                                                form.setFieldsValue(templateList[id]);
                                            }
                                        }
                                    }}>
                                    <img key={'img' + item?.id} style={{ width: "24px", marginRight: "5px" }} src={item.picurl} />
                                    {item.template_name}
                                </div>
                                {(indexCrn + 1) % 8 == 0 && <div key={'sep' + item?.id} style={{ height: "1px" }}></div>
                                }
                            </span>
                        )
                    })}
                </div>
                }

            </div>
            <div style={{ textAlign: "left", marginBottom: "50px" }}>
                <Button type="primary" style={{ marginRight: '20px' }} onClick={() => {
                    setIsCollapse(!isCollapse);
                }} >收起/展开</Button>
                <Button type="primary" onClick={() => {
                    if (currentTempId == -1 || multipleToken) return;
                    axios.post(
                        "/api/del_template", {
                        id: templateList[currentTempId]?.id
                    }
                    ).then((response) => {
                        alert("删除成功");
                        refreshTemplateList();
                        setCurrentTempId(-1);
                    })
                }} >删除</Button>
                <Button type="primary"
                    style={{ marginLeft: '20px' }} onClick={() => {
                        setMultipleToken(!multipleToken);
                        setSelectedTemplateList([]);
                        setCurrentTempId(-1);
                    }} >批量发币/取消</Button>
            </div>

            <Form
                layout={formLayout}
                form={form}
                initialValues={{
                    layout: formLayout,
                }}
                // onValuesChange={onFormLayoutChange}
                onFinish={onSubmit}

            >

                <Form.Item
                    label=""
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item label="代币名称"
                        name="name"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 12px)',
                            marginRight: '24px'
                        }}
                        rules={[{ required: true, message: '请输入代币名称' }]}
                    >
                        <Input placeholder="请输入代币名称" />
                    </Form.Item>
                    <Form.Item
                        name="symbol"
                        label="代币符号"
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 12px)',
                        }}
                        rules={[{ required: true, message: '请输入代币符号' }]}
                    >
                        <Input placeholder="请输入代币符号" />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    name="decimals"
                    label="小数"
                    rules={[{ required: true, message: '请输入小数点位数' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="请输入小数点位数" />
                </Form.Item>
                <Form.Item
                    name="supplies"
                    label="供应"
                    rules={[{ required: true, message: '请输入供应量' }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="请输入供应量" />
                </Form.Item>

                <Form.Item
                    name="is_freeze_auth"
                    label={isFreezeAuth ? "是否保留冻结权限：现在是勾选状态，勾选状态默认权限在发币地址" : "是否保留冻结权限"}
                    layout={'horizontal'}
                >
                    <Switch size='small' checked={isFreezeAuth} onChange={() => {
                        setIsFreezeAuth(!isFreezeAuth);
                    }} />
                </Form.Item>
                <Form.Item
                    name="is_mint_auth"
                    label={isMintAuth ? "是否保留增发权限：现在是勾选状态，勾选状态默认权限在发币地址" : "是否保留增发权限"}
                    layout={'horizontal'}
                >
                    <Switch size='small' checked={isMintAuth} onChange={() => {
                        setIsMintAuth(!isMintAuth);
                    }} />
                </Form.Item>
                <Form.Item
                    name="is_update_auth"
                    label={isUpdateAuth ? "是否保留更新权限：现在是勾选状态，勾选状态默认权限在发币地址" : "是否保留更新权限"}
                    layout={'horizontal'}
                >
                    <Switch size='small' checked={isUpdateAuth} onChange={() => {
                        setIsUpdateAuth(!isUpdateAuth);
                    }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" >发布代币</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={async () => {
                        const values = await form.validateFields();
                        setSaveTemplateName(values.symbol);
                        setIsModalOpen(true);
                    }}>保存备注</Button>
                    <Button style={{ marginLeft: '20px' }} onClick={async () => {
                        if (currentTempId < 0) return;
                        const values = await form.validateFields();
                        setSaveTemplateName(templateList[currentTempId]?.template_name);
                        setIsModalOpen1(true);
                    }}>修改备注</Button>
                </Form.Item>
            </Form>

            <Modal title="保存备注" open={isModalOpen} onOk={async () => {

                const values = await form.validateFields();
                values.is_mint_auth = isMintAuth ? 1 : 0;
                values.is_update_auth = isUpdateAuth ? 1 : 0;
                values.is_freeze_auth = isFreezeAuth ? 1 : 0;
                values.pub_count = 1;
                values.template_name = saveTemplateName;
                values.picurl = currentPicUrl;
                values.token_id = tokenID;
                values.symboloc = values.symbol;
                values.nameoc = values.name;
                axios.post(
                    "/api/template", values
                ).then((response) => {
                    alert("保存成功");
                    setSaveTemplateName('');
                    setIsModalOpen(false);
                    refreshTemplateList();
                })
            }} onCancel={async () => {
                setIsModalOpen(false);
            }}>
                <Input value={saveTemplateName} placeholder="请输入备注名称" onChange={(e) => { setSaveTemplateName(e.target.value) }} />
            </Modal>
            <Modal title="修改备注" open={isModalOpen1} onOk={async () => {

                let submitData = { ...templateList[currentTempId] };
                const values = await form.validateFields();
                submitData.is_mint_auth = isMintAuth ? 1 : 0;
                submitData.is_update_auth = isUpdateAuth ? 1 : 0;
                submitData.is_freeze_auth = isFreezeAuth ? 1 : 0;
                submitData.pub_count = 1;
                submitData.picurl = currentPicUrl;
                submitData.id = templateList[currentTempId]?.id;
                submitData.template_name = saveTemplateName;
                submitData.token_id = tokenID;
                submitData.symbol = values.symbol;
                submitData.name = values.name
                submitData.decimals = values.decimals
                submitData.supplies = values.supplies

                axios.post(
                    "/api/update_template", submitData
                ).then((response) => {
                    alert("保存成功");
                    setSaveTemplateName('');
                    setIsModalOpen1(false);
                    refreshTemplateList();
                })
            }} onCancel={async () => {
                setIsModalOpen1(false);
            }}>
                <Input value={saveTemplateName} placeholder="请输入备注名称" onChange={(e) => { setSaveTemplateName(e.target.value) }} />
            </Modal>
            <div style={{ margin: "10px", textAlign: "left" }}>
                发币状态：{message}
            </div>
        </div>
    );
};
export default PublishToken;