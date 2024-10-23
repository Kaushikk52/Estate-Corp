import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function AuthPopup(props: any) {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const roles = ["ROLE_AGENT", "ROLE_RESALER", "ROLE_USER"];

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [user, setUser] = useState({});
  const [resetStep, setResetStep] = useState("email");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (props.popup === true) {
      setIsOpen(true);
    }
    if (token !== null && props.popup === true) {
      setIsOpen(false);
    }
  }, [props.popup]);

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

  const forgotPasswordSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const otpSchema = Yup.object({
    otp: Yup.string().length(6, "OTP must be 6 digits").required("Required"),
  });

  const newPasswordSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
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
      const response = await axios.post(`${baseURL}/v1/api/auth/login`,values);
      if (response.status === 200) {
        const token = localStorage.getItem("token");
        if (!token || token !== response.data.jwtToken) {
          localStorage.setItem("token", response.data.jwtToken);
        }
        setIsOpen(false);
        navigate("/dashboard/add-property");
        // console.log("User Logged in Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleForgotPassword(values: any) {
    try {
      // console.log("Sending reset email to:", values.email);
      const response = await axios.post(
        `${baseURL}/v1/api/auth/send-otp?email=${values.email}`
      );
      if (response.status === 200) {
        toast.success(`OTP sent successfully`, {
          position: "bottom-right",
          duration: 3000,
        });
        setResetStep("otp");
      } else {
        toast.error(`Couldn't send Otp , Try again`, {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleOTPVerification(values: any) {
    try {
      // console.log("Verifying OTP:", values.otp);
      const response = await axios.post(
        `${baseURL}/v1/api/auth/verify-otp?email=${values.email}&otp=${values.otp}&newPass=${values.confirmPassword}`
      );
      if (response.status === 200) {
        // console.log("Resetting password");
        setActiveTab("login");
        setResetStep("email");
        toast.success(`Password Reset successful`, {
          position: "bottom-right",
          duration: 3000,
        });
      } else {
        toast.error(`Couldn't send Otp , Try again`, {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative">
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
            {activeTab !== "forgotPassword" && (
              <>
                <p className="text-center text-gray-600 mb-6">
                  {activeTab === "login"
                    ? "Sign in to your account"
                    : "Sign Up to create a new account"}
                </p>
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
              </>
            )}

            {activeTab === "login" && (
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
                      <div className="mt-1 relative rounded-md shadow-sm">
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
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
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
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                    <div className="text-right">
                      <button
                        type="button"
                        className="text-sm text-purple-600 hover:text-purple-500"
                        onClick={() => setActiveTab("forgotPassword")}
                      >
                        Forgot password?
                      </button>
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
            )}

            {activeTab === "register" && (
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
                      <div className="mt-1 relative rounded-md shadow-sm">
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
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
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
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
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
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
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
                        className="mt-1 text-sm text-red-500"
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
                            {roles.map((role) => (
                              <div key={role} className="mb-4">
                                <Field
                                  name="role"
                                  type="radio"
                                  value={role}
                                  className="form-radio h-5 w-5 text-blue-600"
                                />
                                <label className="ml-2 text-gray-700">
                                  {role.replace("ROLE_", "")}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="mt-1 text-sm text-red-500"
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

            {activeTab === "forgotPassword" && (
              <div>
                <button
                  onClick={() => setActiveTab("login")}
                  className="mb-4 flex items-center text-sm text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </button>
                {resetStep === "email" && (
                  <Formik
                    initialValues={{ email: "" }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={(values) => handleForgotPassword(values)}
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
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              name="email"
                              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter your email"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={isSubmitting}
                        >
                          Send Reset Email
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
                {resetStep === "otp" && (
                  <Formik
                    initialValues={{
                      otp: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={otpSchema}
                    onSubmit={(values) => handleOTPVerification(values)}
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
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <Field
                              name="email"
                              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                              placeholder="Enter your email"
                            />
                          </div>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="otp"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Enter OTP
                          </label>
                          <Field
                            name="otp"
                            className="block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="otp"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            New Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            className="block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm New Password
                          </label>
                          <Field
                            name="confirmPassword"
                            type="password"
                            className="block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={isSubmitting}
                        >
                          Verify OTP
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
