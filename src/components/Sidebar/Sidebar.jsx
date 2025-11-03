import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  LogOut,
  CreditCard,
  CircleUserRound,
  Bell,
  EllipsisVertical,
  Minus,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  PackageSearch,
  Home,
  BookUser,
  BadgeDollarSign,
  Settings,
  Truck,
  ShoppingBasket,
} from "lucide-react";

import { use } from "react";

import logoTrady from "@/assets/logo_tradyOne_png.png";
import { takeInitials } from "@/utilities/takeInitials";

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

export function AppSidebar() {
  const { isMobile, toggleSidebar, state } = useSidebar();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = (url, haveLink) => {
    if (state === "collapsed") {
      toggleSidebar();
    }
    if (haveLink) navigate(url);
  };

  const activeUser = JSON.parse(sessionStorage.getItem("user"));

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-4">
            <div className="w-full flex flex-row items-start">
              <img
                src={logoTrady}
                alt="Logo Sidebar"
                className="h-8 object-contain"
              />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* agregar renderizado condicional según user.rol */}
              {items.map((item, index) => (
                <Collapsible
                  className="group/collapsible"
                  key={item.title}
                  defaultOpen={index === 0}
                >
                  {item.rol.includes(activeUser.userRoleId) && (
                    <SidebarMenuItem>
                      {/* !! IMPORTANTE: agregar animaciones facheras */}
                      <CollapsibleTrigger className="w-full">
                        <SidebarMenuButton
                          asChild
                          onClick={() => handleClick(item.url, item.haveLink)}
                        >
                          <span>
                            <item.icon />
                            {item.title}{" "}
                            {item.submenu?.length ? (
                              <div className="w-full">
                                <ChevronRight className="w-4 h-4 ml-auto group-data-[state=open]/collapsible:hidden" />
                                <ChevronDown className="w-4 h-4 ml-auto group-data-[state=closed]/collapsible:hidden" />
                              </div>
                            ) : null}
                          </span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.submenu?.length ? (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.submenu.map(
                              (itemsub) =>
                                itemsub.rol.includes(activeUser.userRoleId) && (
                                  <SidebarMenuSubItem key={itemsub.title}>
                                    <SidebarMenuSubButton asChild>
                                      <Link to={itemsub.url}>
                                        {itemsub.title}
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                            )}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      ) : null}
                    </SidebarMenuItem>
                  )}
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage
                    src={activeUser.avatar}
                    alt={activeUser.userName}
                  />
                  <AvatarFallback className="rounded-lg">{takeInitials(activeUser.userName)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {activeUser.userName}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {activeUser.userRoleName}
                  </span>
                </div>
                <EllipsisVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={activeUser.avatar}
                      alt={activeUser.userName}
                    />
                    <AvatarFallback className="rounded-lg">{takeInitials(activeUser.userName)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {activeUser.userName}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {activeUser.userMail}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {activeUser.userRoleName}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link to="/usuarios/cuenta">
                  <DropdownMenuItem className="py-2">
                    <CircleUserRound />
                    Cuenta
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <button onClick={logout} className="w-full">
                <DropdownMenuItem className="py-2">
                  <LogOut />
                  Cerrar sesión
                </DropdownMenuItem>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
