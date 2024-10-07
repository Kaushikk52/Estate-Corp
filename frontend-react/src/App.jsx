import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Pages/Home/Home.tsx'
import Layout from './components/Layout.tsx'
import DashBoard from './components/Dashboard/Dashboard.tsx'
import DashboardLayout from './components/Dashboard/DashboardLayout.tsx'
import AddPropertyLayout from './components/Dashboard/AddPropertyLayout.tsx'
import AddProjectLayout from './components/Dashboard/Projects/AddProject.tsx'
import Residential from './components/ListingPage/Residential.tsx'
import PropertyDetails from './components/Pages/PropertyDetailsPage/PropertyDetails.tsx'
import NotFound from './NotFound.tsx'

function App() {

  return (
    <> 
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path='/*' element={<NotFound/>} />
            <Route index element={<Home />} />
            <Route path="/property/:id" element={ <PropertyDetails/> }/>
            <Route path='/dashboard' element={<DashBoard />}>
              <Route path='/dashboard/main' element={<DashboardLayout />} />
              <Route path='/dashboard/add-property' element={<AddPropertyLayout />} />
              <Route path='/dashboard/add-project' element={<AddProjectLayout />} />
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
