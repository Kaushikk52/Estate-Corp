import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, User, Github, PlusSquare, Phone } from "lucide-react";

export default function AuthPopup() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const togglePopup = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(!isOpen);
  };

  const [registerCreds, setRegisterCreds] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const[loginCreds,setLoginCreds] = useState({
    name:"",
    password:""
  })

  const [user, setUser] = useState({});

  async function handleRegister(e: any) {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/v1/api/auth/register`,
        registerCreds
      );
      if (response.status === 201) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.user.token);
        setActiveTab("login")
        console.log("User registered Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLogin(e:any){
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseURL}/v1/api/auth/login`,
        loginCreds,
        {headers:{'authorization':'Bearer '+localStorage.getItem('token')}}
      );
      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if(!token || token !== response.data.jwtToken){
          localStorage.setItem("token", response.data.jwtToken);
        }
        setIsOpen(false);
        console.log("User Logged in Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="">
      <div className="space-x-4">
        <button
          className="px-4 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-100 transition-colors"
          onClick={() => togglePopup("register")}
        >
          Register
        </button>
        <button
          className="px-4 py-2 bg-white text-purple-600 rounded-md hover:bg-purple-100 transition-colors"
          onClick={() => togglePopup("login")}
        >
          Login
        </button>
        <a
          href="/add-property"
          className="group inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          <PlusSquare size={16} className="mr-2" />
          Add Property
          <span className="ml-1 text-xs bg-white px-1 rounded">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
              FREE
            </span>
          </span>
        </a>
      </div>

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
                Sign Up to create a new one
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
              <form className="space-y-4" onSubmit={handleLogin}>
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
                    <input
                      type="text"
                      id="email"
                      value={loginCreds.name}
                      onChange={(e) =>
                        setLoginCreds({
                          ...loginCreds,
                          name: e.target.value,
                        })
                      }
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
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
                    <input
                      type="password"
                      id="password"
                      value={loginCreds.password}
                      onChange={(e) =>
                        setLoginCreds({
                          ...loginCreds,
                          password: e.target.value,
                        })
                      }
                      className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Sign in
                </button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleRegister}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 p-2 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={registerCreds.fullName}
                      onChange={(e) =>
                        setRegisterCreds({
                          ...registerCreds,
                          fullName: e.target.value,
                        })
                      }
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
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
                    <input
                      type="email"
                      id="email"
                      value={registerCreds.email}
                      onChange={(e) =>
                        setRegisterCreds({
                          ...registerCreds,
                          email: e.target.value,
                        })
                      }
                      className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1 p-2 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={registerCreds.phone}
                    onChange={(e) =>
                      setRegisterCreds({ ...registerCreds, phone: e.target.value })
                    }
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="1234567890"
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
                    <input
                      type="password"
                      id="password"
                      value={registerCreds.password}
                      onChange={(e) =>
                        setRegisterCreds({
                          ...registerCreds,
                          password: e.target.value,
                        })
                      }
                      className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="relative">
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Select Your Role
                      </span>
                    </div>
                      <div className="w-full border-t border-gray-300 mt-2"></div>
                    <div className="flex justify-around mt-2">
                      {/* Option 1 */}
                      <div className="mb-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="ROLE_AGENT"
                            checked={registerCreds.role === "ROLE_AGENT"}
                            onChange={(e) =>
                              setRegisterCreds({
                                ...registerCreds,
                                role: e.target.value,
                              })
                            }
                            className="form-radio h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">Agent</span>
                        </label>
                      </div>

                      {/* Option 2 */}
                      <div className="mb-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="ROLE_RESALER"
                            checked={registerCreds.role === "ROLE_RESALER"}
                            onChange={(e) =>
                              setRegisterCreds({
                                ...registerCreds,
                                role: e.target.value,
                              })
                            }
                            className="form-radio h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">Resaler</span>
                        </label>
                      </div>

                      {/* Option 3 */}
                      <div className="mb-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            value="ROLE_USER"
                            checked={registerCreds.role === "ROLE_USER"}
                            onChange={(e) =>
                              setRegisterCreds({
                                ...registerCreds,
                                role: e.target.value,
                              })
                            }
                            className="form-radio h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">User</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
