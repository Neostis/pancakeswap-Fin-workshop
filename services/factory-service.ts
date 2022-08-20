import * as ethers from 'ethers';
import abi from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import abi_Factory from '../ABI_CONTRACT/abi-Factory.json';
import { getToken0, getToken1 } from '../services/pair-service';
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

type pairsToken = {
  token0: string;
  token1: string;
};
const addr_Factory = '0x1858F08ce7425B2715d870c20e0e2c79899994aa';
export const _allPairsLength = async () => {
  const contract = new ethers.Contract(addr_Factory, abi_Factory, getProvider()!);
  return contract.allPairsLength();
};
export const _allPairs = async (Index: number) => {
  const contract = new ethers.Contract(addr_Factory, abi_Factory, getProvider()!);
  return contract.allPairs(Index);
};
export const AllPairs = async (pairsLength: number) => {
  const pairList = [];
  // const contract = new ethers.Contract(addr_Factory, abi_Factory, getProvider()!);
  for (let i = 0; i < pairsLength; i++) {
    pairList.push(await _allPairs(i));
  }
  return pairList;
};

export const getAllPairsToken = async (pairList: []) => {
  let pairsTokens: pairsToken[] = [];
  for (let i = 0; i < pairList.length; i++) {
    const conAddr = pairList[i];
    const ob = {
      token0: await getToken0(conAddr),
      token1: await getToken1(conAddr),
    };
    pairsTokens.push(ob);
  }
  return pairsTokens;
};
