import { useNavigate, useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { AppTable } from "@/components/Table/AppTable.jsx";

import { getUsers } from "@/services/services";
import { useEffect, useState } from "react";
import { UserCard } from "@/components/UserCard/UserCard.jsx";

export const UsuariosGestionarUsuarios = () => {

  const navigate = useNavigate();

  const userList = useLoaderData();

  const [selectedUser, setSelectedUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(userList);

  useEffect(() => {
    handleOnChange({ target: { value: document.getElementById("searchInput").value } })
  }, [roleFilter]);

  const handleOnChange = (e) => {
    const filtered = userList.filter(
      (user) =>
        (user.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.userMail.toLowerCase().includes(e.target.value.toLowerCase())) &&
        user.roleName.toLowerCase().includes(roleFilter ? roleFilter.toLowerCase() : "")
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="grid grid-cols-12 w-full gap-6 p-4">
      <div className="col-span-8 flex flex-col items-center justify-start w-full gap-2 p-8 bg-(--card) rounded-xl shadow">
        <div className="searchbar w-full py-4">
          <Input
            type="text"
            placeholder="Buscar"
            id="searchInput"
            name="searchInput"
            onChange={handleOnChange}
          />
          {roleFilter && (
            <div className="mt-1 ms-1 text-muted-foreground text-sm">Filtro Adicional: Rol({roleFilter})</div>
          )}
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
            onSelect={(row) => setSelectedUser(row)}
          />
        </div>
      </div>
      <div className="col-span-4 bg-(--card) rounded p-4 shadow">
        <UserCard
          datos={selectedUser}
          roleFilter={roleFilter}
          onRoleFilter={(roleName) => setRoleFilter(roleName)}
        />
      </div>
    </div>
  );
};

export const loader = async () => {
  const usuarios = await getUsers();
  if (usuarios.data.success) {
    return usuarios.data.data;
  }
  return null;
};
