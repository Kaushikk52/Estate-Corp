import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar  from './Home/Navbar'
import Footer from './Home/Footer'

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