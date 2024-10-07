import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar  from './Pages/Home/Navbar'
import Footer from './Pages/Home/Footer'

function Layout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default Layout