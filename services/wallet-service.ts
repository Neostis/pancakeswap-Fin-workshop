import { ethers } from 'ethers';
import abi from '../ABI_CONTRACT/abi.json';
import abi_erc20 from '../ABI_CONTRACT/abi-Erc20.json';

declare global {
  interface Window {
    ethereum: any; // TODO: find the type
  }
}

export const getEthereum = () => {
  if (typeof window.ethereum !== 'undefined') {
    return window.ethereum;
  }
  return null;
};

export const getProvider = () => {
  const ethereum = getEthereum();
  if (ethereum) {
    return new ethers.providers.Web3Provider(getEthereum());
  }
  return null;
};

export const connectWallet = () => {
  return getEthereum()?.request({
    method: 'eth_requestAccounts',
  }) as Promise<string>;
};

export const getWalletAddress = () => {
  return getEthereum()?.selectedAddress as string;
};

export const getChainId = () => {
  return getEthereum()?.request({ method: 'eth_chainId' }) as Promise<string>;
};

export const getBalance = (address: string) => {
  const provider = getProvider();
  return provider?.getBalance(address);
};

export const changeNetwork = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x4' }],
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const getTokenBalance = async (tokenAddress: string, ownerAddress: string) => {
  try {
    const abi = ['function balanceOf(address owner) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
    const txResponse = await contract.balanceOf(ownerAddress);
    // await txResponse.wait();
    return txResponse;
  } catch (error) {
    return 0;
  }
};

export const callApprove = async (tokenAddress: string, spender: string) => {
  // console.log(tokenAddress, spender);
  const provider = getProvider()!;
  const signer = provider.getSigner();

  // const abi = ['function approve(address spender, uint256 amount) view returns (bool)'];
  const contract = new ethers.Contract(tokenAddress, abi_erc20, signer);
  return await contract.approve(
    spender,
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  );

  // await txResponse.wait();
  // .then((r)=>{setIsApprove(true)})
};
export const getAllowance = async (tokenAddress: string, ownerAddress: string, spenderAddress: string) => {
  const abi = ['function allowance(address owner, address spender) view returns (uint256)'];
  const contract = new ethers.Contract(tokenAddress, abi, getProvider()!);
  return contract.allowance(ownerAddress, spenderAddress);
};

// -------------------readDataFromSmartContract----------------------------
// export const getName = () => {
//   const provider = new ethers.providers.Web3Provider(getEthereum())
//   const nameContract = new ethers.Contract("0x5e223419084f5F89d14e61e6E7022f605dcA57a0", abi, provider);
//   return nameContract.name;
// };
// const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, provider);

// const name = await usdtContract.name()
// const symbol = await usdtContract.symbol()
// const decimals = await usdtContract.decimals()
// const totalSupply = await usdtContract.totalSupply()
// const myBalance = await usdtContract.balanceOf("0x06214f2E1e1896739D92F3526Bd496DC028Bd7F9")
