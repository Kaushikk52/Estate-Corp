import * as Yup from "yup";

export const floorPlanValidationSchema = Yup.object().shape({
    id: Yup.string().required("Floor Plan ID is required"),
    name: Yup.string().required("Floor Plan name is required"),
    bedrooms: Yup.number().required("Number of bedrooms is required"),
    bathrooms: Yup.number().required("Number of bathrooms is required"),
    balconies: Yup.number().required("Number of balconies is required"),
    price: Yup.number().required("Price is required"),
    rent: Yup.number().nullable(),
    amtUnit: Yup.string().required("Amount Unit is required"),
    carpetArea: Yup.number().required("Carpet area is required"),
    areaUnit: Yup.string().required("Area Unit is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string().url("Invalid URL format").required("Image URL is required"),
  });