import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Bed,
  Bath,
  Home,
  MapPin,
  Calendar,
  DollarSign,
  Maximize,
} from "lucide-react";
import axios from "axios";

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
    availability: string;
    ammenities: string[];
  };
}

export default function PropertyDetails() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState<string|undefined>('');

  useEffect(() => {
    getPropertyById(id);
  }, [id]);

  const getPropertyById = async (id: any) => {
    const response = await axios.get(`${baseURL}/v1/api/properties/id/${id}`);
    console.log("property : ", response);
    setProperty(response.data);
    setSelectedImage(response.data.images[0])
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
      >
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Listings
        </Link>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                {property.name}
              </h1>
              {property.type === "RENT" ? (
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  Rs. {property.details.rent.toLocaleString()}{" "}
                  {property.details.amtUnit} /monthly
                </p>
              ) : (
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  Rs. {property.details.price.toLocaleString()}{" "}
                  {property.details.amtUnit}
                </p>
              )}
            </div>

            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>
                {property.address.landmark} {property.address.locality}{" "}
                {property.address.street} - {property.address.zipCode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={selectedImage}
                  alt={property.name}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
                <div className="flex mt-4 space-x-4 overflow-x-auto p-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.name} - Image ${index + 1}`}
                      className={`w-24 h-24 object-cover rounded-md cursor-pointer transition-all ${
                        selectedImage === image
                          ? "ring-2 ring-gray-500"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Property Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Home className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.details.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.details.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 mr-2 text-gray-600" />
                    <span>
                      {property.details.carpetArea} {property.details.areaUnit}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Built in {property.details.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-600" />
                    <span>{property.details.isNegotiable}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                <p className="text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Beatae modi placeat, voluptates enim nobis quia amet impedit
                  nostrum magni eum aliquam dicta praesentium eveniet ipsum eius
                  id veritatis. Quibusdam, culpa?
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-2">Amenities</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {property.details.ammenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 ">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Agent
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
