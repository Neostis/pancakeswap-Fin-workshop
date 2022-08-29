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
import { pairModule } from '../components/pairModule';
import { ETH_TOKENS } from '../constants/tokens';
import { formatEther, parseUnits } from 'ethers/lib/utils';
// import { getAllPairsDetails } from '../constants/tokens';
import TablePool from '../components/table/TableFilter';

const pool = () => {
  const [dataList, setDataList] = useState([{}]);
  // const [dataList, setDataList] = useState([{}]);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  // SEARCH
  const loadAccountData = async () => {

    const addr = getWalletAddress();
    const chainId = await getChainId();

    if (addr === null) {
      await connectWallet();
    } 
    if (chainId !== '0x4') {
      await changeNetwork();
    } 

  };
  const getData = async () => {
    try {
      if (typeof window !== 'undefined') {
        // console.log("You are on the browser");

        try {
          let savedDataList = window.localStorage.getItem('ownerDataList');
          // console.log(JSON.parse(savedDataList));

          if (savedDataList) {
            // console.log(JSON.parse(savedDataList));
            setDataList(JSON.parse(savedDataList));
          } else {
            setDataList(JSON.parse('{}'));
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // console.log("You are on the server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        await getData();
        await loadAccountData();
      };
      fetchData();

      const handleAccountChange = async (addresses: string[]) => {
        setAddress(addresses[0]);
        await loadAccountData();
      };

      const handleNetworkChange = async (networkId: string) => {
        setNetwork(networkId);
        await loadAccountData();
      };

      getEthereum()?.on('accountsChanged', handleAccountChange);

      getEthereum()?.on('chainChanged', handleNetworkChange);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const [query, setQuery] = useState('');

  return (
    <div className="py-10 flex-column w-auto grid h-auto">
      <div className="justify-self-center bg-blueWidget rounded-3xl w-7/12">
        {/* <div className="rounded-lg  font-bold"></div> */}

        {/* <input
          type="text"
          placeholder="SEARCH..."
          className=" text-textblack"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <ul className="list">
          {Object.keys(dataList).length >= 1
            ? Object.keys(dataList).map((key) => {
                return (
                  <div key={key}>
                    {Object.values(dataList[key])
                      .filter(
                        (e) =>
                          e.token0.symbol.toLowerCase().includes(query) ||
                          e.token1.symbol.toLowerCase().includes(query),
                      )
                      .map((item) => (
                        <div>
                          <a className=" text-textwhite">Pool:{Object.keys(dataList[key])}</a>
                          <div className="flex space-x-px text-textwhite">
                            <img src={item.token0.imageUrl} height="30px" width="30px" />
                            <h1>{item.token0.name}</h1>
                          </div>
                          <div className="flex space-x-px text-textwhite">
                            <img src={item.token1.imageUrl} height="30px" width="30px" />
                            <h1>{item.token1.name}</h1>
                          </div>
                        </div>
                      ))}
                  </div>
                );
              })
            : 'no items'}
        </ul> */}

      <TablePool />
      </div>

    </div>
  );
};

export default pool;
