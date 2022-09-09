import { ADDRESS_LIST, PAIR_ADDRESS } from "../constants/addressList";
import {pancakeFactoryContract } from "../contracts/index";
import { PancakeFactory__factory } from "../typechain/factories/PancakeFactory__factory";
import { PancakePair__factory} from "../typechain/factories/PancakePair__factory";
import { PancakeFactory } from "../typechain";
import { ContractCallContext } from "ethereum-multicall";
import { getMulticall as multicall } from "../utils/getMulticall";
import { formatEther, parseEther } from "ethers/lib/utils";
import { getWalletAddress } from "./wallet-service";
import * as ethers from 'ethers';


// total lenght
// loop get All address

const factoryContract = pancakeFactoryContract(ADDRESS_LIST["FACTORY"]);
// const factoryContract = pancakeFactoryContract("0x1858F08ce7425B2715d870c20e0e2c79899994aa");

export const pairLength = async () =>{
    // const factoryContract:any = await pancakeFactoryPairsLength("0x1858F08ce7425B2715d870c20e0e2c79899994aa")
    // const lenght = ethers.BigNumber.from(factoryContract).toNumber()
    const lenght = await factoryContract.allPairsLength();
    return ethers.BigNumber.from(lenght).toNumber()
}
// const getPairs = async () =>{

// }/*[0x1,0x2,0x3,,]*/



export const getDataPair = async () => {

// [0x01, 0x02, 0x03, ...]
// pairsToken -> 0 1 2 of factory
    let ob = [{
      
    }]
    const contractCallContext: ContractCallContext[] = PAIR_ADDRESS.map(
      (address) => 
{
  return(
    (
      {
      reference: address,
      // contract
      contractAddress: address,
      abi: PancakePair__factory.abi,
      calls: [
        {
          reference:'PancakePair',
          methodName: "balanceOf",
          methodParameters: [getWalletAddress()],
        },
        {
          reference:'PancakePair',
          methodName: "token0",
          methodParameters: [],
        },
        {
          reference:'PancakePair',
          methodName: "token1",
          methodParameters: [],
        },
        {
          reference:'PancakePair',
          methodName: "totalSupply",
          methodParameters: [],
        },
      ],
    }
  )
  )
}
    );
    const response = await multicall.call(contractCallContext)
    console.log("response:",response);
    return Object.entries(response.results).map(([name, data]) =>  {
      return{
        address: name,
        balanceOf: formatEther(data.callsReturnContext[0].returnValues[0]),
        token0: data.callsReturnContext[1].returnValues[0],
        token1: data.callsReturnContext[2].returnValues[0],
        totalSupply: formatEther(data.callsReturnContext[3].returnValues[0]),
      }
    })
  };




export const getPairsFilter = async () => {

// [0x01, 0x02, 0x03, ...]
// pairsToken -> 0 1 2 of factory
    let ob = [{
      
    }]
    const contractCallContext: ContractCallContext[] = PAIR_ADDRESS.map(
      (address) => 
{
  return(
    (
      {
      reference: address,
      // contract
      contractAddress: address,
      abi: PancakePair__factory.abi,
      calls: [
        {
          reference:'PancakePair',
          methodName: "balanceOf",
          methodParameters: [getWalletAddress()],
        },
        {
          reference:'PancakePair',
          methodName: "token0",
          methodParameters: [],
        },
        {
          reference:'PancakePair',
          methodName: "token1",
          methodParameters: [],
        },
        {
          reference:'PancakePair',
          methodName: "totalSupply",
          methodParameters: [],
        },
      ],
    }
  )
  )
}
    );
    // ethers.BigNumber.from("4")
    const response = await multicall.call(contractCallContext)
    console.log("response:",response);
    
    const dataList = Object.entries(response.results).map(([name, data]) =>  {
      // if(formatEther(data.callsReturnContext[0].returnValues[0]) > 0){

      

          // ethers.BigNumber.from(lenght).toNumber()
          return{
            address: name,
            balanceOf: data.callsReturnContext[0].returnValues[0],
            // balanceOf: formatEther(data.callsReturnContext[0].returnValues[0]),
            token0: data.callsReturnContext[1].returnValues[0],
            token1: data.callsReturnContext[2].returnValues[0],
            totalSupply: formatEther(data.callsReturnContext[3].returnValues[0]),
          }
        

          // }

      })
      // const dataFilter = dataList.filter(item =>
      //   // const a = ethers.BigNumber.from((data.callsReturnContext[0].returnValues[0]).hex.toString())
      //     Number((ethers.BigNumber.from((item.balanceOf).hex.toString())).toString()) > 0
     
      // );

      const dataFilter = dataList.filter(item =>
        // const a = ethers.BigNumber.from((data.callsReturnContext[0].returnValues[0]).hex.toString())
          Number((ethers.BigNumber.from((item.balanceOf).hex.toString())).toString()) > 0
     
      );

      dataFilter.map(item=>{formatEther(item.balanceOf)});
      
      return dataFilter;
  
      // if(Number(a.toString()) > 0){

      // }
    };



