import React from 'react';
// import Popup from '../components/popup';
import { ModuleType } from '../types/module.type';
import { useEffect, useState } from 'react';
import * as ethers from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import abi_contract from '../ABI_CONTRACT/abi.json';
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
} from '../services/wallet-service';
import { getNetworkCurrency, getNetworkName, getNetworkTokens } from '../constants/network-id';
import { ETH_TOKENS } from '../constants/tokens';
import Select from 'react-select';

export default function AddliquidityModule({
  setModule,
  account,
}: {
  setModule: (module: ModuleType) => void;
  account: string;
}) {
  if (typeof window !== 'undefined') {
    injectStyle();
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

  const getSelectTokens1 = async (e: any) => {
    if (e !== null) {
      if (e.address !== token2) {
        const balances = await getTokenBalance(e.address, address!);
        setBalanceOfToken1(formatEther(balances));
        console.log(balances);
        setTokenAllowance1(formatEther(await getAllowance(e.address, address!, addr_contract)));
        setToken1(e.address);

        console.log(e.address);
      }
    }
  };

  const getSelectTokens2 = async (e: any) => {
    if (e !== null) {
      if (e.address !== token1) {
        const balances = await getTokenBalance(e.address, address!);
        setBalanceOfToken2(formatEther(balances));
        console.log(balances);
        setTokenAllowance2(formatEther(await getAllowance(e.address, address!, addr_contract)));
        setToken2(e.address);
        console.log(e.address);
      }
    }
  };

  // const onChangehandle = async (value: any) => {
  //   if (Number(value) >= Number(balanceOfToken1)) {
  //     setAmountADesired(value)
  //   }
  //   else if (Number(balanceOfToken1) === 0) {
  //     setAmountADesired(0)
  //   }
  //   else {
  //     setAmountADesired(balanceOfToken1)
  //   }
  // }

  const getTokenBalance = async (tokenAddress: string, ownerAddress: string) => {
    try {
      const abi = ['function balanceOf(address owner) view returns (uint256)'];
      const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
      return contract.balanceOf(ownerAddress);
    } catch (error) {
      return 0;
    }
  };
  const getAllowance = async (tokenAddress: string, ownerAddress: string, spenderAddress: string) => {
    const abi = ['function allowance(address owner, address spender) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
    return contract.allowance(ownerAddress, spenderAddress);
  };

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
    setNetwork(chainId);
  };

  const handleButton = () => {
    // console.log(token1, token2, amountADesired, amountBDesired);

    if (
      token1 !== undefined &&
      token2 !== undefined &&
      amountADesired !== null &&
      amountBDesired !== null &&
      amountADesired > 0 &&
      amountBDesired > 0
    ) {
      addLiquidityHandle();
    }
  };

  const test = () => {
    toast('🦄 Wow so easy!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    loadAccountData();
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);

      loadAccountData();
    };

    const handleNetworkChange = (networkId: string) => {
      setNetwork(networkId);

      loadAccountData();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
  }, []);

  const addLiquidityHandle = async () => {
    // tokenA (address)

    // tokenB (address)

    // amountADesired (uint256)

    // amountBDesired (uint256)

    // amountAMin (uint256)

    // amountBMin (uint256)

    // to (address)

    // deadline (uint256)
    // const amountADesired = 10;
    // const amountBDesired = 10;
    const provider = getProvider()!;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addr_contract, abi_contract, signer);

    const to = signer.getAddress(); // should be a checksummed recipient address
    const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20000; // 20 minutes from the current Unix time

    const txResponse = await contract.addLiquidity(
      token1,
      token2,
      ethers.utils.parseEther(amountADesired.toString()),
      ethers.utils.parseEther(amountBDesired.toString()),
      0,
      0,
      to,
      deadline,
    );

    toast.success('Success!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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

  const addTokenToWallet = async (token: Token) => {
    try {
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: token.address, // The address that the token is at.
            symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: token.decimals, // The number of decimals in the token
            image: token.imageUrl, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
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
                      className="col-span-4 h-auto rounded-lg "
                      type="number"
                      value={amountADesired}
                      onChange={(e) =>
                        Number(e.target.value) > Number(balanceOfToken1) && !isNaN(e.target.value)
                          ? setAmountADesired(balanceOfToken1)
                          : setAmountADesired(e.target.value)
                      }
                    ></input>
                  ) : (
                    <input
                      className="col-span-4 h-20  rounded-lg "
                      value={'Select Token'}
                      disabled
                      onChange={0}
                    ></input>
                  )}

                  <div className="grid grid-cols-6 col-span-1">
                    {/* {here} */}
                    <Select
                      defaultValue={token1}
                      onChange={(e) => {
                        getSelectTokens1(e);
                      }}
                      options={option}
                      autoFocus
                      placeholder="Select Token 1"
                      // isClearable
                      className="col-span-6 w-auto h-auto cursor-pointer"
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
                      className="col-span-4 h-auto  rounded-lg "
                      type="number"
                      value={amountBDesired}
                      onChange={(e) =>
                        Number(e.target.value) > Number(balanceOfToken2) && !isNaN(e.target.value)
                          ? setAmountBDesired(balanceOfToken2)
                          : setAmountBDesired(e.target.value)
                      }
                    ></input>
                  ) : (
                    <input
                      className="col-span-4 h-20  rounded-lg "
                      value={'Select ToKen'}
                      disabled
                      onChange={0}
                    ></input>
                  )}
                  <div className="grid grid-cols-6 col-span-1">
                    <Select
                      defaultValue={token2}
                      onChange={(e) => {
                        getSelectTokens2(e);
                      }}
                      options={option}
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
                  <button
                    className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                      from-blueswapdark  to-blueswapbutton 
                      text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                  >
                    Approve
                  </button>
                  <div className="py-10 flex-column w-auto grid text-textblack ">
                    <button
                      className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                        from-blueswapdark  to-blueswapbutton 
                        text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                      onClick={handleButton}
                    >
                      Supply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-10 flex-column w-auto grid text-textblack ">
                  <button
                    className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
    from-blueswapdark  to-blueswapbutton 
text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                    onClick={test}
                  >
                    Invalid Pair
                  </button>
                </div>
              )}

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
      <div className="py-10"></div>
      <div className="py-10"></div>
    </div>
  );
}
