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
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-white">
      <div className="relative">
        <img
          src="/carousel.webp"
          alt="Luxury real estate complex"
          className="w-full h-[300px] object-cover rounded-b-[40px]"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white px-8 py-2 rounded-full shadow-lg">
          <h1 className="text-3xl font-semibold">
            Get to Know <span className="text-blue-500">Us</span>
          </h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-semibold mb-4">
              A little bit about<br />
              <span className="text-blue-500">Estate Corp</span>
            </h2>
            <button onClick={()=> navigate("/contact-us")}
             className="bg-white text-blue-500 border border-blue-500 px-6 py-2 rounded-full flex items-center hover:bg-blue-50 transition duration-300">
              Contact us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-4">Your local & loyal agent</h3>
            <p className="mb-4">
            At Estatecorp , our story is one of passion, dedication, and a relentless pursuit of excellence in the real estate industry. Founded by a group of seasoned professionals with diverse backgrounds and expertise, our agency was born out of a shared vision to redefine the real estate experience for our clients.

Our journey began with a simple yet powerful idea: to create a real estate agency that prioritizes integrity, transparency, and client satisfaction above all else. We recognized the need for a personalized approach to real estate—one that puts the needs and goals of our clients front and center. With this vision in mind, we set out to build a team of dedicated professionals who share our values and commitment to excellence.

From the very beginning, we set ourselves apart by focusing on building meaningful relationships with our clients. We understand that buying, selling, or renting a property is not just a transaction—it’s a significant milestone in our clients’ lives. That’s why we take the time to listen, understand, and tailor our services to meet the unique needs and objectives of each individual client.
            </p>
            <p>
              The RealEstate Place is more than just a real estate agency; we're your
              trusted partners in making your real estate dreams a reality. Discover the
              difference of working with a team that's as passionate about your goals as
              you are. Welcome to The RealEstate Place, where your local and loyal agent
              is always here to serve you.
            </p>
          </div>
        </div>
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

