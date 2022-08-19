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
import { useEffect, useState } from 'react';
import { _allPairsLength } from '../services/router-service';
import { ETH_TOKENS, RINKEBY_TOKENS, KOVAN_TOKENS } from '../constants/tokens';

type Keyop = {
  value: any;
  label: any;
  address: any;
};
export default function pairLiauidity() {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [pairList, setPairList] = useState(true);
  const [allPairsLength, setAllPairLength] = useState<string | null>(null);
  const loadAccountData = async () => {
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    setAllPairLength(await _allPairsLength());
    // const balances = await getTokenBalance(token1!, address!);
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
  };

  useEffect(() => {
    loadAccountData();
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

    // if (token1 !== undefined && token2 !== undefined && amountIn !== null) {
    // amountOut.current = Number(getSwapAmountsOut(amountIn, token1, token2));
    // }
  }, []);

  //   const getDataList = (address: any) => {
  //     let option: Keyop[] = [];

  //     ETH_TOKENS.filter((event) => {
  //       if (event.address !== address) {
  //         option.push({
  //           value: event.symbol,
  //           label: (
  //             <div className="flex space-x-px">
  //               <img src={event.imageUrl} height="30px" width="30px" />
  //               {event.symbol}
  //             </div>
  //           ),
  //           address: event.address,
  //         });
  //       }
  //     });
  //     return option;
  //   };

  return <div></div>;
}
