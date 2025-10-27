import { getUsers } from "@/services/services";
import React from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Input } from "@/components/ui/input"

export const UsuariosGestionarUsuarios = () => {
  const navigate = useNavigate();

  const userList = useLoaderData();

  const handleOnChange = (e) => {
    // console.log(e.target.value)
    const filteredUsers = userList.filter((user) =>
        user.userName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(filteredUsers);
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
        <div className="usersTable w-full">
          <h2>Table de usuarios</h2>
        </div>
      </div>
      <div className="col-span-6 bg-(--primary)">
        <p> Lorem ipsum </p>
      </div>
    </div>
  );
};

export const loader = async () => {
  const usuarios = await getUsers();
  if (usuarios.data.success) {
    // console.log("Listado de Usuarios: ", usuarios.data.data);
    return usuarios.data.data
  }
  return null;
};