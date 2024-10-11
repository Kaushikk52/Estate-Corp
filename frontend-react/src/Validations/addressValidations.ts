import * as Yup from "yup";

export const addressValidationSchema = Yup.object().shape({
  street: Yup.string().required("Street is required"),
  locality: Yup.string().required("Locality is required"),
  landmark: Yup.string().nullable(),
  zipCode: Yup.string()
    .matches(/^\d{6}$/, "Zip Code must be exactly 6 digits")
    .required("Zip Code is required"),
});
