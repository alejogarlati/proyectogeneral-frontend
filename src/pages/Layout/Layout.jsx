import React from 'react'

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