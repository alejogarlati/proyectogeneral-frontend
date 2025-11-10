import { useLoaderData, useRevalidator } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { AppTable } from "@/components/Table/AppTable.jsx";

import { getRoles, getUsers, getProvincias } from "@/services/services";
import { useEffect, useState } from "react";
import { UserCard } from "@/components/UserCard/UserCard.jsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { ArrowRightFromLine } from "lucide-react";
import { AppSheet } from "@/components/AppSheet/AppSheet.jsx";
import { NewUserSheet } from "@/components/AppSheet/NewUserSheet/NewUserSheet.jsx";
import { EditUserSheet } from "@/components/AppSheet/EditUserSheet/EditUserSheet";

export const UsuariosGestionarUsuarios = () => {
  const userList = useLoaderData().userData;
  const rolesList = useLoaderData().rolesData;
  const provincesList = useLoaderData().provincesData;
  const { revalidate } = useRevalidator();
  const activeUser = JSON.parse(sessionStorage.getItem("user"));


  console.log(provincesList)
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(userList);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

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

  useEffect(() => {
    setFilteredUsers(userList);
  }, [userList]);

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
          (selectedUser && isOpen ? "col-span-8 " : "col-span-12 ") +
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
            {activeUser.userRoleId === 1 && (
              <AppSheet
                buttonTitle="Nuevo Usuario"
                sheetTitle="Crear Nuevo Usuario"
                sheetDescription="Modulo de Creacion de Usuario"
                children={
                  <NewUserSheet
                    roles={rolesList}
                    onCreate={() => revalidate()}
                  />
                }
              />
            )}
          </div>
          <ToggleGroup
            type="single"
            spacing={1}
            size="sm"
            value={roleFilter || ""}
            onValueChange={handleValueChange}
          >
            {rolesList.map((role, index) => (
              <ToggleGroupItem
                key={index}
                className="bg-(--secondary) text-(--primary-whited)"
                value={role.name}
                aria-label="Filtrar por rol de Administrador"
              >
                {role.name}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="flex flex-col usersTable w-full mt-3">
          <AppTable
            caption="Esta es la lista de usuarios"
            headers={["Nombre", "Email", "Rol"]}
            userData={filteredUsers}
            columns={["userFullName", "userEmail", "roleName"]}
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
        <div className="col-span-4 bg-(--card) rounded p-4 shadow">
          <UserCard
            datos={selectedUser}
            roleFilter={roleFilter}
            isOpen={(open) => setIsOpen(open)}
            onDelete={() => {
              setIsOpen(false);
              revalidate();
            }}
            onUpdate={() => {
              revalidate();
            }}
            activeUserRole={activeUser.userRoleId}
            rolesList={rolesList}
            provincesList={provincesList}
          />
        </div>
      )}
    </div>
  );
};

export const loader = async () => {
  const [usuarios, roles, provincias] = await Promise.all([getUsers(), getRoles(), getProvincias()]);

  const userData = usuarios.data.data.map((user) => ({
    ...user,
    userFullName: `${user.userName} ${user.userLastName}`,
  }));

  const rolesData = roles.data.data;

  const provincesData = provincias.data.data;

  return { userData, rolesData, provincesData};
};
