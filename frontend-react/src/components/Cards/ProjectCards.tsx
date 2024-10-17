import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building,
  MapPin,
  Home,
  Camera,
} from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Project from "../../Models/Project";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export default function ProjectsCarousel(props: any) {
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const projectsPath = `${uploadPreset}/${environment}/Projects`;
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      let response;
      if (props.projects) {
        setProjects(props.projects);
      } else {
        response = await axios.get(`${baseURL}/v1/api/projects/all`);
        if (response.data.length === 0) {
          setProjects([]);
        }
        setProjects(response.data.projects);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
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
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-gradient-to-r from-slate-100 to-slate-200">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Explore Projects
      </h2>
      <div className="relative">
        <Swiper
          modules={[Navigation, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={false}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
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
                    <motion.button
                      className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-md transition-colors duration-300 shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleProjectClick(project.id)}
                    >
                      View Project
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
              className="pointer-events-auto z-10 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-colors duration-300"
              onClick={handlePrev}
              aria-label="Previous project"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-6 w-6 text-blue-700" />
            </motion.button>
            <motion.button
              className="pointer-events-auto z-10 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-colors duration-300"
              onClick={handleNext}
              aria-label="Next project"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-6 w-6 text-blue-700" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
