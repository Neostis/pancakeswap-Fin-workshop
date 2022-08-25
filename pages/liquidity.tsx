import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  );
};

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
    } else {
    }
    if (chainId !== '0x4') {
      await changeNetwork();
    } else {
    }
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
  // const getDataList = () => {
  //   console.log(dataList.length);

  //   console.log(...dataList);
  //   console.log(Object.keys(dataList[0]).toString());
  //   const mapped = Object.fromEntries(Object.entries(dataList).map(([key, value]) => [key, [value]]));

  // };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('dataList', ...dataList);
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

  return (
    <div className="bg-bgtheme py-10 flex-column w-auto grid h-auto">
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
            <div className="flex-column w-auto grid ">
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div>{dataList.length}</div>

              <div className="py-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div>
        <div>Pool</div>
        {dataList ? (
          <div>
            {' '}
            {Object.keys(dataList).map((key, index) => {
              return (
                <div key={key}>
                  <a>Pool:{Object.keys(dataList[key])[0]}</a>
                  <a>Pool:{Object.values(dataList[key])[0]}</a>
                </div>
              );
            })}
          </div>
        ) : (
          <h2>no item</h2>
        )}
      </div>
      <div className="py-10"></div>
      {/* <button onClick={getDataList}>checkData</button> */}
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};

export default liquidity;
// {dataList.length >= 1
//   ? dataList.map((e, index) => {
//       return (
//         <div key={index}>

//           <h1>{Object.keys(e)[0]}</h1>

//         </div>
//       );
//     })
//     : 'no items'}
