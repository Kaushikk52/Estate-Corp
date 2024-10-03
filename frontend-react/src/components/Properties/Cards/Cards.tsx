import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Bed, Bath, Home, Camera, MapPin, Scaling } from 'lucide-react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import Filter from '../../Home/Filter'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface Property {
  id: string;
  name: string;
  images: string[];
  type: string;
  address: {
    street: string;
    locality: string;
    landmark: string;
    zipCode: string;
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    carpetArea: string;
    areaUnit: string;
    rent: number;
    price: number;
    amtUnit: string;
    isNegotiable: string;
    furnishedStatus: string;
  };
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

export default function PropertyCardsCarousel() {
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllApprovedProperties = async () => {
    try {
      const response = await axios.get(`${baseURL}/v1/api/properties/isApproved?isApproved=${true}`)
      if (response.status === 200) {
        setProperties(response.data)
      }
    } catch (err) {
      console.error("An error occurred: ", err)
    }
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    getAllApprovedProperties()
    const updateVisibleCards = () => {
      const width = window.innerWidth
      let newVisibleCards
      if (width < 640) newVisibleCards = 1
      else if (width < 1024) newVisibleCards = 2
      else newVisibleCards = 3
      
      if (newVisibleCards !== visibleCards) {
        setVisibleCards(newVisibleCards)
        setCurrentIndex(0)
      }
    }
  
    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [setProperties])

  const fetchProperties = async (filters?: FilterState) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      let url = `${baseURL}/v1/api/properties/filter?`;
      if (filters) {
        if (filters.cities.length > 0)
          url += `cities=${filters.cities.join(",")}&`;
        if (filters.bedrooms.length > 0)
          url += `bedrooms=${filters.bedrooms.join(",")}&`;
        if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
        if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
        if (filters.amtUnit) url += `amtUnit=${filters.amtUnit}&`;
        if (filters.minCarpetArea)
          url += `minCarpetArea=${filters.minCarpetArea}&`;
        if (filters.maxCarpetArea)
          url += `maxCarpetArea=${filters.maxCarpetArea}&`;
        if (filters.areaUnit) url += `areaUnit=${filters.areaUnit}&`;
      } else {
        url = `${baseURL}/v1/api/properties/all`;
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data.properties);
    } catch (err) {
      console.error("An error occurred: ", err);
      setError("Failed to fetch properties. Please try again.");
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleFilterChange = (filters: FilterState) => {
    fetchProperties(filters);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(prevIndex + 1, properties.length - visibleCards)
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  return (
    <>
    <Filter onFilterChange={handleFilterChange}/>
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Featured Properties</h2>
      <div className="relative">
        <div className="overflow-hidden w-full">
          <div className="relative p-4">
            <motion.div 
              className="flex"
              initial={false}
              animate={{ x: `-${currentIndex * (100 / visibleCards)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <AnimatePresence>
                {properties.map((property) => (
                  <motion.div
                    key={property.id}
                    className={`flex-shrink-0 w-full px-2 ${
                      visibleCards === 1 ? 'w-full' : 
                      visibleCards === 2 ? 'md:w-1/2' : 
                      'md:w-1/2 lg:w-1/3'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
                      <div className="relative">
                        <img 
                          src={property.images.length > 0 ? property.images[0] : defaultImg} 
                          alt={property.name} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center">
                          <Camera className="h-3 w-3 mr-1" />
                          {property.images.length}
                        </div>
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${property.details.isNegotiable === 'YES' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                          {property.details.isNegotiable === "YES" ? "Negotiable" : "Not Negotiable"}
                        </div>
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          property.details.furnishedStatus === 'FURNISHED' ? 'bg-green-500 text-white' : 
                          property.details.furnishedStatus === "SEMIFURNISHED" ? 'bg-yellow-500 text-white' : 
                          'bg-red-500 text-white'
                        }`}>
                          {property.details.furnishedStatus}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-blue-700 truncate">{property.name}</h3>
                        <p className="text-sm text-gray-600 mt-1 flex items-center line-clamp-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                          <span className="truncate">
                            {property.address.landmark} {property.address.locality} {property.address.street} - {property.address.zipCode}
                          </span>
                        </p>
                        {property.type === "RENT" ? 
                          <p className="text-xl font-bold text-blue-600 mt-2">Rs. {property.details.rent.toLocaleString()} {property.details.amtUnit} /monthly</p> :
                          <p className="text-xl font-bold text-blue-600 mt-2">Rs. {property.details.price.toLocaleString()} {property.details.amtUnit}</p>
                        }
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Home className="h-3 w-3 mr-1" /> {property.type}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Scaling className="h-3 w-3 mr-1" /> {property.details.carpetArea} {property.details.areaUnit}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Bed className="h-3 w-3 mr-1" /> {property.details.bedrooms}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Bath className="h-3 w-3 mr-1" /> {property.details.bathrooms}
                          </span>
                        </div>
                        <motion.button 
                          className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md transition-colors duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none">
              <div className="flex justify-between items-center h-full">
                <motion.button
                  className="pointer-events-auto z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-colors duration-300"
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  aria-label="Previous property"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6 text-blue-700" />
                </motion.button>
                <motion.button
                  className="pointer-events-auto z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-colors duration-300"
                  onClick={nextSlide}
                  disabled={currentIndex >= properties.length - visibleCards}
                  aria-label="Next property"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6 text-blue-700" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}