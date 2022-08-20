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
import { ETH_TOKENS, RINKEBY_TOKENS, KOVAN_TOKENS } from '../constants/tokens';
import { formatEther, parseUnits } from 'ethers/lib/utils';
import { getTokenPairsDetails } from '../constants/tokens';
// import { formatEther, BigNumber, parseUnits } from 'ethers/lib/utils';

type Keyop = {
  value: any;
  label: any;
  address: any;
};
// type pairsToken = {
//   token0: tokenDetails;
//   token1: tokenDetails;
// };
// type tokenDetails ={
//   name: string;
//   symbol: string;
//   decimals: any;
//   imageUrl: string;
//   address: string;
  
// }
type token0 ={
  name: string;
  symbol: string;
  decimals: any;
  imageUrl: string;
  address: string;
}
type token1 ={
  name: string;
  symbol: string;
  decimals: any;
  imageUrl: string;
  address: string;
}



export const PairLiquidity = ()=> {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [pairList, setPairList] = useState([]);
  const [allPairsLength, setAllPairLength] = useState<string | null>(null);
  const [allPairsToken, setAllPairsToken] = useState([]);
  const [dataList, setDataList] = useState([{}]);

  const loadAccountData = async () => {
    // setToken1(null);
    // setToken2(null);
    const addr = getWalletAddress();
    const chainId = await getChainId();
    const length = await _allPairsLength();
    const data = [];
    setAllPairLength(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString());
    setPairList(await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString()));
    // setAllPairsToken(
      //   await getAllPairsToken(await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString())),
      // )
      
    const allPair = await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString());
    let ordersData = (
      await getAllPairsToken(await AllPairs(ethers.utils.parseUnits(formatEther(length).toString(), 18).toString())),
    ).map((e,index) => {
      
      return (
     {   [`${allPair[index]}`] :
        {
        token0: getTokenPairsDetails(e.token0),
        token1: getTokenPairsDetails(e.token1),
      },
    }
      )
     }
    );
    setDataList(ordersData)
    console.log(ordersData)
    // const balances = await gdataTokenBalance(token1!, address!);
    // setBalanceOfToken1(formatEther(balances));
    if (addr === null) {
      await connectWallet();
      //   defaultValue();
    } else {
      //   setToken1List(getDataList(token2!));
      //   setToken2List(getDataList(token1!));
    }
    if (chainId !== '0x4') {
      await changeNetwork();
      //   defaultValue();
    } else {
      //   setToken1List(getDataList(token2!));
      //   setToken2List(getDataList(token1!));
    }
    // setAddress(addr);
    // setNetwork(chainId);
  };

  useEffect(() => {
    loadAccountData();

    const handleAccountChange = async (addresses: string[]) => {
      setAddress(addresses[0]);
      await loadAccountData();
      //   defaultValue();
    };

    const handleNetworkChange = async (networkId: string) => {
      // console.log('handle change ' + networkId);
      setNetwork(networkId);
      await loadAccountData();
      //   defaultValue();
    };

    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);

 
  }, []);




  return dataList

}
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
