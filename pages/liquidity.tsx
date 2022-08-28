import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { pairModule, poolList } from '../components/pairModule';
import { getBalanceOf } from '../services/pair-service';
import { formatEther, getAddress } from 'ethers/lib/utils';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  changeNetwork,
} from '../services/wallet-service';

const liquidity = () => {
  const [open, setOpen] = React.useState(false);

  const [dataList, setDataList] = useState([{}]);
  // const [dataList, setDataList] = useState<[{}] | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  const loadAccountData = async () => {

    const addr = getWalletAddress();
    const chainId = await getChainId();
    if (addr === null) {

      await connectWallet();

    }
    if (chainId !== '0x4') {
      await changeNetwork();
    } 
    setAddress(addr);
    setNetwork(chainId);
  };
  

  const getData = async () => {
    const obPromise = (key: any, savedDataList: any) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          const balance = formatEther(
            await getBalanceOf(Object.keys(JSON.parse(savedDataList)[key])[0], getWalletAddress()),
          );

          if (Number(balance) > 0) {
            resolve({ [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance });
          } else {
          }
        }, 1000);
      });
    };

    try {
      if (typeof window !== 'undefined') {
        let savedDataList = window.localStorage.getItem('ownerDataList');

        if (savedDataList) {
          const a = Promise.all(
            Object.keys(JSON.parse(savedDataList)).map(async (key, index) => {
              const ob = await obPromise(key, savedDataList)
                .then((result) => {
                  return result;
                  // ob.push(result);
                })
                .catch((error) => {
                  alert(error);
                });

              // const mappingData = {
              //   ...dataList,
              //   a,
              // };;
              // window.localStorage.setItem('ownerDataList', JSON.stringify(ob));
              // await getBalanceOf(Object.keys(JSON.parse(savedDataList)[key])[0], getWalletAddress()),
              // if (Number(balance) > 0) {
              //   ob.push({ [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance });
              //   // return { [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance };
              // }
              
              const mappingData = [...dataList, ob];
              setDataList(mappingData);
              return ob;
            }),
          );

          // setDataList(ob);
          // Promise.all(promises).then(function (results) {
          //   console.log(results);
          // });

          // ob.shift();

          // console.log(JSON.parse(savedDataList));
        } else {
          setDataList(JSON.parse('{}'));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    loadAccountData();
    const interval = setInterval(() => {
      const fetchData = async () => {
        // await getData();
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

  return (
    <div className=" py-10 flex-column w-auto grid h-auto">
      <div className="justify-self-center bg-blueWidget rounded-3xl w-5/12">
        <div className="rounded-lg  font-bold">
          <div>
            <div className="">
              <h1 className="px-5 text-textwhite h-12">Addquidity</h1>
            </div>
            <div className="py-10 flex-column w-auto grid text-textblack ">
              <button
                className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton 
     text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
              >
                <Link
                  href="/addliquidity"
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                  from-blueswapdark  to-blueswapbutton
         text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                >
                  Add Liquidity
                </Link>
              </button>
            </div>
            <div>Pool</div>
        {dataList ? (
          <div>
            {' '}
            {Object.keys(dataList).map((key) => {
              
              return (
                <div key={key}>
                  <a>{Object.keys(dataList[key])[0]}</a>
                  <a>{Object.values(dataList[key])[0]}</a>
                </div>
              );
            })}
          </div>
        ) : (
          <h2>no item</h2>
        )}
            <div className="flex-column w-auto grid ">
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>

              <div className="py-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
      </div>
      {/* <button onClick={getDataList}>checkData</button> */}

    </div>
  );
};

export default liquidity;