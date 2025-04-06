import '../styles/globals.css'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
const chains = [{
  id: '0x2105',
  token: 'ETH',
  label: 'Base',
  rpcUrl: 'https://mainnet.base.org'
}, {
  id: '0x38',
  token: 'BNB',
  label: 'BSC',
  rpcUrl: 'https://bsc-rpc.publicnode.com'
}]
const wallets = [injectedModule()]

function MyApp({ Component, pageProps }) {
  const web3Onboard = init({
    wallets,
    chains,
    // appMetadata: {
    //   name: '老板工具',
    //   icon: '<svg>App Icon</svg>',
    //   description: '这是很厉害的老板工具'
    // }
  })


  return <Web3OnboardProvider web3Onboard={web3Onboard}>
    <Component {...pageProps} />
  </Web3OnboardProvider>

}

export default MyApp
