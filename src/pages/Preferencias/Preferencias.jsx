import { useNavigate } from "react-router-dom";
import { MenuSistema } from "@/components/MenuSistema/MenuSistema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PermisosUsuario } from "@/components/PermisosUsuario/PermisosUsuario";

export const Preferencias = () => {
  const navigate = useNavigate();

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
          <TabsContent value="permissions" className="w-full">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue=""
            >
              <AccordionItem value="roles" className="w-full">
                <AccordionTrigger>Roles</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  Listado de Roles
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="permisos" className="w-full">
                <AccordionTrigger>Permisos de Usuarios</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <div className="flex items-center justify-between px-4  rounded-xl py">
                    <PermisosUsuario />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export const loader = async () => {
  return null;
};
