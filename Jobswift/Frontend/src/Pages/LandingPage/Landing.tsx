import React from 'react';
import Navbar from '../../components/Header';
import Hero from './Hero';
import Cards from './Cards';
import Footer from '../../components/Footer';
import Search from './Search';
import Opcion from './Opcion';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Cards />
      <Opcion />
      <Footer />
    </div>
  );
};

export default Landing;
