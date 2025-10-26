import { getUsers } from "@/services/services";
import React from "react";
import { useNavigate } from "react-router-dom";

export const UsuariosGestionarUsuarios = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <button className='btn p-2 bg-(--primary)' onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
};

export const loader = async () => {
  const usuarios = await getUsers();
  if (usuarios.data.success) {
    console.log("Listado de Usuarios: ", usuarios.data.data); 
  }
  return null;
};


