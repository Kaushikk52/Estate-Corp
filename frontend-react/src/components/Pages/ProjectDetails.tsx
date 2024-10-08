import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { MapPin, Calendar, Home, Users, Maximize2, DollarSign, Phone, Mail, ChevronRight, X, ChevronLeft } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'

const projectData = {
  name: "Skyline Residences",
  location: "Downtown Metro City",
  completion: "Q4 2024",
  completionPercentage: 75,
  totalUnits: 120,
  description: "Skyline Residences is a luxurious residential project offering breathtaking views of the city skyline. With its prime location in Downtown Metro City, residents will enjoy easy access to shopping, dining, and entertainment options. The project features modern amenities including a rooftop pool, fitness center, and 24/7 concierge service.",
  floorPlans: [
    { id: 1, name: "Studio Apartment", size: "500 sq ft", bedrooms: 0, bathrooms: 1, price: 250000 },
    { id: 2, name: "One Bedroom", size: "750 sq ft", bedrooms: 1, bathrooms: 1, price: 350000 },
    { id: 3, name: "Two Bedroom", size: "1000 sq ft", bedrooms: 2, bathrooms: 2, price: 500000 },
    { id: 4, name: "Penthouse Suite", size: "2000 sq ft", bedrooms: 3, bathrooms: 3, price: 1000000 },
  ],
  amenities: ["Rooftop Pool", "Fitness Center", "24/7 Concierge", "Underground Parking", "Pet-friendly", "Smart Home Technology"],
  gallery: [
    "/placeholder.svg?height=400&width=600&text=Project+Image+1",
    "/placeholder.svg?height=400&width=600&text=Project+Image+2",
    "/placeholder.svg?height=400&width=600&text=Project+Image+3",
    "/placeholder.svg?height=400&width=600&text=Project+Image+4",
  ]
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  message: Yup.string().required('Message is required'),
})

export default function ProjectDetails() {
  const [selectedPlan, setSelectedPlan] = useState(projectData.floorPlans[0])
  const [showContactForm, setShowContactForm] = useState(false)

  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

  const overviewRef = useRef(null)
  const floorPlansRef = useRef(null)
  const amenitiesRef = useRef(null)
  const galleryRef = useRef(null)

  const handleSubmit = (values:any, { setSubmitting, resetForm }: FormikHelpers<any>) => {
    console.log(values)
    setSubmitting(false)
    resetForm()
    setShowContactForm(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const header = document.getElementById('sticky-header')
      if (header) {
        if (scrollPosition > 100) {
          header.classList.add('bg-white', 'shadow-md')
        } else {
          header.classList.remove('bg-white', 'shadow-md')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (ref:any) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Listings
        </Link>

      <motion.div 
        style={{ opacity: headerOpacity }}
        className="h-16"  // Spacer for fixed header
      />
      

      <motion.div className="relative h-[50vh] overflow-hidden">
        <motion.img
          src="/placeholder.svg?height=800&width=1200&text=Skyline+Residences"
          alt={projectData.name}
          className="w-full h-full object-cover"
          style={{ scale: imageScale }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white text-center">{projectData.name}</h1>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={overviewRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Project Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">{projectData.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{projectData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Completion: {projectData.completion}</span>
                </div>
                <div className="flex items-center">
                  <Home className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{projectData.totalUnits} Units</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Studio to 3BR</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Progress</h3>
              <div className="bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className="bg-blue-600 rounded-full h-4 transition-all duration-1000 ease-out"
                  style={{ width: `${projectData.completionPercentage}%` }}
                />
              </div>
              <p className="text-center font-semibold">{projectData.completionPercentage}% Complete</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={floorPlansRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Floor Plans</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {projectData.floorPlans.map((plan) => (
              <motion.div
                key={plan.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPlan.id === plan.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.size}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            key={selectedPlan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <img
                src={`/placeholder.svg?height=300&width=500&text=Floor+Plan+${selectedPlan.id}`}
                alt={selectedPlan.name}
                className="w-full rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold mb-4">{selectedPlan.name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Maximize2 className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{selectedPlan.size}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{selectedPlan.bedrooms} Bedroom{selectedPlan.bedrooms !== 1 && 's'}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    <span>{selectedPlan.bathrooms} Bathroom{selectedPlan.bathrooms !== 1 && 's'}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                    <span>${selectedPlan.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          ref={amenitiesRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {projectData.amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="flex items-center p-3 bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {amenity}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-lg overflow-hidden p-6 mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Project Gallery</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {projectData.gallery.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Project Image ${index + 1}`} className="w-full h-64 object-cover rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center"
          onClick={() => setShowContactForm(true)}
        >
          <Mail className="w-5 h-5 mr-2" />
          
          Contact Us
        </motion.button>
      </motion.div>

      {showContactForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="bg-white rounded-lg p-8 max-w-md w-full relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowContactForm(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <Formik
              initialValues={{ name: '', email: '', phone: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <Field name="name" type="text" placeholder="Name" className="w-full p-2 border rounded" />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <Field name="email" type="email" placeholder="Email" className="w-full p-2 border rounded" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <Field name="phone" type="tel" placeholder="Phone" className="w-full p-2 border rounded" />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <Field
                      name="message"
                      as="textarea"
                      rows="4"
                      placeholder="I'm interested in learning more about Skyline Residences..."
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                  >
                    Send Inquiry
                  </motion.button>
                </Form>
              )}
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}