import { AnimatePresence, motion } from "framer-motion"
import { Bed, Building, Calendar, Home, MapPin } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Project from "../../../Models/Project"
import { uniq } from "lodash"


export default function Projects(props:any) {
  const defaultImg = import.meta.env.VITE_APP_DEFAULT_IMG;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL"
  const projectsPath = `${uploadPreset}/${environment}/Projects`
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    setProjects(props.projects)
  }, [props.projects])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-8 mt-5"
    >
      <AnimatePresence>
        {projects.map((project, index) => (
          <Link to={`/project/${project.id}`} target="_blank">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white bg-opacity-90 rounded-lg mt-5 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"          
          >
            <div className="flex flex-col md:flex-row">
              <div className="w-full sm:w-2/5 relative">
                <img
                  src={project.images.length > 0 ? `${imgPrefix}${projectsPath}/${project.images[0]}` : defaultImg}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover md:object-center aspect-[4/2]"
                />
                <span className="absolute inline-flex top-2 right-2 items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Home className="h-3 w-3 mr-1" />
                  {project.underConstruction === "Yes" ? "Under Construction" : "Ready"}
                </span>
              </div>
              <div className="flex-1 w-full sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-blue-700 truncate">
                      {project.name}
                    </h3>
                    <div className="text-xl font-semibold text-blue-600">
                      {project.floorPlans.length} Floor Plans
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 flex items-center lineclamp1">
                    <MapPin size="1.3rem" className="mr-1" />{" "}
                    {project.address.street} {project.address.locality}{" "}
                    {project.location} {project.address.landmark} -{" "}
                    {project.address.zipCode}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project.underConstruction === "Yes"
                        ? `Possesion: ${new Date(project.possesion).toLocaleDateString()}`
                        : `Built: ${new Date(project.builtIn).toLocaleDateString()}`}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                      <Building className="h-3 w-3 mr-1" /> Floors: {project.totalFloors}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                      <MapPin className="h-3 w-3 mr-1" /> {project.location}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm flex items-center gap-1 bg-blue-100 text-blue-800">
                      <Bed className="h-3 w-3 mr-1" />
                      {uniq(project.floorPlans
                      .map((plan: any) => plan.bedrooms))
                      .sort((a: number, b: number) => a - b)
                      .join("/")}{" "} BHK
                    </span>
                  </div>
                  <p className="text-gray-600 lineclamp2 mt-3">
                    {project.description}
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
          </Link>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}