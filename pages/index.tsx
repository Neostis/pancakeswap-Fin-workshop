import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import HomeModule from '../components/HomeModule';
const Home: NextPage = () => {
  return (
    <div>
      <HomeModule />
    </div>
  );
};

export default Home;
