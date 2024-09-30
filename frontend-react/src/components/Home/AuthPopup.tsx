import React, { useState,useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github, PlusSquare, Phone } from "lucide-react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function AuthPopup(props:any) {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const roles = ["ROLE_AGENT", "ROLE_RESALER", "ROLE_USER"];

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(props.popup ===true){
      setIsOpen(true);
    }
    if(token !== null && props.popup === true){
      setIsOpen(false);
    }
  })

  const registerSchema = Yup.object({
    fullName: Yup.string()
      .min(5, "Full name must be at least 5 characters")
      .max(30, "Full name is too long")
      .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone no. must be at least 10 characters")
      .max(15, "Phone no. is too long")
      .required("Required"),
    role: Yup.mixed().oneOf(roles, "Invalid role").required("Role is required"),
  });

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const togglePopup = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(!isOpen);
  };

  async function handleRegister(values: any) {
    try {
      const response = await axios.post(
        `${baseURL}/v1/api/auth/register`,
        values
      );
      if (response.status === 201) {
        setUser(response.data.user);
        setActiveTab("login");
        console.log("User registered Successfully", user);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogin(values: any) {
    try {
      const response = await axios.post(`${baseURL}/v1/api/auth/login`, values);
      if (response.status === 200) {
        const token = localStorage.getItem("token");
        if (!token || token !== response.data.jwtToken) {
          localStorage.setItem("token", response.data.jwtToken);
        }
        setIsOpen(false);
        navigate('/dashboard/add-property');
        console.log("User Logged in Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Welcome</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
            {activeTab === "login" ? (
              <p className="text-center text-gray-600 mb-6">
                Sign in to your account
              </p>
            ) : (
              <p className="text-center text-gray-600 mb-6">
                Sign Up to create a new account
              </p>
            )}
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 ${
                  activeTab === "register"
                    ? "border-b-2 border-pink-500 text-pink-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
              <button
                className={`flex-1 py-2 ${
                  activeTab === "login"
                    ? "border-b-2 border-purple-500 text-purple-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </div>

            {activeTab === "login" ? (
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginSchema}
                onSubmit={(values) => handleLogin(values)}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 p-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          name="email"
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 p-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          name="password"
                          type="password"
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      disabled={isSubmitting}
                    >
                      Sign in
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  fullName: "",
                  email: "",
                  password: "",
                  phone: "",
                  role: "",
                }}
                validationSchema={registerSchema}
                onSubmit={(values) => handleRegister(values)}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1 p-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          name="fullName"
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 p-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          name="email"
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1 p-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          name="phone"
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 p-2 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <Field
                          name="password"
                          type="password"
                          className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>

                    <div>
                      <div className="mt-6">
                        <div className="relative">
                          <div className="relative flex justify-center text-sm">
                            <label className="block text-sm font-medium text-gray-700">
                              Select Roles
                            </label>
                          </div>
                          <div className="w-full border-t border-gray-300 mt-2"></div>
                          <div className="flex justify-around mt-2">
                            {/* Option 1 */}
                            <div className="mb-4">
                              <Field
                                name="role"
                                type="radio"
                                value="ROLE_AGENT"
                                className="form-radio h-5 w-5 text-blue-600"
                              />
                              <label className="ml-2 text-gray-700">
                                Agent
                              </label>
                            </div>
                            {/* Option 2 */}
                            <div className="mb-4">
                              <Field
                                name="role"
                                type="radio"
                                value="ROLE_RESALER"
                                className="form-radio h-5 w-5 text-blue-600"
                              />
                              <label className="ml-2 text-gray-700">
                                Resaler
                              </label>
                            </div>
                            {/* Option 3 */}
                            <div className="mb-4">
                              <Field
                                name="role"
                                type="radio"
                                value="ROLE_USER"
                                className="form-radio h-5 w-5 text-blue-600"
                              />
                              <label className="ml-2 text-gray-700">User</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="error text-red-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      disabled={isSubmitting}
                    >
                      Register
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
