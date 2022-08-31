import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import * as ethers from 'ethers';
import {
  connectWallet,
  getBalance,
  getChainId,
  getEthereum,
  getProvider,
  getWalletAddress,
  getAllowance,
  changeNetwork,
  callApprove,
  getTokenBalance,
} from '../services/wallet-service';
import { pairModule } from './pairModule';
import { ContactlessOutlined } from '@material-ui/icons';

function Navbar() {
  const [address, setAddress] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [network, setNetwork] = useState<string | null>(null);

  // const [dataListObject, setDataListObject] = useState([{}]);

  // const getData = async () => {
  //   try {
  //     if (typeof window !== 'undefined') {
  //       // console.log("You are on the browser");

  //       let savedDataList = window.localStorage.getItem('dataList');
  //       console.log(savedDataList);

  //       if (savedDataList) {
  //         console.log(JSON.parse(savedDataList));
  //         setDataListObject(JSON.parse(savedDataList));
  //       } else {
  //         setDataListObject(JSON.parse('{}'));
  //       }
  //     } else {
  //       // console.log("You are on the server");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const loadAccountData = async () => {
  //   const addr = getWalletAddress();
  //   const chainId = await getChainId();

  //   if (addr === null) {
  //     await connectWallet();
  //   } else {

  //   }
  //   if (chainId !== '0x4') {
  //     await changeNetwork();
  //   } else {
  //     // setNetwork(chainId);
  //   }
  //   setAddress(addr);
  //   setNetwork(chainId);
  // };


  useEffect(() => {
    console.log(1)
    const loadAccountData = async () => {
      console.log(2)
      const addr = getWalletAddress();
      console.log("addr: ",addr)
      console.log("getWalletAddress:",getWalletAddress());
      setAddress(addr);
      const chainId = await getChainId();
      setNetwork(chainId);
    };
    const fetchData = async () => {
      console.log(3)
      // let savedDataList = window.localStorage.getItem('ownerDataList');

      if (typeof window !== 'undefined') {
        // console.log("You are on the browser");
        let savedDataList = window.localStorage.getItem('ownerDataList');

        if (savedDataList) {
          const dataParse = JSON.parse(savedDataList);
        }

        // if (savedDataList)
        try {
          const temp = await pairModule();

          if (JSON.stringify(temp) !== null) {
            window.localStorage.setItem('ownerDataList', JSON.stringify(temp));
          }
        } catch (error) {}
      }
    };
    const loadingData = async()=>{

      await fetchData();
      await loadAccountData();
    }
    const handleAccountChange = (addresses: string[]) => {
      setAddress(addresses[0]);

      loadAccountData();
    };
    const handleNetworkChange = (networkId: string) => {
      setNetwork(networkId);

      loadAccountData();
    };
    getEthereum()?.on('accountsChanged', handleAccountChange);

    getEthereum()?.on('chainChanged', handleNetworkChange);
    
    loadingData();
    
  }, []);

  // // interval
  // useEffect(() => {
  //   // const interval = setInterval(() => {

  //   let savedDataList = window.localStorage.getItem('dataList');
  //   const fetchData = async () => {
  //     if (typeof window !== 'undefined') {
  //       let savedDataList = window.localStorage.getItem('dataList');
  //       console.log(savedDataList);

  //       // console.log(savedDataList);

  //       if (savedDataList) {
  //         console.log(2);

  //         const dataParse = JSON.parse(savedDataList);
  //         // await pairModule())
  //         window.localStorage.setItem('dataList', JSON.stringify('asfasfasfafas'));
  //         // return ob;
  //       }

  //       // console.log(JSON.parse(savedDataList));
  //       // setDataListObject(JSON.parse(savedDataList));
  //     } else {
  //       // setDataListObject(JSON.parse("{}"));
  //     }
  //   };

  //   // call the function
  //   fetchData();

  //   // }
  //   // }, 3000);
  //   // return () => clearInterval(interval);
  // }, []);


  return (
    <div>
      <nav className=" shadow-sm w-full z-10">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center  mx-20  justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <div>
                  <img className="bg-auto h-10 w-10 " src="/logo.png"></img>
                </div>
                <h1 className=" font-bold text-xl cursor-pointer">
                  <span className="text-textblue ">FIN SWAP</span>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
                  >
                    Home
                  </Link>
                  <Link
                    href="/swap"
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Swap
                  </Link>
                  <Link
                    href="/liquidity"
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Addliquidity
                  </Link>
                  <Link
                    href="/pool"
                    className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Pool
                  </Link>
                  {address ? (
                    <div> 
                      {network == '0x4' ? (
                        <div className="p-4  font-serif bg-gradient-to-r from-blueclean via-bluesky to-bluebg text-textwhite  utline outline-offset-1 text-back-700 rounded-lg  outline-[#2f5c6d] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300">
                          {address}
                        </div>
                      ) : (
                        <div className="p-4  font-serif bg-gradient-to-r from-redbg via-darkbg to-redbg text-textwhite  utline outline-offset-1 text-back-700 rounded-lg  outline-[#2f5c6d] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300">
                          network wrong
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      // className="p-4  font-serif text-textwhite bg-bluebg outline outline-offset-1 text-back-700 sm: text-sm outline-[#2f5c6d] bg-red rounded-lg  drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                      className="p-4  font-serif bg-gradient-to-r from-blueclean via-bluesky to-bluebg text-textwhite  utline outline-offset-1 text-back-700 rounded-lg  outline-[#2f5c6d] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
                      onClick={connectWallet}
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="mr-10 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/"
                  className="cursor-pointer text-blue-600 font-semibold px-3 py-2 text-md hover:font-black"
                >
                  Home
                </Link>
                <Link
                  href="/swap"
                  className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Swap
                </Link>

                <Link href="/liquidity">
                  <a className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Addliquidity
                  </a>
                </Link>

                <Link href="/pool">
                  <a className="cursor-pointer hover:bg-blue-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Pool
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
