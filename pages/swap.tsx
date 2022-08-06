import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import * as ethers from 'ethers';
import abi_contract from '../ABI_CONTRACT/abi.json';
// import SwapComponent from "../components/SwapComponent";
// import ViewSwap from "../view/ViewSwap";
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
  const [token1, setToken1] = useState<string | null>(null);
  const [token2, setToken2] = useState<string | null>(null);
  const [amountToken1, setAmountToken1] = useState<number>(0);

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);
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

  const swapExactTokensForTokensHandle = async (
    amountIn: number,
    amountOutMin: number,
    path: string,
    to: string,
    // deadline: string,
  ) => {
    const provider = getProvider()!;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addr_contract, abi_contract, signer);
    // const path = [ETH_TOKENS[0].address, ETH_TOKENS[1].address]; //An array of token addresses
    // const to = signer.getAddress(); // should be a checksummed recipient address
    const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time

    const txResponse = await contract.swapExactTokensForTokens(
      ethers.utils.parseEther(amountIn.toString()),
      ethers.utils.parseEther(amountOutMin.toString()),
      path,
      signer.getAddress(),
      deadline,
    );

    console.log();
  };



return (
  <div className="bg-bgtheme py-10 w-auto grid">
    {/* แก้grid for set width */}
    <div className="justify-self-center bg-blueWidget rounded-3xl ">
      <div>{address}</div>
      <div className="w-96 rounded-lg  font-bold">
        <div>
          <div className="">
            <h1 className="px-5 text-textwhite">Swap</h1>
          </div>
          <div className="">
            <div className="py-2 flex-column w-auto grid text-textblack ">
              <input className="w-11/12 h-14 rounded-lg justify-self-center"></input>
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
              <input className="w-11/12 h-14 rounded-lg justify-self-center"></input>
            </div>
            <div className="py-4 flex-column w-auto grid text-textblack ">
              <button
                className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
              //  onClick={(e) =>
              //  { swapExactTokensForTokensHandle(
              //     Number(amountToken1),
              //     0,
              //     // ETH_TOKENS[0].address.toString() + ',' + ETH_TOKENS[1].address.toString(),
              //     '0xF76d21633506159be58395affBA7173BF66D4E9B, 0x205c473567c7C60C502AfE3B39E9BE872d5Ee2d7',
              //     '0xFfF28ce226130d0005e43960428b1eD81b384e3F',
              //     '10000000000000',
              //   )}
              // }
              >
                Swap
              </button>

            <div className="">
              <div className="py-2 flex-column w-auto grid text-textblack ">
                <select className="d-inline mx-2" color="blue" id="token1-select">
                  <option value={ETH_TOKENS[0].address}>{ETH_TOKENS[0].symbol}</option>
                  <option value={ETH_TOKENS[1].address}>{ETH_TOKENS[1].symbol}</option>
                  <option value={ETH_TOKENS[2].address}>{ETH_TOKENS[2].symbol}</option>
                </select>

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
                <select className="d-inline mx-2" color="blue" id="token2-select">
                  <option value={ETH_TOKENS[0].address}>{ETH_TOKENS[0].symbol}</option>
                  <option value={ETH_TOKENS[1].address}>{ETH_TOKENS[1].symbol}</option>
                  <option value={ETH_TOKENS[2].address}>{ETH_TOKENS[2].symbol}</option>
                </select>

                <span className="w-11/12 h-14 rounded-lg justify-self-center"></span>
              </div>
              <div className="py-4 flex-column w-auto grid text-textblack ">
                <button
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                  type="button"
                  onClick={(e) => {
                    swapExactTokensForTokensHandle();
                    Number(amountToken1),
                      0,
                      '[' + ETH_TOKENS[0].address + ',' + ETH_TOKENS[1].address + ']',
                      // '0xF76d21633506159be58395affBA7173BF66D4E9B, 0x205c473567c7C60C502AfE3B39E9BE872d5Ee2d7',
                      '0xFfF28ce226130d0005e43960428b1eD81b384e3F';
                    // '10000000000000',
                  }}
                >
                  Swap
                </button>
              </div>
              <div className="py-2"></div>
            </div>
            <div className="py-2"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="py-10"></div>
    <div className="py-10"></div>
    <div className="py-10"></div>
    <div className="py-10"></div>
  </div>
  </div>
)
}

export default swap;
