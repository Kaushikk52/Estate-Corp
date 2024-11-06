import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldArray,
} from "formik";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { projectValidationSchema } from "../../../Validations/projectValidations";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";


const DatePickerField = ({ field, form }: any) => {
  return (
    <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      dateFormat="dd/MM/yyyy" // Set the date format to DD/MM/YYYY
      onChange={(date) => form.setFieldValue(field.name, date)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

export default function AddProjectLayout() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const cloudName = import.meta.env.VITE_APP_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_APP_UPLOAD_PRESET;
  const environment = import.meta.env.VITE_APP_ENV || 'LOCAL';
  const propertiesPath = `${uploadPreset}/${environment}/Properties`;
  const projectsPath = `${uploadPreset}/${environment}/Projects`;
  const [step, setStep] = useState(1);

  const LOCATION_OPTIONS = [
    {
      label: "Bhayandar",
      options: ["Bhayandar East", "Bhayandar West"],
    },
    {
      label: "Mira Road",
      options: ["Mira Road East"],
    },
    {
      label: "Dahisar",
      options: ["Dahisar East", "Dahisar West"],
    },
    {
      label: "Borivali",
      options: ["Borivali East", "Borivali West"],
    },
    {
      label: "Malad",
      options: ["Malad East", "Malad West"],
    },
    {
      label: "Goregaon",
      options: ["Goregaon East", "Goregaon West"],
    },
  ];

  const initialValues = {
    name: "",
    mahareraNo:"",
    description: "",
    images: [] as File[],
    totalFloors: 0,
    location: "",
    builtIn: "",
    possesion: "",
    ammenities: [] as string[],
    address: {
      landmark: "",
      locality: "",
      street: "",
      zipCode: "",
    },
    floorPlans: [
      {
        name: "",
        bedrooms: 0,
        bathrooms: 0,
        balconies: 0,
        price: 0,
        rent:0,
        amtUnit: "",
        carpetArea: 0,
        areaUnit: "",
        description: "",
        image: null as File | null,
        isMinimized: false,
      },
    ],
    underConstruction: "",
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


async function uploadSingleImage(image: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", projectsPath);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`,
      formData
    );

    return res.data?.display_name || null;
  } catch (err) {
    console.error("Image upload failed:", err);
    return null;
  }
}

async function uploadImages(images: File[]): Promise<string[]> {
  if (!images?.length) {
    toast.error("Please select an image first", {
      position: "bottom-right",
      duration: 3000,
    });
    return [];
  }

  const uploadPromises = images.map(uploadSingleImage);
  const imgUrls = await Promise.all(uploadPromises);
  return imgUrls.filter((url): url is string => url !== null);
}

async function handleSubmit(
  values: typeof initialValues,
  { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
) {
  if (step !== 4 || values.ammenities.length < 1) {
    setSubmitting(false);
    return;
  }

  try {
    setSubmitting(true);

    
    const updatedFloorPlans = await Promise.all(
      values.floorPlans.map(async (floorPlan) => {
        if(floorPlan.image == null){
          return { ...floorPlan, image: null };
        }
        const url = await uploadSingleImage(floorPlan.image);
        return { ...floorPlan, image: url };
      })
    );
    const projectImages = await uploadImages(values.images);
    const projectData = {
      ...values,
      floorPlans: updatedFloorPlans,
      images: projectImages,
      underConstruction: values.underConstruction,
    };

    const token = localStorage.getItem("token");
    const response = await axios.post(`${baseURL}/v1/api/projects/add`, projectData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 201) {
      toast.success("Project created successfully!", {
        position: "bottom-right",
        duration: 3000,
      });
      resetForm();
      setStep(1);
    }
  } catch (err: any) {
    console.error("Project creation error:", err);
    toast.error(`An error occurred: ${err.message}`, {
      position: "bottom-right",
      duration: 3000,
    });
  } finally {
    setSubmitting(false);
  }
}

  const steps = ["Details", "Floor Plans", "Images", "Amenities"];

  const getStepFields = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return [
          "name",
          "mahareraNo",
          "description",
          "totalFloors",
          "location",
          "builtIn",
          "possesion",
          "address",
        ];
      case 2:
        return ["floorPlans.name"];
      case 3:
        return ["images"];
      case 4:
        return ["ammentites"];
      default:
        return [];
    }
  };

  const hasStepErrors = (errors: any, touched: any, stepNumber: number) => {
    // console.log(errors,touched,stepNumber);
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
        className="max-w-4xl w-full space-y-8 bg-white p-[1.70rem] rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Project
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in the details of your project
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
          validationSchema={projectValidationSchema}
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
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="totalFloors"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Total Floors
                        </label>
                        <Field
                          id="totalFloors"
                          name="totalFloors"
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="totalFloors"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Under Construction
                        </label>
                        <div className="mt-2 space-x-4">
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="underConstruction"
                              value="Yes"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <Field
                              type="radio"
                              name="underConstruction"
                              value="No"
                              className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                        <ErrorMessage
                          name="underConstruction"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      {values.underConstruction === "Yes" ? (
                      <div>
                        <label
                          htmlFor="possesion"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Possession Date
                        </label>
                        <Field
                          id="possesion"
                          name="possesion"
                          type="date"
                          component={DatePickerField}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="possesion"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor="builtIn"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Built-in Date
                        </label>
                        <Field
                          id="builtIn"
                          name="builtIn"
                          component={DatePickerField}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ErrorMessage
                          name="builtIn"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    )}
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
                          htmlFor="location"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <Field
                          as="select"
                          id="location"
                          name="location"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        >
                          <option value="">Select location</option>
                          {LOCATION_OPTIONS.map((group) => (
                            <optgroup key={group.label} label={group.label}>
                              {group.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="location"
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
                    <FieldArray name="floorPlans">
                      {({ push, remove }) => (
                        <div>
                          {values.floorPlans.map((floorPlan, index) => (
                            <div
                              key={index}
                              className="mb-8 p-4 border rounded-lg"
                            >
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">
                                  {floorPlan.name || `Floor Plan ${index + 1}`}
                                </h3>
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newFloorPlans = [
                                        ...values.floorPlans,
                                      ];
                                      newFloorPlans[index].isMinimized =
                                        !newFloorPlans[index].isMinimized;
                                      setFieldValue(
                                        "floorPlans",
                                        newFloorPlans
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    {floorPlan.isMinimized ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              {!floorPlan.isMinimized && (
                                <div className="space-y-4">
                                  <div>
                                    <label
                                      htmlFor={`floorPlans.${index}.name`}
                                      className="block text-sm font-medium text-gray-700"
                                    >
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
                                    <label
                                      htmlFor={`floorPlans.${index}.bedrooms`}
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Bedrooms
                                    </label>
                                    <Field
                                      id={`floorPlans.${index}.bedrooms`}
                                      name={`floorPlans.${index}.bedrooms`}
                                      type="number"
                                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    <ErrorMessage
                                      name={`floorPlans.${index}.bedrooms`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor={`floorPlans.${index}.price`}
                                        className="block text-sm font-medium text-gray-700"
                                      >
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
                                      <label
                                        htmlFor={`floorPlans.${index}.amtUnit`}
                                        className="block text-sm font-medium text-gray-700"
                                      >
                                        Price Unit
                                      </label>
                                      <Field
                                        as="select"
                                        id={`floorPlans.${index}.amtUnit`}
                                        name={`floorPlans.${index}.amtUnit`}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                      >
                                        <option value="">Select Unit</option>
                                        <option value="K">Thousand</option>
                                        <option value="L">Lakh</option>
                                        <option value="Cr">Crore</option>
                                      </Field>
                                      <ErrorMessage
                                        name={`floorPlans.${index}.amtUnit`}
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label
                                        htmlFor={`floorPlans.${index}.carpetArea`}
                                        className="block text-sm font-medium text-gray-700"
                                      >
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
                                      <label
                                        htmlFor={`floorPlans.${index}.areaUnit`}
                                        className="block text-sm font-medium text-gray-700"
                                      >
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
                                        <option value="acre">acre</option>
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
                                      <label
                                        htmlFor={`floorPlans.${index}.bathrooms`}
                                        className="block text-sm font-medium text-gray-700"
                                      >
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
                                      <label
                                        htmlFor={`floorPlans.${index}.balconies`}
                                        className="block text-sm font-medium text-gray-700"
                                      >
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
                                    <label
                                      htmlFor={`floorPlans.${index}.description`}
                                      className="block text-sm font-medium text-gray-700"
                                    >
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
                                      Floor Plan Image
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
                                            htmlFor={`floorPlans.${index}.image`}
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                          >
                                            <span>Upload a file</span>
                                            <input
                                              id={`floorPlans.${index}.image`}
                                              name={`floorPlans.${index}.image`}
                                              type="file"
                                              className="sr-only"
                                              onChange={(event) => {
                                                const file =
                                                  event.currentTarget
                                                    .files?.[0];
                                                if (file) {
                                                  setFieldValue(
                                                    `floorPlans.${index}.image`,
                                                    file
                                                  );
                                                }
                                              }}
                                            />
                                          </label>
                                          <p className="pl-1">
                                            or drag and drop
                                          </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                          PNG, JPG, GIF up to 10MB
                                        </p>
                                      </div>
                                    </div>
                                    <ErrorMessage
                                      name={`floorPlans.${index}.image`}
                                      component="div"
                                      className="text-red-500 text-sm mt-1"
                                    />
                                  </div>
                                  {values.floorPlans[index].image && (
                                      <p className="mt-2 text-sm text-gray-500">
                                        <span className="font-semibold">Uploaded file:</span> {values.floorPlans[index].image.name}
                                      </p>
                                    )}
                                </div>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                name: "",
                                bedrooms: 0,
                                price: 0,
                                amtUnit: "",
                                carpetArea: 0,
                                areaUnit: "",
                                bathrooms: 0,
                                balconies: 0,
                                location: "",
                                description: "",
                                image: null,
                                isMinimized: false,
                              })
                            }
                            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload Project Images
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
                              <span>Upload files</span>
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
                              name="ammenities"
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
                        name="ammenities"
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
                <Button
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
                </Button>
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
    </div>
  );
}
