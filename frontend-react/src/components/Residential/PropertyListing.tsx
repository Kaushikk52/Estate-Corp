import React, { useState, useRef, useEffect } from 'react'
import { Search, Bed, Bath, Home, MapPin, ChevronUp, ChevronDown } from 'lucide-react'
import BlogSidebar from './BlogSidebar'

export default function PropertyListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)
  const blogContainerRef = useRef<HTMLDivElement>(null)

  const properties = [
    { id: 1, name: "Sunset Villa", type: "House", price: 500000, bedrooms: 4, bathrooms: 3, image: "/placeholder.svg?height=400&width=600", status: "Ready to Move", location: "Malibu, CA" },
    { id: 2, name: "Urban Loft", type: "Apartment", price: 300000, bedrooms: 2, bathrooms: 2, image: "/placeholder.svg?height=400&width=600", status: "Under Construction", location: "Downtown LA" },
    { id: 3, name: "Seaside Cottage", type: "House", price: 450000, bedrooms: 3, bathrooms: 2, image: "/placeholder.svg?height=400&width=600", status: "Ready to Move", location: "Newport Beach, CA" },
  ]

  const blogs = [
    { id: 1, title: "Top 10 Home Decor Tips", excerpt: "Transform your space with these simple ideas..." },
    { id: 2, title: "Investing in Real Estate: A Beginner's Guide", excerpt: "Learn the basics of property investment..." },
    { id: 3, title: "Sustainable Living: Eco-Friendly Homes", excerpt: "Discover how to reduce your carbon footprint..." },
    { id: 4, title: "The Future of Smart Homes", excerpt: "Explore the latest trends in home automation..." },
    { id: 5, title: "Maximizing Small Spaces", excerpt: "Creative solutions for compact living areas..." },
  ]

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (priceRange === '' || (priceRange === 'low' && property.price < 400000) || (priceRange === 'high' && property.price >= 400000)) &&
    (propertyType === '' || property.type.toLowerCase() === propertyType.toLowerCase()) &&
    (bedrooms === '' || property.bedrooms.toString() === bedrooms)
  )

  const scrollBlogs = (direction: 'up' | 'down') => {
    if (blogContainerRef.current) {
      const scrollAmount = direction === 'up' ? -200 : 200
      blogContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Find Your Dream Home</h1>

        {/* Search and Filters */}
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6 mb-8">
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
        </div>

        {/* Property Listings */}
        <div className="space-y-8">
          {filteredProperties.map(property => (
            <div key={property.id} className="bg-white bg-opacity-90 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 lg:w-1/3 relative">
                  <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    property.status === 'Ready to Move' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-800'
                  }`}>
                    {property.status}
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-purple-700">{property.name}</h2>
                      <p className="text-xl font-semibold text-purple-600">${property.price.toLocaleString()}</p>
                    </div>
                    <p className="text-gray-600 mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> {property.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Home className="h-4 w-4" /> {property.type}
                      </span>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Bed className="h-4 w-4" /> {property.bedrooms} Beds
                      </span>
                      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Bath className="h-4 w-4" /> {property.bathrooms} Baths
                      </span>
                    </div>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <button className="mt-4 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Featured Blogs Sidebar */}
        <BlogSidebar/>

    </div>
  )
}