import { useEffect, useState } from "react";
import {
  getMenus,
  getRoles,
  createRoles,
  getPermisosByRolId,
  updatePermisosByRolId,
  deleteRoleById,
} from "@/services/services";

import {
  ListGroup,
  ListHeader,
  ListItem,
  ListItems,
  ListProvider,
} from "@/components/ui/shadcn-io/list";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import toast from "react-hot-toast";
import { Plus, SaveAll, Trash2, Undo2 } from "lucide-react";

export const PermisosRoles = () => {
  const [roles, setRoles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedRolId, setSelectedRolId] = useState("");
  const [selectedRolName, setSelectedRolName] = useState("");
  const [isDialogNewRolOpen, setIsDialogNewRolOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("");

  const [permissions, setPermissions] = useState(new Set());
  const [loadingBase, setLoadingBase] = useState(true);
  const [loadingPerms, setLoadingPerms] = useState(false);

  useEffect(() => {
    (async () => {
      const [rolesList, menusList] = await Promise.all([
        getRoles(),
        getMenus(),
      ]);
      sortRoles(rolesList.data?.data);
      setMenus(menusList.data?.data);
    })();
  }, []);

  const sortRoles = (array) => {
    if (array.length > 0) {
      const sorted = [...array].sort((a, b) => a.name.localeCompare(b.name));
      setRoles(sorted);
    }
  };

  useEffect(() => {
    (async () => {
      if (!selectedRolId) {
        setPermissions(new Set());
        return;
      }
      setLoadingPerms(true);
      try {
        const permisos = await getPermisosByRolId(Number(selectedRolId));
        const ids = (permisos.data?.data ? permisos.data.data : []).map(
          (permiso) => permiso.menuId
        );
        const hijos = ids.filter((id) => {
          const menuPadre = menus.find((m) => m.id === id);
          return !menuPadre?.submenu || menuPadre.submenu.length === 0;
        });

        setPermissions(new Set(hijos));
      } finally {
        setLoadingPerms(false);
      }
    })();
  }, [selectedRolId]);

  const toggle = (menuId) => {
    const next = new Set(permissions);
    next.has(menuId) ? next.delete(menuId) : next.add(menuId);
    setPermissions(next);
  };

  const handleCancelarCambiosPermisos = () => {
    setSelectedRolId("");
    setSelectedRolName("");
    setOpenAccordion("");
  };

  const handleGuardarCambiosPermisos = async () => {
    if (!selectedRolId) return;
    const permisos = Array.from(permissions).map((menuId) => ({
      rolId: Number(selectedRolId),
      menuId,
    }));
    const padres = menus
      .filter((menuPrincipal) => menuPrincipal.submenu?.length > 0)
      .filter((menuPrincipal) =>
        menuPrincipal.submenu.some((submenuActual) =>
          permissions.has(submenuActual.id)
        )
      )
      .map((menuPrincipal) => ({
        rolId: Number(selectedRolId),
        menuId: menuPrincipal.id,
      }));

    const permisosUnited = [...permisos, ...padres].sort(
      (a, b) => a.menuId - b.menuId
    );
    try {
      const actualizar = await updatePermisosByRolId(permisosUnited);
      if (actualizar.data?.responseCode === 200) {
        toast.success("Permisos Actualizados con Exito");
        handleCancelarCambiosPermisos();
      }
    } catch (error) {
      toast.error("Error al Actualizar Permisos");
      console.log(error);
    }
  };

  const handleDialogNewRol = (state) => {
    setIsDialogNewRolOpen(state);
  };

  const handleNewRol = async (e) => {
    e.preventDefault();
    const nombre = { name: new FormData(e.currentTarget).get("rolName") };
    const nuevoRol = await createRoles(nombre);
    if (nuevoRol.data.success) {
      toast.success("Rol Agregado a la Base de Datos");
      setIsDialogNewRolOpen(false);
      sortRoles([...roles, nuevoRol.data.data]);
    } else {
      toast.error("Hubo un error al agregar el rol");
    }
  };

  const handleDeleteRol = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este rol?");
    if (!confirmar) return;
    try { 
      const respuesta = await deleteRoleById(id);
      if (respuesta.data.success) {
        toast.success("Rol eliminado correctamente");
        const rolesActualizados = roles.filter((rol) => rol.id !== id);
        sortRoles(rolesActualizados);
      } else {
        toast.error("No se pudo eliminar el rol");
      }
    } catch (error) {
      toast.error("Error al eliminar el rol");
      console.error("Error al eliminar el rol:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-4">
        <ListProvider className="border-[2px] border-(--border) rounded-xl px-2">
          <div className="flex flex-row justify-between pr-3 items-center">
            <p className="pl-3 pt-3 pb-2">Listado de Roles</p>
            <Plus
              className="cursor-pointer hover:text-(--primary)"
              onClick={() => handleDialogNewRol(true)}
            />
          </div>
          <ListGroup className="bg-(--bagckground) " id={"roles"} key={"roles"}>
            <ListItems>
              {roles?.length > 0 &&
                roles.map((rol, index) => (
                  <ListItem
                    className="bg-(--bagckground) border-[1px] border-gray-500 pl-4"
                    id={rol.id}
                    index={index}
                    key={rol.id}
                  >
                    <div className="flex flex-row justify-between items-center w-full">
                      <div
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setSelectedRolId(rol.id);
                          setSelectedRolName(rol.name);
                        }}
                        className="w-full"
                      >
                        {rol.name}
                      </div>
                      <Trash2 
                        size={20} 
                        className="cursor-pointer text-(--destructive)" 
                        onClick={()=> handleDeleteRol(rol.id)}
                        />
                    </div>
                  </ListItem>
                ))}
            </ListItems>
          </ListGroup>
        </ListProvider>
      </div>
      <Dialog open={isDialogNewRolOpen} onOpenChange={setIsDialogNewRolOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={(e) => handleNewRol(e)}>
            <DialogHeader className="pb-3">
              <DialogTitle>Nuevo Rol</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Nombre</Label>
                <Input id="rolName" name="rolName" />
              </div>
            </div>
            <DialogFooter>
              <Button className="mt-4" type="submit">
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="col-span-8">
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 border-2 p-3 rounded-xl"
            value={openAccordion}
            onValueChange={setOpenAccordion}
        >
          {!selectedRolId && (
            <p className="pt-1 pb-2">Seleccione Rol de la Lista</p>
          )}
          {selectedRolId && (
            <div className="flex flex-row w-full justify-between items-center">
              <p className="pt-1 pb-2">
                Permisos Otorgados al Rol <strong>{selectedRolName}</strong>
              </p>
              <div className="flex flex-row gap-5 pr-3">
                <Undo2
                  variant="outline"
                  onClick={handleCancelarCambiosPermisos}
                  className="cursor-pointer hover:text-(--primary)"
                  size={20}
                />
                <SaveAll
                  onClick={handleGuardarCambiosPermisos}
                  disabled={loadingPerms}
                  className="cursor-pointer hover:text-(--primary)"
                  size={20}
                />
              </div>
            </div>
          )}
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
                          disabled={!selectedRolId}
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
                    disabled={!selectedRolId}
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
      </div>
    </div>
  );
};
