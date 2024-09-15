import React from 'react';
import BentoGrid from './BentoGrid';
import Carousel from './Carousel';
import Cards from '../Cards/Cards';
import Filter from './Filter';
function Home() {
  
    return (
      <>
        {/* <Carousel/> */}
        <Filter />
        <Cards />
        <BentoGrid />

      </>
    );
  }
  
  export default Home;