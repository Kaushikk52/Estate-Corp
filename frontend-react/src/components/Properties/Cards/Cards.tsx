import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Bed, Bath, Home, Camera, MapPin } from 'lucide-react'
import axios from 'axios';


export default function PropertyCardsCarousel() {
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG;
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const [properties,setProperties] = useState([{
      id:"",
      createdAt: "",
      updatedAt: "",
      name:"",
      images : [],
      type : "",
      propertyVariant: "",
      address: {
        id:"",
        street:"",
        locality:"",
        landmark:"",
        zipCode:"",
      },
      details:{
        bedrooms:0,
        bathrooms:0,
        balconies:0,
        floorNo:0,
        city:"",
        ammenitites :[],
        facing:"",
        carpetArea:"",
        areaUnit:"",
        isApproved:false,
        availability:"",
        rent: 0,
        price:0,
        furnishedStatus:"",
      },
      project:{}
    }
  ]);

  const getAllApprovedProperties = async () =>{
    try{
      const response = await axios.get(`${baseURL}/v1/api/properties/isApproved?isApproved=${true}`);
      if(response.status === 200){
        setProperties(response.data);
        // console.log("all properties...",response.data);
      }
    }catch(err){
      console.log("An error occurred : ",err);
    }
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)

  useEffect(() => {

    getAllApprovedProperties();
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
          <div className="flex gap-4 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * (107 / visibleCards)}%)` }}>
            {properties.map((property) => (
              <div key={property.id} className={`w-full flex-shrink-0 ${visibleCards === 1 ? 'w-full' : visibleCards === 2 ? 'sm:w-3/5' : 'sm:w-3/5 lg:w-1/3'}`}>

                <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="relative">
                    {
                      property.images !== null ? 
                      <img src={property.images[0]} alt={property.name} className="w-full h-48 object-cover" /> :
                      <img src={defaultImg} alt={property.name} className="w-full h-48 object-cover" /> 
                    }
                    
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      <Camera className="h-3 w-3 mr-1" />
                      {property.images.length}
                    </div>

                    <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${property.type === 'RENT' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                     {property.type === "RENT" ? "Negotiable" : "Not Negotiable"}
                    </div>
                    
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${property.details.furnishedStatus === 'FURNISHED' ?'bg-green-500 text-white' 
                    : property.details.furnishedStatus ===  "SEMIFURNISHED"?  'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                      {property.details.furnishedStatus}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-purple-700 truncate">{property.name}</h3>
                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {property.address.landmark} {property.address.locality} {property.address.street} - {property.address.zipCode}
                    </p>
                    {property.type === "RENT" ? 
                    <p className="text-xl font-bold text-purple-600 mt-2">Rs. {property.details.rent.toLocaleString()} /monthly</p> :
                    <p className="text-xl font-bold text-purple-600 mt-2">Rs. {property.details.price.toLocaleString()}</p>
                    }
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Home className="h-3 w-3 mr-1" /> {property.type}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Bed className="h-3 w-3 mr-1" /> {property.details.bedrooms}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Bath className="h-3 w-3 mr-1" /> {property.details.bathrooms}
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