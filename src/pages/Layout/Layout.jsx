import { useEffect, useContext, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import {
  getMenusByUserId,
  getProvincias,
  getRoles,
} from "@/services/services.js";
import { UserContext } from "@/context/AuthContext.jsx";
import { DataContext } from "@/context/DataContext.jsx";

const Titulo = () => {
  const { pathname } = useLocation();
  const ruta = rutas.find((item) => item.path === pathname);
  return ruta.slug;
};

export const Layout = () => {
  const { setAccessToken } = useContext(UserContext);
  const { setRoles, setProvincias } = useContext(DataContext);
  const [menuTree, SetMenuTree] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!accessToken) {
      navigate("/login", { replace: true });
      return;
    }
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      setAccessToken(null);
      alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
      navigate("/login", { replace: true });
      return;
    }

    user.darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    try {
      (async () => {
        const roles = await getRoles();
        setRoles(roles);
        const provincias = await getProvincias();
        setProvincias(provincias);
        const menu = await getMenusByUserId(user.id);
        console.log(menu.data.data);
        SetMenuTree(menu.data.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar items={menuTree} />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 px-4 border-b">
          <SidebarTrigger className="cursor-pointer" />
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
};

export const loader = async () => {
  return null;
};
