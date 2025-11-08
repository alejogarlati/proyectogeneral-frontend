import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { deleteUser } from "@/services/services";
import { Button } from "@headlessui/react";

import { Pencil, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import { takeInitials } from "@/utilities/takeInitials";
import { AppSheet } from "../AppSheet/AppSheet";
import { EditUserSheet } from "../AppSheet/EditUserSheet/EditUserSheet";

export const UserCard = (props) => {
  const handleDelete = async (user) => {
    try {
      await deleteUser(user.id);
      toast.success("Usuario eliminado exitosamente.");
      props.onDelete?.();
    } catch (error) {
      toast.error("Error al eliminar el usuario.");
    }
  };

  const handleCollapser = (open) => props.isOpen?.(false);

  return (
    <>
      <div className="flex justify-end">
        <Button>
          <X
            className="text-(--secondary)"
            cursor="pointer"
            onClick={() => handleCollapser()}
          />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-12 h-full">
        <Avatar className="h-25 w-25">
          <AvatarFallback className="text-3xl font-bold">
            {takeInitials(props.datos?.userFullName)}
          </AvatarFallback>
        </Avatar>
        <div className="text-center flex flex-col items-center">
          <h1 className="text-2xl font-semibold">
            {props.datos?.userFullName}
          </h1>
          <h3 className="text-sm">{props.datos?.userEmail}</h3>
          <Badge className="mt-4">{props.datos?.roleName}</Badge>
        </div>
        <div className="flex flex-row gap-6 mt-2">
          <AppSheet
            buttonClassName="bg-transparent text-(--primary) hover:text-(--secondary) hover:bg-transparent cursor-pointer"
            sheetClassName="sm:max-w-xl"
            buttonTitle={<Pencil />}
            sheetTitle="Editar Datos del Usuario"
            sheetDescription="Modulo de Edición de datos de un Usuario"
            children={<EditUserSheet user={props.datos} roles={props.rolesList}/>}
          />
          <Button
            variant="secondary"
            className="text-(--destructive) hover:text-(--hover-destructive) cursor-pointer"
            onClick={() => handleDelete(props.datos)}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </>
  );
};
