import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function AddPropertyLayout() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    propertyVariant: "",
    subVariant: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    floorNo: "",
    city: "",
    facing: "",
    carpetArea: "",
    availability: "",
    rentOrSell: "",
    rent: "",
    price: "",
    furnishedStatus: "",
    images: [] as File[],
    amenities:[""],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...Array.from(e.target.files || [])] }))
    }
  }

  const handleCheckboxChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }))
  }

  const handleNext = () => {
    if (step < 4) setStep((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    toast.success('Form submitted successfully!', {
      position: 'bottom-right',
      duration: 3000,
    })
  }

  const steps = ["General", "Details", "Images", "Amenities"]

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add Property</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill in the details of your property
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          {steps.map((s, index) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index + 1 <= step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                } font-bold text-lg transition-colors duration-300`}>
                  {index + 1}
                </div>
                <div className="mt-2 text-xs font-medium text-gray-500">{s}</div>
              </div>
              {index < steps.length - 1 && (
                <motion.div 
                  className="flex-1 h-px bg-gray-300 mx-4 relative"
                  initial={{ background: "repeating-linear-gradient(to right, #CBD5E0 0%, #CBD5E0 50%, transparent 50%, transparent 100%)", backgroundSize: "20px 1px" }}
                  animate={{ 
                    background: index + 1 < step 
                      ? "linear-gradient(to right, #3B82F6, #3B82F6)" 
                      : "repeating-linear-gradient(to right, #CBD5E0 0%, #CBD5E0 50%, transparent 50%, transparent 100%)",
                    backgroundSize: "20px 1px"
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 rotate-45 border-t-2 border-r-2"
                    initial={{ borderColor: "#CBD5E0" }}
                    animate={{ borderColor: index + 1 < step ? "#3B82F6" : "#CBD5E0" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="propertyName" className="block text-sm font-medium text-gray-700">
                    Property Name
                  </label>
                  <input
                    id="propertyName"
                    name="propertyName"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.propertyName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Property Type</label>
                  <div className="mt-2 space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="propertyType"
                        value="rent"
                        checked={formData.propertyType === "rent"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Rent</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="propertyType"
                        value="sell"
                        checked={formData.propertyType === "sell"}
                        onChange={handleInputChange}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Sell</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="propertyVariant" className="block text-sm font-medium text-gray-700">
                    Property Variant
                  </label>
                  <select
                    id="propertyVariant"
                    name="propertyVariant"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={formData.propertyVariant}
                    onChange={handleInputChange}
                  >
                    <option value="">Select variant</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="subVariant" className="block text-sm font-medium text-gray-700">
                    Sub Variant
                  </label>
                  <input
                    id="subVariant"
                    name="subVariant"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.subVariant}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                      Bedrooms
                    </label>
                    <input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
                      Bathrooms
                    </label>
                    <input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="balconies" className="block text-sm font-medium text-gray-700">
                      Balconies
                    </label>
                    <input
                      id="balconies"
                      name="balconies"
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.balconies}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="floorNo" className="block text-sm font-medium text-gray-700">
                      Floor No.
                    </label>
                    <input
                      id="floorNo"
                      name="floorNo"
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.floorNo}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="facing" className="block text-sm font-medium text-gray-700">
                    Facing
                  </label>
                  <select
                    id="facing"
                    name="facing"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={formData.facing}
                    onChange={handleInputChange}
                  >
                    <option value="">Select facing</option>
                    <option value="north">North</option>
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="carpetArea" className="block text-sm font-medium text-gray-700">
                    Carpet Area (sq ft)
                  </label>
                  <input
                    id="carpetArea"
                    name="carpetArea"
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.carpetArea}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <input
                    id="availability"
                    name="availability"
                    type="date"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.availability}
                    onChange={handleInputChange}
                  />
                </div>
                {formData.propertyType === "rent" && (
                  <div>
                    <label htmlFor="rent" className="block text-sm font-medium text-gray-700">
                      Rent (per month)
                    </label>
                    <input
                      id="rent"
                      name="rent"
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.rent}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                {formData.propertyType === "sell" && (
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="furnishedStatus" className="block text-sm font-medium text-gray-700">
                    Furnished Status
                  </label>
                  <select
                    id="furnishedStatus"
                    name="furnishedStatus"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                    value={formData.furnishedStatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select status</option>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi-furnished</option>
                    <option value="fully-furnished">Fully-furnished</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Property Images</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
                {formData.images.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</h4>
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {formData.images.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Swimming Pool", "Gym", "Parking", "Security", "Elevator",
                      "Garden", "Playground", "Clubhouse", "24/7 Water Supply",
                      "Power Backup", "Gated Community", "CCTV", "Fire Safety",
                      "Indoor Games", "Jogging Track", "Sports Facility", "Pet Friendly",
                      "Waste Disposal", "Rain Water Harvesting", "Solar Panels"
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input
                          id={amenity}
                          name={amenity}
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={formData.amenities.includes(amenity)}
                          onChange={(e) => handleCheckboxChange(amenity, e.target.checked)}
                        />
                        <label htmlFor={amenity} className="ml-2 block text-sm text-gray-900">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-5">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-blue-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 items-center"
              >
                Submit Listing
                <Check className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </form>
      </motion.div>
      <Toaster />
    </div>
  )
}