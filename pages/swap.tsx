import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState, useRef } from 'react';
import * as ethers from 'ethers';
import abi_contract from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import Select from 'react-select';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  changeNetwork,
  callApprove,
  getAllowance,
  getTokenBalance,
} from '../services/wallet-service';
import {
  getSwapAmountsOut,
} from "../services/router-service";


import { ETH_TOKENS, RINKEBY_TOKENS, KOVAN_TOKENS } from '../constants/tokens';
import { getAddress } from 'ethers/lib/utils';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { formatEther } from 'ethers/lib/utils';

const swap = () => {
  if (typeof window !== 'undefined') {
    let tempWindow = window.ethereum;

    injectStyle();
    if (typeof tempWindow == 'undefined') {
      toast.error('Not have Metamask', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const addr_contract = '0x3e1a682E5a80e822dE1137d21791E066a6d8da0d';

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();
  const [amountIn, setAmountIn] = useState<number | null>(null);
  const [balanceOfToken1, setBalanceOfToken1] = useState<string | null>(null);
  const amountOut = useRef(0);
  const [testOut, setTestOut] = useState<string | null>(null);

  // const [amountOut, setAmountOut] = useState<number | null>(null);

  let option = [{ value: '', label: '', address: '' }];
  ETH_TOKENS.map((e) =>
    option.push({
      value: e.symbol,
      label: (
        <div className="flex space-x-px">
          <img src={e.imageUrl} height="30px" width="30px" />
          {e.symbol}
        </div>
      ),
      address: e.address,
    }),
  );
  option.shift();


  const loadAccountData = async () => {
    const addr = getWalletAddress();
    if (getWalletAddress() === null) {
      await connectWallet();
      // console.log(addr)
    }

    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);
  };

  useEffect(() => {
    // console.log(option);

    loadAccountData();
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);
      defaultValue();
      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      console.log('handle change ' + networkId);
      setNetwork(networkId);

      loadAccountData();
      if (networkId === '0x4') {
      } else {
        defaultValue();
      }
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);

    // if (token1 !== undefined && token2 !== undefined && amountIn !== null) {
    amountOut.current = Number(getSwapAmountsOut(amountIn, token1, token2));
    // }
  }, []);
  const defaultValue = () => {
    setToken1(undefined);
    setToken2(undefined);
    setAmountIn(null);
    setAmountIn(null);
  };


  const swapExactTokensForTokensHandle = async (amountIn: number, path1: string, path2: string) =>
  // amountIn: number,
  // amountOutMin: number,
  // path: string,
  // to: string,
  // deadline: string,

  {
    const provider = getProvider()!;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addr_contract, abi_contract, signer);
    const path = [path1, path2]; //An array of token addresses

    const to = signer.getAddress();
    const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20000; // 20 minutes from the current Unix time

    const txResponse = await contract.swapExactTokensForTokens(
      ethers.utils.parseEther(amountIn.toString()),
      0,
      // ethers.utils.parseEther(amountOutMin.toString()),
      path,
      to,
      deadline,
    );

    toast.success('Swap Success!', {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const checkHandle = async () => {
    // address
    if (getWalletAddress() === null) {
      await connectWallet();
      defaultValue();

      // network
      if ((await getChainId()) === '0x4') {
        console.log('is 0x4');
        return true;

      }
      else {
        console.log('change');
        await changeNetwork();
        if ((await getChainId()) === '0x4') {
          toast.success('network have changed!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return true;
        } else {
          defaultValue();
          toast.error('network not change', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
          toast.success('network have changed!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return true;
        } else {
          defaultValue();
          toast.error('network not change', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return false;
        }
      }
    }
  };

  const getSelectTokens1 = async (e: any) => {
    if (e !== null) {
      // checkHandle();
      if (await checkHandle()) {
        if (e.address !== token1) {
          setToken1(e.address);
          const balances = await getTokenBalance(e.address, address!);
          setBalanceOfToken1(formatEther(balances));
        }

        else {
          setBalanceOfToken1(formatEther(0));
        }
      }

    }
  };

  const getSelectTokens2 = async (e: any) => {
    if (e !== null) {
      checkHandle();
      if (e.address !== token2 && getWalletAddress() != null) {
        setToken2(e.address);
      }
      // if(token1 !== null && token2 !== null){
      //   getSwapAmountsOut(amountIn, token1, token2)
      // }
      // else{
      //   setTestOut("0");
      // }
    }
  };

  const handleSwap = async (amountIn: number, path1: string, path2: string) => {
    console.log(amountIn, path1, path2);

    // setTestOut(Number(getSwapAmountsOut(token1, token2)));
    if (amountIn !== null && path1 !== undefined && path2 !== undefined && amountIn > 0) {
      const allowance = formatEther(await getAllowance(path1, address, addr_contract));
      if (Number(allowance) > amountIn) {
        console.log('Allowance');
        swapExactTokensForTokensHandle(amountIn, path1, path2);
      } else {
        console.log('aprrove');
        callApprove(path1, addr_contract);
      }
    } else {
      toast.error('Something Wrong', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangeToken1Handle = async (e: any) => {
    // e.prevent;
   
    if (Number(e) > Number(balanceOfToken1) && !isNaN(e)) {
      setAmountIn(Number(balanceOfToken1));

      // setAmountOut(await getSwapAmountsOut());
    } else if (Number(balanceOfToken1) === 0) {
      setAmountIn(0);
    } else {
      setAmountIn(e);
      // setAmountOut(await getSwapAmountsOut());
    } 
    if (token2 !== null) {
      const amountOut = await getSwapAmountsOut(amountIn, token1, token2);
      setTestOut(amountOut);

    }
  };

<<<<<<< HEAD
  useEffect(() => {
    // console.log(option);

    loadAccountData();
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);
      defaultValue();
      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      console.log('handle change ' + networkId);
      setNetwork(networkId);

      loadAccountData();
      if (networkId === '0x4') {
      } else {
        defaultValue();
      }
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);

    // if (token1 !== undefined && token2 !== undefined && amountIn !== null) {
    amountOut.current = Number(getSwapAmountsOut(token1, token2));
    // }
  }, []);

  const swapExactTokensForTokensHandle = async (amountIn: number, path1: string, path2: string) =>
    // amountIn: number,
    // amountOutMin: number,
    // path: string,
    // to: string,
    // deadline: string,

    {
      const provider = getProvider()!;
      const signer = provider.getSigner();
      const contract = new ethers.Contract(addr_contract, abi_contract, signer);
      const path = [path1, path2]; //An array of token addresses

      const to = signer.getAddress();
      const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20000; // 20 minutes from the current Unix time

      const txResponse = await contract.swapExactTokensForTokens(
        ethers.utils.parseEther(amountIn.toString()),
        0,
        // ethers.utils.parseEther(amountOutMin.toString()),
        path,
        to,
        deadline,
      );

      await txResponse.wait();

      toast.success('Swap Success!', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
=======
>>>>>>> b09e02a332439c542c42c46e7bf8b0e18afc7d66

  return (
    <div className="bg-bgtheme py-10 w-auto grid">
      {/* แก้grid for set width */}
      <div className="justify-self-center bg-blueWidget rounded-3xl ">
        {/* <div>{address}</div> */}
        <div className="w-96 rounded-lg  font-bold">
          <div className="py-2 flex-column w-auto grid text-textblack ">
            <Select
              defaultValue={token1}
              onChange={(e) => {
                getSelectTokens1(e);
              }}
              options={option}
              autoFocus
              placeholder="Select Token 1"
              isClearable
            />

            {token1 ? (
              // <div>
              //   {balanceOfToken1 === 0 ? (
              //     <input
              //       className="w-11/12 h-14 rounded-lg justify-self-center"
              //       type="number"
              //       value={0}
              //       disabled
              //     ></input>
              //   ) : (
// faster
                  <input
                    className="w-11/12 h-14 rounded-lg justify-self-center"
                    type="number"
                    value={amountIn}
                    // placeholder={balanceOfToken1}
                    onChange={(e) => {
                      onChangeToken1Handle(Number(e.target.value));
                    }}
                  ></input>
              //   )}
              // </div>
            ) : (
              <input
                className="w-11/12 h-14 rounded-lg justify-self-center bg-textwhite"
                value={'Select Token'}
                disabled
              // onChange={0}
              ></input>
            )}
          </div>
          <div className=" flex-column w-auto grid text-textblack ">
            <button
              className="w-6 h-6 rounded-full justify-self-center
                       bg-textwhite hover:bg-bluesky outline outline-[#f3991c] absolute"
            >
              ↓
            </button>
          </div>
          <div className="flex-column w-auto grid text-textblack">
            <Select
              defaultValue={token2}
              onChange={(e) => {
                getSelectTokens2(e);
              }}
              options={option}
              autoFocus
              placeholder="Select Token 2"
              isClearable
            />


            <span className="w-11/12 h-14 rounded-lg justify-self-center bg-textwhite"> {testOut}</span>
          </div>
          <div className="py-4 flex-column w-auto grid text-textblack ">
            <button
              className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
              type="button"
              onClick={(e) => {
                handleSwap(Number(amountIn), token1, token2);
              }}
            >
              Swap
            </button>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          />
          <div className="py-2"></div>
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div>{balanceOfToken1}</div>
      {/* <div>tokenAllowance1:{tokenAllowance1}</div> */}
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};


export default swap;
