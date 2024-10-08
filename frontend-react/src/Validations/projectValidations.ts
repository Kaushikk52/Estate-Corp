import * as Yup from "yup";

  export const projectValidationSchema = Yup.object().shape({
    // name: Yup.string().required('Project Name is required'),
    // description: Yup.string().required('Project Description is required'),
    // images: Yup.array().of(Yup.string()),
    // totalFloors: Yup.number().required("Total Floor is required").min(0, "Cannot be negative"),
    // location: Yup.string().required('Location is required'),
    // builtIn: Yup.date()
    // .when("underConstruction", {
    //   is: (val:any) => val === false,
    //   then: (schema) => schema.required("Built-in date is required for under construction projects"),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    // possession: Yup.date()
    // .when("underConstruction", {
    //   is: (val:any) => val === true,
    //   then: (schema) => schema.required("Possesion date is required for under construction projects"),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    // underConstruction:Yup.boolean().required('Construction status is required'),
    // ammenities: Yup.array()
    //   .of(Yup.string())
    //   .min(1, "At least one amenity must be selected"),
    // address: Yup.object().shape({
    //   landmark: Yup.string().required("Landmark is required"),
    //   locality: Yup.string().required("Locality is required"),
    //   street: Yup.string().required("Street is required"),
    //   zipCode: Yup.string().required("Zip Code is required"),
    // }),
    // floorPlans: Yup.array().of(
    //   Yup.object().shape({
    //     name: Yup.string().required('Floor Plan Name is required'),
    //     bedrooms: Yup.string().required('Bedrooms is required'),
    //     price: Yup.number().required('Price is required').positive('Price must be positive'),
    //     priceUnit: Yup.string().required('Price Unit is required'),
    //     carpetArea: Yup.number().required('Carpet Area is required').positive('Carpet Area must be positive'),
    //     areaUnit: Yup.string().required('Area Unit is required'),
    //     bathrooms: Yup.number().required('Number of Bathrooms is required').min(0, 'Bathrooms cannot be negative'),
    //     balconies: Yup.number().required('Number of Balconies is required').min(0, 'Balconies cannot be negative'),
    //     description: Yup.string().required('Description is required'),
    //     image: Yup.string(),
    //   })
    // ),
  });