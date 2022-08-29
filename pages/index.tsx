import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
// import HomeModule from '../components/HomeModule';

import Link from 'next/link';
const Home: NextPage = () => {
  return (
    <div className='h-auto w-auto '>

<div className='grid grid-cols-1 gap-4 py-20'>
  <div className='justify-self-center grid grid-cols-1'>
    <h3 className='justify-self-center text-textwhite text-5xl font-bold'>Welcome to Fin Swap</h3>
    <div className="justify-self-center flex py-20 font-bold">
        <h3 className='text-lightbluebg text-5xl mr-4'>swap</h3>
        <h3 className='text-textwhite text-5xl mr-4'>and</h3>
        <h3 className='text-lightbluebg text-5xl mr-4'>liquidity</h3>
        <h3 className='text-textwhite text-5xl mr-4'>platfrom</h3>
      </div>
      <div className="justify-self-center">

        <button
          className="m-8 justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
          from-blueswapdark  to-blueswapbutton 
          text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
          >
          <Link href="/swap">swap Now</Link>
        </button>
        <button
          className="m-8 justify-self-center w-32 h-10 rounded-full bg-gradient-to-r
          from-blueswapdark  to-blueswapbutton 
          text-textwhite outline outline-offset-1 outline-[#ffffff] drop-shadow-xl  top-3 right-6 transition ease-in-out delay-150 bg-[#00A8E8 hover:-translate-y-1 hover:scale-110 hover:bg-[#4E9CE3] duration-300"
          >
          <Link href="/addliquidity">Liquidity Now</Link>
        </button>
      </div>

  </div>


</div>
     
        
    </div>
  );
};

export default Home;
