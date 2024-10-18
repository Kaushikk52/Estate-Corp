import BentoGrid from './BentoGrid';
import Cards from '../../Cards/Cards';
import { motion } from 'framer-motion'
import FeaturedCardsCarousel from '../../Cards/featuredCards';
import CityCardsCarousel from '../../Cards/CityProperties';
import ProjectsCarousel from '../../Cards/ProjectCards';
import Testimonials from '../../testimonials';
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
            src="/carousel.webp"
            alt="Modern furniture"
            className="w-full h-full object-cover object-center opacity-60"
            // 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h1 
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-950 text-center leading-tight drop-shadow-lg text-opacity-70"
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
        <ProjectsCarousel/>
        <CityCardsCarousel/>
        <BentoGrid />
        <Testimonials/>
      </>
    );
  }
  
  export default Home;