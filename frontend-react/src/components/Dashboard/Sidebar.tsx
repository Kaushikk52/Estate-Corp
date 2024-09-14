import React from "react"
import { useState }from "react"
import { Home, LayoutDashboard, Settings, ShoppingCart, Users, Menu, User } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "Products", href: "/products" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`flex flex-col h-screen bg-white text-gray-800 border-r transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}>
      <div className="p-4">
        <button
          className="text-gray-800 hover:bg-gray-100 p-2 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
      </div>
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 ${!isOpen && "justify-center"}`}>
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && <span className="ml-2">{item.label}</span>}
                {!isOpen && <span className="sr-only">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full ${!isOpen && "justify-center"}`}>
          <User className="h-5 w-5 flex-shrink-0" />
          {isOpen && <span className="ml-2">Account</span>}
          {!isOpen && <span className="sr-only">Account</span>}
        </button>
      </div>
    </div>
  )
}