import * as Yup from "yup";

export const propertyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Property Name is required"),
  type: Yup.string().required("Property Type is required"),
  propertyVariant: Yup.string().required("Property Variant is required"),
  subVariant: Yup.string().required("Sub Variant is required"),
  address: Yup.object().shape({
    landmark: Yup.string().required("Landmark is required"),
    locality: Yup.string().required("Locality is required"),
    street: Yup.string().required("Street is required"),
    zipCode: Yup.string().matches(/^\d{6}$/, "Zip Code must be exactly 6 digits and contain only numbers")
    .required("Zip Code is required"),
  }),
  details: Yup.object().shape({
    location: Yup.string().required("Location is required"),
    bedrooms: Yup.number()
      .required("Number of bedrooms is required")
      .min(0, "Cannot be negative"),
    bathrooms: Yup.number()
      .required("Number of bathrooms is required")
      .min(0, "Cannot be negative"),
    balconies: Yup.number()
      .required("Number of balconies is required")
      .min(0, "Cannot be negative"),
    floorNo: Yup.number()
      .required("Floor number is required")
      .min(0, "Cannot be negative"),
    facing: Yup.string().required("Facing direction is required"),
    carpetArea: Yup.number()
      .required("Carpet area is required")
      .positive("Must be a positive number"),
    areaUnit: Yup.string().required("Carpet area unit is required"),
    amtUnit: Yup.string().required("This field is required"),
    isNegotiable: Yup.string().required("Is Negotiable is required"),
    builtIn: Yup.date(),
    possesion: Yup.date(),
    furnishedStatus: Yup.string().required("Furnished status is required"),
    ammenities: Yup.array()
      .of(Yup.string())
      .min(1, "At least one amenity must be selected"),
    description: Yup.string().required("Description is required"),
  }),
  images: Yup.array().of(Yup.mixed()).min(1, "At least one image is required"),
});
