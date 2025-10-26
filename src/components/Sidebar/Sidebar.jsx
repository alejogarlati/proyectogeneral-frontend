import { Link } from "react-router-dom";

import {
  LogOut,
  CreditCard,
  CircleUserRound,
  Bell,
  EllipsisVertical,
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
  Collapsible,
  CollapsibleMenuItem,
  CollapsibleTrigger,
  CollapsibleMenuButton,
  CollapsibleContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
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

const testUser = {
  name: "Alejo Garlati",
  email: "agarlati@gmail.com",
  avatar: null,
  rol: null,
};

const items = [
  {
    title: "Home",
    submenu: [
      { title: "Subitem 1", url: "/subitem1" },
      { title: "Subitem 2", url: "/subitem2" },
    ],
    url: "/",
    icon: Home,
    rol: undefined,
  },
  {
    title: "Productos",
    submenu: [{}],
    url: "/productos",
    icon: PackageSearch,
    rol: undefined,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: BookUser,
    rol: undefined,
  },
  {
    title: "Ventas",
    url: "/ventas",
    icon: BadgeDollarSign,
    rol: undefined,
  },
  {
    title: "Compras",
    url: "/compras",
    icon: ShoppingBasket,
    rol: undefined,
  },
  {
    title: "Proveedores",
    url: "/proveedores",
    icon: Truck,
    rol: undefined,
  },
  {
    title: "Configuración",
    url: "configuracion",
    icon: Settings,
    rol: undefined,
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* agregar renderizado condicional según user.rol */}
              {items.map((item) => (
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem key={item.title}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem />
                        </SidebarMenuSub>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>
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
                  <AvatarImage src={testUser.avatar} alt={testUser.name} />
                  <AvatarFallback className="rounded-lg">AG</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{testUser.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {testUser.email}
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
                    <AvatarImage src={testUser.avatar} alt={testUser.name} />
                    <AvatarFallback className="rounded-lg">AG</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {testUser.name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {testUser.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CircleUserRound />
                  Cuenta
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Pagos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notificaciones
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
