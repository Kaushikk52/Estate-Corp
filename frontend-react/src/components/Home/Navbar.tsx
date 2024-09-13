import React, { useState } from 'react'
import { Search, User, Menu, X } from 'lucide-react'

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="group relative text-sm text-gray-600 hover:text-gray-800">
    {children}
    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-gray-800 transition-all duration-300 group-hover:w-full"></span>
  </a>
)

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="p-4">
      <nav className="relative flex items-center justify-between py-4 px-6 bg-[#d1f8f3] rounded-full">
        <div className="flex items-center space-x-6">
          <button 
            className="text-gray-600 hover:text-gray-800 md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <a href="/" className="text-xl font-semibold text-gray-800 uppercase">
            Estate-corp
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <NavLink href="/shop"><p className='text-base font-semibold text-gray-800'>Shop</p></NavLink>
          <NavLink href="/collections"><p className='text-base font-semibold text-gray-800'>Collections</p></NavLink>
          <NavLink href="/about"><p className='text-base font-semibold text-gray-800'>About</p></NavLink>
          <NavLink href="/contact"><p className='text-base font-semibold text-gray-800'>Contact</p></NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <Search size={20} />
            <span className="sr-only">Search</span>
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <User size={20} />
            <span className="sr-only">Account</span>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute left-4 right-4 mt-2 py-2 bg-white shadow-lg rounded-lg">
          <a href="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Shop
          </a>
          <a href="/collections" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Collections
          </a>
          <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            About
          </a>
          <a href="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Contact
          </a>
        </div>
      )}
    </div>
  )
}