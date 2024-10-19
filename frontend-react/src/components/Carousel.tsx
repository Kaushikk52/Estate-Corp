import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import React from 'react'

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Mountain Landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    title: 'Foggy Forest',
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    title: 'Scenic Valley',
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(slideInterval)
  }, [currentIndex])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 cursor-pointer">
        <ChevronLeftIcon
          onClick={prevSlide}
          className="text-white w-8 h-8 md:w-10 md:h-10"
        />
      </div>
      {/* Right Arrow */}
      <div className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer">
        <ChevronRightIcon
          onClick={nextSlide}
          className="text-white w-8 h-8 md:w-10 md:h-10"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-y-1/2 flex space-x-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'
            }`}
          ></div>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold">
        {slides[currentIndex].title}
      </div>
    </div>
  )
}