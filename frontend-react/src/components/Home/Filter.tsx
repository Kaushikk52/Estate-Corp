import React, { useState, KeyboardEvent } from 'react'
import { MapPinIcon, IndianRupeeIcon, BedDoubleIcon, SearchIcon, XIcon, ChevronDownIcon, FilterIcon } from 'lucide-react'

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
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const bedroomOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '5+BHK']
  const priceOptions = ['5 Lacs', '10 Lacs', '20 Lacs', '30 Lacs', '40 Lacs', '50 Lacs', '60 Lacs', '70 Lacs', '80 Lacs', '90 Lacs', '1 Cr', '1.5 Cr', '2 Cr', '2.5 Cr', '3 Cr', '4 Cr', '5 Cr', '10 Cr', '20 Cr']
  const carpetAreaOptions = ['500', '1000', '1500', '2000', '2500', '3000', '3500', '4000', '4500', '5000', '5500', '6000', '7000', '8000', '9000', '10000']

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

  return (
    <div className="max-w-6xl mx-auto mt-5">
      <div className="mx-auto mt-10 px-4">
        <div className="bg-white rounded-3xl  shadow-lg p-4 border border-zinc-500">
          <div className="md:hidden  flex items-center justify-between sm:mb-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-3/4 bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center justify-center mb-2"
            >
              <FilterIcon className="h-5 w-5 mr-2" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button className="w-1/5 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center">
              <SearchIcon className="h-5 w-5" />
            </button>
          </div>
          <div className={`md:flex md:items-center md:space-x-4 ${isFilterOpen ? '' : 'hidden md:flex'}`}>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <div className="flex flex-wrap items-center gap-2 w-full">
                  {locations.map((loc) => (
                    <span key={loc} className="bg-white text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
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
                    className="flex-grow min-w-[100px] bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
                <BedDoubleIcon className="h-5 w-5 text-gray-400 mr-2" />
                <div className="flex flex-wrap items-center gap-2 w-full">
                  {bedrooms.map((bed) => (
                    <span key={bed} className="bg-white text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
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
            </div>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
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
            </div>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
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
            </div>
            <div className="hidden md:block">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center">
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}