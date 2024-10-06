import React from 'react';
import BentoGrid from './BentoGrid';
import Carousel from './Carousel';
import Cards from '../Properties/Cards/Cards';
import { motion } from 'framer-motion'
import FeaturedCardsCarousel from '../Properties/Cards/featuredCards';
import CityCardsCarousel from '../Properties/Cards/CityProperties';
function Home() {

  const titleWords = [
    ["FIND", "YOUR", "HOME"],
    ["SUITABLE", "TO", "YOUR", "NEEDS"]
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }
  
    return (
      <>
        {/* <Carousel/> */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="relative h-[200px] sm:h-[300px] md:h-[400px] mb-5 rounded-xl overflow-hidden bg-[#d0d9e6]">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Modern furniture" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight drop-shadow-lg text-opacity-80"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {titleWords.map((line, lineIndex) => (
                <motion.div key={lineIndex} className="mb-2">
                  {line.map((word, wordIndex) => (
                    <motion.span
                      key={wordIndex}
                      variants={wordVariants}
                      className="inline-block mr-2 sm:mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              ))}
            </motion.h1>
          </div>
        </div>
      </div>
        <Cards />
        <FeaturedCardsCarousel/>
        <BentoGrid />
        <CityCardsCarousel/>

      </>
    );
  }
  
  export default Home;