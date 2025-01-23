import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  alt: string
  type: "project" | "floorPlan"
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ isOpen, onClose, imageSrc, alt, type }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={imageSrc || "/placeholder.svg"} alt={alt} className="w-full h-full object-contain" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <X size={24} />
          </button>
          {type === "floorPlan" && (
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded">
              <h3 className="text-lg font-semibold">{alt}</h3>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ImagePreviewModal

