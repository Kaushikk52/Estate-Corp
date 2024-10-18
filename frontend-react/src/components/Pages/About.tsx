import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FeaturedCardsCarousel from '../Cards/featuredCards';
import Testimonials from '../testimonials';
import Carousel from '../Carousel';

export default function AboutPage() {

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <Carousel/>

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
      <FeaturedCardsCarousel/>

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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img src="/carousel.webp" alt="Beautiful Home" className="rounded-lg shadow-lg" />
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
      <Testimonials />

      {/* Property Options Section */}

    </div>
  );
};

