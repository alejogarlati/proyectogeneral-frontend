import { useNavigate, useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { AppTable } from "@/components/Table/AppTable.jsx";

import { getUsers } from "@/services/services";
import { useState } from "react";
import { UserCard } from "@/components/UserCard/UserCard.jsx";

export const UsuariosGestionarUsuarios = () => {
  const navigate = useNavigate();

  const userList = useLoaderData();

  const [filteredUsers, setFilteredUsers] = useState(userList);

  const handleOnChange = (e) => {
    const filtered = userList.filter(
      (user) =>
        user.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.userMail.toLowerCase().includes(e.target.value.toLowerCase())
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
        </div>
        <div className="flex flex-col usersTable w-full mt-5">
          <AppTable
            caption="Esta es la lista de usuarios"
            headers={["Nombre", "Email", "Rol"]}
            userData={filteredUsers}
            columns={["userName", "userMail", "roleName"]}
            captionStyle="text-start"
            headStyle="w-[250px]"
            noDataStyle="mx-auto pt-4 text-center font-medium w-full"
          />
        </div>
      </div>
      <div className="col-span-4 bg-(--card) rounded p-4 shadow">
        <UserCard />
      </div>
    </div>
  );
};

export const loader = async () => {
  const usuarios = await getUsers();
  if (usuarios.data.success) {
    // console.log("Listado de Usuarios: ", usuarios.data.data);
    return usuarios.data.data;
  }
  return null;
};
