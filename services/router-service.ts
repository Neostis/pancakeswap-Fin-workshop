import { ethers } from 'ethers';
import abi from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import abi_contract from '../ABI_CONTRACT/abi.json';
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

const addr_contract = '0x3e1a682E5a80e822dE1137d21791E066a6d8da0d';

export const getSwapAmountsOut = async (amountIn: any, token1: any, token2: any) => {
  const path = [token1, token2]; //An array of token addresses
  const contract = new ethers.Contract(addr_contract, abi_contract, getProvider()!);

  if (token1 !== undefined && token2 !== undefined && amountIn !== null) {
    if (amountIn > 0) {
      const tx = await contract.getAmountsOut(ethers.utils.parseEther(amountIn.toString()), path);
      // await tx.wait();
      // console.log(tx);
      const a = Number(ethers.utils.formatEther(tx[1]));
      //ได้
      return a.toFixed(6);

      // //แตก
      // return a;
    } else {
      return 0;
    }
  }
  return 0;

  // setAmountOut(a);
};
