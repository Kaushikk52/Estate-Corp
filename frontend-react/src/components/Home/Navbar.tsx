import React, { useState,useEffect} from "react";
import {useNavigate } from 'react-router-dom';
import { Search, User, Menu, X, ChevronDown, PlusSquare } from "lucide-react";
import AuthPopup from "./AuthPopup";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="group relative text-base font-semibold text-gray-800 hover:text-gray-900"
  >
    {children}
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const DropdownLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
  >
    {children}
  </a>
);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResidentialsOpen, setIsResidentialsOpen] = useState(false);
  const [isCommercialsOpen, setIsCommercialsOpen] = useState(false);
  const [toggle,setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setToggle(false);
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleResidentials = () => {
    setIsResidentialsOpen(!isResidentialsOpen);
    if (isCommercialsOpen) setIsCommercialsOpen(false);
  };

  const toggleCommercials = () => {
    setIsCommercialsOpen(!isCommercialsOpen);
    if (isResidentialsOpen) setIsResidentialsOpen(false);
  };

  const checkIfLogin = () => {
    const token = localStorage.getItem('token')
    if(token !== null && toggle === false){//user logged in and no popup
      navigate('/dashboard/add-property')
    }else if(token !== null && toggle === true){//user logged in and still popup
      setToggle(false);
    }else if(token === null){//user not logged in 
      setToggle(true);
    }
  }

  return (
    <div className="relative nav">
      <nav className="w-full bg-[#fff] py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              className="text-gray-600 hover:text-gray-800 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a
              href="/"
              className="text-xl font-semibold text-gray-800 uppercase flex items-center"
            >
              <img
                src="/Estatecorp-logo.png"
                alt="Logo"
                height={70}
                width={70}
              />
              Estatecorp
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/">Home</NavLink>
            <div className="relative group">
              <button className="group relative text-base font-semibold text-gray-800 hover:text-gray-900 focus:outline-none">
                Residential
                <ChevronDown
                  size={16}
                  className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180"
                />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <DropdownLink href="/residential/rent">Rent</DropdownLink>
                <DropdownLink href="/residential/buy">Buy</DropdownLink>
              </div>
            </div>
            <div className="relative group">
              <button className="group relative text-base font-semibold text-gray-800 hover:text-gray-900 focus:outline-none">
                Commercial
                <ChevronDown
                  size={16}
                  className="ml-1 inline-block transition-transform duration-200 group-hover:rotate-180"
                />
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <DropdownLink href="/commercial/rent">Rent</DropdownLink>
                <DropdownLink href="/commercial/buy">Buy</DropdownLink>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer">
            <a onClick={() => navigate('/dashboard/main')}>
              <User size={20} />
            </a>

            <AuthPopup popup={toggle} />
            
            <div className="space-x-4">
              <button
                className="group inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={() => checkIfLogin()}
              >
                <PlusSquare size={16} className="mr-2" />
                Add Property
                <span className="ml-1 text-xs bg-white px-1 rounded">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
                    FREE
                  </span>
                </span>
              </button>
            </div>

            {/* <button
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              aria-label="Account"
            >
              <a href="/dashboard">
                <User size={20} />
              </a>
            </button> */}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg z-40">
          <div className="py-2">
            <a
              href="/"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Home
            </a>
            <button
              onClick={toggleResidentials}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Residential
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isResidentialsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isResidentialsOpen && (
              <div className="bg-gray-50 py-2">
                <a
                  href="/residential/rent"
                  className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Rent
                </a>
                <a
                  href="/residential/buy"
                  className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Buy
                </a>
              </div>
            )}
            <button
              onClick={toggleCommercials}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Commercial
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isCommercialsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCommercialsOpen && (
              <div className="bg-gray-50 py-2">
                <a
                  href="/commercial/rent"
                  className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Rent
                </a>
                <a
                  href="/commercial/buy"
                  className="block px-8 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Buy
                </a>
              </div>
            )}
            <button
                className="group inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold text-sm rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={() => checkIfLogin()}
              >
                <PlusSquare size={16} className="mr-2" />
                Add Property
                <span className="ml-1 text-xs bg-white px-1 rounded">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
                    FREE
                  </span>
                </span>
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
