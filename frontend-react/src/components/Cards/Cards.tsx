import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bed,
  Bath,
  Home,
  Camera,
  MapPin,
  Scaling,
  Calendar,
  Building,
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import PropertyFilter from "../PropertyFilter";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Property from "../../Models/Property";
import { setFilteredProjects,setFilteredProperties,setAllProperties,setAllProjects } from "@/features/Filters/filterSlice";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Project from "../../Models/Project";
import { useDispatch, useSelector } from "react-redux";

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

export default function PropertyCardsCarousel() {
  const dispatch = useDispatch();
  const {filteredProjects,filteredProperties,allProjects,allProperties,filters} = useSelector((state:any) => state.filters);
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG;
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const projectsPath = `${uploadPreset}/${environment}/Projects`;
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if(allProjects.length === 0 || allProperties.length === 0){
      fetchProjects();
      fetchProperties();
    }
    if(filteredProjects.length === 0 || filteredProperties.length === 0 ){
      setProjects(allProjects);
      setProperties(allProperties);
    }else{
      setProjects(filteredProjects);
      setProperties(filteredProperties);
    }
  }, []);

  useEffect(()=>{
    handleFilterChange(filters);
  },[filters])

  const fetchProjects = async (filters?: FilterState) => {
    setLoading(true);
    try {
      let url = `${baseURL}/v1/api/projects/filter?`;
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
        url = `${baseURL}/v1/api/projects/all`;
      }
      const response = await axios.get(url);
      setProjects(response.data.projects);
      dispatch(setAllProjects(response.data.projects));
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

  const fetchProperties = async (filters?: FilterState) => {
    setLoading(true);
    setError(null);
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
        url = `${baseURL}/v1/api/properties/isApproved?isApproved=true`;
      }
      const response = await axios.get(url);
      setProperties(response.data.properties);
      dispatch(setAllProperties(response.data.properties));
    } catch (err) {
      console.error("An error occurred: ", err);
      setError("Failed to fetch properties. Please try again.");
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterState) => {
    fetchProperties(filters);
    fetchProjects(filters);
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
    <>
      <PropertyFilter onFilterChange={handleFilterChange} />
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Latest Projects & Properties
        </h2>
        <div className="relative">
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
              <SwiperSlide key={property.id} className="p-2">
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
                            ? `${imgPrefix}${propertiesPath}/${property.images[0]}`
                            : defaultImg
                        }
                        loading="lazy"
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
                          {property.address.street} {property.address.locality}{" "}
                          {property.details.location}{" "}
                          {property.address.landmark} -{" "}
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
                      <Link to={`/property/${property.id}`} target="_blank">
                      <motion.button
                        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-md transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        View Property
                      </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </SwiperSlide>
            ))}

            {projects.map((project) => (
              <SwiperSlide key={project.id} className="p-2">
                <AnimatePresence>
                  <motion.div
                    className="bg-white rounded-xl shadow-xl overflow-hidden h-full transform transition-all duration-300 hover:scale-105"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative">
                      <img
                        src={
                          project.images.length > 0
                            ? `${imgPrefix}${projectsPath}/${project.images[0]}`
                            : defaultImg
                        }
                        alt={project.name}
                        loading="lazy"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Camera className="h-3 w-3 mr-1" />
                        {project.images.length}
                      </div>
                      {project.underConstruction === "Yes" ? (
                        <span className="absolute inline-flex top-2 left-2 items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Calendar className="h-3 w-3 mr-1" />
                          Possesion: {new Date(project.possesion).getDate()}/
                          {new Date(project.possesion).getMonth() + 1}/
                          {new Date(project.possesion).getFullYear()}
                        </span>
                      ) : (
                        <span className="absolute inline-flex top-2 left-2 items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Calendar className="h-3 w-3 mr-1" />
                          Built: {new Date(project.builtIn).getDate()}/
                          {new Date(project.builtIn).getMonth() + 1}/
                          {new Date(project.builtIn).getFullYear()}
                        </span>
                      )}
                      <span className="absolute inline-flex top-2 right-5 items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Home className="h-3 w-3 mr-1" />
                        {project.underConstruction === "Yes"
                          ? "Under Construction"
                          : "Ready"}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-800 truncate">
                          {project.name}
                        </h3>
                        <div className="">
                          <span className="mr-2 text-sm font-semibold text-blue-600">
                            {project.floorPlans
                              .map((plan: any) => plan.bedrooms)
                              .sort((a: number, b: number) => a - b)
                              .join(",")}{" "}
                            BHK
                          </span>
                          <span className="text-sm font-semibold text-blue-600">
                            {project.floorPlans.length} Floor Plans
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span className="truncate lineclamp1">
                          {project.address.street} {project.address.locality}{" "}
                          {project.location} {project.address.landmark} -{" "}
                          {project.address.zipCode}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4 mt-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Building className="h-3 w-3 mr-1" />
                          Floors: {project.totalFloors}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-gray-500 lineclamp1">
                          <span>Description : {project.description}</span>
                        </div>
                      </div>
                      <Link to={`/project/${project?.id}`} target="_blank">
                      <motion.button
                        className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-md transition-colors duration-300 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        View Project
                      </motion.button>                      
                      </Link>
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
                aria-label="Previous property"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-6 w-6 text-blue-700" />
              </motion.button>
              <motion.button
                className="pointer-events-auto z-10 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md transition-colors duration-300"
                onClick={handleNext}
                aria-label="Next property"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-6 w-6 text-blue-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
