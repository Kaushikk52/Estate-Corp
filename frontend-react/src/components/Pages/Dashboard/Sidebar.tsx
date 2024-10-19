import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Users,
  Menu,
  User,
  LogOut,
  Building2
} from "lucide-react";
import axios from "axios";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/main" },
  { icon: Building2, label: "Projects", href: "/dashboard/add-project" },
  { icon: Users, label: "Users", href: `users` },
];

export default function SidebarNavigation() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    userId: "",
    role: "",
  });

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${baseURL}/v1/api/users/getCurrentUser`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 200) {
        setCurrentUser({
          userId: response.data.userId,
          role: response.data.role,
        });
      }
    } catch (err: any) {
      console.log("An error occured : ", err);
      if (err.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getCurrentUser();
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
        {currentUser.role == "ROLE_ADMIN"?
        <ul className="space-y-2 p-4">
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
        : <ul className="space-y-2 p-4">
        {navItems.slice(0,2).map((item, index) => (
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

        }
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
        <Link to={`/user/${currentUser.userId}`}
          className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full ${
            (!isOpen || isMobile) && "justify-center"
          }`}
        >
          <User className="h-5 w-5 flex-shrink-0" />
          {isOpen && !isMobile && <span className="ml-2">Account</span>}
          {(!isOpen || isMobile) && <span className="sr-only">Account</span>}
        </Link>
      </div>
    </div>
  );
}