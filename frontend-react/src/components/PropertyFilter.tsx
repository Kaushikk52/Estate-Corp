import React, { useState } from 'react'
import { MapPinIcon, IndianRupeeIcon, BedDoubleIcon, SearchIcon, XIcon, ChevronDownIcon, FilterIcon, Scaling, RefreshCw } from 'lucide-react'

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  locations: string[];
  bedrooms: number[];
  minPrice: string;
  maxPrice: string;
  amtUnit: string;
  minCarpetArea: string;
  maxCarpetArea: string;
  areaUnit: string;
}

interface LocationGroup {
  label: string;
  options: string[];
}

export default function PropertyFilter({ onFilterChange }: FilterProps) {
  const [locations, setLocations] = useState<string[]>([])
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false)
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
  const locationGroups: LocationGroup[] = [
    {
      label: "Bhayandar",
      options: ["Bhayandar East", "Bhayandar West"]
    },
    {
      label: "Mira Road",
      options: ["Mira Road East"]
    },
    {
      label: "Dahisar",
      options: ["Dahisar East", "Dahisar West"]
    },
    {
      label: "Borivali",
      options: ["Borivali East", "Borivali West"]
    },
    {
      label: "Malad",
      options: ["Malad East", "Malad West"]
    },
    {
      label: "Goregaon",
      options: ["Goregaon East", "Goregaon West"]
    }
  ]

  const handleAddLocation = (location: string) => {
    if (!locations.includes(location)) {
      setLocations([...locations, location])
    }
    setIsLocationDropdownOpen(false)
  }

  const handleRemoveLocation = (locationToRemove: string) => {
    setLocations(locations.filter(location => location !== locationToRemove))
  }

  const handleBedroomToggle = (option: number) => {
    if (bedrooms.includes(option)) {
      setBedrooms(bedrooms.filter(bed => bed !== option))
    } else {
      setBedrooms([...bedrooms, option])
    }
    setIsBedroomDropdownOpen(false)
  }

  const handlePriceSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setMinPrice(value)
    } else {
      setMaxPrice(value)
    }
    setIsPriceDropdownOpen(false)
  }

  const handleCarpetAreaSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setMinCarpetArea(value)
    } else {
      setMaxCarpetArea(value)
    }
    setIsCarpetAreaDropdownOpen(false)
  }

  const handleOpenDropdown = (dropdown: string) => {
    setIsLocationDropdownOpen(prev => dropdown === 'location' ? !prev : false)
    setIsBedroomDropdownOpen(prev => dropdown === 'bedroom' ? !prev : false)
    setIsPriceDropdownOpen(prev => dropdown === 'price' ? !prev : false)
    setIsCarpetAreaDropdownOpen(prev => dropdown === 'carpetArea' ? !prev : false)
  }

  const applyFilters = () => {
    const filters: FilterState = {
      locations,
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
    setLocations([])
    setBedrooms([])
    setMinPrice('')
    setMaxPrice('')
    setAmtUnit('K')
    setMinCarpetArea('')
    setMaxCarpetArea('')
    setAreaUnit('sqft')
    onFilterChange({
      locations: [],
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
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 cursor-pointer" onClick={() => handleOpenDropdown('location')} />
                <div className="flex flex-wrap items-center gap-2 w-full">
                  {locations.map((location) => (
                    <span key={location} className="bg-white text-gray-700 px-2 py-1 rounded-full text-sm flex items-center">
                      {location}
                      <XIcon 
                        className="h-4 w-4 ml-1 cursor-pointer" 
                        onClick={() => handleRemoveLocation(location)}
                      />
                    </span>
                  ))}
                  <button
                    onClick={() => handleOpenDropdown('location')}
                    className="flex items-center text-gray-700 focus:outline-none"
                  >
                    {locations.length === 0 ? 'Location' : 'Add more'}
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </button>
                </div>
                {isLocationDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 max-h-60 overflow-auto custom-scrollbar" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        onClick={() => setIsLocationDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Select location
                      </button>
                      {locationGroups.map((group) => (
                        <div key={group.label}>
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500">{group.label}</div>
                          {group.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleAddLocation(option)}
                              className={`${
                                locations.includes(option) ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                              } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 hover:text-gray-900`}
                              role="menuitem"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0">
              <div className="flex items-center bg-gray-100 rounded-full p-2 relative">
                <BedDoubleIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => handleOpenDropdown('bedroom')} />
                <button
                  onClick={() => handleOpenDropdown('bedroom')}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  {bedrooms.length > 0 ? `${bedrooms.join(', ')} BHK` : 'Bedrooms'}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isBedroomDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 max-h-60 overflow-auto custom-scrollbar" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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
                <IndianRupeeIcon className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => handleOpenDropdown('price')} />
                <button
                  onClick={() => handleOpenDropdown('price')}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  {minPrice && maxPrice ? `${minPrice} - ${maxPrice} ${amtUnit}` : minPrice ? `${minPrice}+ ${amtUnit}` : 'Price'}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isPriceDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 max-h-60 overflow-auto custom-scrollbar" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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
                <Scaling className="h-5 w-5 text-gray-400 mr-2 cursor-pointer" onClick={() => handleOpenDropdown('carpetArea')} />
                <button
                  onClick={() => handleOpenDropdown('carpetArea')}
                  className="flex items-center text-gray-700 focus:outline-none"
                >
                  {minCarpetArea && maxCarpetArea ? `${minCarpetArea} - ${maxCarpetArea} ${areaUnit}` : minCarpetArea ? `${minCarpetArea}+ ${areaUnit}` : 'Area'}
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                </button>
                {isCarpetAreaDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 max-h-60 overflow-auto custom-scrollbar" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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