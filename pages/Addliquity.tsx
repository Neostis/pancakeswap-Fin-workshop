import React from 'react';
import { ModuleType } from '../types/module.type';
import Navbar from '../components/Navbar';
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

export default function AddliquidityModule({
  setModule,
  account,
}: {
  setModule: (module: ModuleType) => void;
  account: string;
}) {
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

  // const approveHandler = async () => {
  //   setApproveLoading(true);
  //   try {
  //     await tokenService.approve("DAI").then((tx) => tx?.wait());
  //     toast.success("Approved Dai Successfully !", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     await loadAllowances();
  //   } catch (err) {
  //     toast.error("Something went wrong !");
  //   }
  //   setApproveLoading(false);
  // };
  // const AddQuidityHandler = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   setAddliquidityLoading(true);

  //   try {
  //     await bankService.deposit(account, amount).then((tx) => tx.wait());
  //     toast.success("Deposited Dai Successfully !", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     await loadWalletData();
  //     setAmount("");
  //     setModule("idle");
  //   } catch (err) {
  //     toast.error("Something went wrong !");
  //   }

  //   setAddliquidityLoading(false);
  // };

  const addTokenToWallet = async (token: Token) => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
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
    <div className="bg-bgtheme py-10 w-auto grid">
      liquidity
      <h1>{address}</h1>
      <div>
        {getNetworkTokens(network).map((token) => (
          <div key={token.symbol} className="flex mb-4">
            <div>
              <img
                onClick={() => addTokenToWallet(token)}
                src={token.imageUrl}
                className="w-12 h-12 mr-8 cursor-pointer"
              />
            </div>
            <div>
              <div>
                {token.name} ({token.symbol})
              </div>
              <div>
                {tokenBalances[token.symbol] || 0} {token.symbol}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="justify-self-center bg-blueWidget rounded-3xl ">
        <div>{address}</div>
        <div className="w-96 rounded-lg  font-bold">
          <div>
            <div className="">
              <h1 className="px-5 text-textwhite">Addquidity</h1>
            </div>

            <div className="">
              <div className="py-2 flex-column w-auto grid text-textblack ">
                <input className="w-11/12 h-14 rounded-lg justify-self-center"></input>
              </div>
              <div className=" flex-column w-auto grid text-textblack ">
                <button
                  className="w-6 h-6 rounded-full justify-self-center
                       bg-textwhite hover:bg-bluesky outline outline-[#f3991c] absolute"
                >
                  ↓
                </button>
              </div>
              <div className="flex-column w-auto grid text-textblack">
                <input className="w-11/12 h-14 rounded-lg justify-self-center"></input>
              </div>
              <div className="py-4 flex-column w-auto grid text-textblack ">
                <button
                  className="justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
                from-blueswapdark  to-blueswapbutton
       text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                >
                  Addquidity
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
    </div>
  );
}
