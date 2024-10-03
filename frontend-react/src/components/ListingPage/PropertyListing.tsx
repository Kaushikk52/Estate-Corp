import React, { useState, useEffect } from "react";
import { Bed, Bath, Home, MapPin, Scaling } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import BlogSidebar from "./BlogSidebar";
import Filter from "../Home/Filter";

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

export default function PropertyListing() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-800">
          Find Your Dream Home
        </h1>
        <Filter onFilterChange={handleFilterChange} />
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-blue-600">Loading properties...</p>
          </div>
        )}
        {error && (
          <div
            className="text-center mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8 mt-5"
        >
          <AnimatePresence>
            {properties.map((property, index) => (
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
                    <img
                      src={
                        property.images[0] ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={property.name}
                      className="w-full h-64 object-cover" // Fixed height, object-fit cover
                    />
                    <div
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        property.details.isNegotiable === "YES"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-gray-800"
                      }`}
                    >
                      {property.details.isNegotiable === "YES"
                        ? "Negotiable"
                        : "Not Negotiable"}
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-blue-700 truncate">
                          {property.name}
                        </h3>
                        {property.type === "RENT" ? (
                          <p className="text-xl font-semibold text-blue-600">
                            {property.details.rent.toLocaleString()}{" "}
                            {property.details.amtUnit} /monthly
                          </p>
                        ) : (
                          <p className="text-xl font-semibold text-blue-600">
                            {property.details.price.toLocaleString()}{" "}
                            {property.details.amtUnit}
                          </p>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />{" "}
                        {property.address.landmark}, {property.address.locality}
                        , {property.address.street} - {property.address.zipCode}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                          <Home className="h-3 w-3 mr-1" /> {property.type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                          <Home className="h-3 w-3 mr-1" />{" "}
                          {property.details.furnishedStatus}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                          <Scaling className="h-3 w-3 mr-1" />{" "}
                          {property.details.carpetArea}{" "}
                          {property.details.areaUnit}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                          <Bed className="h-3 w-3 mr-1" />{" "}
                          {property.details.bedrooms} BHK
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                          <Bath className="h-3 w-3 mr-1" />{" "}
                          {property.details.bathrooms} Baths
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {!loading && properties.length === 0 && (
          <div
            className="text-center mt-8 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">No properties found!</strong>
            <span className="block sm:inline">
              {" "}
              Please try adjusting your filters.
            </span>
          </div>
        )}
      </main>
      <BlogSidebar />
    </div>
  );
}
