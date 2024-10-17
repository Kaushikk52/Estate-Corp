import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, HelpCircle, MapPin, Phone, Mail, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const cardVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message, agreeTerms })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-center mb-2"
          variants={itemVariants}
        >
          Contact our friendly team
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-12"
          variants={itemVariants}
        >
          Let us know how we can help.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300"
            variants={cardVariants}
            whileHover="hover"
          >
            <MessageCircle className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Chat to sales</h3>
            <p className="text-gray-600 mb-4">Speak to our friendly team.</p>
            <a href="#" className="text-blue-600 hover:underline">sales@untitledui.com</a>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300"
            variants={cardVariants}
            whileHover="hover"
          >
            <HelpCircle className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Chat to support</h3>
            <p className="text-gray-600 mb-4">We're here to help.</p>
            <a href="#" className="text-blue-600 hover:underline">support@untitledui.com</a>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300"
            variants={cardVariants}
            whileHover="hover"
          >
            <MapPin className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Visit us</h3>
            <p className="text-gray-600 mb-4">Visit our office HQ.</p>
            <a href="#" className="text-blue-600 hover:underline">View on Google Maps</a>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300"
            variants={cardVariants}
            whileHover="hover"
          >
            <Phone className="w-6 h-6 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Call us</h3>
            <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm.</p>
            <a href="tel:+1(555)000-0000" className="text-blue-600 hover:underline">+1 (555) 000-0000</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          variants={containerVariants}
        >
          <div className="p-8">
            <motion.h2
              className="text-3xl font-bold mb-2"
              variants={itemVariants}
            >
              Get in touch with us
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-8"
              variants={itemVariants}
            >
              Fill out the form below or schedule a meeting with us at your convenience.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.form onSubmit={handleSubmit} className="space-y-4" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">NAME</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Email"
                    required
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Your Message"
                    required
                  ></textarea>
                </motion.div>
                <motion.div className="flex items-center" variants={itemVariants}>
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I agree with <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
                  </label>
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Your Request
                </motion.button>
              </motion.form>

              <motion.div className="space-y-8" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-4">With our services you can</h3>
                  <ul className="space-y-2">
                    {['Improve usability of your product', 'Engage users at a higher level and outperform your competition', 'Reduce the onboarding time and improve sales', 'Balance user needs with your business goal'].map((item, index) => (
                      <motion.li key={index} className="flex items-center" variants={itemVariants}>
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-4">USA</h3>
                  <p className="text-gray-600">280 W, 17th Street, 4th floor,<br />Flat no: 407<br />New York, NY, 10018</p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold mb-4">India</h3>
                  <p className="text-gray-600">Plot No 8-2-401/r/15ms,<br />Banjara Hills,Road No 10<br />Hyderabad, 500034</p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="bg-gray-100 px-8 py-4"
            variants={itemVariants}
          >
            <h3 className="font-semibold mb-2">You can also Contact Us via</h3>
            <div className="flex items-center space-x-4">
              <a href="mailto:contact.growthux@gmail.com" className="flex items-center text-gray-600 hover:text-blue-600">
                <Mail className="w-5 h-5 mr-2" />
                contact.growthux@gmail.com
              </a>
              <a href="tel:+917648999213" className="flex items-center text-gray-600 hover:text-blue-600">
                <Phone className="w-5 h-5 mr-2" />
                +91 7648999213
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}