import * as Yup from "yup";
import { Role } from "../Models/User";

export const userValidationSchema = Yup.object().shape({
    id: Yup.string().required("User ID is required"),
    token: Yup.string().required("Token is required"),
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
      .required("Phone number is required"),
    projects: Yup.array().nullable(), // Optional field if user has no projects
    properties: Yup.array().nullable(), // Optional field if user has no properties
    role: Yup.mixed().oneOf(Object.values(Role)).required("User role is required"),
  });