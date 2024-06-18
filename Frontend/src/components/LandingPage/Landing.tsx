import React from 'react';
import Navbar from './Header';
import Hero from './Hero';
import Cards from './Cards';
import Footer from './Footer';
import Search from './Search';
import Opcion from './Opcion';

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Hero />
      <Cards />
      <Opcion />
      <Footer />
      
    </div>
  );
};

export default Landing;
