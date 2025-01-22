import React from 'react';
import { Facebook, Twitter, Instagram,MapPin,Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Contact Us Section */}
        <div className="max-w-6xl mx-auto bg-blue-600 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
                <ul>
                    <li><h2 className="text-2xl font-bold mb-4 md:mb-0">Get in Touch</h2></li>
                    <li><p className="text-base font-bold mb-4 md:mb-0">We work with clients from all over India</p></li>
                </ul>
            </div> 
            <a 
              href="/contact-us" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition duration-300 ease-in-out"
            >
              Go to Contact Page
            </a>
          </div>
        </div>

        {/* About, Resources, Company Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
            We're a trusted real estate firm, dedicated to helping you find your dream home.
             With expertise and integrity, we make your real estate dreams a reality. 
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex gap-2 items-center"><MapPin size={35}/>A-2,Solitaire Height,Next to Dwarka Hotel,Shimpoli,Borivali-W,Mumbai-92</a></li>
              <li><a href="#" className="flex gap-2 items-center"><Mail size={20}/>iestatecorp@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about-us" className="hover-underline-animation">About Us</a></li>
              <li><a href="#" className="hover-underline-animation">Blogs</a></li>
              <li><a href="/contact-us" className="hover-underline-animation">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <div>
                <ul>
                    <li><h2 className="text-base font-bold mb-4 md:mb-0">Estatecorp Maharera No.</h2></li>
                    <li><h2 className="text-base font-bold mb-4 md:mb-3">A51800045375</h2></li>
                    <li><p className="text-sm mb-4 md:mb-0">&copy; 2023 Your Company. All rights reserved.</p></li>
                </ul>
            </div> 
          
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
