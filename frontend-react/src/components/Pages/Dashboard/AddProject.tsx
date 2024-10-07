import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldArray } from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as Yup from 'yup';

export default function AddProjectLayout() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required'),
    description: Yup.string().required('Project Description is required'),
    location: Yup.string().required('Project Location is required'),
    floorPlans: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Floor Plan Name is required'),
        bhkType: Yup.string().required('BHK Type is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        priceUnit: Yup.string().required('Price Unit is required'),
        carpetArea: Yup.number().required('Carpet Area is required').positive('Carpet Area must be positive'),
        areaUnit: Yup.string().required('Area Unit is required'),
        bathrooms: Yup.number().required('Number of Bathrooms is required').min(0, 'Bathrooms cannot be negative'),
        balconies: Yup.number().required('Number of Balconies is required').min(0, 'Balconies cannot be negative'),
        description: Yup.string().required('Description is required'),
        images: Yup.array().of(Yup.mixed()).min(1, 'At least one image is required'),
      })
    ),
  });
  
  const initialValues = {
    name: '',
    description: '',
    location: '',
    floorPlans: [{
      name: "",
      bhkType: "",
      price: 0,
      priceUnit: "",
      carpetArea: 0,
      areaUnit: "",
      bathrooms: 0,
      balconies: 0,
      description: "",
      images: [],
      isMinimized:false,
    }],
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
  }, []);

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
      await Promise.all(
        images.map(async (img: any) => {
          const formData = new FormData();
          formData.append("file", img);
          formData.append("upload_preset", uploadPreset);

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          );

          if (res && res.data && res.data.secure_url) {
            console.log("Image uploaded...", res.data.secure_url);
            imgUrls.push(res.data.secure_url);
          }
        })
      );

      return imgUrls;
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
    if (step !== totalSteps) {
      setSubmitting(false);
      return;
    }

    try {
      const updatedFloorPlans = await Promise.all(values.floorPlans.map(async (floorPlan) => {
        const urls = await uploadImages(floorPlan.images);
        return { ...floorPlan, images: urls };
      }));

      const projectData = {
        ...values,
        floorPlans: updatedFloorPlans,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseURL}/v1/api/projects/create`,
        projectData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        toast.success("Project created successfully!", {
          position: "bottom-right",
          duration: 3000,
        });
        resetForm();
        setSubmitting(false);
      }
    } catch (err: any) {
      console.log(err);
      toast.error(`An error occurred: ${err.message}`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
  }

  const steps = ["Project Details", "Floor Plans", "Review"];

  const getStepFields = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return ["name", "description", "location"];
      case 2:
        return ["floorPlans"];
      case 3:
        return [];
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-2 sm:px-3 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Project
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in the details of your project
          </p>
        </div>

        <div className="flex justify-between items-center mb-8 flex-wrap">
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
          validationSchema={validationSchema}
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
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Project Name
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
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Project Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Project Location
                      </label>
                      <Field
                        id="location"
                        name="location"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
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
                    <FieldArray name="floorPlans">
                      {({ push, remove }) => (
                        <div>
                          {values.floorPlans.map((floorPlan, index) => (
                            <div key={index} className="mb-8 p-4 border rounded-lg">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">{floorPlan.name || `Floor Plan ${index + 1}`}</h3>
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFloorPlans = [...values.floorPlans];
                                      newFloorPlans[index].isMinimized = !newFloorPlans[index].isMinimized;
                                      setFieldValue('floorPlans', newFloorPlans);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    {floorPlan.isMinimized ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              {!floorPlan.isMinimized && (
                                <div className="space-y-4">
                                  <div>
                                    <label htmlFor={`floorPlans.${index}.name`} className="block text-sm font-medium text-gray-700">
                                      Floor Plan Name
                                    </label>
                                    <Field
                                      id={`floorPlans.${index}.name`}
                                      name={`floorPlans.${index}.name`}
                                      type="text"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <ErrorMessage
                                      name={`floorPlans.${index}.name`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor={`floorPlans.${index}.bhkType`} className="block text-sm font-medium text-gray-700">
                                      BHK Type
                                    </label>
                                    <Field
                                      as="select"
                                      id={`floorPlans.${index}.bhkType`}
                                      name={`floorPlans.${index}.bhkType`}
                                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                    >
                                      <option value="">Select BHK Type</option>
                                      <option value="1BHK">1 BHK</option>
                                      <option value="2BHK">2 BHK</option>
                                      <option value="3BHK">3 BHK</option>
                                      <option value="4BHK">4 BHK</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`floorPlans.${index}.bhkType`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label htmlFor={`floorPlans.${index}.price`} className="block text-sm font-medium text-gray-700">
                                        Price
                                      </label>
                                      <Field
                                        id={`floorPlans.${index}.price`}
                                        name={`floorPlans.${index}.price`}
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                      />
                                      <ErrorMessage
                                        name={`floorPlans.${index}.price`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor={`floorPlans.${index}.priceUnit`} className="block text-sm font-medium text-gray-700">
                                        Price Unit
                                      </label>
                                      <Field
                                        as="select"
                                        id={`floorPlans.${index}.priceUnit`}
                                        name={`floorPlans.${index}.priceUnit`}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                      >
                                        <option value="">Select Unit</option>
                                        <option value="K">Thousand</option>
                                        <option value="L">Lakh</option>
                                        <option value="Cr">Crore</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`floorPlans.${index}.priceUnit`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label htmlFor={`floorPlans.${index}.carpetArea`} className="block text-sm font-medium text-gray-700">
                                        Carpet Area
                                      </label>
                                      <Field
                                        id={`floorPlans.${index}.carpetArea`}
                                        name={`floorPlans.${index}.carpetArea`}
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                      />
                                      <ErrorMessage
                                        name={`floorPlans.${index}.carpetArea`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor={`floorPlans.${index}.areaUnit`} className="block text-sm font-medium text-gray-700">
                                        Area Unit
                                      </label>
                                      <Field
                                        as="select"
                                        id={`floorPlans.${index}.areaUnit`}
                                        name={`floorPlans.${index}.areaUnit`}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                      >
                                        <option value="">Select Unit</option>
                                        <option value="sqft">sq ft</option>
                                        <option value="sqm">sq m</option>
                                        <option value="sqyd">sq yd</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`floorPlans.${index}.areaUnit`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label htmlFor={`floorPlans.${index}.bathrooms`} className="block text-sm font-medium text-gray-700">
                                        Bathrooms
                                      </label>
                                      <Field
                                        id={`floorPlans.${index}.bathrooms`}
                                        name={`floorPlans.${index}.bathrooms`}
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                      />
                                      <ErrorMessage
                                        name={`floorPlans.${index}.bathrooms`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                    <div>
                                      <label htmlFor={`floorPlans.${index}.balconies`} className="block text-sm font-medium text-gray-700">
                                        Balconies
                                      </label>
                                      <Field
                                        id={`floorPlans.${index}.balconies`}
                                        name={`floorPlans.${index}.balconies`}
                                        type="number"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                      />
                                      <ErrorMessage
                                        name={`floorPlans.${index}.balconies`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label htmlFor={`floorPlans.${index}.description`} className="block text-sm font-medium text-gray-700">
                                      Description
                                    </label>
                                    <Field
                                      as="textarea"
                                      id={`floorPlans.${index}.description`}
                                      name={`floorPlans.${index}.description`}
                                      rows={3}
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <ErrorMessage
                                      name={`floorPlans.${index}.description`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Floor Plan Images
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
                                            htmlFor={`floorPlans.${index}.images`}
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                          >
                                            <span>Upload files</span>
                                            <input
                                              id={`floorPlans.${index}.images`}
                                              name={`floorPlans.${index}.images`}
                                              type="file"
                                              multiple
                                              className="sr-only"
                                              onChange={(event) => {
                                                const files = event.currentTarget.files;
                                                if (files) {
                                                  setFieldValue(`floorPlans.${index}.images`, [
                                                    ...(values.floorPlans[index].images || []),
                                                    ...Array.from(files),
                                                  ]);
                                                }
                                              }}
                                            />
                                          </label>
                                          <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                      </div>
                                    </div>
                                    <ErrorMessage
                                      name={`floorPlans.${index}.images`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({
                              name: '',
                              bhkType: '',
                              price: '',
                              priceUnit: '',
                              carpetArea: '',
                              areaUnit: '',
                              bathrooms: '',
                              balconies: '',
                              description: '',
                              images: [],
                              isMinimized: false,
                            })}
                            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Floor Plan
                          </button>
                        </div>
                      )}
                    </FieldArray>
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
                    <h3 className="text-lg font-medium text-gray-900">Review Your Project</h3>
                    <div>
                      <h4 className="font-medium">Project Details:</h4>
                      <p>Name: {values.name}</p>
                      <p>Description: {values.description}</p>
                      <p>Location: {values.location}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Floor Plans:</h4>
                      {values.floorPlans.map((floorPlan, index) => (
                        <div key={index} className="mb-4">
                          <p>Floor Plan {index + 1}:</p>
                          <p>Name: {floorPlan.name}</p>
                          <p>BHK Type: {floorPlan.bhkType}</p>
                          <p>Price: {floorPlan.price} {floorPlan.priceUnit}</p>
                          <p>Carpet Area: {floorPlan.carpetArea} {floorPlan.areaUnit}</p>
                          <p>Bathrooms: {floorPlan.bathrooms}</p>
                          <p>Balconies: {floorPlan.balconies}</p>
                          <p>Description: {floorPlan.description}</p>
                          <p>Images: {floorPlan.images.length} uploaded</p>
                        </div>
                      ))}
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
                {step < totalSteps ? (
                  <button
                    type="button"
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-auto bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 items-center"
                  >
                    Submit Project
                    <Check className="w-5 h-5 ml-1" />
                  </button>
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