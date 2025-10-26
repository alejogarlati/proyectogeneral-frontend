import { Home } from "../pages/Home/Home.jsx";
import { loader as homeLoader } from "../pages/Home/Home.jsx";
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
import { UsuariosCuenta } from "@/pages/Usuarios/Cuenta/Usuarios.cuenta.jsx";



export const rutas = [
  {
    path:"/",
    index: true,
    element: <Home />,
    loader: homeLoader,
    slug: "Home",
  },
  {
    path: "/productos/listado",
    element: <ProductosListado />,
    slug: "Listado de Productos",
  },
  {
    path: "/productos/precios",
    element: <ProductosPrecios />,
    slug: "Gestión de Precios",
  },
  {
    path: "/productos/categorias",
    element: <ProductosCategorias />,
    slug: "Categorías de Productos",
  },
  {
    path: "/proveedores/listado",
    element: <ProveedoresListado />,
    slug: "Listado de Proveedores",
  },
  {
    path: "/proveedores/informes",
    element: <ProveedoresInformes />,
    slug: "Informes de Proveedores",
  },
  {
    path: "/clientes/listado",
    element: <ClientesListado />,
    slug: "Listado de Clientes",
  },
  {
    path: "/clientes/informes",
    element: <ClientesInformes />,
    slug: "Informes de Clientes",
  },
  {
    path: "/ventas/nueva",
    element: <VentasNuevaVenta />,
    slug: "Nueva Venta",
  },
  {
    path: "/ventas/listado",
    element: <VentasListado />,
    slug: "Listado de Ventas",
  },
  {
    path: "/ventas/informes",
    element: <VentasInformes />,
    slug: "Informes de Ventas",
  },
  {
    path: "/compras/nueva",
    element: <ComprasNuevaCompra />,
    slug: "Nueva Compra",
  },
  {
    path: "/compras/listado",
    element: <ComprasListado />,
    slug: "Listado de Compras",
  },
  {
    path: "/compras/informes",
    element: <ComprasInformes />,
    slug: "Informe de Compras",
  },
  {
    path: "/usuarios/gestionar",
    element: <UsuariosGestionarUsuarios />,
    slug: "Gestión de Usuarios",
  },
  {
    path: "/usuarios/roles-permisos",
    element: <UsuariosRolesPermisos />,
    slug: "Roles y Permisos de Usuario",
  },
  {
    path: "/usuarios/cuenta",
    element: <UsuariosCuenta />,
    slug: "Mi Cuenta",
  },
];