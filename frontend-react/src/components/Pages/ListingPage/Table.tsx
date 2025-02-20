import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BlogSidebar from "./BlogSidebar";
import PropertyFilter from "@/components/PropertyFilter";
import ProjectFilter from "@/components/ProjectFilter";
import Property from "@/Models/Property";
import Projects from "./Projects";
import Properties from "./Properties";
import Project from "@/Models/Project";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilteredProjects,
  setFilteredProperties,
} from "@/features/Filters/filterSlice";
import Filters from "@/components/Filters";
import { set } from "react-datepicker/dist/date_utils";

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
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const {
    filteredProjects,
    filteredProperties,
    allProperties,
    allProjects,
    filters,
  } = useSelector((state: any) => state.filters);
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    switch (props.pageType) {
      case "properties":
        fetchProperties();
        break;
      case "projects":
        fetchProjects();
        break;
      case "all":
        if (filters){
          fetchProjects(filters);
          fetchProperties(filters);
        }
        break;
      default:
        fetchProjects(filters);
        fetchProperties(filters);
        break;
    }
  }, [props.pageCategory, props.pageType, filters]);

  const fetchProperties = async (filters?: FilterState) => {
    setLoading(true);
    try {
      
      let url = `${baseURL}/v1/api/properties/filter?`;
      switch (props.pageCategory) {
        case "rent":
          url += `category=${props.pageCategory.toUpperCase()}&`;
          break;
        case "buy":
          url += `category=${props.pageCategory.toUpperCase()}&`;
          break;
        case "commercial":
          url += `&variant=${props.pageCategory.toUpperCase()}&`;
          break;
        case "residential":
          url += `variant=${props.pageCategory.toUpperCase()}&`;
          break;

        default:
          url = `${baseURL}/v1/api/properties/filter?`;
          break;
      }

      if (filters) {
        if (filters.locations.length > 0) {
          url += `locations=${filters.locations.join(",")}&`;
        }
        if (filters.bedrooms.length > 0) {
          url += `bedrooms=${filters.bedrooms.join(",")}&`;
        }
        if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
        if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
        if (filters.amtUnit) url += `amtUnit=${filters.amtUnit}&`;
        if (filters.minCarpetArea) {
          url += `minCarpetArea=${filters.minCarpetArea}&`;
        }
        if (filters.maxCarpetArea) {
          url += `maxCarpetArea=${filters.maxCarpetArea}&`;
        }
        if (filters.areaUnit) url += `areaUnit=${filters.areaUnit}&`;
      }

      const response = await axios.get(url);

      if (response.data.properties.length < 1) {
        setShowNotFound(true);
        setProperties([]);
        dispatch(setFilteredProperties([]));
      } else {
        setProperties(response.data.properties);
        dispatch(setFilteredProperties(response.data.properties));
        setShowNotFound(false);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setShowNotFound(true);
        setProperties([]);
        dispatch(setFilteredProperties([]));
      }
      console.error("An error occurred: ", err);
      toast.error("Failed to fetch properties", {
        position: "bottom-right",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handlePropertyFilter = (filters: FilterState) => {
    fetchProperties(filters);
  };

  const fetchProjects = async (filters?: FilterState) => {
    setLoading(true);
    try {
      
      let url = `${baseURL}/v1/api/projects/filter?`;
      switch (props.pageCategory) {
        case "ongoing":
          url += `underConstruction=YES&`;
          break;
        case "ready":
          url += `underConstruction=NO&`;
          break;
        default:
          url = `${baseURL}/v1/api/projects/filter?`;
          break;
      }

      if (filters) {
        if (filters.locations.length > 0) {
          url += `locations=${filters.locations.join(",")}&`;
        }
        if (filters.bedrooms.length > 0) {
          url += `bedrooms=${filters.bedrooms.join(",")}&`;
        }
        if (filters.minPrice) url += `minPrice=${filters.minPrice}&`;
        if (filters.maxPrice) url += `maxPrice=${filters.maxPrice}&`;
        if (filters.amtUnit) url += `amtUnit=${filters.amtUnit}&`;
        if (filters.minCarpetArea) {
          url += `minCarpetArea=${filters.minCarpetArea}&`;
        }
        if (filters.maxCarpetArea) {
          url += `maxCarpetArea=${filters.maxCarpetArea}&`;
        }
        if (filters.areaUnit) url += `areaUnit=${filters.areaUnit}&`;
      }

      const response = await axios.get(url);
      if(response.data.projects.length < 1){
        setShowNotFound(true);
        console.log("Projects not found ...",response)
        setProjects([]);
        dispatch(setFilteredProjects([]));
      }
      setProjects(response.data.projects);
      dispatch(setFilteredProjects(response.data.projects));
      setShowNotFound(false);
    } catch (err:any) {
      if(err.status === 404){
        setShowNotFound(true);
        setProjects([]);
        dispatch(setFilteredProjects([]));
      }
      console.error("An error occurred: ", err);
      toast.error("Failed to fetch projects", {
        position: "bottom-right",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAllFilter = (filters: FilterState) => {
    fetchProperties(filters);
    fetchProjects(filters);
  };

  const handleProjectFilter = (filters: FilterState) => {
    fetchProjects(filters);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-800 capitalize">
          Find Your Dream {props.pageType}
        </h1>
        {props.pageType === "all" ? (
          <Filters onFilterChange={handleAllFilter} />
        ) : props.pageType === "properties" ? (
          <PropertyFilter onFilterChange={handlePropertyFilter} />
        ) : (
          <ProjectFilter onFilterChange={handleProjectFilter} />
        )}
        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-blue-600">Loading {props.pageType}...</p>
          </div>
        )}
        
          {(!loading && showNotFound) &&
            <div
              className="text-center mt-8 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {props.pageType === "all" ?
                <strong className="font-bold">No Properties/Projects found!</strong>
                : <strong className="font-bold">No {props.pageType} found!</strong>
              }
              
              <span className="block sm:inline">
                {" "}
                Please try adjusting your filters.
              </span>
            </div>
          }

        {props.pageType === "all" ? (
          <>
            <Properties properties={filteredProperties || allProperties} />
            <Projects projects={filteredProjects || allProjects} />
          </>
        ) : props.pageType === "properties" ? (
          <Properties properties={properties || filteredProperties} />
        ) : (
          <Projects projects={projects || filteredProjects} />
        )}
        
      </main>
      <BlogSidebar />
    </div>
  );
}
