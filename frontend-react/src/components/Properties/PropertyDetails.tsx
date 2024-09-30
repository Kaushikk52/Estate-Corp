import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Bed, Bath, Home, MapPin, Calendar, DollarSign, Maximize } from 'lucide-react'

interface Property {
  id: number
  name: string
  type: string
  price: number
  bedrooms: number
  bathrooms: number
  image: string
  status: string
  location: string
  description: string
  squareFootage: number
  yearBuilt: number
  amenities: string[]
  images: string[]
}

const mockPropertyData: Property = {
  id: 1,
  name: "Sunset Villa",
  type: "House",
  price: 500000,
  bedrooms: 4,
  bathrooms: 3,
  image: "/placeholder.svg?height=400&width=600",
  status: "Ready to Move",
  location: "Malibu, CA",
  description: "Experience luxury living in this stunning Malibu villa with breathtaking ocean views. This spacious home features an open floor plan, gourmet kitchen, and a private pool.",
  squareFootage: 3500,
  yearBuilt: 2015,
  amenities: ["Pool", "Ocean View", "Gourmet Kitchen", "Home Theater", "Garage"],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]
}

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')

  useEffect(() => {
    setProperty(mockPropertyData)
    setSelectedImage(mockPropertyData.images[0])
  }, [id])

  if (!property) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Listings
        </Link>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">{property.name}</h1>
              <div className="text-2xl font-semibold text-purple-600">${property.price.toLocaleString()}</div>
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.location}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={selectedImage}
                  alt={property.name}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
                <div className="flex mt-4 space-x-4 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.name} - Image ${index + 1}`}
                      className={`w-24 h-24 object-cover rounded-md cursor-pointer transition-all ${
                        selectedImage === image ? 'ring-2 ring-purple-500' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Home className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.squareFootage} sq ft</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Built in {property.yearBuilt}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.status}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                <p className="text-gray-600">{property.description}</p>
                <h3 className="text-xl font-semibold mt-6 mb-2">Amenities</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Contact Agent
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}