import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/Navbar/Navbar.jsx'
import { Footer } from '../../components/Footer/Footer.jsx'
import { jwtDecode } from 'jwt-decode'
import { redirect } from "react-router-dom";

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

export const loader = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    throw redirect("/welcome");
  }
  
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; 
  console.log ("Expiracion: ", decodedToken.exp, " Current Time: ", currentTime);
  if (decodedToken.exp < currentTime) {
    sessionStorage.removeItem("accessToken");
    alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
    throw redirect("/welcome");
  }

  return null;
}