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
import { pairModule, poolList } from '../components/pairModule';
import { ETH_TOKENS } from '../constants/tokens';
import { formatEther, parseUnits } from 'ethers/lib/utils';
// import { getAllPairsDetails } from '../constants/tokens';
import CustomPaginationActionsTable from '../components/table/CustomPaginationActionsTable';
import TableConstants from '../components/table/TableFilter';

const pool = () => {
  const [dataList, setDataList] = useState([{}]);
  // const [dataList, setDataList] = useState([{}]);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  // SEARCH
  const loadAccountData = async () => {
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    const length = await _allPairsLength();

    // setDataList(await pairModule());
    // setDataList(await poolList());
    // const balances = await dataTokenBalance(token1!, address!);
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
    // console.log(dataList);
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

        <TableConstants />
      </div>

    </div>
  );
};

export default pool;
