import * as ethers from 'ethers';
import abi from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';
import abi_Factory from '../ABI_CONTRACT/abi-Factory.json';
import { ADDRESS_LIST } from "../constants/addressList";
import { getToken0, getToken1 } from '../services/pair-service';
import { pancakePairContract, pancakeRouterContract, pancakeFactoryContract } from '../contracts/index';
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
import "../services/SafeMath";
import { mul } from './SafeMath';

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

// const quote = (amountA: number, reserveA: number, reserveB: number) => {
//   require(amountA > 0, 'PancakeLibrary: INSUFFICIENT_AMOUNT');
//   require(reserveA > 0 && reserveB > 0, 'PancakeLibrary: INSUFFICIENT_LIQUIDITY');
//   const amountB = amountA.mul(reserveB) / reserveA;
//   return amountB;
// };

// function _addLiquidity(
//   address tokenA,
//   address tokenB,
//   uint256 amountADesired,
//   uint256 amountBDesired,
//   uint256 amountAMin,
//   uint256 amountBMin
// ) internal virtual returns (uint256 amountA, uint256 amountB) {
//   // create the pair if it doesn't exist yet
//   if (IPancakeFactory(factory).getPair(tokenA, tokenB) == address(0)) {
//       IPancakeFactory(factory).createPair(tokenA, tokenB);
//   }
//   (uint256 reserveA, uint256 reserveB) = PancakeLibrary.getReserves(factory, tokenA, tokenB);
//   if (reserveA == 0 && reserveB == 0) {
//       (amountA, amountB) = (amountADesired, amountBDesired);
//   } else {
//       uint256 amountBOptimal = PancakeLibrary.quote(amountADesired, reserveA, reserveB);
//       if (amountBOptimal <= amountBDesired) {
//           require(amountBOptimal >= amountBMin, "PancakeRouter: INSUFFICIENT_B_AMOUNT");
//           (amountA, amountB) = (amountADesired, amountBOptimal);
//       } else {
//           uint256 amountAOptimal = PancakeLibrary.quote(amountBDesired, reserveB, reserveA);
//           assert(amountAOptimal <= amountADesired);
//           require(amountAOptimal >= amountAMin, "PancakeRouter: INSUFFICIENT_A_AMOUNT");
//           (amountA, amountB) = (amountAOptimal, amountBDesired);
//       }
//   }
// }
export const outputLiquidity = async (getPairAdd: string, amountADesired: number, amountBDesired: number) => {
  const provider = getProvider()!;
  const signer = provider.getSigner();
  const contract = new ethers.Contract(addr_Factory, abi_Factory, signer);
  const contractPair = pancakePairContract(getPairAdd);
  const contractRounter = pancakeRouterContract(ADDRESS_LIST["ROUTER"]);
  // const contractPair = PancakeFactory__factory.connect(getPairAdd, signer);

  const opReserves = await contractPair.getReserves();
  console.log("opReserves:",opReserves)
  const amountBOptimal = ethers.utils.formatEther(await contractRounter.quote(ethers.utils.parseEther(amountADesired.toString()), opReserves._reserve0, opReserves._reserve1))
  console.log("amountBOptimal: ",amountBOptimal)
  if(Number(amountBOptimal) >= Number(amountBDesired)){
      return amountBOptimal
  }
  // else{
  //   const amountAOptimal = await contractRounter.quote(ethers.utils.parseEther(amountBDesired.toString()),opReserves._reserve1, opReserves._reserve0)
  //     return amountAOptimal
  // }
};

  export const getPairToken = async (token1: string, token2: string) => {
      const contractFactory = pancakeFactoryContract(ADDRESS_LIST["FACTORY"])
      return await contractFactory.getPair(token1, token2);

  }
