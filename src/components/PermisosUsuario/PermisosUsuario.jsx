import { useEffect, useState } from "react";
import { getMenus, getUsers, getPermisosByUserId } from "@/services/services";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export const PermisosUsuario = () => {
  const [users, setUsers] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [permissions, setPermissions] = useState(new Set());
  const [loadingBase, setLoadingBase] = useState(true);
  const [loadingPerms, setLoadingPerms] = useState(false);

  // Carga base: usuarios y menús (SIN ordenar, tal como vienen de la DB)
  useEffect(() => {
    (async () => {
      try {
        const [users, menus] = await Promise.all([getUsers(), getMenus()]);
        setUsers(users.data?.data || []);
        setMenus(menus.data?.data || []);
      } finally {
        setLoadingBase(false);
      }
    })();
  }, []);

  // Al elegir usuario, cargo permisos y seteo checks
  useEffect(() => {
    (async () => {
      if (!selectedUserId) {
        setPermissions(new Set());
        return;
      }
      setLoadingPerms(true);
      try {
        const pResp = await getPermisosByUserId(Number(selectedUserId));
        // Debe devolver [{ userId, menuId }, ...]
        const ids = (pResp?.data?.data ?? pResp ?? []).map((p) => p.menuId);
        setPermissions(new Set(ids));
      } finally {
        setLoadingPerms(false);
      }
    })();
  }, [selectedUserId]);

  const toggle = (menuId) => {
    const next = new Set(permissions);
    next.has(menuId) ? next.delete(menuId) : next.add(menuId);
    setPermissions(next);
  };

  const handleGuardar = () => {
    if (!selectedUserId) return;
    const permisos = Array.from(permissions).map((menuId) => ({
      userId: Number(selectedUserId),
      menuId,
    }));
    console.log("Listado de Permisos:", permisos);
    // TODO: await api.put(`/usuarios/${selectedUserId}/permisos`, payload)
  };

  const handleCancelar = () => {
    setSelectedUserId(null); // deselecciona usuario
    setPermissions(new Set()); // limpia checks
  };

  if (loadingBase)
    return <div className="p-4 text-sm text-muted-foreground">Cargando…</div>;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Selector de usuario */}
      <div className="flex items-end gap-2">
        <div className="w-full">
          <Label className="mb-1 block">Usuario</Label>
          <Select
            value={selectedUserId ?? undefined}
            onValueChange={(val) => setSelectedUserId(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar usuario" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.userName + " " + user.userLastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedUserId && (
          <>
            <Button variant="outline" onClick={handleCancelar}>
              Revertir Cambios
            </Button>
            <Button onClick={handleGuardar} disabled={loadingPerms}>
              Guardar Cambios
            </Button>
          </>
        )}
      </div>

      {selectedUserId && !loadingPerms && (
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 border-2 p-3 rounded-xl"
        >
          <p className="pt-1 pb-2">Permisos Otorgados</p>
          {menus.map((menu) => {
            const hasChildren = menu.submenu?.length > 0;

            if (hasChildren)
              return (
                <AccordionItem
                  key={menu.id}
                  value={String(menu.id)}
                  className="border rounded-lg"
                >
                  <AccordionTrigger className="px-4 py-2 font-medium hover:bg-muted/60">
                    {menu.title}
                  </AccordionTrigger>
                  {menu.submenu.map((submenu) => (
                    <AccordionContent
                      key={submenu.id}
                      className="px-4 py-2 text-sm text-muted-foreground"
                    >
                      <div className="ps-3 py-1 rounded hover:bg-muted/40 flex items-center gap-3">
                        <Checkbox
                          checked={permissions.has(submenu.id)}
                          onCheckedChange={() => toggle(submenu.id)}
                        />
                        <Label
                          className="cursor-pointer"
                          onClick={() => toggle(submenu.id)}
                        >
                          {submenu.title}
                        </Label>
                        <span className="ml-auto text-xs text-muted-foreground  pr-7">
                          {submenu.url}
                        </span>
                      </div>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              );

            // Si NO tiene submenú: es hoja => fila simple con checkbox
            return (
              <div key={menu.id} className="border rounded-lg">
                <div className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted/40 flex items-center gap-3">
                  <Checkbox
                    checked={permissions.has(menu.id)}
                    onCheckedChange={() => toggle(menu.id)}
                  />
                  <Label
                    className="cursor-pointer"
                    onClick={() => toggle(menu.id)}
                  >
                    {menu.title}
                  </Label>
                  <span className="ml-auto text-xs text-muted-foreground pr-7">
                    {menu.url}
                  </span>
                </div>
              </div>
            );
          })}
        </Accordion>
      )}

      {selectedUserId && loadingPerms && (
        <div className="text-sm text-muted-foreground">Cargando permisos…</div>
      )}
    </div>
  );
};
