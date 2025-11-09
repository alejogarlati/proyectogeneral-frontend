import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getMenus, getMenusByUserId } from "@/services/services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InlineEditableTitle } from "@/components/InlineEditableTitle/InlineEditableTitle";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MenuSistema } from "@/components/MenuSistema/MenuSistema";

export const Preferencias = () => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null);

  const menuTree = useLoaderData().menuTree.data.data;
  const [menus, setMenus] = useState(menuTree);
  const menuTreeById = useLoaderData().menuTreeById.data.data;

  const updateMenuTitle = (menuId, newTitle) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === menuId ? { ...menu, title: newTitle } : menu
      )
    );
  };

  const updateSubmenuTitle = (menuId, subMenuId, newTitle) => {
    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === menuId
          ? {
              ...menu,
              submenu: menu.submenu?.map((submenu) =>
                submenu.id === subMenuId
                  ? { ...submenu, title: newTitle }
                  : submenu
              ),
            }
          : menu
      )
    );
  };

  const stopToggle = (e) => {
    if (editing) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="grid grid-cols-12 w-full gap-6 p-4">
      <div className="col-span-12 flex flex-col items-center justify-start w-full gap-2 p-8 bg-(--card) rounded-xl shadow">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
            <TabsTrigger value="permissions">Roles y Permisos</TabsTrigger>
          </TabsList>
          <TabsContent value="settings">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue=""
            >
              <AccordionItem value="visualization">
                <AccordionTrigger>Visualización</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex items-center justify-between px-4 border-2 rounded-xl py-3">
                    <Label htmlFor="darkMode">Modo Oscuro</Label>
                    <Switch id="darkMode" />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="menus">
                <AccordionTrigger>Menus del Sistema</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex items-center justify-between px-4  rounded-xl py-1">
                    <MenuSistema />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="permissions"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export const loader = async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [menuTreeById, menuTree] = await Promise.all([
    getMenusByUserId(user.id),
    getMenus(),
  ]);
  return { menuTreeById, menuTree };
};
