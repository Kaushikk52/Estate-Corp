import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home.tsx'
import Layout from './components/Layout.tsx'
import SidebarNavigation from './components/Account/Sidebar.tsx'

function App() {

  return (
    <> 
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/account' element={<SidebarNavigation />} />
            {/* <Route path="ServiceListing" element={<ServiceListing />}> */}
              {/* <Route path="service/:id" element={<Services />} /> */}
            {/* </Route> */}
            {/* <Route path="services/" element={<Services />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
