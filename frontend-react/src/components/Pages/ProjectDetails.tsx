import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Formik, Field, ErrorMessage, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import {
  MapPin,
  Calendar,
  ChevronLeft,
  IndianRupee,
  BedDoubleIcon,
  ChartNoAxesGantt,
  Scan,
  Bed,
  Bath,
  ExternalLink,
  Building,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Project from "../../Models/Project";
import FloorPlan from "../../Models/FloorPlan";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  content: "",
  terms: false,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  content: Yup.string().required("Message is required"),
});

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const projectsPath = `${uploadPreset}/${environment}/Projects`;
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan>();
  const [project, setProject] = useState<Project | any>();
  const [currentUser, setCurrentUser] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [bedroomList, setBedroomList] = useState("");

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    try {
      const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
      const body = {
        userId: currentUser?.userId,
        projectId: project.id,
        projectName: project.name,
        ownerId: project?.owner.id,
        ownerName: project.owner.fullName,
        enquiry: values,
        subject: "PROJECT_ENQUIRY",
      };

      const response = await axios.post(
        `${baseURL}/v1/api/enquiry/email`,
        body
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(`Email sent Successfully`, {
          position: "bottom-right",
          duration: 3000,
        });
        resetForm();
      } else {
        throw new Error("Failed to send email");
      }
    } catch (err) {
      console.error(err);
      toast.error(`Couldn't send Email, Try again`, {
        position: "bottom-right",
        duration: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getProjectById(id);
    getCurrentUser();
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header = document.getElementById("sticky-header");
      if (header) {
        if (scrollPosition > 100) {
          header.classList.add("bg-white", "shadow-md");
        } else {
          header.classList.remove("bg-white", "shadow-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProjectById = async (id: any) => {
    const response = await axios.get(`${baseURL}/v1/api/projects/id/${id}`);
    if (response.status === 200) {
      setProject(response.data);
      setSelectedPlan(response.data?.floorPlans[0]);
      setSelectedImage(response.data.images[0]);
      const bedroomList = response.data?.floorPlans
        .map((plan: any) => plan.bedrooms)
        .sort((a: number, b: number) => a - b)
        .join(",");
      setBedroomList(bedroomList);
    } else {
      toast.error(`Failed to fetch project details. Please try again.`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setCurrentUser(undefined);
      }
      const response = await axios.get(
        `${baseURL}/v1/api/users/getCurrentUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        setCurrentUser(response.data);
      }
    } catch (err: any) {
      console.log("An error occured : ", err);
      if (err.status === 401) {
        localStorage.removeItem("token");
      }
      toast.error(`An error occurred : ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success(`URL copied to clipboard!`, {
          position: "bottom-right",
          duration: 3000,
        });
      })
      .catch(() => {
        toast.error(`Failed to copy URL`, {
          position: "bottom-right",
          duration: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8"
      >
        <button
          onClick={() => {navigate(-1)}}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-5"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Listings
        </button>
      </motion.div>

      <div className="max-w-7xl mx-auto pt-5 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                {project?.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>
                  {project?.address.landmark} {project?.address.locality}{" "}
                  {project?.address.street} - {project?.address.zipCode}
                </span>
              </div>
              <img
                src={`${imgPrefix}${projectsPath}/${selectedImage}`}
                alt={project?.name}
                loading="lazy"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
              <div className="flex mt-4 space-x-4 overflow-x-auto p-2">
                {project?.images.map((image: any, index: any) => (
                  <img
                    key={index}
                    loading="lazy"
                    src={`${imgPrefix}${projectsPath}/${image}`}
                    alt={`${project?.name} - Image ${index + 1}`}
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

            <div className="mt-6">
              <h2 className="text-3xl font-semibold mb-6 mt-12">
                Project Overview
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{project?.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  {project?.underConstruction == "Yes" ? (
                    <span>
                      Possession: {new Date(project?.possesion).getDate()}/
                      {new Date(project?.possesion).getMonth() + 1}/
                      {new Date(project?.possesion).getFullYear()}
                    </span>
                  ) : (
                    <span>
                      Built-In: {new Date(project?.builtIn).getDate()}/
                      {new Date(project?.builtIn).getMonth() + 1}/
                      {new Date(project?.builtIn).getFullYear()}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <ChartNoAxesGantt className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{project?.floorPlans.length} Floor Plans</span>
                </div>
                <div className="flex items-center">
                  <BedDoubleIcon className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{bedroomList} bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Building className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Maharera No : {project?.mahareraNo}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-5 mb-2">Description</h3>
              <p className="text-gray-600 mb-4">{project?.description}</p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white overflow-hidden mt-5 mb-12"
              >
                <h2 className="text-3xl font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project?.ammenities?.map((amenity: any, index: any) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 bg-gray-100 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {amenity}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Floor Plans</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {project?.floorPlans.map((plan: any) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPlan?.id === plan.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.bedrooms} BHK</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            key={selectedPlan?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={`${imgPrefix}${propertiesPath}/${selectedPlan?.image}`}
                  alt={selectedPlan?.name}
                  loading="lazy"
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
                <div className="border border-gray-300 rounded-lg shadow-md p-6 w-full md:w-2/2 mt-3">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-4">
                        <h2 className="font-bold text-xl">
                          Contact over email
                        </h2>
                        <div>
                          <Field
                            name="name"
                            type="text"
                            placeholder="Name"
                            className="w-full p-2 border rounded"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <Field
                            name="phone"
                            type="tel"
                            placeholder="Phone"
                            className="w-full p-2 border rounded"
                          />
                          <ErrorMessage
                            name="phone"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div>
                          <Field
                            name="content"
                            as="textarea"
                            rows="4"
                            placeholder="Hello, I am interested in your property. Please provide more details."
                            className="w-full p-2 border rounded"
                          />
                          <ErrorMessage
                            name="content"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Field
                            type="checkbox"
                            name="terms"
                            id="terms"
                            className="rounded text-orange-500"
                          />
                          <label
                            htmlFor="terms"
                            className="text-sm text-gray-600"
                          >
                            By submitting this form I agree to Terms of Use
                          </label>
                        </div>
                        <ErrorMessage
                          name="terms"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gray-300  p-2 rounded hover:bg-gray-600 hover:text-white transition duration-300"
                        >
                          Send Message
                        </motion.button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Floor Plan</h2>
                <h3 className="text-xl font-semibold mb-4">
                  {selectedPlan?.name}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Scan className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {selectedPlan?.carpetArea} {selectedPlan?.areaUnit}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {selectedPlan?.bedrooms} Bedroom
                      {selectedPlan?.bedrooms !== 1 && "s"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {selectedPlan?.bathrooms} Bathroom
                      {selectedPlan?.bathrooms !== 1 && "s"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="w-5 h-5 mr-2 text-blue-600" />
                    <span>
                      {selectedPlan?.price} {selectedPlan?.amtUnit}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                <p className="text-gray-600">{selectedPlan?.description}</p>
                {/* Address Section */}
                <motion.div
                  className="border border-gray-300 rounded-lg shadow-md p-6 w-full md:w-2/2 mt-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-lg font-semibold mb-4">
                    Address
                    <hr />
                  </h2>
                  <table className="grid grid-cols-2 gap-4">
                    <tbody>
                      <tr className="flex flex-col">
                        <td className="font-medium">Locality</td>
                        <td className="text-gray-600">
                          {project?.address.locality}
                        </td>
                      </tr>
                      <tr className="flex flex-col">
                        <td className="font-medium">Zip Code</td>
                        <td className="text-gray-600">
                          {project?.address.zipCode}
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="flex flex-col">
                        <td className="font-medium">Street</td>
                        <td className="text-gray-600">
                          {project?.address.street}
                        </td>
                      </tr>
                      <tr className="flex flex-col">
                        <td className="font-medium">Location</td>
                        <td className="text-gray-600">{project?.location}</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
                {/* Details Section */}
                <motion.div
                  className="border border-gray-300 rounded-lg shadow-md p-6 w-full md:w-2/2 mt-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-lg font-semibold mb-4">
                    Details
                    <hr />
                  </h2>
                  <table className="grid grid-cols-2 gap-4">
                    <tbody>
                      <tr className="flex flex-col">
                        <td className="font-medium">Owner:</td>
                        <td className="text-gray-600">
                          {project?.owner.fullName}
                        </td>
                        <td className="font-medium">Property Size:</td>
                        <td className="text-gray-600">
                          {selectedPlan?.carpetArea} {selectedPlan?.areaUnit}
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="flex flex-col">
                        <td className="font-medium">Bedrooms:</td>
                        <td className="text-gray-600">
                          {selectedPlan?.bedrooms}
                        </td>
                      </tr>
                      <tr className="flex flex-col">
                        <td className="font-medium">Bathrooms:</td>
                        <td className="text-gray-600">
                          {selectedPlan?.bathrooms}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
                <div className="flex flex-row md:flex-row justify-center items-center mt-4 gap-4">
                  <a href="tel:7700994313">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="max-w-64 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Contact Owner
                    </motion.button>
                  </a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyUrl}
                    className="max-w-64 bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <ExternalLink />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
