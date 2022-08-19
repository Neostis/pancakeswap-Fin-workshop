import * as ethers from 'ethers';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  changeNetwork,
} from '../services/wallet-service';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { _allPairsLength, AllPairs, getAllPairsToken } from '../services/factory-service';
import { pairModule, pairFilter } from '../components/pairModule';
import { ETH_TOKENS, RINKEBY_TOKENS, KOVAN_TOKENS } from '../constants/tokens';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { getAllPairsDetails } from '../constants/tokens';

const pool = () => {
  const [dataList, setDataList] = useState([{}]);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const loadAccountData = async () => {
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    const length = await _allPairsLength();

    // setDataList(await pairModule());
    setDataList(await pairFilter());
    // const balances = await gdataTokenBalance(token1!, address!);
    // setBalanceOfToken1(formatEther(balances));
    if (addr === null) {
      await connectWallet();
      //   defaultValue();
    } else {
      //   setToken1List(getDataList(token2!));
      //   setToken2List(getDataList(token1!));
    }
    if (chainId !== '0x4') {
      await changeNetwork();
      //   defaultValue();
    } else {
      //   setToken1List(getDataList(token2!));
      //   setToken2List(getDataList(token1!));
    }
    // setAddress(addr);
    // setNetwork(chainId);
  };

  useEffect(() => {
    loadAccountData();

    const handleAccountChange = async (addresses: string[]) => {
      setAddress(addresses[0]);
      await loadAccountData();
      //   defaultValue();
    };

    const handleNetworkChange = async (networkId: string) => {
      // console.log('handle change ' + networkId);
      setNetwork(networkId);
      await loadAccountData();
      //   defaultValue();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
  }, []);

  return (
    <div className="bg-bgtheme py-10 flex-column w-auto grid h-auto">
      <div className="justify-self-center bg-blueWidget rounded-3xl w-5/12">
        <div className="rounded-lg  font-bold"></div>
        {/* <button
          className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton 
     text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
        >
          <Link
            href="/liquidity"
            className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                  from-blueswapdark  to-blueswapbutton
         text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
          >
            Back
          </Link>
        </button> */}
        <br />
        <br />
        <div>
          {Object.keys(dataList).length >= 1
            ? Object.keys(dataList).map((key, index) => {
                return (
                  <div key={key}>
                    {/* <a className="px-12 py-3">{(dataList[index]).Object.keys(dataList[key]).token0.name}</a> */}
                    <a>Pool:{Object.keys(dataList[key])}</a>
                    {Object.values(dataList[key]).map((e) => {
                      return (
                        <div>
                          <div className="flex space-x-px">
                            <img src={e.token0.imageUrl} height="30px" width="30px" />
                            <h1>{e.token0.name}</h1>
                          </div>
                          <div className="flex">
                            <img src={e.token1.imageUrl} height="30px" width="30px" />
                            <h1>{e.token1.name}</h1>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            : 'no items'}
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};

export default pool;
