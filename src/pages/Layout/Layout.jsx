import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid grid-cols-12">
      <section className="col-span-3 flex flex-col justify-between items-center">
        {/* <Sidebar /> */}
        <Footer />
      </section>
      <section className="col-span-9 min-h-screen">
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;

export const loader = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    throw redirect("/login");
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  console.log("Expiracion: ", decodedToken.exp, " Current Time: ", currentTime);
  if (decodedToken.exp < currentTime) {
    sessionStorage.removeItem("accessToken");
    alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
    throw redirect("/login");
  }

  return null;
};
