import { useNavigate, useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { AppTable } from "@/components/Table/AppTable.jsx";

import { getRoles, getUsers } from "@/services/services";
import { useEffect, useState } from "react";
import { UserCard } from "@/components/UserCard/UserCard.jsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ArrowRightFromLine } from "lucide-react";
import { AppSheet } from "@/components/AppSheet/AppSheet.jsx";
import { NewUserSheet } from "@/components/AppSheet/NewUserSheet/NewUserSheet.jsx";

export const UsuariosGestionarUsuarios = () => {
  const navigate = useNavigate();

  const userList = useLoaderData().userData;
  const rolesList = useLoaderData().rolesData;

  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(userList);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    handleOnChange({
      target: { value: document.getElementById("searchInput").value },
    });
  }, [roleFilter]);

  useEffect(() => {
    setIsOpen(true);
  }, [selectedUser]);

  useEffect(() => {
    setSelectedUser(null);
  }, [isOpen]);

  const handleOnChange = (e) => {
    const filtered = userList.filter(
      (user) =>
        (user.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          user.userMail.toLowerCase().includes(e.target.value.toLowerCase())) &&
        user.roleName
          .toLowerCase()
          .includes(roleFilter ? roleFilter.toLowerCase() : "")
    );
    setFilteredUsers(filtered);
  };

  const handleValueChange = (val) => {
    setRoleFilter(val === roleFilter ? null : val);
  };

  return (
    <div className="grid grid-cols-12 w-full gap-6 p-4">
      <div
        className={
          (selectedUser && isOpen ? "col-span-9 " : "col-span-12 ") +
          "flex flex-col items-center justify-start w-full gap-2 p-8 bg-(--card) rounded-xl shadow"
        }
      >
        <div className="w-full flex flex-col gap-3">
          <div className="flex flex-row gap-2 ">
            <Input
              type="text"
              placeholder="Buscar"
              id="searchInput"
              name="searchInput"
              onChange={handleOnChange}
            />
            {/* <Button> */}
            <AppSheet
              buttonTitle="Nuevo Usuario"
              sheetTitle="Crear Nuevo Usuario"
              sheetDescription="Modulo de Creacion de Usuario"
              children={<NewUserSheet roles={rolesList}/>}
            />
            {/* </Button> */}
          </div>
          <ToggleGroup
            type="single"
            spacing={1}
            size="sm"
            value={roleFilter || ""}
            onValueChange={handleValueChange}
          >
            <ToggleGroupItem
              className="bg-(--secondary) text-(--primary-whited)"
              value="Administrador"
              aria-label="Filtrar por rol de Administrador"
            >
              Administrador
            </ToggleGroupItem>
            <ToggleGroupItem
              className="bg-(--secondary) text-(--primary-whited)"
              value="Vendedor"
              aria-label="Filtrar por rol de Vendedor"
            >
              Vendedor
            </ToggleGroupItem>
            <ToggleGroupItem
              className="bg-(--secondary) text-(--primary-whited)"
              value="Compras"
              aria-label="Filtrar por rol de Compras"
            >
              Compras
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col usersTable w-full mt-3">
          <AppTable
            caption="Esta es la lista de usuarios"
            headers={["Nombre", "Email", "Rol"]}
            userData={filteredUsers}
            columns={["userName", "userMail", "roleName"]}
            captionStyle="text-start"
            headStyle="w-[250px]"
            noDataStyle="mx-auto pt-4 text-center font-medium w-full"
            onSelect={(row) => {
              setSelectedUser(row);
            }}
          />
        </div>
      </div>
      {selectedUser && isOpen && (
        <div className="col-span-3 bg-(--card) rounded p-4 shadow">
          <UserCard
            datos={selectedUser}
            roleFilter={roleFilter}
            isOpen={(open) => setIsOpen(open)}
          />
        </div>
      )}
    </div>
  );
};

export const loader = async () => {
  const [usuarios, roles] = await Promise.all([
    getUsers(),
    getRoles(),
  ]);

  const userData = usuarios.data.data;

  const rolesData = roles.data.data;

  return {userData, rolesData};
};
