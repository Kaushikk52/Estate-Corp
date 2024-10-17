import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Mr. Rakesh Gaykar', role: 'Founder', image: '/founder1.webp'},
  { name: 'Mr. Ajay Singh Kushwah', role: 'Co-Founder', image: '/founder2.webp' },
  { name: 'Mr. Prem Dubey', role: 'Business Associate', image: '/founder3.webp' },
];

export default function TeamCards() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
          We are a dynamic team of innovative minds ready to bring your dream project to life. With our creativity and expertise, we'll turn your vision into reality.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="relative h-80">
                <img 
                  className="w-full h-full object-cover object-center"
                  src={member.image} 
                  alt={member.name} 
                />
                <div className="w-5/6 absolute bottom-2 left-4 right-4 bg-white bg-opacity-90 p-2 rounded-lg text-center">
                  <h3 className="text-medium font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}