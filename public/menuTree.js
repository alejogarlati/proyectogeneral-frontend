const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    rol: [1, 2, 6, 8],
    haveLink: true,
  },
  {
    title: "Proveedores",
    url: "/proveedores",
    icon: Truck,
    rol: [1, 6, 8],
    haveLink: false,
    submenu: [
      {
        title: "Listado",
        url: "/proveedores/listado",
        rol: [1, 6, 8],
      },
      {
        title: "Informes",
        url: "/proveedores/informes",
        rol: [1, 6, 8],
      },
    ],
  },
  {
    title: "Productos",
    url: "/productos",
    icon: PackageSearch,
    rol: [1, 2, 6, 8],
    haveLink: false,
    submenu: [
      {
        title: "Listado general",
        url: "/productos/listado",
        rol: [1, 2, 6, 8],
      },
      {
        title: "Precios",
        url: "/productos/precios",
        rol: [1, 8],
      },
      {
        title: "Categorías",
        url: "/productos/categorias",
        rol: [1, 8],
      },
    ],
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: BookUser,
    rol: [1, 2, 6],
    haveLink: false,
    submenu: [
      {
        title: "Listado",
        url: "/clientes/listado",
        rol: [1, 2, 6],
      },
      {
        title: "Informes",
        url: "/clientes/informes",
        rol: [1, 6],
      },
    ],
  },
  {
    title: "Ventas",
    url: "/ventas",
    icon: BadgeDollarSign,
    rol: [1, 2, 6],
    haveLink: false,
    submenu: [
      {
        title: "Nueva venta",
        url: "/ventas/nueva",
        rol: [1, 2],
      },
      {
        title: "Listado",
        url: "/ventas/listado",
        rol: [1, 2, 6],
      },
      {
        title: "Informes",
        url: "/ventas/informes",
        rol: [1, 6],
      },
    ],
  },
  {
    title: "Compras",
    url: "/compras",
    icon: ShoppingBasket,
    rol: [1, 6, 8],
    haveLink: false,
    submenu: [
      {
        title: "Nueva compra",
        url: "/compras/nueva",
        rol: [1, 8],
      },
      {
        title: "Listado",
        url: "/compras/listado",
        rol: [1, 6, 8],
      },
      {
        title: "Informes",
        url: "/compras/informes",
        rol: [1, 6, 8],
      },
    ],
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: Settings,
    rol: [1],
    haveLink: false,
    submenu: [
      {
        title: "Gestionar cuentas",
        url: "/usuarios/gestionar",
        rol: [1],
      },
      {
        title: "Roles y permisos",
        url: "/usuarios/roles-permisos",
        rol: [1],
      },
    ],
  },
];
