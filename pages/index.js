import styles from '../styles/Home.module.css';
import { useMemo, useState, useEffect } from 'react';

import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context/context'
import { Button, Dropdown, Space } from 'antd';

export default function Home() {
  const [nav, setNav] = useState(0);
  /* create local state to save account information after signin */
  const [account, setAccount] = useState('');
  const [shortaccount, setShortaccount] = useState('');
  const [network, setNetwork] = useState('bsc');
  const makeShortName = (str) => {
    return str.substr(0, 3) + "..." + str.substr(str.length - 3, 3);
  }
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: "your-infura-id"
          },
        },
      },
    })
    return web3Modal
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
      setShortaccount(makeShortName(accounts[0]));
      localStorage.setItem('isWalletConnected', 'true');
    } catch (err) {
      console.log('error:', err)
    }
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
  const onClickChain = ({ key }) => {
    setNetwork(key)
  }
  const onClickAddress = ({ key }) => {
    // 断卡
    setAccount('')
    setShortaccount('')
  }
  return (
    <div>
      <div className="header">
        <Dropdown menu={{ items, onClick: onClickChain }}>
          <a onClick={e => e.preventDefault()} style={{ marginRight: "20px", borderRadius: "5px", border: "1px solid blue", padding: "3px 5px", cursor:"pointer" }} >
            <Space>
              链：{network == "bsc" ? "BSC" : "Base"}
            </Space>
          </a>
        </Dropdown>
        {
          !account && (
            <div className="accountInfo">
              <Button type='primary' onClick={() => {
                connect()
              }}>连接钱包</Button>
            </div>
          )
        }
        {
          shortaccount &&
          <Dropdown menu={{ items : items1, onClick: onClickAddress }}>
            <a onClick={e => e.preventDefault()} style={{ marginRight: "20px", borderRadius: "5px", border: "1px solid blue", padding: "3px 5px", cursor:"pointer" }} >
              <Space>
                {shortaccount}
              </Space>
            </a>
          </Dropdown>
        }
      </div>
      <AccountContext.Provider value={account}>
        <div className={styles.App}>
          <div className={styles.header}>
            <div className={nav == 0 ? styles.hitem : ''} onClick={() => { clickNav(0) }}>发币</div>
            <div className={nav == 1 ? styles.hitem : ''} onClick={() => { clickNav(1) }}>开池子</div>
            <div style={{ flex: 1 }}></div>
          </div>
          {/* {
            nav == 0 &&
            <PublishToken></PublishToken>
          }          
          {
            nav == 1 &&
            <CreatePool></CreatePool>
          }
          */}
        </div>
      </AccountContext.Provider>
    </div>
  );


}

