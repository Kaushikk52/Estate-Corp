import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ChevronDown,
  PlusSquare,
  Menu,
  X,
  Building,
  Briefcase,
} from "lucide-react";
import AuthPopup from "./Auth/AuthPopup";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    to={href}
    className="group relative text-base font-semibold text-gray-800 hover:text-gray-900"
  >
    {children}
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const DropdownLink = ({
  href,
  title,
  description,
  onClick,
}: {
  href: string;
  title: string;
  description: string;
  onClick?: () => void;
}) => (
  <Link
    to={href}
    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    onClick={onClick}
  >
    <div className="font-semibold">{title}</div>
    <p className="text-sm text-gray-500">{description}</p>
  </Link>
);

export default function Navbar() {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    "properties" | "projects"
  >("properties");
  const [toggle, setToggle] = useState(false);
  const [navigateTo, setNavigateTo] = useState("");
  const navigate = useNavigate();

  const [mobileDropdowns, setMobileDropdowns] = useState({
    explore: false,
    properties: false,
    projects: false,
  });

  useEffect(()=>{
    setToggle(false);
  });

  const checkIfLogin = (route:string) => {
    console.log("checking...",toggle);
    const token = localStorage.getItem('token')
    setNavigateTo(route)
    if(token !== null && toggle === false){//user logged in and no popup
      navigate(route)
    }else if(token !== null && toggle === true){//user logged in and still popup
      setToggle(false);
    }else if(token === null){//user not logged in 
      setToggle(true);
    }
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 },
  };

  const toggleMobileDropdown = (
    category: "explore" | "properties" | "projects"
  ) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [category]: !prev[category],
      ...(category !== "explore" && {
        properties: category === "properties" ? !prev.properties : false,
        projects: category === "projects" ? !prev.projects : false,
      }),
    }));
  };

  return (
    <nav className="w-full bg-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            className="text-gray-600 hover:text-gray-800 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link
            to="/"
            className="text-xl font-semibold text-gray-800 uppercase flex items-center"
          >
            <img src="/Estatecorp-logo.png" alt="Logo" height={70} width={70} />
            <span className="phone-non"> Estatecorp</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/">Home</NavLink>
          <div
            className="relative group"
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <button className="group relative text-base font-semibold text-gray-800 hover:text-gray-900 focus:outline-none">
              Explore
              <ChevronDown
                size={16}
                className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180"
              />
              <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-2 w-screen max-w-3xl bg-white rounded-md shadow-lg py-1 z-10"
                >
                  <div className="flex">
                    <div className="w-1/3 bg-gray-50 p-4 h-full">
                      <button
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                          selectedCategory === "properties"
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory("properties")}
                      >
                        <div className="font-semibold flex items-center">
                          <Building className="mr-2" size={18} />
                          Properties
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Explore residential and commercial properties
                        </p>
                      </button>
                      <button
                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                          selectedCategory === "projects"
                            ? "bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory("projects")}
                      >
                        <div className="font-semibold flex items-center">
                          <Briefcase className="mr-2" size={18} />
                          Projects
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Discover upcoming and ongoing real estate projects
                        </p>
                      </button>
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-semibold mb-4">
                        {selectedCategory === "properties"
                          ? "Properties"
                          : "Projects"}
                      </h3>
                      <div className="grid gap-4">
                        <DropdownLink
                          href={`/${selectedCategory}/rent`}
                          title="Rent"
                          description={`Find ${selectedCategory} available for rent`}
                        />
                        <DropdownLink
                          href={`/${selectedCategory}/buy`}
                          title="Buy"
                          description={`Discover ${selectedCategory} for sale`}
                        />
                        {selectedCategory === "properties" ? (
                          <>
                            <DropdownLink
                              href="/properties/commercial"
                              title="Commercial"
                              description="Explore commercial real estate options"
                            />
                            <DropdownLink
                              href="/properties/residential"
                              title="Residential"
                              description="Find your perfect home"
                            />
                          </>
                        ) : (
                          <>
                            <DropdownLink
                              href="/projects/upcoming"
                              title="Upcoming"
                              description="Get early access to future developments"
                            />
                            <DropdownLink
                              href="/projects/ongoing"
                              title="Ongoing"
                              description="Invest in projects under construction"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer">
          <button onClick={() => checkIfLogin("/dashboard/main")}>
            <User size={20} />
          </button>

          <AuthPopup popup={toggle} navigateTo={navigateTo} />

          <div className="space-x-4">
            <button
              className="group inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
              onClick={() => checkIfLogin("/dashboard/add-property")}
            >
              <PlusSquare size={16} className="mr-2" />
              <span className="phone-non"> Add </span>Property
              <span className="ml-1 text-xs bg-white px-1 rounded">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
                  FREE
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <Link
                to="/"
                className="text-xl font-semibold text-gray-800 uppercase flex items-center"
              >
                <img
                  src="/Estatecorp-logo.png"
                  alt="Logo"
                  height={70}
                  width={70}
                />
                <span className="ml-2">Estatecorp</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <Link
                to="/"
                className="block py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="mt-4">
                <button
                  onClick={() => toggleMobileDropdown("explore")}
                  className="flex items-center justify-between w-full py-2 text-lg font-semibold text-gray-800 hover:text-gray-600"
                >
                  <span>Explore</span>
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${
                      mobileDropdowns.explore ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileDropdowns.explore && (
                  <div className="mt-2 space-y-4">
                    {["properties", "projects"].map((category) => (
                      <div key={category}>
                        <button
                          onClick={() =>
                            toggleMobileDropdown(
                              category as "properties" | "projects"
                            )
                          }
                          className="flex items-center justify-between w-full py-2 text-gray-800 hover:text-gray-600"
                        >
                          <span className="font-semibold capitalize">
                            {category}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              mobileDropdowns[
                                category as keyof typeof mobileDropdowns
                              ]
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {mobileDropdowns[
                          category as keyof typeof mobileDropdowns
                        ] && (
                          <div className="mt-2 grid grid-cols-2 gap-2">
                            <DropdownLink
                              href={`/${category}/rent`}
                              title="Rent"
                              description={`Find ${category} available for rent`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                            <DropdownLink
                              href={`/${category}/buy`}
                              title="Buy"
                              description={`Discover ${category} for sale`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            />
                            {category === "properties" ? (
                              <>
                                <DropdownLink
                                  href="/properties/commercial"
                                  title="Commercial"
                                  description="Explore commercial real estate options"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                />
                                <DropdownLink
                                  href="/properties/residential"
                                  title="Residential"
                                  description="Find your perfect home"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                />
                              </>
                            ) : (
                              <>
                                <DropdownLink
                                  href="/projects/upcoming"
                                  title="Upcoming"
                                  description="Get early access to future developments"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                />
                                <DropdownLink
                                  href="/projects/ongoing"
                                  title="Ongoing"
                                  description="Invest in projects under construction"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
