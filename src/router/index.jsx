import { Routes, Route, createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome.jsx";
import Layout from "../pages/Layout/Layout.jsx";
import { loader as layoutLoader } from "../pages/Layout/Layout.jsx";
import { Home } from "../pages/Home/Home.jsx";
import { loader as homeLoader } from "../pages/Home/Home.jsx";
import { Login } from "../pages/Login/Login.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div> Error 404 Not Found </div>,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/products",
        element: <div> Products Page </div>,
<<<<<<< HEAD
      },
    ],
  },
  {
    path: "/welcome",
    element: <Welcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
=======
        }]

    },
    {
        path: "/welcome",
        element: <Welcome/>
    },
    {
        path: "/login",
        element: <Login/>
    },

])
>>>>>>> af6fb32056dfff1378a7c2a8e97c2b5e7935f499
