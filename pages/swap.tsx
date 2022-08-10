import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import * as ethers from 'ethers';
import abi_contract from '../ABI_CONTRACT/abi.json';
import Select from 'react-select';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
} from '../services/wallet-service';
import path from 'path';
import { ETH_TOKENS, RINKEBY_TOKENS, KOVAN_TOKENS } from '../constants/tokens';
import { getAddress } from 'ethers/lib/utils';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { formatEther } from 'ethers/lib/utils';

const swap = () => {
  if (typeof window !== 'undefined') {
    injectStyle();
  }
  const addr_contract = '0x3e1a682E5a80e822dE1137d21791E066a6d8da0d';

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();
  const [amountToken1, setAmountToken1] = useState<number | null>(null);
  const [balanceOfToken, setBalanceOfToken] = useState<string | null>(null);

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);
  };

  const getSelectTokens1 = async (e: any) => {
    // setToken1(document.getElementById('list-token1')?.value);
    // console.log('token1: ', document.getElementById('list-token1')?.value);
    if (e !== null) {
      if (e.address !== token2) {
        const balances = await getTokenBalance(e.address, address!);
        setBalanceOfToken(formatEther(balances));
        // console.log(balances);

        setToken1(e.address);

        // console.log(e.address);
      }
    }
  };

  const getSwapAmountsOut = async() =>{
    const path = [token1, token2]; //An array of token addresses
    const contract = new ethers.Contract(addr_contract, abi_contract, getProvider()!);
    return contract.getAmountsOut(ethers.utils.parseEther(amountToken1.toString(), path));
  }

  
  const getSelectTokens2 = (e: any) => {
    // setToken2(document.getElementById('list-token2')?.value);
    // console.log('token2: ', document.getElementById('list-token2')?.value);
    if (e !== null) {
      if (e.address !== token1) {
        setToken2(e.address);
        // console.log(e.address);
      }
    }
  };

  const getTokenBalance = async (tokenAddress: string, ownerAddress: string) => {
    const abi = ['function balanceOf(address owner) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
    return contract.balanceOf(ownerAddress);
  };

  const handleSwap = (amountIn: number, path1: string, path2: string) => {
    // console.log(amountIn, path1, path2);
    // console.log(amountIn, typeof amountIn);

    if (amountIn !== null && path1 !== undefined && path2 !== undefined && amountIn > 0) {
      // console.log(amountIn, path1, path2);

      swapExactTokensForTokensHandle(amountIn, path1, path2);
    } else {
      toast.error('Something Wrong', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    loadAccountData();
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);

      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      setNetwork(networkId);

      loadAccountData();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
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
      const path = [token1, token2]; //An array of token addresses

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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

  // const [selectedOption, setSelectedOption] = useState(null);

  let option = [{ value: '', label: '', address: '' }];
  ETH_TOKENS.map((e) =>
    option.push({
      value: e.symbol,
      label: (
        <div>
          <img src={e.imageUrl} height="30px" width="30px" />
          {e.symbol}
        </div>
      ),
      address: e.address,
    }),
  );
  option.shift();
  // console.log(option);

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
              // isClearable
            />

            <input
              className="w-11/12 h-14 rounded-lg justify-self-center"
              type="number"
              value={amountToken1}
              onChange={(e) =>
                Number(e.target.value) > Number(balanceOfToken) ? balanceOfToken : setAmountToken1(e.target.value)
              }
            ></input>
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
              // isClearable
            />

            <span className="w-11/12 h-14 rounded-lg justify-self-center"></span>
          </div>
          <div className="py-4 flex-column w-auto grid text-textblack ">
            <button
              className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
              type="button"
              onClick={(e) => {
                handleSwap(Number(amountToken1), token1, token2);
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
          />
          <div className="py-2"></div>
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};

export default swap;
