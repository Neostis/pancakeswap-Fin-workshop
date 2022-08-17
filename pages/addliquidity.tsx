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
import { ETH_TOKENS } from '../constants/tokens';
import Select from 'react-select';

import { addLiquidity, addLiquidityETH } from '../services/router-service';

type Keyop = {
  value: any;
  label: any;
  address: any;
};

export default function AddliquidityModule({
  setModule,
  account,
}: {
  setModule: (module: ModuleType) => void;
  account: string;
}) {
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
  const addr_contract = '0x3e1a682E5a80e822dE1137d21791E066a6d8da0d';
  const [address, setAddress] = useState<string | null>(null);
  const [balanceOfToken1, setBalanceOfToken1] = useState<string | null>(null);
  const [balanceOfToken2, setBalanceOfToken2] = useState<string | null>(null);
  const [tokenAllowance1, setTokenAllowance1] = useState<string | null>(null);
  const [tokenAllowance2, setTokenAllowance2] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [addliquidityLoading, setAddliquidityLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});

  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();

  const [amountADesired, setAmountADesired] = useState<number | null>(null);
  const [amountBDesired, setAmountBDesired] = useState<number | null>(null);

  const [token1List, setToken1List] = useState<Keyop[]>([]);
  const [token2List, setToken2List] = useState<Keyop[]>([]);

  // const [approve, setApprove] = useState<string | null>(null);
  // const [liquidity, setLiquidity] = useState<string | null>(null);

  const defaultValue = () => {
    setBalanceOfToken1(null);
    setBalanceOfToken2(null);
    setToken1(undefined);
    setToken2(undefined);
    setAmountADesired(null);
    setAmountBDesired(null);
  };

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    const chainId = await getChainId();
    if ((await getWalletAddress()) === null) {
      await connectWallet();
    }
    if ((await getChainId()) === '0x4') {
    } else {
      defaultValue();
    }
    let option: Keyop[] = [];
    ETH_TOKENS.map((e) => {
      option.push({
        value: e.symbol,
        label: (
          <div className="flex space-x-px">
            <img src={e.imageUrl} height="30px" width="30px" />
            {e.symbol}
          </div>
        ),
        address: e.address,
      });
    });
    setToken1List(option);
    setToken2List(option);
    setAddress(addr);
    setNetwork(chainId);
  };

  useEffect(() => {
    loadAccountData();
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);

      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      setNetwork(networkId);
      let option: Keyop[] = [];
      loadAccountData();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
  }, []);

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
      // await checkHandle();
      if (await checkHandle()) {
        if (e.address !== token2) {
          const balances = await getTokenBalance(e.address, address!);
          setBalanceOfToken1(formatEther(balances));
          setTokenAllowance1(formatEther(await getAllowance(e.address, address!, addr_contract)));
          setToken1(e.address);

          setToken2List(getDataList(e.address));
        }
      }
    }
  };

  const getSelectTokens2 = async (e: any) => {
    if (e !== null) {
      if (await checkHandle()) {
        if (e.address !== token1 && getWalletAddress() != null) {
          const balances = await getTokenBalance(e.address, address!);
          setBalanceOfToken2(formatEther(balances));
          setTokenAllowance2(formatEther(await getAllowance(e.address, address!, addr_contract)));
          setToken2(e.address);

          setToken1List(getDataList(e.address));
        }
      }
    }
  };

  const handleAddLiquidity = async () => {
    if (
      token1 !== undefined &&
      token2 !== undefined &&
      amountADesired !== null &&
      amountBDesired !== null &&
      amountADesired > 0 &&
      amountBDesired > 0
    ) {
      try {
        console.log(
          ethers.utils.parseEther(amountADesired.toString()),
          ethers.utils.parseEther(amountBDesired.toString()),
        );

        if (token1 == '0xc778417E063141139Fce010982780140Aa0cD5Ab') {
          await addLiquidityETH(amountADesired /*WETH is token1*/, token2 /*address other token*/, amountBDesired);
        } else if (token2 == '0xc778417E063141139Fce010982780140Aa0cD5Ab') {
          await addLiquidityETH(amountBDesired /*WETH is token2*/, token1 /*address other token*/, amountADesired);
        } else {
          await addLiquidity(token1, token2, amountADesired, amountBDesired);
        }

        toast.success('Success!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        // toast.error('Error!', {
        //   position: 'top-right',
        //   autoClose: 3000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        console.log(error);
      }
    }
  };

  const handleApprove = async () => {
    if (
      token1 !== undefined &&
      token2 !== undefined &&
      amountADesired !== null &&
      amountBDesired !== null &&
      amountADesired > 0 &&
      amountBDesired > 0
    ) {
      const allowance = formatEther(await getAllowance(token1, address!, addr_contract));
      const allowance2 = formatEther(await getAllowance(token2, address!, addr_contract));

      // console.log(token1, token2);

      if (Number(allowance) < amountADesired) {
        console.log('approve A');
        await callApprove(token1, addr_contract);
        setTokenAllowance1(allowance);
      }
      if (Number(allowance2) < amountBDesired) {
        console.log('approve B');
        await callApprove(token2, addr_contract);
        setTokenAllowance2(allowance2);
      }
    }
  };

  let option = [{ value: '', label: '', address: '' }];
  ETH_TOKENS.map((e) =>
    option.push({
      value: e.symbol,
      label: (
        <div className="flex space-x-px">
          <img src={e.imageUrl} height="25px" width="25px" />
          <span className="w-auto h-auto">{e.symbol}</span>
        </div>
      ),
      address: e.address,
    }),
  );
  option.shift();

  // const addTokenToWallet = async (token: Token) => {
  //   try {
  //     const wasAdded = await window.ethereum.request({
  //       method: 'wallet_watchAsset',
  //       params: {
  //         type: 'ERC20', // Initially only supports ERC20, but eventually more!
  //         options: {
  //           address: token.address, // The address that the token is at.
  //           symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
  //           decimals: token.decimals, // The number of decimals in the token
  //           image: token.imageUrl, // A string url of the token logo
  //         },
  //       },
  //     });

  //     if (wasAdded) {
  //       console.log('Thanks for your interest!');
  //     } else {
  //       console.log('Your loss!');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onChangeToken1Handle = async (e: any) => {
    if (Number(e) > Number(balanceOfToken1) && !isNaN(e)) {
      setAmountADesired(Number(balanceOfToken1));

      // setAmountOut(await getSwapAmountsOut());
    } else if (Number(balanceOfToken1) === 0) {
      setAmountADesired(0);
    } else {
      setAmountADesired(e);
      // setAmountOut(await getSwapAmountsOut());
    }
  };

  const onChangeToken2Handle = async (e: any) => {
    if (Number(e) > Number(balanceOfToken2) && !isNaN(e)) {
      setAmountBDesired(Number(balanceOfToken2));

      // setAmountOut(await getSwapAmountsOut());
    } else if (Number(balanceOfToken2) === 0) {
      setAmountBDesired(0);
    } else {
      setAmountBDesired(e);
      // setAmountOut(await getSwapAmountsOut());
    }
  };

  return (
    <div className="bg-bgtheme py-10 flex-column w-auto grid">
      <div className="justify-self-center bg-blueWidget rounded-3xl w-5/12">
        {/* <div>{address}</div> */}
        <div className="rounded-lg  font-bold">
          <div>
            <div className="">
              <h1 className="px-5 text-textwhite h-12">Addquidity</h1>
            </div>

            <div className="flex-column w-auto grid">
              <div className="bg-textwhite rounded-lg w-10/12 justify-self-center">
                <div className="grid grid-cols-5 text-textblack ">
                  {token1 ? (
                    <input
                      className="col-span-4 h-20 rounded-lg "
                      type="number"
                      value={amountADesired}
                      onChange={
                        (e) => onChangeToken1Handle(Number(e.target.value))

                        // Number(e.target.value) > Number(balanceOfToken1) && !isNaN(e.target.value)
                        //   ? setAmountADesired(balanceOfToken1)
                        //   : setAmountADesired(e.target.value)
                      }
                    ></input>
                  ) : (
                    <input className="col-span-4 h-20  rounded-lg " placeholder={'Select Token 1'} disabled></input>
                  )}

                  <div className="grid grid-cols-6 col-span-1">
                    {/* {here} */}
                    <Select
                      defaultValue={token1}
                      onChange={(e) => {
                        getSelectTokens1(e);
                      }}
                      options={token1List}
                      autoFocus
                      placeholder="Select Token 1"
                      // isClearable
                      className="col-span-6 w-auto h-auto  cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex-column w-auto grid text-textblack h-12">
                <button className="">+</button>
              </div>

              {/* <div className="">{tokenBalances[tokenPair.token2.symbol] || 0}</div> */}

              <div className="bg-textwhite rounded-lg w-10/12 justify-self-center">
                <div className="grid grid-cols-5 text-textblack ">
                  {token2 ? (
                    <input
                      className="col-span-4 h-20  rounded-lg "
                      type="number"
                      value={amountBDesired}
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
                    <input className="col-span-4 h-20  rounded-lg " placeholder={'Select Token 2'} disabled></input>
                  )}
                  <div className="grid grid-cols-6 col-span-1">
                    <Select
                      defaultValue={token2}
                      onChange={(e) => {
                        getSelectTokens2(e);
                      }}
                      options={token2List}
                      autoFocus
                      placeholder="Select Token 2"
                      // isClearable
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
                        onClick={handleAddLiquidity}
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
                  >
                    Invalid Pair
                  </button>
                </div>
              )}

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
      <div className="py-10"></div>

      <div className="flex-column">
        <div>{balanceOfToken1}</div>
        <div>{balanceOfToken2}</div>
        <div>{amountADesired}</div>
        <div>{amountBDesired}</div>
        <div>tokenAllowance1:{tokenAllowance1}</div>
        <div>tokenAllowance2:{tokenAllowance2}</div>
      </div>
      <div className="py-10"></div>
      {/* <div className="py-4 flex-column w-auto grid text-textblack "> */}

      {/* <div> */}
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
}
