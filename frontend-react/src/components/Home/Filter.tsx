import React, { useState, KeyboardEvent } from 'react'
import { MapPinIcon, IndianRupeeIcon, BedDoubleIcon, SearchIcon, XIcon, ChevronDownIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Component() {
  const [locations, setLocations] = useState<string[]>([])
  const [currentLocation, setCurrentLocation] = useState('')
  const [bedrooms, setBedrooms] = useState<string[]>([])
  const [isBedroomDropdownOpen, setIsBedroomDropdownOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [isCarpetAreaDropdownOpen, setIsCarpetAreaDropdownOpen] = useState(false)
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [carpetAreaMin, setCarpetAreaMin] = useState('')
  const [carpetAreaMax, setCarpetAreaMax] = useState('')

  const bedroomOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '5+BHK']
  const priceOptions = ['5 Lacs', '10 Lacs', '20 Lacs', '30 Lacs', '40 Lacs', '50 Lacs', '60 Lacs', '70 Lacs', '80 Lacs', '90 Lacs', '1 Cr', '1.5 Cr', '2 Cr', '2.5 Cr', '3 Cr', '4 Cr', '5 Cr', '10 Cr', '20 Cr']
  const carpetAreaOptions = ['500', '1000', '1500', '2000', '2500', '3000', '3500', '4000', '4500', '5000', '5500', '6000', '7000', '8000', '9000', '10000']

  const titleWords = [
    ["FIND", "YOUR", "HOME"],
    ["SUITABLE", "TO", "YOUR", "NEEDS"]
  ]

  const handleAddLocation = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentLocation.trim()) {
      setLocations([...locations, currentLocation.trim()])
      setCurrentLocation('')
    }
  }

  const handleRemoveLocation = (locationToRemove: string) => {
    setLocations(locations.filter(loc => loc !== locationToRemove))
  }

  const handleToggleBedroom = (option: string) => {
    if (bedrooms.includes(option)) {
      setBedrooms(bedrooms.filter(bed => bed !== option))
    } else {
      setBedrooms([...bedrooms, option])
    }
  }

  const handlePriceSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setPriceMin(value)
    } else {
      setPriceMax(value)
      setIsPriceDropdownOpen(false)
    }
  }

  const handleCarpetAreaSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setCarpetAreaMin(value)
    } else {
      setCarpetAreaMax(value)
      setIsCarpetAreaDropdownOpen(false)
    }
  }

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
    <div className="max-w-6xl mx-auto mt-5">
      <div className="relative h-[400px] mb-6 rounded-xl overflow-hidden bg-[#d0d9e6]">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Modern furniture" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-6xl font-bold text-white text-center leading-tight drop-shadow-lg text-opacity-80"
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
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </motion.h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex flex-wrap items-center bg-white rounded-full shadow-lg p-2 border border-zinc-500">
        <div className="flex items-center flex-1 min-w-0 px-4 py-2">
          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
          <div className="flex flex-wrap items-center gap-2 w-full">
            {locations.map((loc) => (
              <span key={loc} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                {loc}
                <XIcon 
                  className="h-4 w-4 ml-1 cursor-pointer" 
                  onClick={() => handleRemoveLocation(loc)}
                />
              </span>
            ))}
            <input
              type="text"
              placeholder={locations.length ? "Add more" : "Location"}
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              onKeyPress={handleAddLocation}
              className="flex-grow min-w-[100px] focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center flex-1 min-w-0 px-4 py-2 border-l border-gray-300 relative">
          <BedDoubleIcon className="h-5 w-5 text-gray-400 mr-2" />
          <div className="flex flex-wrap items-center gap-2 w-full">
            {bedrooms.map((bed) => (
              <span key={bed} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                {bed}
                <XIcon 
                  className="h-4 w-4 ml-1 cursor-pointer" 
                  onClick={() => handleToggleBedroom(bed)}
                />
              </span>
            ))}
            <button
              onClick={() => setIsBedroomDropdownOpen(!isBedroomDropdownOpen)}
              className="flex items-center text-gray-700 focus:outline-none"
            >
              {bedrooms.length === 0 ? 'Bedrooms' : 'Add more'}
              <ChevronDownIcon className="h-4 w-4 ml-1" />
            </button>
          </div>
          {isBedroomDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {bedroomOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleToggleBedroom(option)}
                    className={`${
                      bedrooms.includes(option) ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                    } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center flex-1 min-w-0 px-4 py-2 border-l border-gray-300 relative">
          <IndianRupeeIcon className="h-5 w-5 text-gray-400 mr-2" />
          <button
            onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            {priceMin && priceMax ? `${priceMin} - ${priceMax}` : priceMin ? `${priceMin}+` : 'Price'}
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </button>
          {isPriceDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {!priceMin && (
                  <div className="px-4 py-2 text-sm text-gray-700">Min Price</div>
                )}
                {!priceMin && priceOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handlePriceSelect(option, true)}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
                {priceMin && !priceMax && (
                  <div className="px-4 py-2 text-sm text-gray-700">Max Price</div>
                )}
                {priceMin && !priceMax && priceOptions.filter(option => option > priceMin).map((option) => (
                  <button
                    key={option}
                    onClick={() => handlePriceSelect(option, false)}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center flex-1 min-w-0 px-4 py-2 border-l border-gray-300 relative">
          <button
            onClick={() => setIsCarpetAreaDropdownOpen(!isCarpetAreaDropdownOpen)}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            {carpetAreaMin && carpetAreaMax ? `${carpetAreaMin} - ${carpetAreaMax} sq ft` : carpetAreaMin ? `${carpetAreaMin}+ sq ft` : 'Carpet Area'}
            <ChevronDownIcon className="h-4 w-4 ml-1" />
          </button>
          {isCarpetAreaDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {!carpetAreaMin && (
                  <div className="px-4 py-2 text-sm text-gray-700">Min Area (sq ft)</div>
                )}
                {!carpetAreaMin && carpetAreaOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleCarpetAreaSelect(option, true)}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
                {carpetAreaMin && !carpetAreaMax && (
                  <div className="px-4 py-2 text-sm text-gray-700">Max Area (sq ft)</div>
                )}
                {carpetAreaMin && !carpetAreaMax && carpetAreaOptions.filter(option => parseInt(option) > parseInt(carpetAreaMin)).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleCarpetAreaSelect(option, false)}
                    className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <SearchIcon className="h-5 w-5 mr-2" />
          Search
        </button>
      </div>
    </div>
    </div>
  )
}