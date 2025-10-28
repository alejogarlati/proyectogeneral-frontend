import { createBrowserRouter, UNSAFE_useFogOFWarDiscovery } from "react-router-dom";

import Layout from "../pages/Layout/Layout.jsx";
import { loader as layoutLoader } from "../pages/Layout/Layout.jsx";

import { Home } from "../pages/Home/Home.jsx";
import { loader as homeLoader } from "../pages/Home/Home.jsx";

import { Login } from "../pages/Login/Login.jsx";
import { ProductosListado } from "@/pages/Productos/Listado/Productos.listado.jsx";
import { ProductosPrecios } from "@/pages/Productos/Precios/Productos.precio.jsx";
import { ProductosCategorias } from "@/pages/Productos/Categorias/Productos.categorias.jsx";
import { ProveedoresListado } from "@/pages/Proveedores/Listado/Proveedores.listado.jsx";
import { ProveedoresInformes } from "@/pages/Proveedores/Informes/Proveedores.informes.jsx";
import { ClientesListado } from "@/pages/Clientes/Listado/Clientes.listado.jsx";
import { ClientesInformes } from "@/pages/Clientes/Informes/Clientes.informes.jsx";
import { VentasNuevaVenta } from "@/pages/Ventas/NuevaVenta/Ventas.NuevaVenta.jsx";
import { VentasListado } from "@/pages/Ventas/Listado/Ventas.listado.jsx";
import { VentasInformes } from "@/pages/Ventas/Informes/Ventas.informes.jsx";
import { ComprasNuevaCompra } from "@/pages/Compras/NuevaVenta/Compras.NuevaCompra.jsx";
import { ComprasListado } from "@/pages/Compras/Listado/Compras.listado.jsx";
import { ComprasInformes } from "@/pages/Compras/Informes/Compras.informes.jsx";
import { UsuariosGestionarUsuarios } from "@/pages/Usuarios/GestionarUsuarios/Usuarios.GestionarUsuarios.jsx";
import { UsuariosRolesPermisos } from "@/pages/Usuarios/RolesPermisos/Usuarios.RolesPermisos.jsx";

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
        path: "/productos/listado",
        element: <ProductosListado />,
      },
      {
        path: "/productos/precios",
        element: <ProductosPrecios/>,
      },
      {
        path: "/productos/categorias",
        element: <ProductosCategorias/>,
      },
      {
        path: "/proveedores/listado",
        element: <ProveedoresListado/>,
      },
      {
        path: "/proveedores/informes",
        element: <ProveedoresInformes/>,
      },
      {
        path: "/clientes/listado",
        element: <ClientesListado/>,
      },
      {
        path: "/clientes/informes",
        element: <ClientesInformes/>,
      },
      {
        path: "/ventas/nueva",
        element: <VentasNuevaVenta/>,
      },
      {
        path: "/ventas/listado",
        element: <VentasListado />,
      },
      {
        path: "/ventas/informes",
        element: <VentasInformes/>,
      },
      {
        path: "/compras/nueva",
        element: <ComprasNuevaCompra/>,
      },
      {
        path: "/compras/listado",
        element: <ComprasListado />,
      },
      {
        path: "/compras/informes",
        element: <ComprasInformes/>,
      },
      {
        path: "/usuarios/gestionar",
        element: <UsuariosGestionarUsuarios />,
      },
      {
        path: "/usuarios/roles-permisos",
        element: <UsuariosRolesPermisos/>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
