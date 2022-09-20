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

export const getBalanceOf = async (contractAddr: string, addr: string) => {
  const contract = new ethers.Contract(contractAddr, abi_Pair, getProvider()!);
  return await contract.balanceOf(addr);
};

export const getTotalSupply = async (contractAddr: string) => {
  const contract = new ethers.Contract(contractAddr, abi_Pair, getProvider()!);
  return await contract.totalSupply();
};

export const getReserves = async (contractAddr: string) => {
  const contract = new ethers.Contract(contractAddr, abi_Pair, getProvider()!);
  return await contract.getReserves();
};
