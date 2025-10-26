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
  useSidebar
} from "@/components/ui/sidebar";

import {
  PackageSearch,
  Home,
  BookUser,
  BadgeDollarSign,
  "Settings" as Config,
  Truck,
} from "lucide-react";

const testUser = {
  name: "Alejo Garlati",
  email: "agarlati@gmail.com",
  avatar: null,
};

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Productos",
    url: "#",
    icon: PackageSearch,
  },
  {
    title: "Clientes",
    url: "#",
    icon: BookUser,
  },
  {
    title: "Ventas",
    url: "#",
    icon: BadgeDollarSign,
  },
  {
    title: "Compras",
    url: "#",
    icon: Truck,
  },
  {
    title: "Configuración",
    url: "#",
    icon: Config,
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
