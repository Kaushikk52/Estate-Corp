import React from 'react';
import BentoGrid from './BentoGrid';
import Carousel from './Carousel';
import Filter from './Filter';
function Home() {
  
    return (
      <>
        {/* <Carousel/> */}
        <Filter />
        <BentoGrid />
      </>
    );
  }
  
  export default Home;