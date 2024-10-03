import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home.tsx'
import Layout from './components/Layout.tsx'
import DashBoard from './components/Dashboard/Dashboard.tsx'
import DashboardLayout from './components/Dashboard/DashboardLayout.tsx'
import AddPropertyLayout from './components/Dashboard/AddPropertyLayout.tsx'
import Residential from './components/ListingPage/Residential.tsx'

function App() {

  return (
    <> 
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/dashboard' element={<DashBoard />}>
              <Route path='/dashboard/main' element={<DashboardLayout />} />
              <Route path='/dashboard/add-property' element={<AddPropertyLayout />} />
            </Route>
            <Route path="/residential/buy"  element={<Residential />}>
              
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
