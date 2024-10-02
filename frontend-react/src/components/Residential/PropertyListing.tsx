import React, { useState, useRef, useEffect } from 'react'
import { Search, Bed, Bath, Home, MapPin, ChevronUp, ChevronDown, Scaling } from 'lucide-react'
import BlogSidebar from './BlogSidebar'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Filter from '../Home/Filter'
import  axios from 'axios'
import toast from 'react-hot-toast'

export default function PropertyListing() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)
  const blogContainerRef = useRef<HTMLDivElement>(null)

  const [properties, setProperties] = useState([
    {
      id: "",
      createdAt: "",
      updatedAt: "",
      name: "",
      images: [],
      type: "",
      propertyVariant: "",
      address: {
        id: "",
        street: "",
        locality: "",
        landmark: "",
        zipCode: "",
      },
      details: {
        bedrooms: 0,
        bathrooms: 0,
        balconies: 0,
        floorNo: 0,
        city: "",
        ammenitites: [],
        facing: "",
        carpetArea: "",
        areaUnit: "",
        isApproved: false,
        availability: "",
        rent: 0,
        price: 0,
        amtUnit:"",
        isNegotiable:"",
        furnishedStatus: "",
      },
      project: {},
    },
  ]);

  useEffect(()=>{
    getAllProperties();
  },[])

  const getAllProperties = async () => {
    const token = localStorage.getItem('token');
    const getPropertiesURL=`${baseURL}/v1/api/properties/all`;
  
    try {
      const response = await axios.get(getPropertiesURL);   
      if(response.status === 200){
        setProperties(response.data.properties);
        // console.log("all properties...",response.data);
      }else if (response.status === 204){
        setProperties([]);
        toast.error("No properties found", {
          position: "bottom-right",
          duration: 3000,
        });
      }  
    } catch (err) {
      console.log("An error occurred : ", err);
    }
  };

  const blogs = [
    { id: 1, title: "Top 10 Home Decor Tips", excerpt: "Transform your space with these simple ideas..." },
    { id: 2, title: "Investing in Real Estate: A Beginner's Guide", excerpt: "Learn the basics of property investment..." },
    { id: 3, title: "Sustainable Living: Eco-Friendly Homes", excerpt: "Discover how to reduce your carbon footprint..." },
    { id: 4, title: "The Future of Smart Homes", excerpt: "Explore the latest trends in home automation..." },
    { id: 5, title: "Maximizing Small Spaces", excerpt: "Creative solutions for compact living areas..." },
  ]

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (priceRange === '' || (priceRange === 'low' && property.details.price < 400000) || (priceRange === 'high' && property.details.price >= 400000)) &&
    (propertyType === '' || property.type.toLowerCase() === propertyType.toLowerCase()) &&
    (bedrooms === '' || property.details.bedrooms.toString() === bedrooms)
  )

  const scrollBlogs = (direction: 'up' | 'down') => {
    if (blogContainerRef.current) {
      const scrollAmount = direction === 'up' ? -200 : 200
      blogContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }
  }

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/residential/buy/${propertyId}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (blogContainerRef.current) {
        setScrollPosition(blogContainerRef.current.scrollTop)
      }
    }

    blogContainerRef.current?.addEventListener('scroll', handleScroll)
    return () => blogContainerRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Find Your Dream Home</h1>

        {/* Search and Filters */}
        <Filter/>
        {/* <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Price Range</option>
              <option value="low">Under $400,000</option>
              <option value="high">$400,000 and above</option>
            </select>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Property Type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
            </select>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div> */}

        {/* Property Listings */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8 mt-5"
        >
          <AnimatePresence>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handlePropertyClick(property.id)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 lg:w-1/3 relative">
                    <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      property.details.isNegotiable === 'YES' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'
                    }`}>
                      {property.details.isNegotiable === "YES" ? "Negotiable" : "Not Negotiable"}
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-blue-700 truncate">{property.name}</h3>
                        
                        {property.type === "RENT" ? 
                          <p className="text-xl font-semibold text-blue-600 ">Rs. {property.details.rent.toLocaleString()} {property.details.amtUnit} /monthly</p> :
                          <p className="text-xl font-semibold text-blue-600 ">Rs. {property.details.price.toLocaleString()} {property.details.amtUnit}</p>
                        }

                        
                      </div>
                      <p className="text-gray-600 mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> {property.address.landmark}, {property.address.locality}, {property.address.street} - {property.address.zipCode}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                            <Home className="h-3 w-3 mr-1" /> {property.type}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                            <Home className="h-3 w-3 mr-1" /> {property.details.furnishedStatus}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                            <Scaling className="h-3 w-3 mr-1" /> {property.details.carpetArea} {property.details.areaUnit}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                            <Bed className="h-3 w-3 mr-1" /> {property.details.bedrooms} BHK
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                            <Bath className="h-3 w-3 mr-1" /> {property.details.bathrooms} Baths
                          </span>
                        </div>
                      <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <button className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Featured Blogs Sidebar */}
      <BlogSidebar/>

    </div>
  )
}