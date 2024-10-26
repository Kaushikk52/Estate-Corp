import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BlogSidebar from "./BlogSidebar";
import PropertyFilter from "../../PropertyFilter";
import ProjectFilter from "../../ProjectFilter";
import Property from "../../../Models/Property";
import Projects from "./Projects";
import Properties from "./Properties";
import Project from "../../../Models/Project";

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
  const [properties, setProperties] = useState<Property[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (props.pageType === "properties") {
      setProperties([]);
      setProjects([]);
      fetchProperties();
    } else if (props.pageType === "projects") {
      setProperties([]);
      setProjects([]);
      fetchProjects();
    } else {
      setProperties([]);
      setProjects([]);
      fetchProperties();
      fetchProjects();
    }
  }, [props.pageCategory, props.pageType]);

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
        switch (props.pageCategory) {
          case "rent":
            url = `${baseURL}/v1/api/properties/filter?&category=${props.pageCategory.toUpperCase()}`;
            break;

          case "buy":
            url = `${baseURL}/v1/api/properties/filter?&category=${props.pageCategory.toUpperCase()}`;
            break;

          case "commercial":
            url = `${baseURL}/v1/api/properties/filter?&variant=${props.pageCategory.toUpperCase()}`;
            break;

          case "residential":
            url = `${baseURL}/v1/api/properties/filter?&variant=${props.pageCategory.toUpperCase()}`;
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

  const handlePropertyFilter = (filters: FilterState) => {
    fetchProperties(filters);
  };

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
        switch (props.pageCategory) {
          case "ongoing":
            url = `${baseURL}/v1/api/projects/filter?underConstruction=YES`;
            break;

          case "ready":
            url = `${baseURL}/v1/api/projects/filter?underConstruction=NO`;
            break;

          default:
            url = `${baseURL}/v1/api/projects/all`;
        }
      }
      const response = await axios.get(url);
      setProjects(response.data.projects);
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
          <PropertyFilter onFilterChange={handleAllFilter} />
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
        {props.pageType === "all" ? (
          <>
            <Properties properties={properties} />
            <Projects projects={projects} />
          </>
        ) : props.pageType === "properties" ? (
          <Properties properties={properties} />
        ) : (
          <Projects projects={projects} />
        )}
        {!loading && projects.length === 0 && properties.length === 0 && (
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
