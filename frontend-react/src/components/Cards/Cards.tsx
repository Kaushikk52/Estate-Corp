import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Bed, Bath, Home, Camera, MapPin } from 'lucide-react'
import React from 'react'

const properties = [
  { id: 1, name: "Sunset Villa", type: "House", price: 500000, bedrooms: 4, bathrooms: 3, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", location: "Malibu, CA", status: "Ready to Move", images: 12 },
  { id: 2, name: "Urban Loft", type: "Apartment", price: 300000, bedrooms: 2, bathrooms: 2, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", location: "New York, NY", status: "Under Construction", images: 8 },
  { id: 3, name: "Seaside Cottage", type: "House", price: 450000, bedrooms: 3, bathrooms: 2, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", location: "Cape Cod, MA", status: "Ready to Move", images: 15 },
  { id: 4, name: "Mountain Retreat", type: "Cabin", price: 350000, bedrooms: 2, bathrooms: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", location: "Aspen, CO", status: "Ready to Move", images: 10 },
  { id: 5, name: "Downtown Condo", type: "Apartment", price: 275000, bedrooms: 1, bathrooms: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", location: "Chicago, IL", status: "Under Construction", images: 6 },
  { id: 6, name: "Suburban Family Home", type: "House", price: 550000, bedrooms: 5, bathrooms: 3, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", location: "Austin, TX", status: "Ready to Move", images: 20 },
]

export default function PropertyCardsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      let newVisibleCards;
      if (width < 640) newVisibleCards = 1;
      else if (width < 1024) newVisibleCards = 2;
      else newVisibleCards = 3;
      
      if (newVisibleCards !== visibleCards) {
        setVisibleCards(newVisibleCards);
        setCurrentIndex(0); 
      }
    };
  
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [visibleCards]);
  

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(prevIndex + 1, properties.length - visibleCards)
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-purple-700">Featured Properties</h2>
      <div className="relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          aria-label="Previous property"
        >
          <ChevronLeft className="h-6 w-6 text-purple-700" />
        </button>
        <div className="overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}>
            {properties.map((property) => (
              <div key={property.id} className={`w-full flex-shrink-0 ${visibleCards === 1 ? 'w-full' : visibleCards === 2 ? 'sm:w-3/5' : 'sm:w-3/5 lg:w-1/3'}`}>

                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Camera className="h-3 w-3 mr-1" />
                      {property.images}
                    </div>
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${property.status === 'Ready to Move' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                      {property.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-purple-700 truncate">{property.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {property.location}
                    </p>
                    <p className="text-xl font-bold text-purple-600 mt-2">${property.price.toLocaleString()}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Home className="h-3 w-3 mr-1" /> {property.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Bed className="h-3 w-3 mr-1" /> {property.bedrooms}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Bath className="h-3 w-3 mr-1" /> {property.bathrooms}
                      </span>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-md transition-colors duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md"
          onClick={nextSlide}
          disabled={currentIndex >= properties.length - visibleCards}
          aria-label="Next property"
        >
          <ChevronRight className="h-6 w-6 text-purple-700" />
        </button>
      </div>
    </div>
  )
}