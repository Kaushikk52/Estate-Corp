import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function AboutPage() {
  useEffect(() => {
    new Swiper('.swiper-container', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
    });
  }, []);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=1080&width=1920')"}}></div>
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            More Than Just Real Estate,<br />We Build Dreams
          </motion.h1>
          <motion.p 
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We've been helping people find their dream homes for over 20 years.
          </motion.p>
          <motion.button 
            className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore Properties
          </motion.button>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Legacy of Building Dreams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '300+', label: 'Happy Families' },
              { number: '60K+', label: 'Properties Sold' },
              { number: '99%', label: 'Customer Satisfaction' },
              { number: '70K+', label: 'Site Visitors Monthly' },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div key={index} className="swiper-slide">
                  <motion.div 
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={`/placeholder.svg?height=200&width=300`} alt="Property" className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">Beautiful Home {index + 1}</h3>
                      <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Stress-Free Steps to Your Dream Home</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Dream & Discover', description: 'Tell us about your dream home and let us find the perfect match.' },
              { step: '02', title: 'Pre-Approval', description: 'Get pre-approved for a mortgage to know your budget.' },
              { step: '03', title: 'Schedule Viewings', description: 'Well arrange viewings of properties that match your criteria.' },
              { step: '04', title: 'Offer & Negotiation', description: 'Well help you make a competitive offer and negotiate terms.' },
              { step: '05', title: 'Secure Your Dream', description: 'Well guide you through the closing process.' },
              { step: '06', title: 'Welcome Home!', description: 'Move in and start your new chapter in your dream home.' },
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-blue-500 font-bold text-xl mb-2">{item.step}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DreamHouse?</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src="/placeholder.svg?height=400&width=600" alt="Beautiful Home" className="rounded-lg shadow-lg" />
            </motion.div>
            <div className="lg:w-1/2">
              {[
                { title: 'Strategic Location', description: 'We offer properties in prime locations for the best value and lifestyle.' },
                { title: 'Modern Design', description: 'Our properties feature contemporary designs and cutting-edge amenities.' },
                { title: 'Guaranteed Security', description: 'We ensure all legal aspects are covered for a worry-free purchase.' },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Dream Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'John Smith', role: 'CEO', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Jane Doe', role: 'Lead Agent', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Mike Johnson', role: 'Financial Advisor', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Emily Brown', role: 'Interior Designer', image: '/placeholder.svg?height=300&width=300' },
              { name: 'David Lee', role: 'Marketing Specialist', image: '/placeholder.svg?height=300&width=300' },
              { name: 'Sarah Wilson', role: 'Customer Relations', image: '/placeholder.svg?height=300&width=300' },
            ].map((member, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Options Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Your Options</h2>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {[
                { type: 'Downtown Residences', price: '$500,000', image: '/placeholder.svg?height=200&width=300' },
                { type: 'Family-Friendly Villas', price: '$650,000', image: '/placeholder.svg?height=200&width=300' },
                { type: 'Beachfront Condominiums', price: '$800,000', image: '/placeholder.svg?height=200&width=300' },
                { type: 'Suburban Homes', price: '$350,000', image: '/placeholder.svg?height=200&width=300' },
                { type: 'Mountain Retreats', price: '$450,000', image: '/placeholder.svg?height=200&width=300' },
                { type: 'Urban Lofts', price: '$400,000', image: '/placeholder.svg?height=200&width=300' },
              ].map((property, index) => (
                <div key={index} className="swiper-slide">
                  <motion.div 
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img src={property.image} alt={property.type} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{property.type}</h3>
                      <p className="text-gray-600">Starting from {property.price}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=600&width=1200')"}}></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Your Dream Home Faster</h2>
          <p className="text-xl mb-8">Let us guide you through the journey of finding your perfect home.</p>
          <button className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

