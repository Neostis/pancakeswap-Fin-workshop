import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
const Home: NextPage = () => {
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Home;
