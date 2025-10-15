import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar/Navbar.jsx'
import { Footer } from '../../components/Footer/Footer.jsx'

const Layout = () => {
  return (
    <div>
        <section>
            <Navbar />
        </section>
        <section>
            <Outlet />
        </section>
        <section>
            <Footer />
        </section>
    </div>
  )
}

export default Layout