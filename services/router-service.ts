import { ethers } from 'ethers';
import abi from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import abi_Router from '../ABI_CONTRACT/abi.json';
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

const addr_Router = '0x3e1a682E5a80e822dE1137d21791E066a6d8da0d';

export const getSwapAmountsOut = async (amountIn: any, token1: any, token2: any) => {
  const path = [token1, token2]; //An array of token addresses
  const contract = new ethers.Contract(addr_Router, abi_Router, getProvider()!);

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

export const swapExactTokensForTokens = async (amountIn: number, path1: string, path2: string) => {
  const provider = getProvider()!;
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addr_Router, abi_Router, signer);
  const path = [path1, path2]; //An array of token addresses

  const to = signer.getAddress();
  const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20000; // 20 minutes from the current Unix time

  const txResponse = await contract.swapExactTokensForTokens(
    ethers.utils.parseEther(amountIn.toString()),
    0,
    // ethers.utils.parseEther(amountOutMin.toString()),
    path,
    to,
    deadline,
  );

  await txResponse.wait();
};

export const addLiquidity = async (token1: string, token2: string, amountADesired: number, amountBDesired: number) => {
  const provider = getProvider()!;
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addr_Router, abi_Router, signer);

  const to = signer.getAddress(); // should be a checksummed recipient address
  const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20000; // 20000 minutes from the current Unix time

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
};

// function addLiquidityETH(
//   address token,
//   uint256 amountTokenDesired,
//   uint256 amountTokenMin,
//   uint256 amountETHMin,
//   address to,
//   uint256 deadline
// )
export const addLiquidityETH = async (
  weth: number,
  token: string,
  amountTokenDesired: number,
  // amountTokenMin: number,
  // amountETHMin: number,
  // to: string,
  // deadline: number,
) => {
  const deadline: any = Math.floor(Date.now() / 1000) + 60 * 20000;
  const provider = getProvider()!;
  const signer = provider.getSigner();
  const to = signer.getAddress();
  const contract = new ethers.Contract(addr_Router, abi_Router, signer);
  const tx = await contract.addLiquidityETH(
    token,
    ethers.utils.parseEther(amountTokenDesired.toString()),
    0,
    0,
    to,
    deadline,
    {
      value: ethers.utils.parseEther(weth.toString()),
    },
  );
};
