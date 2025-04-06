import styles from '../styles/Home.module.css';
import { useMemo, useState, useEffect } from 'react';
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { ethers } from 'ethers'
import { AccountContext } from '../context/context'
import { Button, Dropdown, Space } from 'antd';
import PublishToken from './components/PublishToken/PublishToken';
import Web3 from 'web3';
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

export default function Home() {

  const [nav, setNav] = useState(0);
  /* create local state to save account information after signin */
  const makeShortName = (str) => {
    return str.substr(0, 3) + "..." + str.substr(str.length - 3, 3);
  }
  const [
    {
      wallet, // the wallet that has been connected or null if not yet connected
      connecting // boolean indicating if connection is in progress
    },
    connect, // function to call to initiate user to connect wallet
    disconnect, // function to call with wallet<DisconnectOptions> to disconnect wallet
    updateBalances, // function to be called with an optional array of wallet addresses connected through Onboard to update balance or empty/no params to update all connected wallets
    setWalletModules, // function to be called with an array of wallet modules to conditionally allow connection of wallet types i.e. setWalletModules([ledger, trezor, injected])
    setPrimaryWallet // function that can set the primary wallet and/or primary account within that wallet. The wallet that is set needs to be passed in for the first parameter and if you would like to set the primary account, the address of that account also needs to be passed in
  ] = useConnectWallet()
  const [
    {
      chains, // the list of chains that web3-onboard was initialized with
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()
  /* the connect function uses web3 modal to connect to the user's wallet */
  
  if (wallet) {
    // const onconnect = async () => {
    //   const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')            
    //   setAccount(wallet.accounts[0])
    //   setShortaccount(makeShortName(wallet.accounts[0]));
    //   localStorage.setItem('isWalletConnected', 'true');
    //   // const obj = new Web3(wallet.provider);
    //   // setWeb3(obj);
    //   // console.log("sinboss", obj.eth.getAccounts(), await provider.getNetwork());
    // }        
    // onconnect();
  }

  const clickNav = (idx) => {
    // if(idx > 0){
    //   if (wallet.publicKey == null){
    //     alert("请线连接钱包");
    //   }
    //   return;
    // }
    setNav(idx);
  }

  const items = [
    {
      label: 'BSC',
      key: 'bsc',
    },
    {
      label: 'Base',
      key: 'base',
    },
  ];
  const items1 = [
    {
      label: '断开连接',
      key: 'disconnect',
    },
  ];

  const onClickChain = async ({ key }) => {
    if (connectedChain){
      if (key == "bsc" && connectedChain.id != "0x38") {
        setChain({chainId:"0x38"})      
      }
      if (key == "base" && connectedChain.id != "0x2105") {
        setChain({chainId:"0x2105"})      
      }
    } 

  }
  const onClickAddress = ({ key }) => {
    // 断卡
    disconnect(wallet)
  }
  return (
    <div>
      <div className="header">
        <Dropdown menu={{ items, onClick: onClickChain }}>
          <a onClick={e => e.preventDefault()} style={{ marginRight: "20px", borderRadius: "5px", border: "1px solid blue", padding: "3px 5px", cursor: "pointer" }} >
            <Space>
              链：{connectedChain?(connectedChain.id == "0x38" ? "BSC" : "Base"):"未连"}
            </Space>
          </a>
        </Dropdown>
        {
          !wallet && (
            <div className="accountInfo">
              <Button type='primary' onClick={() => {
                connect()
              }}>连接钱包</Button>
            </div>
          )
        }
        {
          wallet &&
          <Dropdown menu={{ items: items1, onClick: onClickAddress }}>
            <a onClick={e => e.preventDefault()} style={{ marginRight: "20px", borderRadius: "5px", border: "1px solid blue", padding: "3px 5px", cursor: "pointer" }} >
              <Space>
                {makeShortName(wallet.accounts[0].address)}
              </Space>
            </a>
          </Dropdown>
        }
      </div>
      <AccountContext.Provider >
        <div className={styles.App}>
          <div className={styles.header}>
            <div className={nav == 0 ? styles.hitem : ''} onClick={() => { clickNav(0) }}>发币</div>
            <div className={nav == 1 ? styles.hitem : ''} onClick={() => { clickNav(1) }}>开池子</div>
            <div style={{ flex: 1 }}></div>
          </div>
          {
            nav == 0 &&
            <PublishToken></PublishToken>
          }
          {/* {
            nav == 1 &&
            <CreatePool></CreatePool>
          } */}

        </div>
      </AccountContext.Provider>
    </div>
  );


}

