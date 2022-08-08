import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import * as ethers from "ethers";
import {
  connectWallet,
  getWalletAddress,
  getChainId,
  getEthereum,
  getBalance,
  getProvider,
} from "../services/wallet-service";
import {
  getNetworkName,
  getNetworkCurrency,
  getNetworkTokens,
} from "../constants/network-id";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { Token } from "../types/token.type";
import { ETH_TOKENS } from "../constants/tokens";

export default function popup() {
  const [showModal, setShowModal] = useState(true);
  const [address, setAddress] = useState<string| null>(null);
  const [network, setNetwork] = useState<string| null>(null);
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
    loadAccountData();
    const handleAccountChange = (address: string[]) => {
      loadAccountData();
      setAddress(address[0]);
    };
    const handleNetworkChange = (networkId: string) => {
      loadAccountData();
      setNetwork(networkId);
    };

    getEthereum()?.on("accountsChanged", handleAccountChange);
    // window.ethereum.on('accountsChanged', (address: string[]) => {
    //     setAddress(address[0]);
    // });
    getEthereum()?.on("chainChanged", handleNetworkChange);
    // window.ethereum.on('chainChanged', (networkId: string) => {
    //     setNetwork(networkId);
    // });
    //
  }, []);
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
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <Dropdown className="d-inline mx-2">
                    <Dropdown.Toggle id="dropdown-autoclose-true">Default Dropdown</Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                      <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {/* <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">TEXT here bobo</p>
                </div> */}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
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
