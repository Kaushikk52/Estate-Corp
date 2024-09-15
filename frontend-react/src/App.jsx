import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home.tsx'
import Layout from './components/Layout.tsx'
import DashBoard from './components/Dashboard/Dashboard.tsx'
import Residential from './components/Residential/Residential.tsx'

function App() {

  return (
    <> 
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/dashboard' element={<DashBoard />} />
            <Route path="/residential/buy" element={<Residential />}>
              {/* <Route path="service/:id" element={<Services />} /> */}
            </Route>
            {/* <Route path="services/" element={<Services />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
