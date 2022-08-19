import * as ethers from 'ethers';
import abi_Pair from '../ABI_CONTRACT/abi-Pair.json';
import { getProvider } from '../services/wallet-service';
export const getContract = () => {};

export const getToken0 = (contractAddr: string) => {
  const contract = new ethers.Contract(contractAddr, abi_Pair, getProvider()!);

  return contract.token0();
};
export const getToken1 = (contractAddr: string) => {
  const contract = new ethers.Contract(contractAddr, abi_Pair, getProvider()!);
  return contract.token1();
};
