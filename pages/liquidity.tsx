import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import PairLiquidity from '../components/PairLiquidity';
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
    console.log();
    // const filterList = (addr, index) => {
    //   console.log('addr', Object.keys(addr));
    // };
    // const dataFiler = await Object.keys(dataList).map(async (key, index) => {
    //   return console.log(await Object.keys(dataList[key]));
    // });
  };
  // function obPromise(){
  //   return new Promise((resolve, reject) =>{
  //     setTimeout(async()=>{
  //       const balance = formatEther(
  //         await getBalanceOf(Object.keys(JSON.parse(savedDataList)[key])[0], getWalletAddress()),
  //       );
  //     })
  //   })
  // }
  const getData = async () => {
    let ob = [];
    const obPromise = (key: any, savedDataList: any) => {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          const balance = formatEther(
            await getBalanceOf(Object.keys(JSON.parse(savedDataList)[key])[0], getWalletAddress()),
          );
          if (Number(balance) > 0) {
            resolve(balance);
            // return { [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance };
          } else {
          }
        }, 1000);
      });
    };

    try {
      if (typeof window !== 'undefined') {
        // console.log("You are on the browser");

        let savedDataList = window.localStorage.getItem('dataList');
        // console.log(savedDataList);

        if (savedDataList) {
          const a = Promise.all(
            Object.keys(JSON.parse(savedDataList)).map(async (key, index) => {
              await obPromise(key, savedDataList)
                .then((result) => {
                  const mappingData = {
                    ...dataList,
                    result,
                  };
                  setDataList(mappingData);

                  ob.push(result);
                })
                .catch((error) => {
                  alert(error);
                });
              // await getBalanceOf(Object.keys(JSON.parse(savedDataList)[key])[0], getWalletAddress()),
              // if (Number(balance) > 0) {
              //   ob.push({ [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance });
              //   // return { [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance };
              // }
            }),
          );
          // setDataList(ob);
          // Promise.all(promises).then(function (results) {
          //   console.log(results);
          // });

          // ob.shift();
          console.log(ob);

          console.log(ob.length);

          // console.log(JSON.parse(savedDataList));

          console.log(1);
        } else {
          setDataList(JSON.parse('{}'));
          console.log(2);
        }
      } else {
        // console.log("You are on the server");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDataList = () => {
    console.log(dataList.length);
    console.log(...dataList);
  };

  useEffect(() => {
    // const interval = setInterval(() => {
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
    // }, 3000);
    // return () => clearInterval(interval);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

              <br />
              <br />
              {/* <button
                className="outlined justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton 
     text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                onClick={handleClickOpen}
              >
                <Link
                  href="/pool"
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                  from-blueswapdark  to-blueswapbutton
         text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                >
                  Pool
                </Link>
              </button> */}

              {/* <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                  Pool
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom>
                    <PairLiquidity />
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <button autoFocus onClick={handleClose}>
                    OK
                  </button>
                </DialogActions>
              </BootstrapDialog> */}
            </div>
            <div className="flex-column w-auto grid ">
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div className="py-10"></div>
              <div>{dataList.length}</div>

              {/* 
              <div>
                {Object.keys(dataList).length >= 1
                  ? Object.keys(dataList).map((key, index) => {
                      return (
                        <div key={key}>
                          <a>Pool:{Object.keys(dataList[key])[0]}</a>
           
                        </div>
                      );
                    })
                  : 'no items'}
              </div> */}
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
        {dataList.length >= 1
          ? dataList.map((e, index) => {
              return (
                <div key={index}>
                  {/* <a>key:{item}</a> */}
                  {/* <a className="px-12 py-3">{(dataList[index]).Object.keys(dataList[key]).token0.name}</a> */}
                  <h1>Pool:{Object.keys(e)[0]}</h1>
                </div>
              );
            })
          : 'no items'}
      </div>
      <div className="py-10"></div>
      <button onClick={getDataList}>checkData</button>
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
};

export default liquidity;
