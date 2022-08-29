import '../styles/globals.css';
import Navbar from '../components/Navbar';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-between min-h-screen bg-gradient-to-b
    from-blueswapdark to-lightbluebg '>
      
      <Component {...pageProps} />
      <img src="/BG.png" className='w-full object-cover'></img>
      </div>
    </>
  );
}

export default MyApp;
