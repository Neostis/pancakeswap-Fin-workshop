// import * as ethers from "ethers";
// import { ethereum } from "./ethereum";

// declare global {
//   interface Window {
//     ethereum: any; // TODO: find the type
//   }
// }
// const getEthereum = () => {

//   if (typeof window !== 'undefined') {
//     let tempWindow = window.ethereum;

//     if (typeof tempWindow !== 'undefined') {
//       return tempWindow
//     }
//     else{
//       return null
//     }
//   }

// };
// // const getProvider = () => {
// //   const url = `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`;
// //   return new ethers.providers.JsonRpcProvider(url);
// // };

// const getProvider = () => {
//   const ethereum = getEthereum();
//   if (ethereum) {
//     return new ethers.providers.Web3Provider(getEthereum());
//   }
//   return null;
// };
// export const getSigner = () => {
//   const eth = ethereum();
//   const provider = new ethers.providers.Web3Provider(eth);
//   return provider.getSigner();
// };

// export default getProvider;
