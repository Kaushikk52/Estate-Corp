import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import User from '../../Models/User';
import { useParams } from 'react-router-dom';
import FeaturedCards from '../Cards/featuredCards'
import ProjectCards from '../Cards/ProjectCards'

const formatCurrency = (amount: number, unit: string) => {
  return `${amount} ${unit}`;
};

interface TabContentProps {
  children: React.ReactNode;
  isSelected: boolean;
}

const TabContent: React.FC<TabContentProps> = ({ children, isSelected }) => (
  <AnimatePresence>
    {isSelected && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Profile() {
  const baseURL = import.meta.env.VITE_APP_BACKEND_BASE_URL;
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const getUserById = async (id:any) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}/v1/api/users/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserById(id);
  }, []);

  if (!data) return ( <div className="text-center mt-8">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    <p className="mt-2 text-blue-600">Loading profile...</p>
  </div>);

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">{data.role.slice(5,)} PROFILE</h2>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{data.fullName}</h2>
            <p className="text-sm text-gray-500">{data.email}</p>
            <p className="text-sm text-gray-500">{data.phone}</p>
          </div>
        </div>
      </motion.div>

      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-semibold ${activeTab === 'projects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`py-2 px-4 font-semibold ${activeTab === 'properties' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </button>
        </div>
      </div>

      <TabContent isSelected={activeTab === 'projects'}>
        <div className="">
         <ProjectCards projects={data.projects} />
        </div>
      </TabContent>

      <TabContent isSelected={activeTab === 'properties'}>
        <div className="">
          <FeaturedCards properties={data.properties} />
        </div>
      </TabContent>
    </div>
  );
}