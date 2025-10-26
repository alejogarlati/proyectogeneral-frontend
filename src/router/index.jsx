import { createBrowserRouter } from "react-router-dom";

import { rutas } from "./rutas.jsx";
import Layout from "../pages/Layout/Layout.jsx";
import { loader as layoutLoader } from "../pages/Layout/Layout.jsx";;
import { Login } from "../pages/Login/Login.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div> Error 404 Not Found </div>,
    loader: layoutLoader,
    children: rutas,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
