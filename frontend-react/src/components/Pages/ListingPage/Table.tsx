import React, { useState, useEffect } from "react";
import { Bed, Bath, Home, MapPin, Scaling } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import BlogSidebar from "./BlogSidebar";
import Filter from "../../Filter";
import Property from "../../../Models/Property";

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

export default function Table(props: any) {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.pageType === "properties") {
      setProperties([]);
      fetchProperties();
    } else {
      setProperties([]);
      fetchProjects();
    }
  }, [props.pageCategory,props.pageType]);

  const fetchProperties = async (filters?: FilterState) => {
    setLoading(true);
    try {
      let url = `${baseURL}/v1/api/properties/filter?`;
      if (filters) {
        if (filters.locations.length > 0)
          url += `locations=${filters.locations.join(",")}&`;
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
        switch(props.pageCategory){
          case "rent":
          url = `${baseURL}/v1/api/properties/filter?&category=${props.pageCategory.toUpperCase()}`
          break;

          case "buy":
          url = `${baseURL}/v1/api/properties/filter?&category=${props.pageCategory.toUpperCase()}`
          break;

          case "commercial":
          url = `${baseURL}/v1/api/properties/filter?&variant=${props.pageCategory.toUpperCase()}`
          break;

          case "residential":
          url = `${baseURL}/v1/api/properties/filter?&variant=${props.pageCategory.toUpperCase()}`
          break;

          default:
            url = `${baseURL}/v1/api/properties/isApproved?isApproved=true`;

        }
      }
      const response = await axios.get(url);
      setProperties(response.data.properties);
    } catch (err) {
      console.error("An error occurred: ", err);
      toast.error(`Failed to fetch properties`, {
        position: "bottom-right",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {};

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const handleFilterChange = (filters: FilterState) => {
    fetchProperties(filters);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-800 capitalize">
          Find Your Dream {props.pageType}
        </h1>
        <Filter onFilterChange={handleFilterChange} />
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-blue-600">Loading properties...</p>
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
                  <div className="w-full md:w-2/5 lg:w-1/3 h-64 md:h-auto relative">
                    <img
                      src={
                        `${imgPrefix}${propertiesPath}/${property.images[0]}` ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={property.name}
                      className="w-full h-full object-cover"
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
                      <p className="text-gray-600 mb-4 flex items-center lineclamp1">
                        <MapPin className="h-4 w-4 mr-1" />{" "}
                        {property.address.street} {property.address.locality}{" "}
                        {property.details.location} {property.address.landmark}{" "}
                        - {property.address.zipCode}
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
                      <p className="text-gray-600 lineclamp2">
                        {/* {property.details.description} */}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Temporibus alias corrupti rem eum, molestiae ullam sed.
                        Sapiente veniam cum, minus laborum unde nemo ex dolorum
                        esse, architecto est earum ut molestias, quae
                        consequuntur cumque corporis culpa quam ratione. Itaque
                        facilis quo veritatis alias, aliquid voluptas rem
                        inventore? Tenetur, a aut.
                      </p>
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
            <strong className="font-bold">No {props.pageType} found!</strong>
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
