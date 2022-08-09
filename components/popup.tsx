import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import * as ethers from 'ethers';
import {
  connectWallet,
  getWalletAddress,
  getChainId,
  getEthereum,
  getBalance,
  getProvider,
} from '../services/wallet-service';
import { getNetworkName, getNetworkCurrency, getNetworkTokens } from '../constants/network-id';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { Token } from '../types/token.type';
import { ETH_TOKENS } from '../constants/tokens';

export default function popup() {
  const [showModal, setShowModal] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [token1, setToken1] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(getWalletAddress());

    const chainId = await getChainId();
    setNetwork(chainId);

    // const bal = await getBalance(addr);
    // if (bal) {
    //   setBalance(formatEther(bal));
    // }
    const tokenList = getNetworkTokens(chainId);

    // const tokenBalList = await Promise.all(
    //   tokenList.map((token) =>
    //     getTokenBalance(token.address, addr).then((res) =>
    //       formatUnits(res, token.decimals)
    //     )
    //   )
    // );

    // tokenList.forEach((token, i) => {
    //   tokenBalances[token.symbol] = tokenBalList[i];
    // });
    // setTokenBalances({ ...tokenBalances });
  };

  useEffect(() => {
    ETH_TOKENS.map((e) => {
      console.log(e.name, e.imageUrl);
    });
    loadAccountData();
    const handleAccountChange = (address: string[]) => {
      loadAccountData();
      setAddress(address[0]);
    };
    const handleNetworkChange = (networkId: string) => {
      loadAccountData();
      setNetwork(networkId);
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);
    // window.ethereum.on('accountsChanged', (address: string[]) => {
    //     setAddress(address[0]);
    // });
    getEthereum()?.on('chainChanged', handleNetworkChange);
    // window.ethereum.on('chainChanged', (networkId: string) => {
    //     setNetwork(networkId);
    // });
    //
  }, []);

  const showToken = () => {
    console.log(token1);
  };
  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {/* Open regular modal */}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <input placeholder="search token"></input>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {ETH_TOKENS.map((e) => {
                    return (
                      <div key={e.address}>
                        <div className="flex">
                          <img src={e.imageUrl} width="100" height="150"></img>
                          <p>{e.symbol}</p>
                        </div>

                        {/* <Dropdown.Item value={e.symbol}
        onChange={(a) => setToken1(a.target.value)}><img src={e.imageUrl}></img>{e.symbol}</Dropdown.Item> */}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
