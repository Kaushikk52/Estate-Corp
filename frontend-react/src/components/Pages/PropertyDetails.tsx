import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Bed,
  Bath,
  Home,
  MapPin,
  Calendar,
  Maximize,
  Compass,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import { ErrorMessage, Field, Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import Property from "../../Models/Property";
import toast from "react-hot-toast";

export default function PropertyDetails() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const imgPrefix = import.meta.env.VITE_APP_IMG_PREFIX;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [currentUser, setCurrentUser] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    content: Yup.string().required("Message is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const initialValues = {
    name: "",
    phone: "",
    email: "",
    content: "",
    terms: false,
  };

  useEffect(() => {
    getPropertyById(id);
    getCurrentUser();
  }, [id]);

  const getPropertyById = async (id: any) => {
    const response = await axios.get(`${baseURL}/v1/api/properties/id/${id}`);
    // console.log("property : ", response);
    setProperty(response.data);
    setSelectedImage(response.data.images[0]);
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

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    try {
      const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
      const body = {
        userId: currentUser?.userId,
        propertyId: property?.id,
        propertyName: property?.name,
        ownerId: property?.owner.id,
        ownerName: property?.owner.fullName,
        enquiry: values,
        subject: "PROPERTY_ENQUIRY",
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

  const randomReview = () => {
    let random = Math.floor(Math.random() * 5) * 0.5;
    return 3 + random;
  };

  if (!property) {
    return (
      <>
        <div className="text-center mt-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-blue-600">Loading properties...</p>
        </div>
      </>
    );
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
              <div className="relative">
                <img
                  src={`${imgPrefix}${propertiesPath}/${selectedImage}`}
                  loading="lazy"
                  alt={property.name}
                  className="w-full h-[400px] object-cover rounded-lg shadow-md"
                />
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
                      : property.details.furnishedStatus === "SEMIFURNISHED"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {property.details.furnishedStatus}
                </div>
                <div className="flex mt-4 space-x-4 overflow-x-auto p-2">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      loading="lazy"
                      src={`${imgPrefix}${propertiesPath}/${image}`}
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
                <h2 className="text-2xl font-semibold mb-4">
                  Property Details
                </h2>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-semibold">{randomReview()} Review</span>
                </div>
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
                    {property.type === "RENT" ? (
                      <span>
                        Built in {new Date(property.details.builtIn).getDate()}/
                        {new Date(property.details.builtIn).getMonth() + 1}/
                        {new Date(property.details.builtIn).getFullYear()}
                      </span>
                    ) : (
                      <span>
                        Possesion in{" "}
                        {new Date(property.details.possesion).getDate()}/
                        {new Date(property.details.possesion).getMonth() + 1}/
                        {new Date(property.details.possesion).getFullYear()}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Compass className="w-5 h-5 mr-2 text-gray-600" />
                    <span>Facing {property.details.facing}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-2">Description</h3>
                <p className="text-gray-600">{property.details.description}</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white overflow-hidden mt-5 mb-12"
                >
                  <h2 className="text-3xl font-semibold mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.details.ammenities?.map((amenity, index) => (
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
                          {property.address.locality}
                        </td>
                      </tr>
                      <tr className="flex flex-col">
                        <td className="font-medium">Zip Code</td>
                        <td className="text-gray-600">
                          {property.address.zipCode}
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="flex flex-col">
                        <td className="font-medium">Street</td>
                        <td className="text-gray-600">
                          {property.address.street}
                        </td>
                      </tr>
                      <tr className="flex flex-col">
                        <td className="font-medium">Location</td>
                        <td className="text-gray-600">
                          {property.details.location}
                        </td>
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
                          {property.owner.fullName}
                        </td>
                        <td className="font-medium">Property Size:</td>
                        <td className="text-gray-600">
                          {property.details.carpetArea}{" "}
                          {property.details.areaUnit}
                        </td>
                      </tr>
                      <tr className="flex flex-col">
                        {property.type === "RENT" ? (
                          <>
                            <td className="font-medium">Year Built:</td>
                            <td className="text-gray-600">
                              {new Date(property.details.builtIn).getDate()}/
                              {new Date(property.details.builtIn).getMonth() +
                                1}
                              /
                              {new Date(property.details.builtIn).getFullYear()}
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="font-medium">Possession Date:</td>
                            <td className="text-gray-600">
                              {new Date(property.details.possesion).getDate()}/
                              {new Date(property.details.possesion).getMonth() +
                                1}
                              /
                              {new Date(
                                property.details.possesion
                              ).getFullYear()}
                            </td>
                          </>
                        )}

                        <td className="font-medium">Property Type:</td>
                        <td className="text-gray-600">{property.type}</td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="flex flex-col">
                        <td className="font-medium">Bedrooms:</td>
                        <td className="text-gray-600">
                          {property.details.bedrooms}
                        </td>
                        {property.type === "RENT" ? (
                          <>
                            <td className="font-medium">Rent:</td>
                            <td className="text-gray-600">
                              Rs. {property.details.rent.toLocaleString()}{" "}
                              {property.details.amtUnit} /monthly
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="font-medium">Price:</td>
                            <td className="text-gray-600">
                              Rs. {property.details.price.toLocaleString()}{" "}
                              {property.details.amtUnit}
                            </td>
                          </>
                        )}
                      </tr>
                      <tr className="flex flex-col">
                        <td className="font-medium">Bathrooms:</td>
                        <td className="text-gray-600">
                          {property.details.bathrooms}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
}
