import { useState } from "react"
import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, DollarSign, Users, Package, Activity, Printer } from "lucide-react"

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
]

const paymentTrackerData = [
  { clientName: "Orlando Diggs", propertyName: "Madura Cabin & Residences", purchaseType: "Property Rental", amount: "$2870.00", dueDate: "18/01/2024", status: "Paid" },
  { clientName: "Mario Hernandez", propertyName: "Davila Residences Batu", purchaseType: "Paid Property", amount: "$5640.00", dueDate: "19/01/2024", status: "Unpaid" },
  { clientName: "Kenny Olumas", propertyName: "Aubert & Collins Villas", purchaseType: "Property Rental", amount: "$3600.00", dueDate: "24/01/2024", status: "Pending" },
]

const CardBackground = ({ color }: { color: string }) => (
  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="100" fill={color} fillOpacity="0.1" />
    <circle cx="100%" cy="100%" r="80" fill={color} fillOpacity="0.08" />
  </svg>
)

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")

  const cards = [
    { title: "Total Revenue", icon: DollarSign, value: "$45,231.89", change: "+20.1% from last month", color: "bg-blue-500", textColor: "text-blue-700" },
    { title: "New Customers", icon: Users, value: "+2350", change: "+180.1% from last month", color: "bg-green-500", textColor: "text-green-700" },
    { title: "Total Products", icon: Package, value: "12,234", change: "+19 added today", color: "bg-purple-500", textColor: "text-purple-700" },
    { title: "Active Now", icon: Activity, value: "+573", change: "+201 since last hour", color: "bg-yellow-500", textColor: "text-yellow-700" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties Dashboard</h1>
        <input
          type="search"
          placeholder="Search..."
          className="px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className={`relative overflow-hidden ${card.color} text-white p-6 rounded-lg shadow-lg`}>
            <CardBackground color="white" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-medium">{card.title}</h2>
                <card.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-2">{card.value}</div>
              <p className="text-sm opacity-75">{card.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Payment Tracker</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentTrackerData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.propertyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.purchaseType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        item.status === 'Unpaid' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Printer className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-sm text-gray-600 mb-4">Your most recent actions and updates.</p>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="relative flex h-3 w-3 mr-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <p className="text-sm">New order received from Customer {i + 1}</p>
              <ArrowUpRight className="h-4 w-4 ml-auto text-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}