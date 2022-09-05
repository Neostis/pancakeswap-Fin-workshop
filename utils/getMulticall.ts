import { Multicall } from "ethereum-multicall";
import getProvider from "./getProvider";
import { ADDRESS_LIST } from "../constants/addressList";
import { ethers } from 'ethers';

// export const getMulticall = new Multicall({
//   ethersProvider: getProvider()!,
//   multicallCustomContractAddress: ADDRESS_LIST["Multicall"],
// });
// let provider = ethers.getDefaultProvider();
// let provider = ;
export const getMulticall = new Multicall({ ethersProvider: getProvider(), tryAggregate: true });