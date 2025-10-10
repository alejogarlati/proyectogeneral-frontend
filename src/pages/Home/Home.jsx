import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <body>
      <div>
        <section className="flex flex-col gap-5 items-center justify-center h-screen text-center">
          <div className='logo-container'>
            <img src="./src/assets/logo_kiosco_ampus.png" alt="Logo Kiosco Campus" className="mx-auto mb-4" />
            </div>
            <h1 className="text-5xl">¡Bienvenido!</h1>
          <div className='flex flex-row items-center justify-center gap-5 home-buttons'>
              <button className='btn btn-1'>Iniciar Sesión</button>
              <button className='btn btn-2'>Registrarse</button>
          </div>
          <div className='footer'>
            <p className="footer-text">© 2025 P*A(2). Todos los derechos reservados.</p>
          </div>
        </section>
      </div>
    </body>
  )
}

export default Home
