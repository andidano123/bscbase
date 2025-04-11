import React, { useContext, useEffect, useState } from 'react';
import styles from './PublishToken.module.css';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Switch, Upload, Select, Modal, InputNumber, Divider } from 'antd';
const fetch = require("node-fetch");
import BN from 'bn.js'
const bs58 = require("bs58");
const axios = require('axios');
import { AccountContext } from '../../../context/context'
import { useConnectWallet } from '@web3-onboard/react'
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

    const [isPermit, setIsPermit] = useState(false);
    const [isMint, setIsMint] = useState(false);
    const [isBurn, setIsBurn] = useState(false);

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
                setCurrentPicUrl(template.picurl);
                form.setFieldsValue(template);
                await publishTokenLogic(template);
            }
            alert('批量发币成功');
            return;
        }
        await publishTokenLogic(null);
    };
    async function publishTokenLogic(template) {

        const tokenInfo = await form.validateFields();
        tokenInfo.pub_count = 1;
        tokenInfo.publish_addr = wallet.accounts[0].address;
        tokenInfo.tabs = "";
        tokenInfo.is_freeze_auth = 0;
        tokenInfo.is_mint_auth = 0;
        tokenInfo.is_update_auth = 0;
        tokenInfo.nameoc = tokenInfo.name;
        tokenInfo.symboloc = tokenInfo.symbol;
        tokenInfo.description = "";
        tokenInfo.picurl = "";
        
        console.log("sinboss token info", tokenInfo);
        try {

            setMessage(message + "\n发币中");
            const abi = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol",
                            "type": "string"
                        },
                        {
                            "internalType": "uint8",
                            "name": "decimals_",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "initialSupply",
                            "type": "uint256"
                        }
                    ],
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
            ];

            const bytecode = "0x608060405234801561001057600080fd5b50604051611a10380380611a1083398181016040528101906100329190610535565b8383816003908161004391906107eb565b50806004908161005391906107eb565b50505081600560006101000a81548160ff021916908360ff16021790555061009b338360ff16600a6100859190610a1f565b836100909190610a6a565b6100a460201b60201c565b50505050610b9d565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036101165760006040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161010d9190610aed565b60405180910390fd5b6101286000838361012c60201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361017e5780600260008282546101729190610b08565b92505081905550610251565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561020a578381836040517fe450d38c00000000000000000000000000000000000000000000000000000000815260040161020193929190610b4b565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361029a57806002600082825403925050819055506102e7565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516103449190610b82565b60405180910390a3505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6103b88261036f565b810181811067ffffffffffffffff821117156103d7576103d6610380565b5b80604052505050565b60006103ea610351565b90506103f682826103af565b919050565b600067ffffffffffffffff82111561041657610415610380565b5b61041f8261036f565b9050602081019050919050565b60005b8381101561044a57808201518184015260208101905061042f565b60008484015250505050565b6000610469610464846103fb565b6103e0565b9050828152602081018484840111156104855761048461036a565b5b61049084828561042c565b509392505050565b600082601f8301126104ad576104ac610365565b5b81516104bd848260208601610456565b91505092915050565b600060ff82169050919050565b6104dc816104c6565b81146104e757600080fd5b50565b6000815190506104f9816104d3565b92915050565b6000819050919050565b610512816104ff565b811461051d57600080fd5b50565b60008151905061052f81610509565b92915050565b6000806000806080858703121561054f5761054e61035b565b5b600085015167ffffffffffffffff81111561056d5761056c610360565b5b61057987828801610498565b945050602085015167ffffffffffffffff81111561059a57610599610360565b5b6105a687828801610498565b93505060406105b7878288016104ea565b92505060606105c887828801610520565b91505092959194509250565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061062657607f821691505b602082108103610639576106386105df565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026106a17fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610664565b6106ab8683610664565b95508019841693508086168417925050509392505050565b6000819050919050565b60006106e86106e36106de846104ff565b6106c3565b6104ff565b9050919050565b6000819050919050565b610702836106cd565b61071661070e826106ef565b848454610671565b825550505050565b600090565b61072b61071e565b6107368184846106f9565b505050565b5b8181101561075a5761074f600082610723565b60018101905061073c565b5050565b601f82111561079f576107708161063f565b61077984610654565b81016020851015610788578190505b61079c61079485610654565b83018261073b565b50505b505050565b600082821c905092915050565b60006107c2600019846008026107a4565b1980831691505092915050565b60006107db83836107b1565b9150826002028217905092915050565b6107f4826105d4565b67ffffffffffffffff81111561080d5761080c610380565b5b610817825461060e565b61082282828561075e565b600060209050601f8311600181146108555760008415610843578287015190505b61084d85826107cf565b8655506108b5565b601f1984166108638661063f565b60005b8281101561088b57848901518255600182019150602085019450602081019050610866565b868310156108a857848901516108a4601f8916826107b1565b8355505b6001600288020188555050505b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b60018511156109435780860481111561091f5761091e6108bd565b5b600185161561092e5780820291505b808102905061093c856108ec565b9450610903565b94509492505050565b60008261095c5760019050610a18565b8161096a5760009050610a18565b8160018114610980576002811461098a576109b9565b6001915050610a18565b60ff84111561099c5761099b6108bd565b5b8360020a9150848211156109b3576109b26108bd565b5b50610a18565b5060208310610133831016604e8410600b84101617156109ee5782820a9050838111156109e9576109e86108bd565b5b610a18565b6109fb84848460016108f9565b92509050818404811115610a1257610a116108bd565b5b81810290505b9392505050565b6000610a2a826104ff565b9150610a35836104ff565b9250610a627fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848461094c565b905092915050565b6000610a75826104ff565b9150610a80836104ff565b9250828202610a8e816104ff565b91508282048414831517610aa557610aa46108bd565b5b5092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ad782610aac565b9050919050565b610ae781610acc565b82525050565b6000602082019050610b026000830184610ade565b92915050565b6000610b13826104ff565b9150610b1e836104ff565b9250828201905080821115610b3657610b356108bd565b5b92915050565b610b45816104ff565b82525050565b6000606082019050610b606000830186610ade565b610b6d6020830185610b3c565b610b7a6040830184610b3c565b949350505050565b6000602082019050610b976000830184610b3c565b92915050565b610e6480610bac6000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063313ce56711610066578063313ce5671461013457806370a082311461015257806395d89b4114610182578063a9059cbb146101a0578063dd62ed3e146101d057610093565b806306fdde0314610098578063095ea7b3146100b657806318160ddd146100e657806323b872dd14610104575b600080fd5b6100a0610200565b6040516100ad9190610ab8565b60405180910390f35b6100d060048036038101906100cb9190610b73565b610292565b6040516100dd9190610bce565b60405180910390f35b6100ee6102b5565b6040516100fb9190610bf8565b60405180910390f35b61011e60048036038101906101199190610c13565b6102bf565b60405161012b9190610bce565b60405180910390f35b61013c6102ee565b6040516101499190610c82565b60405180910390f35b61016c60048036038101906101679190610c9d565b610305565b6040516101799190610bf8565b60405180910390f35b61018a61034d565b6040516101979190610ab8565b60405180910390f35b6101ba60048036038101906101b59190610b73565b6103df565b6040516101c79190610bce565b60405180910390f35b6101ea60048036038101906101e59190610cca565b610402565b6040516101f79190610bf8565b60405180910390f35b60606003805461020f90610d39565b80601f016020809104026020016040519081016040528092919081815260200182805461023b90610d39565b80156102885780601f1061025d57610100808354040283529160200191610288565b820191906000526020600020905b81548152906001019060200180831161026b57829003601f168201915b5050505050905090565b60008061029d610489565b90506102aa818585610491565b600191505092915050565b6000600254905090565b6000806102ca610489565b90506102d78582856104a3565b6102e2858585610538565b60019150509392505050565b6000600560009054906101000a900460ff16905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461035c90610d39565b80601f016020809104026020016040519081016040528092919081815260200182805461038890610d39565b80156103d55780601f106103aa576101008083540402835291602001916103d5565b820191906000526020600020905b8154815290600101906020018083116103b857829003601f168201915b5050505050905090565b6000806103ea610489565b90506103f7818585610538565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b61049e838383600161062c565b505050565b60006104af8484610402565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8110156105325781811015610522578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161051993929190610d79565b60405180910390fd5b6105318484848403600061062c565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036105aa5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016105a19190610db0565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361061c5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016106139190610db0565b60405180910390fd5b610627838383610803565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361069e5760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016106959190610db0565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107105760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016107079190610db0565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555080156107fd578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107f49190610bf8565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036108555780600260008282546108499190610dfa565b92505081905550610928565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156108e1578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108d893929190610d79565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361097157806002600082825403925050819055506109be565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610a1b9190610bf8565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610a62578082015181840152602081019050610a47565b60008484015250505050565b6000601f19601f8301169050919050565b6000610a8a82610a28565b610a948185610a33565b9350610aa4818560208601610a44565b610aad81610a6e565b840191505092915050565b60006020820190508181036000830152610ad28184610a7f565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b0a82610adf565b9050919050565b610b1a81610aff565b8114610b2557600080fd5b50565b600081359050610b3781610b11565b92915050565b6000819050919050565b610b5081610b3d565b8114610b5b57600080fd5b50565b600081359050610b6d81610b47565b92915050565b60008060408385031215610b8a57610b89610ada565b5b6000610b9885828601610b28565b9250506020610ba985828601610b5e565b9150509250929050565b60008115159050919050565b610bc881610bb3565b82525050565b6000602082019050610be36000830184610bbf565b92915050565b610bf281610b3d565b82525050565b6000602082019050610c0d6000830184610be9565b92915050565b600080600060608486031215610c2c57610c2b610ada565b5b6000610c3a86828701610b28565b9350506020610c4b86828701610b28565b9250506040610c5c86828701610b5e565b9150509250925092565b600060ff82169050919050565b610c7c81610c66565b82525050565b6000602082019050610c976000830184610c73565b92915050565b600060208284031215610cb357610cb2610ada565b5b6000610cc184828501610b28565b91505092915050565b60008060408385031215610ce157610ce0610ada565b5b6000610cef85828601610b28565b9250506020610d0085828601610b28565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610d5157607f821691505b602082108103610d6457610d63610d0a565b5b50919050565b610d7381610aff565b82525050565b6000606082019050610d8e6000830186610d6a565b610d9b6020830185610be9565b610da86040830184610be9565b949350505050565b6000602082019050610dc56000830184610d6a565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610e0582610b3d565b9150610e1083610b3d565b9250828201905080821115610e2857610e27610dcb565b5b9291505056fea2646970667358221220ef899ee6ae9a23730aedf9e330bfa84bbbce0963e1f7f67c4271f863405692ba64736f6c634300081c0033";
            // const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')
            const web3 = new Web3(wallet.provider);
            const myContract = new web3.eth.Contract(abi);

            const contractDeployer = myContract.deploy({
                data: bytecode,
                arguments: [tokenInfo.name, tokenInfo.symbol, tokenInfo.decimals, tokenInfo.supplies],
            });
            const gas = await contractDeployer.estimateGas({
                from: wallet.accounts[0].address,
            });
            const gasPrice = await web3.eth.getGasPrice();
            console.log('Estimated gas:', gas, gasPrice);
            try {
                const tx = await contractDeployer.send({
                    from: wallet.accounts[0].address,
                    gas,
                    gasPrice,
                });
                console.log('Contract deployed at address: ' + tx.options.address);
                await axios.post("/api/insert", tokenInfo);

            } catch (error) {
                console.error(error);
            }
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