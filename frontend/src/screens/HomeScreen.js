import React from 'react';
import '../index.css';
import Cards from '../components/Cards';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

function HomeScreen() {
  return (
    <>
      <Header />
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default HomeScreen;
