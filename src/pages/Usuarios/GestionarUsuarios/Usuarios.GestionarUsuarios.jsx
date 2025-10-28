import { useNavigate, useLoaderData } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { AppTable } from "@/components/Table/AppTable.jsx";

import { getUsers } from "@/services/services";
import { useState } from "react";

export const UsuariosGestionarUsuarios = () => {
  const navigate = useNavigate();

  const userList = useLoaderData();

  const [filteredUsers, setFilteredUsers] = useState(userList); 
  
  const handleOnChange = (e) => {
    const filtered = userList.filter((user) =>
      user.userName.toLowerCase().includes(e.target.value.toLowerCase() ) || 
      user.userMail.toLowerCase().includes(e.target.value.toLowerCase() )
    );
    setFilteredUsers(filtered);
  };


  return (
    <div className="grid grid-cols-12 w-full gap-4 h-screen">
      <div className="col-span-6 flex flex-col items-center justify-start w-full gap-2 rounded rounded-xl p-4">
        <div className="searchbar w-full">
          <Input
            type="text"
            placeholder="Buscar"
            id="searchInput"
            name="searchInput"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col usersTable w-full">
          <AppTable
            caption="Esta es la lista de usuarios"
            headers={["Nombre", "Email", "Rol"]}
            userData = {filteredUsers}
            columns = {["userName", "userMail", "roleName"]}
          />
        </div>
      </div>
      <div className="col-span-6 bg-(--primary) rounded p-4">
        <p> Lorem ipsum </p>
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
