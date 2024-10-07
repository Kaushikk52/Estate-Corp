import { ArrowRight, Zap, Smile, Sparkles, Rocket, Star } from "lucide-react"

export default function BentoGrid() {
  return (
    <div className="max-w-4xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Featured Card */}
        <div className="row-span-2 col-span-2 flex flex-col justify-between p-6 bg-white text-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-600 hover:text-white transition-all duration-300 rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-bold mb-2">Featured Content</h2>
            <p className="mb-4">This is a larger card for highlighting important content or features.</p>
          </div>
          <div className="flex items-center">
            <span>Learn more</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>

        {/* Regular Cards */}
        <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-yellow-100 transition-all duration-300 group rounded-lg shadow-md">
          <Zap className="h-8 w-8 mb-2 text-yellow-500" />
          <h3 className="font-semibold text-gray-800 group-hover:text-yellow-700">Quick Actions</h3>
        </div>

        <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-green-100 transition-all duration-300 group rounded-lg shadow-md">
          <Smile className="h-8 w-8 mb-2 text-green-500" />
          <h3 className="font-semibold text-gray-800 group-hover:text-green-700">User Feedback</h3>
        </div>

        <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-purple-100 transition-all duration-300 group rounded-lg shadow-md">
          <Sparkles className="h-8 w-8 mb-2 text-purple-500" />
          <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">New Features</h3>
        </div>

        {/* <div className="col-span-2 p-6 bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Recent Activity</h2>
          <p className="text-gray-600">Here's a summary of your recent activity and achievements.</p>
        </div> */}

        <div className="row-span-2 col-span-2 p-6 bg-white text-gray-800 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Special Announcement</h2>
          <p>This full-width card can be used for important announcements or calls to action.</p>
        </div>

        <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-blue-100 transition-all duration-300 group rounded-lg shadow-md">
          <Rocket className="h-8 w-8 mb-2 text-blue-500" />
          <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">Get Started</h3>
        </div>

        {/* <div className="col-span-3 p-6 bg-white text-gray-800 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:text-white transition-all duration-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Special Announcement</h2>
          <p>This full-width card can be used for important announcements or calls to action.</p>
        </div> */}

        {/* <div className="p-4 flex flex-col items-center justify-center text-center bg-white hover:bg-yellow-100 transition-all duration-300 group rounded-lg shadow-md">
          <Star className="h-8 w-8 mb-2 text-yellow-500" />
          <h3 className="font-semibold text-gray-800 group-hover:text-yellow-700">Favorites</h3>
        </div>

        <div className="col-span-2 p-6 bg-white hover:bg-gray-100 transition-all duration-300 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Statistics</h2>
          <p className="text-gray-600">Display key metrics and statistics in this larger card.</p>
        </div> */}
      </div>
    </div>
  )
}