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
import { _allPairsLength, AllPairs, getAllPairsToken } from '../services/factory-service';
import { getBalanceOf } from '../services/pair-service';
import { ETH_TOKENS, PairsList } from '../constants/tokens';
import { getTokenPairsDetails } from '../constants/tokens';
import { formatEther } from 'ethers/lib/utils';

type Keyop = {
  value: any;
  label: any;
  address: any;
};
// type pairsToken = {
//   token0: tokenDetails;
//   token1: tokenDetails;
// };
type tokenDetails = {
  name: string;
  symbol: string;
  decimals: any;
  imageUrl: string;
  address: string;
};
type token0 = {
  name: string;
  symbol: string;
  decimals: any;
  imageUrl: string;
  address: string;
};
type token1 = {
  name: string;
  symbol: string;
  decimals: any;
  imageUrl: string;
  address: string;
};

export const pairModule = async ()=> {

    const dataList:any[] = []

    const addr = getWalletAddress();
    const length = await _allPairsLength();
    const data = [];
  
    const allPair:any = await AllPairs(Number(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString()));
    let ordersData:any[] = (
      await getAllPairsToken(allPair)
    ).map(async (e,index) => {
      const balances = 10;
      return (
            dataList.push(   {   [`${allPair[index]}`] :
            {
            token0: getTokenPairsDetails(e.token0),
            token1: getTokenPairsDetails(e.token1),
            balance: balances,
          },
        })
      )
     }
    );

  return dataList
}

// export const poolFilter = async () => {
//   const dataDetail = [];

//   PairsList.map(async (item) => {
//     return dataDetail.push({
//       [`${item.addressPair}`]: {
//         token0: item.token0,
//         token1: item.token1,
//       },
//     });
//   });
//   return dataDetail;
// };

// export const poolList = async () => {
//   const dataDetail = [];
//   PairsList.map(async (item) => {
//     return dataDetail.push({
//       [`${item.addressPair}`]: {
//         token0: item.token0,
//         token1: item.token1,
//       },
//     });
//   });
//   return dataDetail;
// };



// export const pairModule = async () => {
//   //   const [dataList, setDataList] = useState([{}]);

//   const balancePromise = (addrPair: any, addr: any) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(async () => {
//         // const balance: any = 10;
//         const balance: any = formatEther(await getBalanceOf(addrPair, addr));
//         // console.log(Object.keys(JSON.parse(savedDataList)[key])[0]);
//         // console.log('value:', Object.values(JSON.parse(savedDataList)[key])[0].balance);

//         console.log(balance);
//         // if (Number(balance) > 0) {
//         resolve(balance);
//         // return { [`${Object.keys(JSON.parse(savedDataList)[key])[0]}`]: balance };
//         // } else {
//         // }
//       }, 1000);
//     });
//   };

//   let dataList = [];

//   const addr = getWalletAddress();
//   const length = await _allPairsLength();
//   const data = [];
//   // PairsList;
//   // const allPair = await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString());
//   let ordersData = PairsList.map(async (e, index) => {
//     ///
//     // const balances = await getBalanceOf(e.addressPair, addr);
//     // console.log(balances);
//     console.log(e.addressPair, addr, e.token0.address, e.token1.address);
//     // await balancePromise(e.addressPair, addr)
//     //   .then((result) => {
//     //     dataList.push({
//     //       [`${e.addressPair}`]: {
//     //         token0: e.token0.address,
//     //         token1: e.token1.address,
//     //         balance: result,
//     //       },
//     //     });
//     //   })
//     //   .catch((error) => {
//     //     alert(error);
//     //   });
//     dataList.push({
//       [`${e.addressPair}`]: {
//         token0: getTokenPairsDetails(e.token0.address),
//         token1: getTokenPairsDetails(e.token1.address),
//         // balance: formatEther(await getBalanceOf(e.addressPair, addr)),
//       },
//     });
//     // const balances = 10;
//   });
//   console.log('datalist: ', dataList);
//   console.log('ordersData: ', ordersData);
//   return dataList;
// };



//     const allPair = await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString());
//     let ordersData = (
//       await getAllPairsToken(await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString())),
//     ).map(async(e,index) => {
//     console.log(allPair[index],addr)
//     return(
//             dataList.push(   {   [`${allPair[index]}`] :
//             {
//                 token0: getTokenPairsDetails(e.token0),
//                 token1: getTokenPairsDetails(e.token1),
//             },
//         })
// )
// }

//     );
//     return dataList

// }

// export default PairLiquidity;

//   return (
//     <div>
//       {allPairsLength}
// {Object.keys(dataList).length >= 1
//   ? Object.keys(dataList).map((key, index) => {
//       return (
//         <div key={key}>
//           {/* <a className="px-12 py-3">{(dataList[index]).Object.keys(dataList[key]).token0.name}</a> */}
//           <a>Pool:{Object.keys(dataList[key])}</a>
//           {Object.values(dataList[key]).map((e)=>{
//             return(
//               <div>

//                 <div className='flex space-x-px'>
//                 <img src={e.token0.imageUrl} height="30px" width="30px" />
//                 <h1>
//                 {e.token0.name}
//                  </h1>
//                   </div>
//                 <div className='flex'>
//                 <img src={e.token1.imageUrl} height="30px" width="30px" />
//                 <h1>
//                 {e.token1.name}
//                  </h1>
//                   </div>
//               </div>
//             )
//           })}

//         </div>
//       );
//     })
//   : "no items"}

//     </div>
//   );
// }
// export default PairLiquidity;

// --------------object----------
// [
//   {
//   0x00001 :
//           {
//           token0: {
//       name: 'A Coin',
//             symbol: 'AC',
//             decimals: 18,
//             imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022',
//             address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723',
//       },
//           token1:
//       name: 'B Coin',
//             symbol: 'BC',
//             decimals: 18,
//             imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022',
//             address: '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb',
//             },
//     }
//   ,
//   {
//   0x00002 :
//           {
//           token0: getTokenPairsDetails(e.token0),
//           token1: getTokenPairsDetails(e.token1),
//         },
//       }

//   ]

// -------------console.log-------------------
// (2) [{…}, {…}]
// 0:
// 0x396aCf468CC9d44b10A669Fa50A194435FCF05F5:
// token0: {name: 'A Coin', symbol: 'AC', decimals: 18, imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022', address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723'}
// token1: {name: 'Wrapped Ether', symbol: 'WETH', decimals: 18, imageUrl: 'https://cryptologos.cc/logos/pancakeswap-cake-logo.png?v=023', address: '0xc778417E063141139Fce010982780140Aa0cD5Ab'}
// [[Prototype]]: Object
// [[Prototype]]: Object
// 1:
// 0xAF966C9B55c71919d2c800232ea83E5baB89Be4E:
// token0: {name: 'B Coin', symbol: 'BC', decimals: 18, imageUrl: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=022', address: '0x1089DcF6B59912a0ff8c250383E47F5c0e0be4fb'}
// token1: {name: 'A Coin', symbol: 'AC', decimals: 18, imageUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=022', address: '0x3485Ebf13d8292E8C78F442bc4Eb198d47f58723'}
// [[Prototype]]: Object
// [[Prototype]]: Object
// length: 2
// [[Prototype]]: Array(0)
