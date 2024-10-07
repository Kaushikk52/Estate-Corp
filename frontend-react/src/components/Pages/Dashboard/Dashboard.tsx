
import SidebarNavigation from './Sidebar'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
    <SidebarNavigation />
    <main className="flex-1 overflow-y-auto custom-scrollbar">
      <Outlet/>
    </main>
  </div>
  )
}

export default Dashboard