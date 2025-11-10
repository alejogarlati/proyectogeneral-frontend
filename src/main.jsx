import React from 'react'
import ReactDOM from 'react-dom/client'
import { Providers } from './context/Providers.jsx'
import './index.css'

import { router } from './router/index.jsx'

import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
)
