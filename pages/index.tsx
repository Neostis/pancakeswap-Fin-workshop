import type { NextPage } from 'next';
import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
// import HomeModule from '../components/HomeModule';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  getAllowance,
  changeNetwork,
  callApprove,
  getTokenBalance,
} from '../services/wallet-service';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
const Home: NextPage = () => {
  const toastOptions = {
    // onOpen: props => console.log(props.foo),
    // onClose: props => console.log(props.foo),
    // autoClose: 2500,
    // closeButton: FontAwesomeCloseButton,
    // type: toast.TYPE.INFO,
    // hideProgressBar: false,
    // position: toast.POSITION.TOP_LEFT,
    // pauseOnHover: true,
    // transition: MyCustomTransition,
    // progress: 0.2
    // // and so on ...
    position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
};
  if (typeof window !== 'undefined') {
    let tempWindow = window.ethereum;

    injectStyle();
    if (typeof tempWindow == 'undefined') {
      toast.error('Not have Metamask', toastOptions);
      toast.clearWaitingQueue()
    }
  }

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  
  const loadAccountData = async () => {

    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();

    if (addr === null) {
      await connectWallet();
    } else {

    }
    if (chainId !== '0x4') {
      await changeNetwork();
    } else {
      // setNetwork(chainId);
    }
    setAddress(addr);
    setNetwork(chainId);
  };

  useEffect(() => {
    loadAccountData();
    const handleAccountChange = async (addresses: string[]) => {
      setAddress(addresses[0]);
      await loadAccountData();
    };

    const handleNetworkChange = async (/*networkId: string*/) => {
      await loadAccountData();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
  }, []);

  const checkHandle = async () => {
    // address
    if (getWalletAddress() === null) {
      await connectWallet();

      // network
      if ((await getChainId()) === '0x4') {
        console.log('is 0x4');
        return true;
      } else {
        console.log('change');
        await changeNetwork();
        if ((await getChainId()) === '0x4') {
          toast.success('network have changed!', toastOptions);
          return true;
        } else {
          toast.error('network not change', toastOptions);
          return false;
        }
      }
    } else {
      // network
      if ((await getChainId()) === '0x4') {
        console.log('is 0x4');
        return true;
      } else {
        console.log('change');
        await changeNetwork();
        if ((await getChainId()) === '0x4') {
          toast.success('network have changed!', toastOptions);
          return true;
        } else {
          toast.error('network not change', toastOptions);
          return false;
        }
      }
    }
  };  return (
    <div className='h-auto w-auto '>

<div className='grid grid-cols-1 gap-4 py-20'>
  <div className='justify-self-center grid grid-cols-1'>
    <h3 className='justify-self-center text-textwhite text-5xl font-bold'>Welcome to Fin Swap</h3>
    <div className="justify-self-center flex py-20 font-bold">
        <h3 className='text-lightbluebg text-5xl mr-4'>swap</h3>
        <h3 className='text-textwhite text-5xl mr-4'>and</h3>
        <h3 className='text-lightbluebg text-5xl mr-4'>liquidity</h3>
        <h3 className='text-textwhite text-5xl mr-4'>platfrom</h3>
      </div>
      <div className="justify-self-center">

        <button
          className="m-8 justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
          from-blueswapdark  to-blueswapbutton 
          text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
          onClick={checkHandle}>
          <Link href="/swap">Swap Now</Link>
        </button>
        <button
          className="m-8 justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
          from-blueswapdark  to-blueswapbutton 
          text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
          onClick={checkHandle}>
          <Link href="/addliquidity">Liquidity Now</Link>
        </button>
      </div>
      <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
              />
  </div>


</div>
     
        
    </div>
  );
};

export default Home;
