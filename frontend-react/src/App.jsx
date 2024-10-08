import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home/Home.tsx';
import Layout from './components/Layout.tsx';
import DashBoard from './components/Pages/Dashboard/Dashboard.tsx';
import DashboardLayout from './components/Pages/Dashboard/DashboardLayout.tsx';
import AddPropertyLayout from './components/Pages/Dashboard/AddProperty.tsx';
import AddProjectLayout from './components/Pages/Dashboard/AddProject.tsx';
import Residential from './components/Pages/ListingPage/Residential.tsx';
import PropertyDetails from './components/Pages/PropertyDetails.tsx';
import ProjectDetails from './components/Pages/ProjectDetails.tsx';
import NotFound from './components/Pages/NotFound.tsx';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path='/*' element={<NotFound/>} />
            <Route index element={<Home />} />
            <Route path="/property/:id" element={ <PropertyDetails/> }/>
            <Route path="/project/:id" element={ <ProjectDetails/> }/>
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
  )
}

export default App;
