import { ADDRESS_LIST, PAIR_ADDRESS } from "../constants/addressList";
import { pancakeFactoryPairsLength, pancakeFactoryContract } from "../contracts/index";
import { PancakeFactory__factory } from "../typechain/factories/PancakeFactory__factory";
import { PancakePair__factory} from "../typechain/factories/PancakePair__factory";
import { PancakeFactory } from "../typechain";
import { ContractCallContext } from "ethereum-multicall";
import { getMulticall as multicall } from "../utils/getMulticall";
import { formatEther, parseEther } from "ethers/lib/utils";
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



const a = '0xFfF28ce226130d0005e43960428b1eD81b384e3F'
export const getAccounts = async () => {
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
          methodParameters: ['0xFfF28ce226130d0005e43960428b1eD81b384e3F'],
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
