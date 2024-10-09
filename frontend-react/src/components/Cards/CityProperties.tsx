import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Home,
  Camera,
  MapPin,
  Scaling,
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

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
    location: string;
  };
}

export default function LocationsCardsCarousel() {
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG;
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const filters = ["All", "Borivali East", "Dahisar East", "Goregaon West"];
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchProperties();
  }, [activeFilter]);

  const fetchProperties = async () => {
    let response;
    if (activeFilter === "All") {
      response = await axios.get(
        `${baseURL}/v1/api/properties/isApproved?isApproved=true`
      );
    } else {
      response = await axios.get(
        `${baseURL}/v1/api/properties/filter?locations=${activeFilter}`
      );
    }
    if (response.status == 200) {
      setProperties(response.data.properties);
    }
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
       <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Explore</h2>
      <div className="flex justify-start mb-8 pb-2 overflow-x-auto scrollbar-hide">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`px-4 py-2 mx-2 text-sm sm:text-base md:text-lg font-medium relative whitespace-nowrap transition-colors duration-300 ${
              activeFilter === filter
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-400"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
            {activeFilter === filter && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                layoutId="underline"
                initial={false}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="phone-non w-full lg:w-1/4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-around">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
              Explore
            </h2>
            <p className="text-lg sm:text-xl font-semibold mb-2 text-center">
              Popular Localities
            </p>
            {activeFilter !== "All" && (
              <p className="text-base sm:text-lg mb-4 italic pb-2 text-center">
                in {activeFilter}
              </p>
            )}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              <span className="text-base sm:text-lg">
                Discover prime locations
              </span>
            </div>
            <p className="mt-2 text-sm sm:text-base opacity-80 text-center">
              Find your perfect property in the most sought-after areas
            </p>
          </div>
        </div>

        <div className="w-full lg:w-3/4 relative">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={false}
            onSwiper={setSwiper}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {properties.map((property) => (
              <SwiperSlide key={property.id}>
                <AnimatePresence>
                  <motion.div
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <img
                        src={
                          property.images.length > 0
                            ?  `${imgPrefix}${property.images[0]}`
                            : defaultImg
                        }
                        alt={property.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Camera className="h-3 w-3 mr-1" />
                        {property.images.length}
                      </div>
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          property.details.isNegotiable === "YES"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {property.details.isNegotiable === "YES"
                          ? "Negotiable"
                          : "Not Negotiable"}
                      </div>
                      <div
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          property.details.furnishedStatus === "FURNISHED"
                            ? "bg-green-500 text-white"
                            : property.details.furnishedStatus ===
                              "SEMIFURNISHED"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {property.details.furnishedStatus}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-blue-700 truncate">
                        {property.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 flex items-center line-clamp-1">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="truncate">
                          {property.address.landmark}{" "}
                          {property.address.locality}{" "}
                          {property.address.street}{" "}
                          {property.details.location}-{" "}
                          {property.address.zipCode}
                        </span>
                      </p>
                      {property.type === "RENT" ? (
                        <p className="text-xl font-bold text-blue-600 mt-2">
                          Rs. {property.details.rent.toLocaleString()}{" "}
                          {property.details.amtUnit} /monthly
                        </p>
                      ) : (
                        <p className="text-xl font-bold text-blue-600 mt-2">
                          Rs. {property.details.price.toLocaleString()}{" "}
                          {property.details.amtUnit}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Home className="h-3 w-3 mr-1" /> {property.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Scaling className="h-3 w-3 mr-1" />{" "}
                          {property.details.carpetArea}{" "}
                          {property.details.areaUnit}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Bed className="h-3 w-3 mr-1" />{" "}
                          {property.details.bedrooms}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Bath className="h-3 w-3 mr-1" />{" "}
                          {property.details.bathrooms}
                        </span>
                      </div>
                      <motion.button
                        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePropertyClick(property.id)}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-0 left-0 bottom-0 right-0 pointer-events-none">
            <div className="flex justify-between items-center h-full">
              <motion.button
                className="pointer-events-auto z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-colors duration-300"
                onClick={handlePrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6 text-blue-700" />
              </motion.button>
              <motion.button
                className="pointer-events-auto z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-colors duration-300"
                onClick={handleNext}
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
  );
}