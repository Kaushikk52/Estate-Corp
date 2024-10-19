import { AnimatePresence, motion } from "framer-motion";
import { Bath, Bed, Home, MapPin, Scaling } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Property from "../../../Models/Property";

export default function Properties(props: any) {
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    setProperties(props.properties);
  }, [props.properties]);

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  return (
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
              <div className="w-full sm:w-2/5 relative">
                <img
                  src={
                    property.images.length > 0
                      ? `${imgPrefix}${propertiesPath}/${property.images[0]}`
                      : defaultImg
                  }
                  alt={property.name}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/2]"
                />
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    property.details.isNegotiable &&
                    property.details.isNegotiable === "YES"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-gray-800"
                  }`}
                >
                  {property.details.isNegotiable &&
                  property.details.isNegotiable === "YES"
                    ? "Negotiable"
                    : "Not Negotiable"}
                </div>
                <div
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    property.details.furnishedStatus === "FURNISHED"
                      ? "bg-green-500 text-white"
                      : property.details.furnishedStatus === "SEMIFURNISHED"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {property.details.furnishedStatus}
                </div>
              </div>
              <div className="flex-1 w-full sm:w-3/5 p-6 flex flex-col justify-between">
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
                    <MapPin size="1.3rem" className="mr-1" />{" "}
                    {property.address.street} {property.address.locality}{" "}
                    {property.details.location} {property.address.landmark} -{" "}
                    {property.address.zipCode}
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
                      {property.details.carpetArea} {property.details.areaUnit}
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
                  <p className="text-gray-600 lineclamp2 mt-3">
                    {property.details.description}
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
  );
}
