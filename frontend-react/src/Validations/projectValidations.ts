import * as Yup from "yup";
import {userValidationSchema} from './userValidations';
import { addressValidationSchema } from "./addressValidations";
import { floorPlanValidationSchema } from "./floorPlanValidations";


export const projectValidationSchema = Yup.object().shape({
  name: Yup.string().required('Project Name is required'),
  mahareraNo:Yup.string().required('Maharera No. is required'),
  description: Yup.string().required('Project Description is required'),
  images: Yup.mixed(),
  totalFloors: Yup.number()
    .required("Total Floor is required")
    .min(0, "Total floors cannot be negative"),
  location: Yup.string().required('Location is required'),
  builtIn: Yup.date()
    .when("underConstruction", {
      is: (val: any) => val === "No", // If not under construction
      then: (schema) => schema.required("Built-in date is required for completed projects"),
      otherwise: (schema) => schema.notRequired(),
    }),
  possesion: Yup.date()
    .when("underConstruction", {
      is: (val: any) => val === "Yes", // If under construction
      then: (schema) => schema.required("Possession date is required for under-construction projects"),
      otherwise: (schema) => schema.notRequired(),
    }),
  underConstruction: Yup.string().oneOf(["Yes","No"]).required('Construction status is required'),
  ammenities: Yup.array()
    .of(Yup.string())
    .min(1, "At least one amenity must be selected"),
  
  // Address validation
  address: Yup.object().shape({
    landmark: Yup.string().required("Landmark is required"),
    locality: Yup.string().required("Locality is required"),
    street: Yup.string().required("Street is required"),
    zipCode: Yup.string()
      .matches(/^\d{6}$/, "Zip Code must contain 6 digits only")
      .required("Zip Code is required"),
  }),

  // FloorPlans validation
  floorPlans: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().optional(),
      bedrooms: Yup.number().required('Bedrooms is required').min(0, 'Bedrooms cannot be negative'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      amtUnit: Yup.string().required('Price Unit is required'),
      carpetArea: Yup.number().required('Carpet Area is required').positive('Carpet Area must be positive'),
      areaUnit: Yup.string().required('Area Unit is required'),
      bathrooms: Yup.number().required('Number of Bathrooms is required').min(0, 'Bathrooms cannot be negative'),
      balconies: Yup.number().required('Number of Balconies is required').min(0, 'Balconies cannot be negative'),
      description: Yup.string().required('Description is required'),
      image: Yup.mixed()
    })
  ),
});





// export const projectValidationSchema = Yup.object().shape({
//   id: Yup.string().required("Project ID is required"),
//   name: Yup.string().required("Project name is required"),
//   owner: userValidationSchema,
//   description: Yup.string().required("Project description is required"),
//   images: Yup.array()
//     .of(Yup.string().url("Invalid URL format"))
//     .required("Images are required"),
//   totalFloors: Yup.number().required("Total number of floors is required"),
//   location: Yup.string().required("Location is required"),
//   builtIn: Yup.string().required("Built-in year is required"),
//   possesion: Yup.string().required("Possession date is required"),
//   ammenities: Yup.array()
//   .of(Yup.string())
//   .min(1, "At least one amenity must be selected"),
//   address: addressValidationSchema,
//   floorPlans: Yup.array()
//     .of(floorPlanValidationSchema)
//     .required("At least one floor plan is required"),
//   underConstruction: Yup.string().required(
//     "Under Construction status is required"
//   ),
// });
