import React, { useState, KeyboardEvent } from 'react'
import { MapPinIcon, IndianRupeeIcon, BedDoubleIcon, SearchIcon, XIcon, ChevronDownIcon, FilterIcon, Scaling, RefreshCw } from 'lucide-react'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  cities: string[];
  bedrooms: number[];
  minPrice: string;
  maxPrice: string;
  amtUnit: string;
  minCarpetArea: string;
  maxCarpetArea: string;
  areaUnit: string;
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [cities, setCities] = useState<string[]>([])
  const [currentCity, setCurrentCity] = useState('')
  const [bedrooms, setBedrooms] = useState<number[]>([])
  const [isBedroomDropdownOpen, setIsBedroomDropdownOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [isCarpetAreaDropdownOpen, setIsCarpetAreaDropdownOpen] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [amtUnit, setAmtUnit] = useState('K')
  const [minCarpetArea, setMinCarpetArea] = useState('')
  const [maxCarpetArea, setMaxCarpetArea] = useState('')
  const [areaUnit, setAreaUnit] = useState('sqft')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const priceOptions = ['1', '5', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
  const carpetAreaOptions = ['500', '1000', '1500', '2000', '2500', '3000', '3500', '4000', '4500', '5000', '5500', '6000', '7000', '8000', '9000', '10000']
  const amtUnitOptions = ['K', 'L', 'Cr']
  const carpetAreaUnitOptions = ['sqft', 'sqm', 'sqyd', 'acre']

  const handleAddCity = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCity.trim()) {
      setCities([...cities, currentCity.trim()])
      setCurrentCity('')
    }
  }

  const handleRemoveCity = (cityToRemove: string) => {
    setCities(cities.filter(city => city !== cityToRemove))
  }

  const handleBedroomToggle = (option: number) => {
    if (bedrooms.includes(option)) {
      setBedrooms(bedrooms.filter(bed => bed !== option))
    } else {
      setBedrooms([...bedrooms, option])
    }
  }

  const handlePriceSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setMinPrice(value)
    } else {
      setMaxPrice(value)
      setIsPriceDropdownOpen(false)
    }
  }

  const handleCarpetAreaSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setMinCarpetArea(value)
    } else {
      setMaxCarpetArea(value)
      setIsCarpetAreaDropdownOpen(false)
    }
  }

  const applyFilters = () => {
    const filters: FilterState = {
      cities,
      bedrooms,
      minPrice,
      maxPrice,
      amtUnit,
      minCarpetArea,
      maxCarpetArea,
      areaUnit
    }
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setCities([])
    setCurrentCity('')
    setBedrooms([])
    setMinPrice('')
    setMaxPrice('')
    setAmtUnit('K')
    setMinCarpetArea('')
    setMaxCarpetArea('')
    setAreaUnit('sqft')
    onFilterChange({
      cities: [],
      bedrooms: [],
      minPrice: '',
      maxPrice: '',
      amtUnit: 'K',
      minCarpetArea: '',
      maxCarpetArea: '',
      areaUnit: 'sqft'
    })
  }

  return (
    <div className="max-w-6xl mx-auto mt-5">
      <div className="mx-auto mt-10 px-4">
        <div className="bg-white rounded-3xl shadow-lg p-4 border border-zinc-500">
          <div className="md:hidden flex items-center justify-between sm:mb-0">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-3/4 bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center justify-center mb-2"
            >
              <FilterIcon className="h-5 w-5 mr-2" />
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button 
              onClick={applyFilters}
              className="w-1/5 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center justify-center"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            <button 
                onClick={clearFilters}
                className="w-1/5 bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
              </button>
          </div>
          <div className={`md:flex md:items-center md:space-x-4 ${isFilterOpen ? '' : 'hidden md:flex'}`}>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                <div className="flex flex-wrap items-center gap-2 w-full">
                  {cities.map((city) => (
                    <span key={city} className="bg-white text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                      {city}
                      <XIcon 
                        className="h-4 w-4 ml-1 cursor-pointer" 
                        onClick={() => handleRemoveCity(city)}
                      />
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder={cities.length ? "Add more" : "City"}
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    onKeyPress={handleAddCity}
                    className="flex-grow min-w-[100px] bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
                <BedDoubleIcon className="h-5 w-5 text-gray-400 mr-2" />
                <button
                  onClick={() => setIsBedroomDropdownOpen(!isBedroomDropdownOpen)}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  {bedrooms.length > 0 ? `${bedrooms.join(', ')} BHK` : 'Bedrooms'}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isBedroomDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      {bedroomOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleBedroomToggle(option)}
                          className={`${
                            bedrooms.includes(option) ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                          role="menuitem"
                        >
                          {option} BHK
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
                  {minPrice && maxPrice ? `${minPrice} - ${maxPrice} ${amtUnit}` : minPrice ? `${minPrice}+ ${amtUnit}` : 'Price'}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isPriceDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <div className="px-4 py-2 text-sm text-gray-700">Amount Unit</div>
                      <div className="flex justify-around mb-2">
                        {amtUnitOptions.map((unit) => (
                          <button
                            key={unit}
                            onClick={() => setAmtUnit(unit)}
                            className={`px-2 py-1 rounded ${amtUnit === unit ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                      {!minPrice && (
                        <div className="px-4 py-2 text-sm text-gray-700">Min Price</div>
                      )}
                      {!minPrice && priceOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handlePriceSelect(option, true)}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {parseInt(option).toLocaleString()} {amtUnit}
                        </button>
                      ))}
                      {minPrice && !maxPrice && (
                        <div className="px-4 py-2 text-sm text-gray-700">Max Price</div>
                      )}
                      {minPrice && !maxPrice && priceOptions.filter(option => parseInt(option) > parseInt(minPrice)).map((option) => (
                        <button
                          key={option}
                          onClick={() => handlePriceSelect(option, false)}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {parseInt(option).toLocaleString()} {amtUnit}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
                <Scaling className="h-5 w-5 text-gray-400 mr-2" />
                <button
                  onClick={() => setIsCarpetAreaDropdownOpen(!isCarpetAreaDropdownOpen)}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  {minCarpetArea && maxCarpetArea ? `${minCarpetArea} - ${maxCarpetArea} ${areaUnit}` : minCarpetArea ? `${minCarpetArea}+ ${areaUnit}` : 'Area'}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isCarpetAreaDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <div className="px-4 py-2 text-sm text-gray-700">Area Unit</div>
                      <div className="flex flex-wrap justify-around mb-2">
                        {carpetAreaUnitOptions.map((unit) => (
                          <button
                            key={unit}
                            onClick={() => setAreaUnit(unit)}
                            className={`px-2 py-1 rounded mb-1 ${areaUnit === unit ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                      {!minCarpetArea && (
                        <div className="px-4 py-2 text-sm text-gray-700">Min Area</div>
                      )}
                      {!minCarpetArea && carpetAreaOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleCarpetAreaSelect(option, true)}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {option} {areaUnit}
                        </button>
                      ))}
                      {minCarpetArea && !maxCarpetArea && (
                        <div className="px-4 py-2 text-sm text-gray-700">Max Area</div>
                      )}
                      {minCarpetArea && !maxCarpetArea && carpetAreaOptions.filter(option => parseInt(option) > parseInt(minCarpetArea)).map((option) => (
                        <button
                          key={option}
                          onClick={() => handleCarpetAreaSelect(option, false)}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {option} {areaUnit}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex space-x-2">
              <button 
                onClick={applyFilters}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <SearchIcon className="h-5 w-5 mr-2" />
                Search
              </button>
              <button 
                onClick={clearFilters}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}