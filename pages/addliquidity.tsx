import React from 'react';
// import Popup from '../components/popup';
import { ModuleType } from '../types/module.type';
import { useEffect, useState } from 'react';
// import SwapComponent from "../components/SwapComponent";
// import ViewSwap from "../view/ViewSwap";
import { Token } from '../types/token.type';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
} from '../services/wallet-service';
import { toast } from 'react-toastify';
import { getNetworkCurrency, getNetworkName, getNetworkTokens } from '../constants/network-id';
import { ETH_TOKENS } from '../constants/tokens';

export default function AddliquidityModule({
  setModule,
  account,
}: {
  setModule: (module: ModuleType) => void;
  account: string;
}) {
  const [tokenPair, setTokenPair] = useState<{}>({
    token1: {
      name: 'USD Theter',
      symbol: 'USDT',
      decimals: 6,
      imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
      address: '0x07de306FF27a2B630B1141956844eB1552B956B5',
    },
    token2: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
      address: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede',
    },
  });

  const [address, setAddress] = useState<string | null>(null);
  const [tokenAllowances, setTokenAllowances] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [addliquidityLoading, setAddliquidityLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});

  const loadAccountData = async () => {
    const addr = getWalletAddress();
    setAddress(addr);
    const chainId = await getChainId();
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

      loadAccountData();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
  }, []);

  const [isShown, setIsShown] = useState(false);

  const handleClick = (event: any) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  };

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
        <div>{address}</div>
        <div className="rounded-lg  font-bold">
          <div>
            <div className="">
              <h1 className="px-5 text-textwhite h-12">Addquidity</h1>
            </div>

            <div className="flex-column w-auto grid">
              <div className="bg-textwhite rounded-lg w-10/12 justify-self-center">
                <div className="grid grid-cols-5 text-textblack ">
                  <input className="col-span-4 h-20  rounded-lg "></input>
                  <div className="grid grid-cols-8 col-span-1">
                    {/* {here} */}
                    {}
                    <img
                      onClick={handleClick}
                      src={tokenPair.token1.imageUrl}
                      className="col-span-3 w-12 h-12 cursor-pointer"
                    />
                    <div className="col-span-2">{tokenPair.token1.symbol}</div>
                  </div>
                </div>
              </div>
              <div className=" flex-column w-auto grid text-textblack h-12">
                <button className="">+</button>
              </div>

              {/* <div className="">{tokenBalances[tokenPair.token2.symbol] || 0}</div> */}

              <div className="bg-textwhite rounded-lg w-10/12 justify-self-center">
                <div className="grid grid-cols-5 text-textblack ">
                  <input className="col-span-4 h-20  rounded-lg "></input>
                  <div className="grid grid-cols-8 col-span-1">
                    {/* {here} */}
                    <img
                      onClick={handleClick}
                      src={tokenPair.token2.imageUrl}
                      className="col-span-3 w-12 h-12 cursor-pointer"
                    />
                    <div className="col-span-2">{tokenPair.token2.symbol}</div>

                    <div className="col-span-2">˅</div>
                  </div>
                </div>
              </div>
              <div className="py-10 flex-column w-auto grid text-textblack ">
                <button
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                  from-blueswapdark  to-blueswapbutton 
       text-textinvalid outline outline-offset-1 outline-textinvalid drop-shadow-xl"
                >
                  Invalid Pair
                </button>
              </div>
              <div className="py-2"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      <div className="py-10"></div>
      {isShown && <div></div>}
      {isShown && <Popup />}
    </div>
  );
}
