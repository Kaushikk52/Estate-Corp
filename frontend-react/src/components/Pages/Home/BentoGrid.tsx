import {
  ArrowRight,
  Zap,
  Smile,
  Sparkles,
  Rocket,
  Star,
  ScrollText,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function BentoGrid() {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured Card */}
        <div className="row-span-2 col-span-2 flex flex-col justify-between p-6 bg-white text-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:text-white transition-all duration-300 rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-bold mb-2">About Us</h2>
            <p className="mb-4 line-clamp-4">
              At Estatecorp , our story is one of passion, dedication, and a
              relentless pursuit of excellence in the real estate industry.
              Founded by a group of seasoned professionals with diverse
              backgrounds and expertise, our agency was born out of a shared
              vision to redefine the real estate experience for our clients. Our
              journey began with a simple yet powerful idea: to create a real
              estate agency that prioritizes integrity, transparency, and client
              satisfaction above all else. We recognized the need for a
              personalized approach to real estate—one that puts the needs and
              goals of our clients front and center. With this vision in mind,
              we set out to build a team of dedicated professionals who share
              our values and commitment to excellence. From the very beginning,
              we set ourselves apart by focusing on building meaningful
              relationships with our clients.{" "}
            </p>
          </div>
          <div className="flex items-center">
            <Link to="about-us">Learn more</Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>

        {/* Regular Cards */}
        <Link to="contact-us?subject=INTERIOR_DESIGN">
          <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-yellow-100 transition-all duration-300 group rounded-lg shadow-md">
            <Zap className="h-8 w-8 mb-2 text-yellow-500" />
            <h3 className="font-semibold text-gray-800 group-hover:text-yellow-700">
              Interior Design
            </h3>
          </div>
        </Link>

        <Link to="contact-us?subject=LEGAL_ASSIST">
          <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-green-100 transition-all duration-300 group rounded-lg shadow-md">
            <Smile className="h-8 w-8 mb-2 text-green-500" />
            <h3 className="font-semibold text-gray-800 group-hover:text-green-700">
              Legal Assistance
            </h3>
          </div>
        </Link>

        <Link to="contact-us?subject=HOME_LOAN">
          <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-purple-100 transition-all duration-300 group rounded-lg shadow-md">
            <ScrollText className="h-8 w-8 mb-2 text-purple-500" />
            <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">
              Home Loan
            </h3>
          </div>
        </Link>

        <Link to="contact-us?subject=REDEVELOPMENT">
          <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-violet-100 transition-all duration-300 group rounded-lg shadow-md">
            <Building className="h-8 w-8 mb-2 text-violet-500" />
            <h3 className="font-semibold text-gray-800 group-hover:text-violet-700">
              Redevelopment
            </h3>
          </div>
        </Link>

        <Link to="contact-us?subject=ACQUISTION">
          <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-pink-100 transition-all duration-300 group rounded-lg shadow-md">
            <Sparkles className="h-8 w-8 mb-2 text-pink-500" />
            <h3 className="font-semibold text-gray-800 group-hover:text-pink-700">
              Land Acquisition
            </h3>
          </div>
        </Link>

        <Link to="contact-us?subject=PACKING_MOVING">
          <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 transition-all duration-300 group rounded-lg shadow-md">
            <Rocket className="h-14 w-8 mb-2 text-blue-500" />
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">
              Packers & Movers
            </h3>
          </div>
        </Link>

        <div className="row-span-2 col-span-2 p-6 bg-white text-gray-800 hover:bg-gradient-to-r hover:from-orange-400  hover:to-pink-500 hover:text-white transition-all duration-300 rounded-lg shadow-md c-container">
          <h2 className="text-xl font-bold mb-2 text-blue-600 c-head">
            Special Announcement
          </h2>
          <p>
            <b>We Provide Services like :</b> Home Loan, Packing and Moving,
            Interior Design, Legal Assistance, Land Acquisition, Redevelopment,
            Joint Venture, Builder Funding etc.
            <b>
              {" "}
              You can leave your Query by visiting Contact Page. We'll Get Back
              to you soon.
            </b>
          </p>
          <div className="flex items-center">
            <Link to="contact-us">Contact Us</Link>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
