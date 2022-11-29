// import getProvider from "../utils/getProvider";
import { getProvider } from "../services/wallet-service";
import * as ethers from 'ethers';
// import abi_Factory from '../abi/ABI_FACTORY.json';
import { PancakeFactory__factory, PancakePair__factory, PancakeRouter__factory } from "../typechain";


// export const pancakeFactoryPairsLength = async(address: string, provider = getProvider()!) =>{
//     const contract = new ethers.Contract(address, abi_Factory, getProvider()!);
//     return await contract.allPairsLength();
// }


export const pancakeFactoryContract = (address: string, provider = getProvider()!) =>{
    return PancakeFactory__factory.connect(address, provider);
}
export const pancakePairContract = (address: string, provider = getProvider()!) =>{
    return PancakePair__factory.connect(address, provider);
}
export const pancakeRouterContract = (address: string, provider = getProvider()!) =>{
    return PancakeRouter__factory.connect(address, provider);
}