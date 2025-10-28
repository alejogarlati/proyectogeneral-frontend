import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Toaster } from "react-hot-toast";

import { AppSidebar } from "../../components/Sidebar/Sidebar.jsx";

import { rutas } from "@/router/rutas.jsx";

const Titulo = () => {
  const { pathname } = useLocation();

  const ruta = rutas.find((item) => item.path === pathname)

  return ruta.slug;
};

export default function Layout() {



  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <h1>
            <Titulo />
          </h1>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

export const loader = () => {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    throw redirect("/login");
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    sessionStorage.removeItem("accessToken");
    alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
    throw redirect("/login");
  }

  return null;
};
