import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { propertyValidationSchema } from "../../../Validations/propertyValidations";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";

const DatePickerField = ({ field, form }: any) => {
  return (
    <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      dateFormat="dd/MM/yyyy"
      onChange={(date) => form.setFieldValue(field.name, date)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default function AddPropertyLayout() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || "LOCAL";
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const [step, setStep] = useState(1);

  const initialValues = {
    name: "",
    mahareraNo: "",
    type: "",
    propertyVariant: "",
    subVariant: "",
    address: {
      landmark: "",
      locality: "",
      street: "",
      zipCode: "",
    },
    details: {
      bedrooms: "",
      bathrooms: "",
      balconies: "",
      floorNo: "",
      location: "",
      facing: "",
      carpetArea: "",
      areaUnit: "",
      builtIn: "",
      possesion: "",
      underConstruction: "",
      rent: 0,
      price: 0,
      amtUnit: "",
      isNegotiable: "",
      furnishedStatus: "",
      ammenities: [] as string[],
      description: "",
    },
    images: [] as File[],
  };

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login", {
        position: "bottom-right",
        duration: 3000,
      });
    }
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        toast.error("Please Login", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  });

  async function uploadImages(images: any) {
    if (!images || images.length === 0) {
      toast.error("Please select an image first", {
        position: "bottom-right",
        duration: 3000,
      });
      return [];
    }

    const imgUrls: string[] = [];

    try {
      // Use Promise.all to ensure all uploads complete before proceeding
      await Promise.all(
        images.map(async (img: any) => {
          const formData = new FormData();
          formData.append("file", img);
          formData.append("upload_preset", uploadPreset);
          formData.append("folder", propertiesPath);

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
            formData
          );

          if (res && res.data && res.data.display_name) {
            // console.log("Image uploaded...", res.data.display_name);
            imgUrls.push(res.data.display_name);
          }
        })
      );

      return imgUrls; // Return only after all uploads are done
    } catch (err) {
      toast.error(`Upload failed: ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
      return [];
    }
  }

  async function handleSubmit(
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) {
    if (step !== 4 || values.details.ammenities.length < 1) {
      setSubmitting(false);
      return;
    }

    if (values.type === "RENT") {
      values.details.price = 0;
    } else if (values.type === "BUY") {
      values.details.rent = 0;
    }

    try {
      setSubmitting(true);
      const urls: any = await uploadImages(values.images);
      if (urls.length > 0) {
        // console.log("uploaded urls", urls);
        values.images = [...urls];
        // console.log("values.images : ", values.images);
      }
    } catch (err) {
      console.log(err);
      toast.error(`An Error Occurred : ${err}`, {
        position: "bottom-right",
        duration: 3000,
      });
    } finally {
      Object.assign(values.details, { isApproved: false });
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          `${baseURL}/v1/api/properties/post`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 201) {
          setSubmitting(false);
          toast.success("Form submitted successfully!", {
            position: "bottom-right",
            duration: 3000,
          });
          resetForm();
          setSubmitting(false);
          setStep(1);
        }
      } catch (err: any) {
        setSubmitting(false);
        console.log(err);
        if (err.status === 401) {
          toast.error("Access denied ! Authentication is required", {
            position: "bottom-right",
            duration: 3000,
          });
        }
      }
    }
  }

  const steps = ["General", "Details", "Images", "Amenities"];

  const getStepFields = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return [
          "name",
          "type",
          "mahareraNo",
          "propertyVariant",
          "subVariant",
          "address.landmark",
          "address.locality",
          "address.street",
          "address.zipCode",
          "details.location",
        ];
      case 2:
        return [
          "details.bedrooms",
          "details.bathrooms",
          "details.balconies",
          "details.floorNo",
          "details.facing",
          "details.carpetArea",
          "details.builtIn",
          "details.possesion",
          "details.underConstruction",
          "details.rent",
          "details.price",
          "details.amtUnit",
          "details.furnishedStatus",
          "details.description",
        ];
      case 3:
        return ["images"];
      case 4:
        return ["details.ammenities"];
      default:
        return [];
    }
  };

  const hasStepErrors = (errors: any, touched: any, stepNumber: number) => {
    const stepFields = getStepFields(stepNumber);
    return stepFields.some((field) => {
      const fieldParts = field.split(".");
      let fieldError = errors;
      let fieldTouched = touched;
      for (const part of fieldParts) {
        fieldError = fieldError && fieldError[part];
        fieldTouched = fieldTouched && fieldTouched[part];
      }
      return fieldError && fieldTouched;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-1 px-2 sm:px-3 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 bg-white p-[1.70rem]  rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Property
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in the details of your property
          </p>
        </div>

        <div className="flex justify-start items-center mb-8 flex-wrap">
          {steps.map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index + 1 <= step
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  } font-bold text-lg transition-colors duration-300`}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-xs font-medium text-gray-500">
                  {s}
                </div>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="flex-1 h-px bg-gray-300 mx-4 relative"
                  initial={{
                    background:
                      "repeating-linear-gradient(to right, #CBD5E0 0%, #CBD5E0 50%, transparent 50%, transparent 100%)",
                    backgroundSize: "20px 1px",
                  }}
                  animate={{
                    background:
                      index + 1 < step
                        ? "linear-gradient(to right, #3B82F6, #3B82F6)"
                        : "repeating-linear-gradient(to right, #CBD5E0 0%, #CBD5E0 50%, transparent 50%, transparent 100%)",
                    backgroundSize: "20px 1px",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2"
                    initial={{ borderColor: "#CBD5E0" }}
                    animate={{
                      borderColor: index + 1 < step ? "#3B82F6" : "#CBD5E0",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={propertyValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Property Name
                        </label>
                        <Field
                          id="name"
                          name="name"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="mahareraNo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Maharera No.
                        </label>
                        <Field
                          id="mahareraNo"
                          name="mahareraNo"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="mahareraNo"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className=" text-sm font-medium text-gray-700">
                          Property Type
                        </label>
                        <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="type"
                              value="RENT"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">Rent</span>
                          </label>
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="type"
                              value="BUY"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">Sell</span>
                          </label>
                        </div>
                        <ErrorMessage
                          name="type"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className=" text-sm font-medium text-gray-700">
                          Is Negotiable
                        </label>
                        <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="details.isNegotiable"
                              value="YES"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="details.isNegotiable"
                              value="NO"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                        <ErrorMessage
                          name="details.isNegotiable"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="propertyVariant"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Property Variant
                        </label>
                        <Field
                          as="select"
                          id="propertyVariant"
                          name="propertyVariant"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select variant</option>
                          <option value="COMMERCIAL">Commercial</option>
                          <option value="RESIDENTIAL">Residential</option>
                        </Field>
                        <ErrorMessage
                          name="propertyVariant"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subVariant"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sub Variant
                        </label>
                        <Field
                          as="select"
                          id="subVariant"
                          name="subVariant"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select sub variant</option>
                          {values.propertyVariant === "RESIDENTIAL" ? (
                            <>
                              <option value="Apartment">Apartment</option>
                              <option value="Villa">Villa</option>
                              <option value="Townhouse">Townhouse</option>
                            </>
                          ) : (
                            <>
                              <option value="Office">Office</option>
                              <option value="Retail">Retail</option>
                              <option value="Warehouse">Warehouse</option>
                            </>
                          )}
                        </Field>
                        <ErrorMessage
                          name="subVariant"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="address.landmark"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Landmark
                      </label>
                      <Field
                        id="address.landmark"
                        name="address.landmark"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="address.landmark"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="address.locality"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Locality
                        </label>
                        <Field
                          id="address.locality"
                          name="address.locality"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.locality"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="details.location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <Field
                          as="select"
                          id="details.location"
                          name="details.location"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select location</option>
                          <optgroup label="Bhayandar">
                            <option value="Bhayandar East">
                              Bhayandar East
                            </option>
                            <option value="Bhayandar West">
                              Bhayandar West
                            </option>
                          </optgroup>

                          <optgroup label="Mira Road">
                            <option value="Mira Road East">
                              Mira Road East
                            </option>
                          </optgroup>

                          <optgroup label="Dahisar">
                            <option value="Dahisar East">Dahisar East</option>
                            <option value="Dahisar West">Dahisar West</option>
                          </optgroup>

                          <optgroup label="Borivali">
                            <option value="Borivali East">Borivali East</option>
                            <option value="Borivali West">Borivali West</option>
                          </optgroup>

                          <optgroup label="Malad">
                            <option value="Malad East">Malad East</option>
                            <option value="Malad West">Malad West</option>
                          </optgroup>

                          <optgroup label="Goregaon">
                            <option value="Goregaon East">Goregaon East</option>
                            <option value="Goregaon West">Goregaon West</option>
                          </optgroup>
                        </Field>
                        <ErrorMessage
                          name="details.location"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="address.street"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street
                        </label>
                        <Field
                          id="address.street"
                          name="address.street"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.street"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address.zipCode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Zip Code
                        </label>
                        <Field
                          id="address.zipCode"
                          name="address.zipCode"
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="address.zipCode"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="details.description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        id="details.description"
                        name="details.description"
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
                      />
                      <ErrorMessage
                        name="details.description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="details.bedrooms"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bedrooms
                        </label>
                        <Field
                          id="details.bedrooms"
                          name="details.bedrooms"
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="details.bedrooms"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="details.bathrooms"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Bathrooms
                        </label>
                        <Field
                          id="details.bathrooms"
                          name="details.bathrooms"
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="details.bathrooms"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="details.balconies"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Balconies
                        </label>
                        <Field
                          id="details.balconies"
                          name="details.balconies"
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="details.balconies"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="details.floorNo"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Floor No.
                        </label>
                        <Field
                          id="details.floorNo"
                          name="details.floorNo"
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="details.floorNo"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="details.facing"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Facing
                      </label>
                      <Field
                        as="select"
                        id="details.facing"
                        name="details.facing"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select facing</option>
                        <option value="north">North</option>
                        <option value="south">South</option>
                        <option value="east">East</option>
                        <option value="west">West</option>
                      </Field>
                      <ErrorMessage
                        name="details.facing"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor={`details.carpetArea`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Carpet Area
                        </label>
                        <Field
                          id={`details.carpetArea`}
                          name={`details.carpetArea`}
                          type="number"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name={`details.carpetArea`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor={`details.areaUnit`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Area Unit
                        </label>
                        <Field
                          as="select"
                          id={`details.areaUnit`}
                          name={`details.areaUnit`}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select Unit</option>
                          <option value="sqft">sq ft</option>
                          <option value="sqm">sq m</option>
                          <option value="sqyd">sq yd</option>
                          <option value="acre">acre</option>
                        </Field>
                        <ErrorMessage
                          name={`details.areaUnit`}
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {values.details.underConstruction === "Yes" ? (
                        <div>
                          <label
                            htmlFor="details.possesion"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Possession Date
                          </label>
                          <Field
                            id="details.possesion"
                            name="details.possesion"
                            type="date"
                            component={DatePickerField}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <ErrorMessage
                            name="details.possesion"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor="details.builtIn"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Built-in Date
                          </label>
                          <Field
                            id="details.builtIn"
                            name="details.builtIn"
                            component={DatePickerField}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <ErrorMessage
                            name="details.builtIn"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Under Construction
                        </label>
                        <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="details.underConstruction"
                              value="Yes"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="details.underConstruction"
                              value="No"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                        <ErrorMessage
                          name="details.underConstruction"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>

                    {values.type === "RENT" && (
                      <div>
                        <label
                          htmlFor="details.rent"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Rent (per month)
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Field
                            id="details.rent"
                            name="details.rent"
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter rent per month"
                          />
                          <Field
                            as="select"
                            name="details.amtUnit"
                            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Rent Unit</option>
                            <option value="K">Thousand</option>
                            <option value="L">Lakh</option>
                            <option value="Cr">Cr</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="details.rent"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        <ErrorMessage
                          name="details.amtUnit"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    )}
                    {values.type === "BUY" && (
                      <div>
                        <label
                          htmlFor="details.price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <Field
                            id="details.price"
                            name="details.price"
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter property price"
                          />
                          <Field
                            as="select"
                            name="details.amtUnit"
                            className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Price Unit</option>
                            <option value="K">Thousand</option>
                            <option value="L">Lakh</option>
                            <option value="Cr">Cr</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="details.price"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                        <ErrorMessage
                          name="details.amtUnit"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="details.furnishedStatus"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Furnished Status
                      </label>
                      <Field
                        as="select"
                        id="details.furnishedStatus"
                        name="details.furnishedStatus"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                      >
                        <option value="">Select status</option>
                        <option value="UNFURNISHED">Unfurnished</option>
                        <option value="SEMIFURNISHED">Semi-furnished</option>
                        <option value="FURNISHED">Fully-furnished</option>
                      </Field>
                      <ErrorMessage
                        name="details.furnishedStatus"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Property Images
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                multiple
                                onChange={(event) => {
                                  const files = event.currentTarget.files;
                                  if (files) {
                                    // console.log(files);
                                    setFieldValue("images", [
                                      ...values.images,
                                      ...Array.from(files),
                                    ]);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    {values.images.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Images:
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {values.images.map((file: File, index: number) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amenities
                      </label>
                      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 md:gap-3 sm:gap-2">
                        {[
                          "24x7 Security",
                          "AC",
                          "Amphitheatre",
                          "Badminton Court",
                          "Banquet hall",
                          "Bar Area",
                          "Barbecue Corner",
                          "Box Cricket Area",
                          "Branded CP Fittings",
                          "Branded Switches",
                          "Business Lounge",
                          "Cabana",
                          "Cafeteria",
                          "Carrom",
                          "CCTV",
                          "Changing Rooms",
                          "Chess",
                          "Children's Play Area",
                          "Club House",
                          "Creche",
                          "Cycle track",
                          "Dance Studio",
                          "Double Height Lobby",
                          "EV Charging",
                          "Exhaust Fan",
                          "Fire alarm system",
                          "Fire Fighting System",
                          "Football Turf",
                          "Garden",
                          "Gas Pipeline",
                          "Gated Community",
                          "Gazebo",
                          "Geyser",
                          "Golf",
                          "Granite kitchen platform",
                          "Guest Waiting Lounge",
                          "Gym",
                          "Hub & chimney in kitchen",
                          "Indoor Games",
                          "Intercom Facility",
                          "Jacuzzi",
                          "Jogging track",
                          "Kids' Pool",
                          "Landscaped Garden",
                          "Library",
                          "Lift",
                          "Meditation",
                          "Modular kitchen",
                          "Multipurpose Hall",
                          "Multipurpose Play Court",
                          "Open To Sky Gym",
                          "Pantry",
                          "Parking",
                          "Party Area",
                          "Party Lawn",
                          "Power Backup",
                          "Rainwater Harvesting",
                          "Rock-climbing Wall",
                          "Roof-top Garden",
                          "Roof-top Lounge",
                          "Seating Area",
                          "Senior Citizen Area",
                          "Sewage Treatment Plants",
                          "Skating Rink",
                          "Sky Cafe",
                          "Sky Garden",
                          "Society Office",
                          "Solar panels",
                          "Spa",
                          "Stainless steel kitchen sink",
                          "Star Gazing Area",
                          "Steam Room",
                          "Sunrise Deck",
                          "Sunset Deck",
                          "Swimming Pool",
                          "Swing Garden",
                          "Table Tennis",
                          "Toddler Zone",
                          "Valet Service",
                          "Vastu Compliant",
                          "Video Door Phone",
                          "Walking Track",
                          "Water Purifier",
                          "Wi-fi Enabled",
                          "Yoga",
                          "Zen garden",
                        ].map((amenity) => (
                          <div key={amenity} className="flex items-center">
                            <Field
                              type="checkbox"
                              id={amenity}
                              name="details.ammenities"
                              value={amenity}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={amenity}
                              className="ml-2 block text-base text-gray-900"
                            >
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                      <ErrorMessage
                        name="details.ammenities"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-5">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button" // Add this line
                    onClick={() => setStep((prev) => prev + 1)}
                    disabled={hasStepErrors(errors, touched, step)}
                    className={`ml-auto bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center ${
                      hasStepErrors(errors, touched, step)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                ) : (
                  <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-auto bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 items-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Listing
                      <Check className="w-5 h-5 ml-1" />
                    </>
                  )}
                </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
      <Toaster />
    </div>
  );
}
