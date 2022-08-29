import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect, useState, useRef } from 'react';
import * as ethers from 'ethers';
import abi_contract from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import Select from 'react-select';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  changeNetwork,
  callApprove,
  getAllowance,
  getTokenBalance,
} from '../services/wallet-service';
import { getSwapAmountsOut, swapExactTokensForTokens } from '../services/router-service';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { ETH_TOKENS, getTokenPairsDetails } from '../constants/tokens';
import { getAddress } from 'ethers/lib/utils';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { formatEther } from 'ethers/lib/utils';
import { Status } from '../types/status';
import { Areachart } from '../components/charts/Areachart';

type Keyop = {
  value: any;
  label: any;
  address: any;
};

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

const swap = () => {
  if (typeof window !== 'undefined') {
    let tempWindow = window.ethereum;

    injectStyle();
    if (typeof tempWindow == 'undefined') {
      toast.error('Not have Metamask', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);

  const [status, setStatus] = React.useState<Status>(Status.NONE);
  const addr_Router = '0x500b47A2470175D81eB37295EF7a494bED33F889';

  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();
  const [amountIn, setAmountIn] = useState<number | null>(null);
  const [balanceOfToken1, setBalanceOfToken1] = useState<string | null>(null);
  const amountOut = useRef(0);
  const [amountOutState, setAmountOut] = useState<string | null>(null);

  const [token1List, setToken1List] = useState<Keyop[]>([]);
  const [token2List, setToken2List] = useState<Keyop[]>([]);

  const [showToken1, setShowToken1] = useState();
  const [showToken2, setShowToken2] = useState();

  const loadAccountData = async () => {
    setShowToken1(null);
    setShowToken2(null);
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    const balances = await getTokenBalance(token1!, address!);
    setBalanceOfToken1(formatEther(balances));
    if (addr === null) {
      await connectWallet();
      defaultValue();
    } else {
      setToken1List(getDataList(token2!));
      setToken2List(getDataList(token1!));
    }
    if (chainId !== '0x4') {
      await changeNetwork();
      defaultValue();
    } else {
      setToken1List(getDataList(token2!));
      setToken2List(getDataList(token1!));
    }
    setAddress(addr);
    setNetwork(chainId);
  };

  useEffect(() => {
    loadAccountData();
    const handleAccountChange = async (addresses: string[]) => {
      setAddress(addresses[0]);
      await loadAccountData();
      defaultValue();
    };

    const handleNetworkChange = async (networkId: string) => {
      // console.log('handle change ' + networkId);
      setNetwork(networkId);
      await loadAccountData();
      defaultValue();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);

    // if (token1 !== undefined && token2 !== undefined && amountIn !== null) {
    amountOut.current = Number(getSwapAmountsOut(amountIn, token1, token2));
    // }
  }, []);

  const defaultValue = () => {
    setToken1(null);
    setToken2(null);
    setAmountIn(null);
    setAmountOut(null);

  };

  const checkHandle = async () => {
    // address
    if (getWalletAddress() === null) {
      await connectWallet();
      defaultValue();

      // network
      if ((await getChainId()) === '0x4') {
        console.log('is 0x4');
        return true;
      } else {
        console.log('change');
        await changeNetwork();
        if ((await getChainId()) === '0x4') {
          toast.success('network have changed!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return true;
        } else {
          defaultValue();
          toast.error('network not change', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return false;
        }
      }
    } else {
      // network
      if ((await getChainId()) === '0x4') {
        console.log('is 0x4');
        return true;
      } else {
        console.log('change');
        await changeNetwork();
        if ((await getChainId()) === '0x4') {
          toast.success('network have changed!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return true;
        } else {
          defaultValue();
          toast.error('network not change', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return false;
        }
      }
    }
  };

  const getDataList = (address: any) => {
    let option: Keyop[] = [];

    ETH_TOKENS.filter((event) => {
      if (event.address !== address) {
        option.push({
          value: event.symbol,
          label: (
            <div className="flex space-x-px">
              <img src={event.imageUrl} height="30px" width="30px" />
              {event.symbol}
            </div>
          ),
          address: event.address,
        });
      }
    });
    return option;
  };

  const getSelectTokens1 = async (e: any) => {
    if (e !== null) {
      if (e.address !== token2) {
        setToken1(e.address);
        setShowToken1(e);
        if (network === '0x4') {
          const balances = await getTokenBalance(e.address, address!);
          setBalanceOfToken1(formatEther(balances));
        }
        setToken2List(getDataList(e.address));

        await checkHandle();
      } else {
        setBalanceOfToken1(formatEther(0));
        await checkHandle();
      }
    }
  };

  const getSelectTokens2 = async (e: any) => {
    if (e !== null) {
      // if () {
      if (e.address !== token1 /* && getWalletAddress() != null*/) {
        setToken2(e.address);
        setShowToken2(e);
        setToken1List(getDataList(e.address));
        await checkHandle();
      }
      // }
    }
  };

  const handleSwap = async (amountIn: number, path1: string, path2: string) => {
    setStatus(Status.PENDING);
    setOpen(true);
    // console.log(amountIn, path1, path2);

    // setAmountOut(Number(getSwapAmountsOut(token1, token2)));
    if (amountIn !== null && path1 !== undefined && path2 !== undefined && amountIn > 0) {
      const allowance = formatEther(await getAllowance(path1, address, addr_Router));
      if (Number(allowance) > amountIn) {
        console.log('Allowance');
        try {
          const tx = await swapExactTokensForTokens(amountIn, path1, path2);
          await tx.wait();
          setStatus(Status.SUCCESS);
          toast.success('Swap Success!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } catch (error: any) {
          setStatus(Status.FAILED);
          if (error.code == 4001) {
            toast.warn('Transaction rejected', {
              position: 'top-right',
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (error.code == 'UNPREDICTABLE_GAS_LIMIT') {
            toast.error('UNPREDICTABLE_GAS_LIMIT', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error('Insufficient liquidity for this trade', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      } else {
        console.log('approve');
        callApprove(path1, addr_Router);
      }
    } else {
      setOpen(false);
      toast.error('Something Wrong', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangeToken1Handle = async (event: any) => {
    // e.prevent;

    if (Number(balanceOfToken1) === 0) {
      setAmountIn(0);

      // setAmountOut(await getSwapAmountsOut());
    } else if (Number(event) > Number(balanceOfToken1) && !isNaN(event)) {
      setAmountIn(Number(balanceOfToken1));
    } else {
      setAmountIn(event);
      // setAmountOut(await getSwapAmountsOut());
    }
    if (token2 !== null) {
      try {
        let amountOut;

        if (event > 0) {
          if (event > Number(balanceOfToken1)) {
            amountOut = await getSwapAmountsOut(Number(balanceOfToken1), token1, token2);
          } else if (Number(balanceOfToken1) !== 0) {
            amountOut = await getSwapAmountsOut(event, token1, token2);
          }
        } else {
          amountOut = 0;
        }
        setAmountOut(amountOut);
      } catch (CALL_EXCEPTION) {
        console.log('CALL_EXCEPTION ERROR');
      }
    }
  };

  const getSymbolToken = (tokenAddress: string) => {
    const details = getTokenPairsDetails(tokenAddress).symbol;
    return details;
  };

  const getImageToken = (tokenAddress: string) => {
    const details = getTokenPairsDetails(tokenAddress).imageUrl;
    return details;
  };
  
  return (
    <div className="py-10 w-auto grid">
      {/* แก้grid for set width */}
      <div className="font-bold justify-self-center bg-blueWidget rounded-3xl w-5/12 grid">
        <h1 className="px-5 text-textwhite h-12">
          Swap
        </h1>
        {/* <div>{address}</div> */}
        {/* <div className="justify-self-center w-11/12 rounded-lg font-bold"> */}
          
        <div className="flex-column w-auto grid">

        <div className="bg-textwhite rounded-3xl w-11/12 justify-self-center">
        <div className="grid grid-cols-5 text-textblack ">
                    
          {/* <div className="py-2 m-3 flex-column w-auto grid text-textblack "> */}

            {token1 ? (
              <input
                className="col-span-4 h-20 rounded-3xl ml-5 mt-1"
                type="number"
                value={amountIn}
                placeholder={balanceOfToken1}
                onChange={(e) => {
                  onChangeToken1Handle(Number(e.target.value));
                }}
              ></input>
            ) : (

              <input
                className="col-span-4 h-20 rounded-3xl ml-5 mt-3"
                value={'Select Token'}
                disabled
              ></input>
            )}
                   <div className="grid grid-cols-6 col-span-1 ">
            <Select
              // defaultValue={token1}
              value={showToken1}
              onChange={(e) => {
                getSelectTokens1(e);
              }}
              options={token1List}
              autoFocus
              placeholder="Select Token 1"
              className="col-span-6 w-auto h-auto cursor-pointer"
            />
 </div>
          </div>
          </div>
          <div className="flex-column w-auto grid text-textblack ">
            <button
              className="w-6 h-auto rounded-full justify-self-center
                       bg-textwhite hover:bg-bluesky outline outline-[#f3991c]"
            >
              ↓
            </button>
          </div>


          <div className="bg-textwhite rounded-3xl w-11/12 justify-self-center">
        <div className="grid grid-cols-5 text-textblack ">

            <span className="col-span-4 h-20 rounded-3xl ml-5 mt-5"> {amountOutState}</span>
                    {/* <div className="py-2 m-3 flex-column w-auto grid text-textblack "> */}
            <div className="grid grid-cols-6 col-span-1 ">
            <Select
              value={showToken2}
              onChange={(e) => {
                getSelectTokens2(e);
              }}
              options={token2List}
              autoFocus
              placeholder="Select Token 2"
              className="col-span-6 w-auto h-auto cursor-pointer"
            />

          
          
          </div>
          </div>
          </div>



          <div className="py-4 flex-column w-auto grid text-textblack ">
            <button
              className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
              type="button"
              onClick={(e) => {
                handleSwap(Number(amountIn), token1, token2);
              }}
            >
              Swap
            </button>
          </div>






          <div className="py-2"></div>
        </div>
      </div>
      <br />
      <div className="justify-self-center bg-blueWidget rounded-3xl ">
        <div className="py-12">
          <div>
          {token1 && token2 ? (
              <div>
                <div className="grid grid-cols-4 gap-4 px-5 text-textwhite ">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex space-x-px">
                      <img src={getImageToken(token1)} height="50px" width="60px" />
                    </div>
                    <div className="flex space-x-px">
                      <img src={getImageToken(token2)} height="50px" width="60px" />
                    </div>
                    <div>{getSymbolToken(token1)}</div>
                    <div>{getSymbolToken(token2)}</div>
                  </div>
                  <div></div>
                  <div></div>
                  <div className="grid grid-cols-4 gap-4">
                    {amountOutState ? <div>{amountOutState}</div> : <div>0</div>}

                    <div></div>
                    <div>{getSymbolToken(token1)}</div>
                    <div>{getSymbolToken(token2)}</div>
                    <div></div>
                  </div>
                </div>
                <div className="py-12 px-8">{Areachart(true)}</div>
              </div>
            ) : (
              <div>

              </div>
            )}
          </div>
        </div>
      </div>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {status === Status.PENDING && (
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ color: 'primary.main' }}>
                    <CircularProgress />
                  <DialogContent>
                    Waiting For Confirmation
                    <Typography gutterBottom>
                      Swapping {amountIn} {getSymbolToken(token1)} for {amountOutState} {getSymbolToken(token2)}
                    </Typography>
                  </DialogContent>
                </Box>
              )}
              {status === Status.SUCCESS && (
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ color: 'success.main' }}>
                    <CheckCircleIcon color="success" fontSize="large" />
                  <DialogContent >
                    Transaction Submitted
                    <Typography gutterBottom>ADD {getSymbolToken(token2)}</Typography>
                  </DialogContent>
                </Box>
              )}
              {status === Status.FAILED && (
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ color: 'warning.main' }}>
                    <WarningAmberIcon color="warning" fontSize="large" />
                  <DialogContent >
                    Transaction Rejected
                  </DialogContent>
                </Box>

              )}
              <DialogActions>
              <button autoFocus onClick={handleClose} className="justify-self-center w-32 h-10 rounded-full bg-[#6f7275]
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#6f7275] duration-300">
                Close
              </button>
            </DialogActions>
            </BootstrapDialogTitle>

          </BootstrapDialog>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={1}
          />
    </div>
    
  );
};

export default swap;
