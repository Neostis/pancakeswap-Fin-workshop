import React from 'react';
// import Popup from '../components/popup';
import { ModuleType } from '../types/module.type';
import { useEffect, useState, useRef } from 'react';
import * as ethers from 'ethers';
import { formatEther, getAddress } from 'ethers/lib/utils';
import abi_contract from '../ABI_CONTRACT/abi.json';
// import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { Token } from '../types/token.type';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  getAllowance,
  changeNetwork,
  callApprove,
  getTokenBalance,
} from '../services/wallet-service';
// import { getNetworkCurrency, getNetworkName, getNetworkTokens } from '../constants/network-id';
import { ETH_TOKENS, PairsList, getTokenPairsDetails } from '../constants/tokens';
import Select from 'react-select';

import { addLiquidity, addLiquidityETH, _removeLiquidity, _removeLiquidityETH } from '../services/router-service';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider'; 
import { getBalanceOf, getToken0, getToken1 } from '../services/pair-service';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Status } from '../types/status';

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

export default function addliquidity() {
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
  const [balanceOfToken1, setBalanceOfToken1] = useState<string | null>(null);
  const [balanceOfToken2, setBalanceOfToken2] = useState<string | null>(null);
  const [tokenAllowance1, setTokenAllowance1] = useState<string | null>(null);
  const [tokenAllowance2, setTokenAllowance2] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [addliquidityLoading, setAddliquidityLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});

  const [token1, setToken1] = useState<string | null>(null);
  const [token2, setToken2] = useState<string | null>(null);

  const [amountADesired, setAmountADesired] = useState<number | null>(null);
  const [amountBDesired, setAmountBDesired] = useState<number | null>(null);

  const [token1List, setToken1List] = useState<Keyop[]| null>([]);
  const [token2List, setToken2List] = useState<Keyop[]| null>([]);
  const [pairLPList, setPairLPList] = useState<any[]| null>([]);

  const [showToken1, setShowToken1] = useState<Keyop[] | null>(null);
  const [showToken2, setShowToken2] = useState<Keyop[] | null>(null);

  const [pairLP, setPairLP] = useState<string | null>(null);
  const [amountLP, setAmountLP] = useState<number | null>(null);
  const [balanceOfLP, setBalanceOfLP] = useState<string | null>(null);
  const [LPAllowance, setLPAllowance] = useState<string | null>(null);

  const [showLP, setShowLP] = useState<string | null>(null);

  const [toggle, setToggle] = useState(true);
  const toggleClass = ' transform translate-x-6';

  const modeName = () => {
    if (toggle) {
      return 'ADD Liquidity';
    } else if (!toggle) {
      return 'REMOVE Liquidity';
    }
  };

  // const customStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     width: state.selectProps.width,
  //     borderBottom: '1px dotted pink',
  //     color: state.selectProps.menuColor,
  //     padding: 20,
  //   }),
  
  //   control: (_, { selectProps: { width }}) => ({
  //     width: width
  //   }),
  
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';
  
  //     return { ...provided, opacity, transition };
  //   }
  // }

  const loadAccountData = async () => {
    setShowToken1(null);
    setShowToken2(null);
    setShowLP(null);
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    const balancesToken1 = await getTokenBalance(token1!, address!);
    setBalanceOfToken1(formatEther(balancesToken1));
    const balancesToken2 = await getTokenBalance(token2!, address!);
    setBalanceOfToken2(formatEther(balancesToken2));

    if (addr === null) {
      await connectWallet();
      defaultValue();
    } else {
      setToken1List(getDataList(token2!));
      setToken2List(getDataList(token1!));

      setPairLPList(getPoolList());
    }
    if (chainId !== '0x4') {
      await changeNetwork();
      defaultValue();
    } else {
      // setNetwork(chainId);
      setToken1List(getDataList(token2!));
      setToken2List(getDataList(token1!));
      setPairLPList(getPoolList());
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

    const handleNetworkChange = async (/*networkId: string*/) => {
      await loadAccountData();
      defaultValue();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
  }, []);

  const defaultValue = () => {
    setToken1(null);
    setToken2(null);
    setAmountADesired(null);
    setAmountBDesired(null);
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

  const getPoolList = () => {
    let option: Keyop[] = [];

    PairsList.filter((event) => {
      if (event.addressPair !== address) {
        option.push({
          value: event.token0.symbol + '/' + event.token1.symbol,
          // value: Object.keys(event),
          label: (
            <div className="flex space-x-px">
              <img className=" space-x-px" src={event.token0.imageUrl} height="30px" width="30px" />
              <img className=" space-x-px" src={event.token1.imageUrl} height="30px" width="30px" />

              {event.token0.symbol + '/' + event.token1.symbol}
            </div>
          ),
          address: event.addressPair,
        });
      }
    });
    return option;
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
    if (toggle) {
      if (e !== null) {
        if (e.address !== token2) {
          if (network === '0x4') {
            const balances = await getTokenBalance(e.address, address!);
            setBalanceOfToken1(formatEther(balances));
            setTokenAllowance1(formatEther(await getAllowance(e.address, address!, addr_Router)));
          }
          setToken1(e.address);
          setShowToken1(e);

          setToken2List(getDataList(e.address));
          await checkHandle();
        } else {
          setBalanceOfToken1(formatEther(0));
          await checkHandle();
        }
      }
    }
  };

  const getSelectTokens2 = async (e: any) => {
    if (toggle) {
      if (e !== null) {
        if (e.address !== token1) {
          if (network === '0x4') {
            const balances = await getTokenBalance(e.address, address!);
            setBalanceOfToken2(formatEther(balances));
            setTokenAllowance2(formatEther(await getAllowance(e.address, address!, addr_Router)));
          }
          setToken2(e.address);
          setShowToken2(e);
          setToken1List(getDataList(e.address));
          await checkHandle();
        } else {
          setBalanceOfToken1(formatEther(0));
          await checkHandle();
        }
      }
    }
  };

  const getSelectRemoveLiq = async (e: any) => {
    if (!toggle) {
      if (e !== null) {
        if (network === '0x4') {
          const balances = await getBalanceOf(e.address, address!);

          setBalanceOfLP(formatEther(balances));

          setLPAllowance(formatEther(await getAllowance(e.address, address!, addr_Router)));
        }
        setPairLP(e.address);
        setShowLP(e);
        await checkHandle();
      }
    }
  };

  const handleAddLiquidity = async () => {
    setStatus(Status.PENDING);
    setOpen(true);

    try {
      // console.log(
      //   ethers.utils.parseEther(amountADesired.toString()),
      //   ethers.utils.parseEther(amountBDesired.toString()),
      // );

      if( token1 !== undefined &&
        token2 !== undefined &&
        amountADesired !== null &&
        amountBDesired !== null &&
        amountADesired > 0 &&
        amountBDesired > 0){

        
      if (token1 == '0xc778417E063141139Fce010982780140Aa0cD5Ab') {
        const tx = await addLiquidityETH(Number(amountADesired) /*WETH is token1*/, token2! /*address other token*/, Number(amountBDesired));
        await tx.wait();
      } else if (token2 == '0xc778417E063141139Fce010982780140Aa0cD5Ab') {
        const tx = await addLiquidityETH(Number(amountBDesired) /*WETH is token2*/, token1! /*address other token*/, Number(amountADesired));
        await tx.wait();
      } else {
        const tx = await addLiquidity(token1!, token2!, amountADesired, amountBDesired);
        await tx.wait();
      }

      setStatus(Status.SUCCESS);
      toast.success('Transaction Success!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }} catch (error: any) {
      setStatus(Status.FAILED);
      if (error.code == 4001) {
        toast.warn('Transaction Cancelled', {
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
      }
      // }
    }
  };

  const handleRemoveLiquidity = async () => {
    setStatus(Status.PENDING);
    setOpen(true);
    try {
      const token0 = await getToken0(pairLP!);
      const token1 = await getToken1(pairLP!);
      // console.log(pairLP, token0, token1, amountLP);

      if (token0 == '0xc778417E063141139Fce010982780140Aa0cD5Ab') {
        const tx = await _removeLiquidityETH(token1, amountLP!);
        tx.wait();
      } else if (token1 == '0xc778417E063141139Fce010982780140Aa0cD5Ab') {
        const tx = await _removeLiquidityETH(token0, amountLP!);
        tx.wait();
      } else {
        const tx = await _removeLiquidity(token0, token1, amountLP!);
        tx.wait();
      }
      setStatus(Status.SUCCESS);
      toast.success('Transaction Success!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error: any) {
      setStatus(Status.FAILED);
      if (error.code == 4001) {
        toast.warn('Transaction Cancelled', {
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
      }
    }
  };

  const handleModeCheck = async () => {
    if (toggle) {
      if (
      token1 !== undefined &&
      token2 !== undefined &&
      amountADesired !== null &&
      amountBDesired !== null &&
      amountADesired > 0 &&
      amountBDesired > 0
    ) {
      handleAddLiquidity();
    } 
  }
    else if (!toggle) {
    if (pairLP !== undefined && amountLP !== null && amountLP > 0) {
      handleRemoveLiquidity();

    }
  }
};

  const handleApprove = async () => {
    if (toggle) {
      if (
        token1 !== undefined &&
        token2 !== undefined &&
        amountADesired !== null &&
        amountBDesired !== null &&
        amountADesired > 0 &&
        amountBDesired > 0
      ) {
        const allowance = formatEther(await getAllowance(token1!, address!, addr_Router));
        const allowance2 = formatEther(await getAllowance(token2!, address!, addr_Router));
        if (Number(allowance) < amountADesired) {
          const tx = await callApprove(token1!, addr_Router);
          await tx.wait();
          const newAllowance = formatEther(await getAllowance(pairLP!, address!, addr_Router));
          setLPAllowance(newAllowance);
          toast.success('Approve Success!', {
            position: 'top-right',
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (Number(allowance2) < amountBDesired) {
          const tx = await callApprove(token2!, addr_Router);
          await tx.wait();
          const newAllowance = formatEther(await getAllowance(pairLP!, address!, addr_Router));
          setLPAllowance(newAllowance);
          toast.success('Approve Success!', {
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
    }
    else if (!toggle) {
      if (pairLP !== undefined && amountLP !== null && amountLP > 0) {
        const allowance = formatEther(await getAllowance(pairLP!, address!, addr_Router));
        if (Number(allowance) < amountLP) {
          const tx = await callApprove(pairLP!, addr_Router);
          await tx.wait();
          const newAllowance = formatEther(await getAllowance(pairLP!, address!, addr_Router));
          setLPAllowance(newAllowance);
          toast.success('Approve Success!', {
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

    }

  };

  const onChangeToken1Handle = (e: any) => {
    if (Number(e) > Number(balanceOfToken1) && !isNaN(e)) {
      setAmountADesired(Number(balanceOfToken1));
    } else if (Number(balanceOfToken1) === 0) {
      setAmountADesired(0);
    } else {
      setAmountADesired(e);
    }
  };

  const onChangeToken2Handle = (e: any) => {
    if (Number(e) > Number(balanceOfToken2) && !isNaN(e)) {
      setAmountBDesired(Number(balanceOfToken2));
    } else if (Number(balanceOfToken2) === 0) {
      setAmountBDesired(0);
    } else {
      setAmountBDesired(e);
    }
  };

  const onChangePairLPHandle = async (e: any) => {
    if (e == 0) {
      setAmountLP(0);
    } else if (e > 0 && e < 100) {
      setAmountLP((Number(balanceOfLP) * e) / 100);
    } else {
      setAmountLP(Number(balanceOfLP));
    }
  };

  const getSymbolToken = (tokenAddress: string) => {
    const details:any = getTokenPairsDetails(tokenAddress);
    return details.symbol;
  };

  const getPendingLiquidity = () =>{{}
    if (toggle){return 'Supplying'}
    else if (!toggle){return 'Removing'}

  }

  const getSuccessLiquidity = () =>{{}
  if (toggle){return 'Supplied'}
  else if (!toggle){return 'Removed'}

}

  return (
    <div className="py-10 flex-column w-auto grid">
      <div className="justify-self-center bg-blueWidget rounded-3xl w-5/12">
        {/* <div>{address}</div> */}
        <div className="py-5 font-bold">
          <div>
            <div className="flex justify-between mr-5">

              <h1 className="px-5 text-textwhite h-12">{modeName()}</h1>


            <div
              className={
                toggle
                  ? 'md:w-14 md:h-7 w-12 h-6 flex items-center bg-addToggle rounded-full p-1 transform cursor-pointer top-0 right-0  space-x-px'
                  : 'md:w-14 md:h-7 w-12 h-6 flex items-center bg-removeToggle rounded-full p-1 transform cursor-pointer top-0 right-0  space-x-px'
              }
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <div
                className={
                  ' bg-textwhite md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out' +
                  (toggle ? null : toggleClass)
                }
              ></div>
            </div>
            </div>

            <div className="justify-self-center ">
              {toggle ? (
                <div className="flex-column w-auto grid">
                  {' '}
                  <div className="bg-textwhite rounded-3xl w-11/12 justify-self-center">
                    <div className="grid grid-cols-5 text-textblack ">
                      {token1 ? (
                        <input
                          className="col-span-4 h-20 rounded-3xl"
                          type="number"
                          value={amountADesired!}
                          onChange={(e) => onChangeToken1Handle(Number(e.target.value))}
                        ></input>
                      ) : (
                        <input className="col-span-4 h-20 rounded-3xl" value={'Select Token 1'} disabled></input>
                      )}

                      <div className="grid grid-cols-6 col-span-1 ">
                        <Select
                          value={showToken1}
                          onChange={(e) => {
                            getSelectTokens1(e);
                          }}
                          options={token1List!}
                          autoFocus
                          placeholder="Select Token 1"
                          className="col-span-6 w-auto h-auto cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" flex-column w-auto grid text-textblack h-12">
                    <button className="">+</button>
                  </div>
                  <div className="bg-textwhite rounded-3xl w-11/12 justify-self-center">
                    <div className="grid grid-cols-5 text-textblack ">
                      {token2 ? (
                        <input
                          className="col-span-4 h-20 rounded-3xl"
                          type="number"
                          value={amountBDesired!}
                          onChange={
                            (e) => {
                              onChangeToken2Handle(Number(e.target.value));
                            }
                            // Number(e.target.value) > Number(balanceOfToken2) && !isNaN(e.target.value)
                            //   ? setAmountBDesired(balanceOfToken2)
                            //   : setAmountBDesired(e.target.value)
                          }
                        ></input>
                      ) : (
                        <input
                          className="col-span-4 h-20 rounded-3xl"
                          placeholder={'Select Token 2'}
                          value={'Select Token2'}
                          disabled
                        ></input>
                      )}
                      <div className="grid grid-cols-6 col-span-1">
                        <Select
                          value={showToken2}
                          onChange={(e) => {
                            getSelectTokens2(e);
                          }}
                          options={token2List!}
                          autoFocus
                          placeholder="Select Token 2"
                          className="col-span-6 w-auto h-auto cursor-pointer"
                        />

                        {/* <div className="col-span-2">˅</div> */}
                      </div>
                    </div>
                  </div>
                  {token1 && token2 && amountADesired && amountBDesired ? (
                    <div className="py-10 flex-column w-auto grid text-textblack ">
                      {Number(tokenAllowance1) > 0 && Number(tokenAllowance2) > 0 ? (
                        <button
                          className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                     from-blueswapdark  to-blueswapbutton 
                     text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                          disabled
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                      from-blueswapdark  to-blueswapbutton
              text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                          onClick={handleApprove}
                        >
                          Approve
                        </button>
                      )}

                      <div className="py-10 flex-column w-auto grid text-textblack ">
                        {Number(tokenAllowance1) > 0 && Number(tokenAllowance2) > 0 ? (
                          <button
                            className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                        from-blueswapdark  to-blueswapbutton 
                        text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                            onClick={handleModeCheck}
                          >
                            Supply
                          </button>
                        ) : (
                          <button
                            className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                        from-blueswapdark  to-blueswapbutton 
                        text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                            disabled
                          >
                            Supply
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 flex-column w-auto grid text-textblack ">
                      <button
                        className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
    from-blueswapdark  to-blueswapbutton 
text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                        // onClick={}
                        disabled
                      >
                        Invalid Pair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                //remove Zone
                <div>
                  {' '}
                  <div className="flex-column w-auto grid text-textblack rounded-3xl">
               
                    {/* <div className="">

                    <div className="grid grid-cols-5 text-textblack ">
                      <div className="col-span-4 h-20 rounded-3xl">
         
                      </div>
                   
                      </div> */}
                      <div className="bg-textwhite rounded-3xl w-11/12 justify-self-center">
                        <div className="grid grid-cols-5 text-textblack">
                          <div className="col-span-4 h-20 rounded-3xl"></div>
                        <div className="grid grid-cols-6 col-span-1">
                      <Select
                      value={showLP}
                      onChange={(e) => {
                        getSelectRemoveLiq(e);
                      }}
                      // styles={customStyles}
                      options={pairLPList!}
                      autoFocus
                      placeholder="Select pair"
                      className="col-span-6 w-full h-auto cursor-pointer relative"                      
                      />
                      
                      </div>
                      </div>
                      </div>
                      <div className="m-5 justify-self-center">
                    {pairLP ? (
                      <Box width={300}>
                        <Slider
                          defaultValue={50}
                          aria-label="Default"
                          valueLabelDisplay="auto"
                          // value={amountLP}
                          onChange={(e) => onChangePairLPHandle(Number((e.target as HTMLInputElement).value))}
                        />
                      </Box>
                      // </div>
                    ) : (
                      // <input className="col-span-4 h-20  rounded-lg " value={'Select pair'} disabled></input>
                      // <div className="justify-self-center">
                      <Box width={300}>
                        <Slider defaultValue={50} aria-label="Disabled slider" valueLabelDisplay="auto" disabled />
                      </Box>
                    )}
                      </div>
                  </div>
                  {pairLP && amountLP ? (
                    <div className="py-10 flex-column w-auto grid text-textblack ">
                      {Number(LPAllowance) > 0 ? (
                        <button
                          className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                     from-blueswapdark  to-blueswapbutton 
                     text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                          disabled
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                      from-blueswapdark  to-blueswapbutton
              text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                          onClick={handleApprove}
                        >
                          Approve
                        </button>
                      )}

                      <div className="py-10 flex-column w-auto grid text-textblack ">
                        {Number(LPAllowance) > 0 ? (
                          <button
                            className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                        from-blueswapdark  to-blueswapbutton 
                        text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                            onClick={handleModeCheck}
                          >
                            Supply
                          </button>
                        ) : (
                          <button
                            className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                        from-blueswapdark  to-blueswapbutton 
                        text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                            disabled
                          >
                            Supply
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 flex-column w-auto grid text-textblack ">
                      <button
                        className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
    from-blueswapdark  to-blueswapbutton 
text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                        // onClick={}
                        disabled
                      >
                        Invalid Pair
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              {status === Status.PENDING && (
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ color: 'primary.main' }}>
                    <CircularProgress />
                  <DialogContent>
                    Waiting For Confirmation
                    <Typography gutterBottom>
                      {getPendingLiquidity()} {amountADesired!} {getSymbolToken(token1!)} and {amountBDesired} {getSymbolToken(token2!)}
                    </Typography>
                  </DialogContent>
                </Box>
              )}
              {status === Status.SUCCESS && (
                <Box display='flex' justifyContent='center' alignItems='center' sx={{ color: 'success.main' }}>
                    <CheckCircleIcon color="success" fontSize="large" />
                  <DialogContent >
                    Transaction Submitted
                    <Typography gutterBottom>
                    {getSuccessLiquidity()} {getSymbolToken(token1!)}/{getSymbolToken(token2!)} liquidity
                    </Typography>
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
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
              />
              <div className="py-2"></div>
            </div>
          </div>
        </div>
      </div>

      </div>
    
  );
}