import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
  Menu,
  User,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Products", href: "/products" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function SidebarNavigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  async function handleLogout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white text-gray-800 border-r transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      } ${isMobile ? "w-16" : ""}`}
    >
      <div className="p-4">
        <button
          className={`text-gray-800 hover:bg-gray-100 p-2 rounded-md ${isMobile ? "hidden" : ""}`}
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 ${
                  (!isOpen || isMobile) && "justify-center"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && !isMobile && <span className="ml-2">{item.label}</span>}
                {(!isOpen || isMobile) && <span className="sr-only">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 space-y-2">
        <button
          onClick={handleLogout}
          className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full ${
            (!isOpen || isMobile) && "justify-center"
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isOpen && !isMobile && <span className="ml-2">Logout</span>}
          {(!isOpen || isMobile) && <span className="sr-only">Logout</span>}
        </button>
        <button
          className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full ${
            (!isOpen || isMobile) && "justify-center"
          }`}
        >
          <User className="h-5 w-5 flex-shrink-0" />
          {isOpen && !isMobile && <span className="ml-2">Account</span>}
          {(!isOpen || isMobile) && <span className="sr-only">Account</span>}
        </button>
      </div>
    </div>
  );
}