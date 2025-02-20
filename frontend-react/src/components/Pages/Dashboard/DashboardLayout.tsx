import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowUpRight,
  IndianRupee,
  Users,
  Package,
  Activity,
  Trash2,
  Pencil,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Property from "@/Models/Property";
import Project from "@/Models/Project";
import {filter} from "lodash";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const CardBackground = ({ color }: { color: string }) => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="0" cy="0" r="100" fill={color} fillOpacity="0.1" />
    <circle cx="100%" cy="100%" r="80" fill={color} fillOpacity="0.08" />
  </svg>
);

export default function Dashboard() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const navigate = useNavigate();

  const [propertyName, setpropertyName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [mssg, setMssg] = useState("status changed");
  const [notifications, setNotifications] = useState<any>();
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    role: "",
  });
  const [properties, setProperties] = useState([
    {
      id: "",
      createdAt: "",
      updatedAt: "",
      name: "",
      images: [],
      type: "",
      propertyVariant: "",
      address: {
        id: "",
        street: "",
        locality: "",
        landmark: "",
        zipCode: "",
      },
      details: {
        bedrooms: 0,
        bathrooms: 0,
        balconies: 0,
        floorNo: 0,
        location: "",
        ammenitites: [],
        facing: "",
        carpetArea: "",
        areaUnit: "",
        isApproved: false,
        availability: "",
        rent: 0,
        price: 0,
        amtUnit: "",
        isNegotiable: "",
        furnishedStatus: "",
      },
      project: {},
      owner: { fullName: "" },
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([]);
  const cards = [
    {
      title: "Total Revenue",
      icon: IndianRupee,
      value: "Rs. 45,231",
      change: "+20.1% from last month",
      color: "bg-blue-500",
      textColor: "text-blue-700",
    },
    {
      title: "New Customers",
      icon: Users,
      value: "+2350",
      change: "+180.1% from last month",
      color: "bg-green-500",
      textColor: "text-green-700",
    },
    {
      title: "Total Products",
      icon: Package,
      value: "12,234",
      change: "+19 added today",
      color: "bg-purple-500",
      textColor: "text-purple-700",
    },
    {
      title: "Active Now",
      icon: Activity,
      value: "+573",
      change: "+201 since last hour",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
    },
  ];

  useEffect(() => {
    getCurrentUser();
  }, []);

  const removeProperty = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/v1/api/properties/delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        getProperties(currentUser.role);
        toast.success(`Property deleted !`, {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log("An error occurred : ", err);
      toast.error(`An error occurred : ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  
  const deleteProject = async (id : string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/v1/api/projects/delete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        getProjects(currentUser.role);
        toast.success(`Project deleted !`, {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log("An error occurred : ", err);
      toast.error(`An error occurred : ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    if (propertyName === "") {
      getProperties(currentUser.role);
    } else {
      propertyFilter();
    }
  }, [propertyName]);

  useEffect(()=>{
    if(projectName === "") {
      getProjects(currentUser.role);
    } else {
      projectFilter();
    }
  },[projectName]);

  const propertyFilter = () => {
    const filteredProperties = properties.filter((property) =>
      property.name.toLowerCase().includes(propertyName.toLowerCase())
    );
    if (filteredProperties.length > 0) {
      // console.log(filteredProperties);
      setProperties(filteredProperties);
    } else {
      getProperties(currentUser.role);
    }
  };

  const projectFilter = () => {
    console.log("Projects : ",projects);
    const filteredProjects = projects.filter((project)=> {
      const isEqual = project.name.toLowerCase().includes(projectName.toLowerCase())
      return isEqual;
    });

    console.log("Filtered Projects : ",filteredProjects)
    if(filteredProjects.length > 0) {
      setProjects(filteredProjects);
    } else {
      getProjects(currentUser.role);
    }
  }

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCurrentUser({ role: "", userId: "" });
        navigate("/");
      }
      const response = await axios.get(
        `${baseURL}/v1/api/users/getCurrentUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        // console.log("Principal user : ", response);
        setCurrentUser({
          userId: response.data.userId,
          role: response.data.role,
        });
      }
      getProperties(response.data.role);
      getNotifications(response.data.role);
    } catch (err: any) {
      console.log("An error occured : ", err);
      if (err.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
      toast.error(`An error occurred : ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const getProperties = async (role: any) => {
    const token = localStorage.getItem("token");

    let getPropertiesURL;
    if (role === "ROLE_ADMIN") {
      getPropertiesURL = `${baseURL}/v1/api/properties/all`;
    } else {
      getPropertiesURL = `${baseURL}/v1/api/users/properties`;
    }

    try {
      const response = await axios.get(getPropertiesURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setProperties(response.data.properties);
        // console.log("all properties...",response.data.properties);
      } else if (response.status === 204) {
        setProperties([]);
        toast.error("No properties found", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err: any) {
      console.log("An error occurred : ", err.message);
    }
  };


  const getProjects = async (role:any) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${baseURL}/v1/api/projects/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setProjects(response.data.projects);
      } else if (response.status === 204) {
        setProjects([]);
        toast.error("No projects found", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err: any) {
      console.log("An error occurred : ", err.message);
    }
  }

  const getNotifications = async (role: any) => {
    try {
      if (role == "ROLE_ADMIN") {
        const response = await axios.get(`${baseURL}/v1/api/enquiry/all`);
        setNotifications(response.data.notifications);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changeApprovalStatus = async (id: any, isPropertyApproved: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${baseURL}/v1/api/properties/approvalStatus/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (isPropertyApproved === false) {
        if (mssg === "Approved") {
          setMssg("Approved");
        }
        setMssg("Approved");
      } else if (isPropertyApproved === true) {
        if (mssg === "Unapproved") {
          setMssg("Unapproved");
        }
        setMssg("Unapproved");
      } else {
        setMssg("status changed");
      }

      if (response.status === 200) {
        toast.success(`Property ${mssg} !`, {
          position: "bottom-right",
          duration: 3000,
        });
      }
      getProperties(currentUser.role);
    } catch (err) {
      console.log("An error occurred : ", err);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties Dashboard</h1>
      </div>

      {currentUser.role == "ROLE_ADMIN" || currentUser.role == "ROLE_AGENT" ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${card.color} text-white p-4 sm:p-4 md:p-5 lg:p-6 xl:p-8 rounded-lg shadow-lg`}
            >
              <CardBackground color="white" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                    {card.title}
                  </h2>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold mb-2">
                  {card.value}
                </div>
                <p className="text-sm opacity-75">{card.change}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {currentUser.role === "ROLE_ADMIN" ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div></div>
        )}

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-4">Properties Tracker</h2>
              <input
                type="search"
                placeholder={`Property Name ...`}
                className=" px-4 py-2 
                  border rounded-md 
                  w-full sm:w-60 md:w- lg:w-1/3 xl:w-1/4
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200"
                value={propertyName}
                onChange={(e) => setpropertyName(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    {currentUser.role === "ROLE_ADMIN" ? (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    properties
                    .sort((a: any, b: any) => a.createdAt.getFullYear - b.createdAt.getFullYear)
                    .map((property, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {property.owner.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.details.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {property.address.locality}
                        </td>
                        {currentUser.role === "ROLE_ADMIN" ? (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between">
                            {property.details.hasOwnProperty("isApproved") !==
                              null && property.details.isApproved === false ? (
                              <button
                                className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                                onClick={() =>
                                  changeApprovalStatus(property.id, false)
                                }
                              >
                                Unapproved
                              </button>
                            ) : (
                              <button
                                className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                onClick={() =>
                                  changeApprovalStatus(property.id, true)
                                }
                              >
                                Approved
                              </button>
                            )}
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-500"
                              onClick={() =>
                                navigate(
                                  `/dashboard/edit-property/${property.id}`
                                )
                              }
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                              onClick={() => removeProperty(property.id)}
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between">
                            <button className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                              View
                            </button>
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-500"
                              onClick={() =>
                                navigate(
                                  `/dashboard/edit-property/${property.id}`
                                )
                              }
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                              onClick={() => removeProperty(property.id)}
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-4">Project Tracker</h2>
              <input
                type="search"
                placeholder={`Project Name ...`}
                className=" px-4 py-2 
                  border rounded-md 
                  w-full sm:w-60 md:w- lg:w-1/3 xl:w-1/4
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Under Construction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    {currentUser.role === "ROLE_ADMIN" ? (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    ) : (
                      <th></th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    projects
                    .sort((a: any, b: any) => a.createdAt.getFullYear - b.createdAt.getFullYear)
                    .map((project, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {project.owner.fullName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.underConstruction}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.address.locality}
                        </td>
                        {currentUser.role === "ROLE_ADMIN" ? (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between">
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-500"
                              onClick={() =>
                                navigate(
                                  `/dashboard/edit-project/${project.id}`
                                )
                              }
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                              onClick={()=> {deleteProject(project.id)}}
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        ) : (
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between">
                            <button className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                              View
                            </button>
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-500"
                              onClick={() =>
                                navigate(
                                  `/dashboard/edit-property/${project.id}`
                                )
                              }
                            >
                              <Pencil size={20} />
                            </button>
                            <button
                              className="p-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                              onClick={() => {deleteProject(project.id)}}
                            >
                              <Trash2 size={20} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2">
        {currentUser.role === "ROLE_ADMIN" ||
        currentUser.role === "ROLE_AGENT" ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Property Enquiries</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your most recent actions and updates.
            </p>
            <div className="space-y-4">
              {notifications?.map((notification: any, i: number) =>
                notification.propertyId ? (
                  <div key={i} className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                    <p className="text-sm">
                      <span className="font-semibold">User : </span>{" "}
                      <Link to={`/user/${notification.userId}`}>
                        <span className="underline">
                          {notification.enquiry.name}
                        </span>
                      </Link>{" "}
                      has enquired for{" "}
                      <span className="font-semibold">Property : </span>
                      <span className="underline">
                        <Link to={`/property/${notification.propertyId}`}>
                          {notification.propertyName}
                        </Link>
                      </span>
                      <span className="font-semibold"> owned by : </span>
                      <Link to={`/user/${notification.ownerId}`}>
                        <span className="underline">
                          {notification.ownerName}
                        </span>
                      </Link>
                    </p>
                    <ArrowUpRight className="h-4 w-4 ml-auto text-green-500" />
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {currentUser.role === "ROLE_ADMIN" ||
        currentUser.role === "ROLE_AGENT" ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Project Enquiries</h2>
            <p className="text-sm text-gray-600 mb-4">
              Your most recent actions and updates.
            </p>
            <div className="space-y-4">
              {notifications?.map((notification: any, i: number) =>
                notification.projectId ? (
                  <div key={i} className="flex items-center">
                    <span className="relative flex h-3 w-3 mr-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                    <p className="text-sm">
                      <span className="font-semibold">User : </span>
                      <Link to={`/user/${notification.userId}`}>
                        <span className="underline">
                          {notification.enquiry.name}
                        </span>
                      </Link>{" "}
                      has enquired for{" "}
                      <span className="font-semibold">Project : </span>
                      <span className="underline">
                        <Link to={`/project/${notification.projectId}`}>
                          {notification.projectName}
                        </Link>
                      </span>
                      <span className="font-semibold"> owned by : </span>
                      <Link to={`/user/${notification.ownerId}`}>
                        <span className="underline">
                          {notification.ownerName}
                        </span>
                      </Link>
                    </p>
                    <ArrowUpRight className="h-4 w-4 ml-auto text-green-500" />
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
