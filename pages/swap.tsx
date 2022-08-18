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
import { getSwapAmountsOut, swapExactTokensForTokens } from '../services/router-service';

import { ETH_TOKENS, RINKEBY_TOKENS, KOVAN_TOKENS } from '../constants/tokens';
import { getAddress } from 'ethers/lib/utils';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { formatEther } from 'ethers/lib/utils';
type Keyop = {
  value: any;
  label: any;
  address: any;
};
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

  const addr_Router = '0x500b47A2470175D81eB37295EF7a494bED33F889';

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();
  const [amountIn, setAmountIn] = useState<number | null>(null);
  const [balanceOfToken1, setBalanceOfToken1] = useState<string | null>(null);
  const amountOut = useRef(0);
  const [amountOutState, setAmountOut] = useState<string | null>(null);

  const [token1List, setToken1List] = useState<Keyop[]>([]);
  const [token2List, setToken2List] = useState<Keyop[]>([]);

  const [showToken1, setShowToken1] = useState();
  const [showToken2, setShowToken2] = useState();

  const loadAccountData = async () => {
    setShowToken1(null);
    setShowToken2(null);
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    const balances = await getTokenBalance(token1!, address!);
    setBalanceOfToken1(formatEther(balances));
    if (addr === null) {
      await connectWallet();
      defaultValue();
    } else {
      setToken1List(getDataList(token2!));
      setToken2List(getDataList(token1!));
    }
    if (chainId !== '0x4') {
      await changeNetwork();
      defaultValue();
    } else {
      setToken1List(getDataList(token2!));
      setToken2List(getDataList(token1!));
    }
    setAddress(addr);
    setNetwork(chainId);
  };

  useEffect(() => {
    loadAccountData();
    const handleAccountChange = async (addresses: string[]) => {
      setAddress(addresses[0]);
      await loadAccountData();
      defaultValue();
    };

    const handleNetworkChange = async (networkId: string) => {
      // console.log('handle change ' + networkId);
      setNetwork(networkId);
      await loadAccountData();
      defaultValue();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);

    // if (token1 !== undefined && token2 !== undefined && amountIn !== null) {
    amountOut.current = Number(getSwapAmountsOut(amountIn, token1, token2));
    // }
  }, []);

  const defaultValue = () => {
    setToken1(null);
    setToken2(null);
    // setToken1List([]);
    // setToken2List([]);
    setAmountIn(null);
    // setAmountIn(null);
    setAmountOut(null);

    // setShowToken1(null);
    // setShowToken2(null);
    // setToken1(null);
    // setToken2(null);
  };

  // const checkHandle = async () => {
  //   // address
  //   if (getWalletAddress() === null) {
  //     await connectWallet();
  //     defaultValue();

  //     // network
  //     if ((await getChainId()) === '0x4') {
  //       console.log('is 0x4');
  //       return true;
  //     } else {
  //       console.log('change');
  //       await changeNetwork();
  //       if ((await getChainId()) === '0x4') {
  //         toast.success('network have changed!', {
  //           position: 'top-right',
  //           autoClose: 2500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         return true;
  //       } else {
  //         defaultValue();
  //         toast.error('network not change', {
  //           position: 'top-right',
  //           autoClose: 2500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         return false;
  //       }
  //     }
  //   } else {
  //     // network
  //     if ((await getChainId()) === '0x4') {
  //       console.log('is 0x4');
  //       return true;
  //     } else {
  //       console.log('change');
  //       await changeNetwork();
  //       if ((await getChainId()) === '0x4') {
  //         toast.success('network have changed!', {
  //           position: 'top-right',
  //           autoClose: 2500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         return true;
  //       } else {
  //         defaultValue();
  //         toast.error('network not change', {
  //           position: 'top-right',
  //           autoClose: 2500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         return false;
  //       }
  //     }
  //   }
  // };

  const getDataList = (address: any) => {
    let option: Keyop[] = [];

    ETH_TOKENS.filter((event) => {
      if (event.address !== address) {
        option.push({
          value: event.symbol,
          label: (
            <div className="flex space-x-px">
              <img src={event.imageUrl} height="30px" width="30px" />
              {event.symbol}
            </div>
          ),
          address: event.address,
        });
      }
    });
    return option;
  };

  const getSelectTokens1 = async (e: any) => {
    if (e !== null) {
      if (e.address !== token2) {
        setToken1(e.address);
        setShowToken1(e);
        if (network === '0x4') {
          const balances = await getTokenBalance(e.address, address!);
          setBalanceOfToken1(formatEther(balances));
        }
        setToken2List(getDataList(e.address));

        // await checkHandle();
      } else {
        setBalanceOfToken1(formatEther(0));
        // await checkHandle();
      }
    }
  };

  const getSelectTokens2 = async (e: any) => {
    if (e !== null) {
      // if () {
      if (e.address !== token1 /* && getWalletAddress() != null*/) {
        setToken2(e.address);
        setShowToken2(e);
        setToken1List(getDataList(e.address));
        // await checkHandle();
      }
      // }
    }
  };

  const handleSwap = async (amountIn: number, path1: string, path2: string) => {
    console.log(amountIn, path1, path2);

    // setAmountOut(Number(getSwapAmountsOut(token1, token2)));
    if (amountIn !== null && path1 !== undefined && path2 !== undefined && amountIn > 0) {
      const allowance = formatEther(await getAllowance(path1, address, addr_Router));
      if (Number(allowance) > amountIn) {
        console.log('Allowance');
        try {
          await swapExactTokensForTokens(amountIn, path1, path2);
          toast.success('Swap Success!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } catch (error) {
          toast.error('Insufficient liquidity for this trade', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        console.log('approve');
        callApprove(path1, addr_Router);
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

  const onChangeToken1Handle = async (event: any) => {
    // e.prevent;

    if (Number(balanceOfToken1) === 0) {
      setAmountIn(0);

      // setAmountOut(await getSwapAmountsOut());
    } else if (Number(event) > Number(balanceOfToken1) && !isNaN(event)) {
      setAmountIn(Number(balanceOfToken1));
    } else {
      setAmountIn(event);
      // setAmountOut(await getSwapAmountsOut());
    }
    if (token2 !== null) {
      try {
        let amountOut;

        if (event > 0) {
          if (event > Number(balanceOfToken1)) {
            amountOut = await getSwapAmountsOut(Number(balanceOfToken1), token1, token2);
          } else if (Number(balanceOfToken1) !== 0) {
            amountOut = await getSwapAmountsOut(event, token1, token2);
          }
        } else {
          amountOut = 0;
        }
        setAmountOut(amountOut);
      } catch (CALL_EXCEPTION) {
        console.log('CALL_EXCEPTION ERROR');
      }
    }
  };

  return (
    <div className="bg-bgtheme py-10 w-auto grid min-h-screen">
      {/* แก้grid for set width */}
      <div className="justify-self-center bg-blueWidget rounded-3xl ">
        {/* <div>{address}</div> */}
        <div className="w-96 rounded-lg  font-bold">
          <div className="py-2 flex-column w-auto grid text-textblack ">
            <Select
              // defaultValue={token1}
              value={showToken1}
              onChange={(e) => {
                getSelectTokens1(e);
              }}
              options={token1List}
              autoFocus
              placeholder="Select Token 1"
            />

            {token1 ? (
              <input
                className="w-11/12 h-14 rounded-lg justify-self-center"
                type="number"
                value={amountIn}
                placeholder={balanceOfToken1}
                onChange={(e) => {
                  onChangeToken1Handle(Number(e.target.value));
                }}
              ></input>
            ) : (
              //   )}
              // </div>
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
              value={showToken2}
              onChange={(e) => {
                getSelectTokens2(e);
              }}
              options={token2List}
              autoFocus
              placeholder="Select Token 2"
            />

            <span className="w-11/12 h-14 rounded-lg justify-self-center bg-textwhite"> {amountOutState}</span>
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
      <div>{address}</div>
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
