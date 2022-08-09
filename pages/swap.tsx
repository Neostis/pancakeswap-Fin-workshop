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

const swap = () => {
  const addr_contract = '0x3e1a682E5a80e822dE1137d21791E066a6d8da0d';

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();
  const [amountToken1, setAmountToken1] = useState<number>(0);

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);
  };

  const getSelectTokens1 = (e) => {
    // setToken1(document.getElementById('list-token1')?.value);
    // console.log('token1: ', document.getElementById('list-token1')?.value);
    if (e !== null) {
      if (e.address !== token2) {
        setToken1(e.address);
        console.log(e.address);
      }
    }
  };

  const getSelectTokens2 = (e) => {
    // setToken2(document.getElementById('list-token2')?.value);
    // console.log('token2: ', document.getElementById('list-token2')?.value);
    if (e !== null) {
      if (e.address !== token1) {
        setToken2(e.address);
        console.log(e.address);
      }
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

  const swapExactTokensForTokensHandle = async (path1: string, path2: string) =>
    // amountIn: number,
    // amountOutMin: number,
    // path: string,
    // to: string,
    // deadline: string,

    {
      const amountIn = 10;
      const provider = getProvider()!;
      const signer = provider.getSigner();
      const contract = new ethers.Contract(addr_contract, abi_contract, signer);
      // const path = [ETH_TOKENS[0].address, ETH_TOKENS[1].address]; //An array of token addresses
      const path = [token1, token2]; //An array of token addresses

      const to = signer.getAddress(); // should be a checksummed recipient address
      const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

      const txResponse = await contract.swapExactTokensForTokens(
        ethers.utils.parseEther(amountIn.toString()),
        0,
        // ethers.utils.parseEther(amountOutMin.toString()),
        path,
        to,
        deadline,
      );

      console.log();
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
        <div>{address}</div>
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
              isClearable={true}
            />

            {/* {ETH_TOKENS.map((e) => {
              return (
                <Select
                  defaultValue={selectedOption}
                  onChange={(e) => {
                    test(e);
                  }}
                  options={option}
                  autoFocus
                />
              );
            })} */}

            <input
              className="w-11/12 h-14 rounded-lg justify-self-center"
              value={amountToken1}
              onChange={(e) => setAmountToken1(e.target.value)}
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
              isClearable={true}
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
                swapExactTokensForTokensHandle(
                  Number(amountToken1),
                  token1,
                  token2,
                  // 0,
                  // '[' + ETH_TOKENS[0].address + ',' + ETH_TOKENS[1].address + ']',
                  // '0xF76d21633506159be58395affBA7173BF66D4E9B, 0x205c473567c7C60C502AfE3B39E9BE872d5Ee2d7',
                  // '0xFfF28ce226130d0005e43960428b1eD81b384e3F';
                  // '10000000000000',);
                );
              }}
            >
              Swap
            </button>
          </div>
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
