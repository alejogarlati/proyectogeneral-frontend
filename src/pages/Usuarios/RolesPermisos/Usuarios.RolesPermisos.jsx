import React from "react";
import { useNavigate } from "react-router-dom";

export const UsuariosRolesPermisos = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-20">
      <h1>Roles y permisos de usuario</h1>
      <button className='btn p-2 bg-(--primary)' onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
};

export const loader = () => {
  return null;
};
