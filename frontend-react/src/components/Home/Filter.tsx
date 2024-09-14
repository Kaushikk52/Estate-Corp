import React, { useState } from 'react'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Component() {
  const [madeBy, setMadeBy] = useState('Wood')
  const [selectType, setSelectType] = useState('Sofa')
  const [price, setPrice] = useState('$129 - $359')

  const titleWords = [
    ["FIND", "YOUR", "HOME"],
    ["SUITABLE", "TO", "YOUR", "NEEDS"]
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="max-w-6xl mx-auto mt-5">
      <div className="relative h-[400px] mb-6 rounded-xl overflow-hidden bg-[#d0d9e6]">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Modern furniture" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            className="text-6xl font-bold text-white text-center leading-tight drop-shadow-lg text-opacity-80"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {titleWords.map((line, lineIndex) => (
              <motion.div key={lineIndex} className="mb-2">
                {line.map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    variants={wordVariants}
                    className="inline-block mr-4"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            ))}
          </motion.h1>
        </div>
      </div>
      <div className="bg-blue-600 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="madeBy" className="block text-sm font-medium text-white mb-1">
              Made By
            </label>
            <div className="relative">
              <select
                id="madeBy"
                value={madeBy}
                onChange={(e) => setMadeBy(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-16 text-sm appearance-none"
              >
                <option>Wood</option>
                <option>Metal</option>
                <option>Plastic</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <PlusIcon className="h-4 w-4 text-gray-400 mr-1" />
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="selectType" className="block text-sm font-medium text-white mb-1">
              Select Type
            </label>
            <div className="relative">
              <select
                id="selectType"
                value={selectType}
                onChange={(e) => setSelectType(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-16 text-sm appearance-none"
              >
                <option>Sofa</option>
                <option>Chair</option>
                <option>Table</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <PlusIcon className="h-4 w-4 text-gray-400 mr-1" />
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="price" className="block text-sm font-medium text-white mb-1">
              Price
            </label>
            <div className="relative">
              <select
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-16 text-sm appearance-none"
              >
                <option>$129 - $359</option>
                <option>$360 - $599</option>
                <option>$600+</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <PlusIcon className="h-4 w-4 text-gray-400 mr-1" />
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <button
            className="bg-gray-800 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200 flex-shrink-0 self-end"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}