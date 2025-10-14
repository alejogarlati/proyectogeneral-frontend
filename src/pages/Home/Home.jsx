import React from "react";
import "./Home.css";
import { FormLogin1 } from "../../components/LoginForm/FormLogin1.jsx";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home min-h-screen bg-(--color-armony)">
      <div className="container mx-auto px-4">
        <Navbar />
        <section className="flex flex-col gap-5 items-center justify-center text-center min-h-[92dvh]">
          <div className="logo-container">
            <img
              src="./src/assets/logo_kiosco_ampus.png"
              alt="Logo Kiosco Campus"
              className="mx-auto mb-4"
            />
          </div>
          <h1 className="mb-5 text-5xl text-(--color-secondary)">¡Bienvenido!</h1>
          <div className="flex flex-row items-center justify-center gap-5 home-buttons">
            <Link to="/login">
              <button className="btn btn-1">Iniciar Sesión</button>
            </Link>
            <button className="btn btn-2">Registrarse</button>
          </div>
          <Footer />
        </section>
      </div>
    </section>
  );
};

export default Home;
