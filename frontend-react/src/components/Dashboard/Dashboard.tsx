import React from 'react'
import SidebarNavigation from './Sidebar'
import DashboardLayout from './DashboardLayout'


function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
    <SidebarNavigation />
    <main className="flex-1 overflow-y-auto p-6">
      <DashboardLayout />
    </main>
  </div>
  )
}

export default Dashboard