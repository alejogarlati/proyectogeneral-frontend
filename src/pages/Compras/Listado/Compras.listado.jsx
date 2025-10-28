import React from "react";
import { useNavigate } from "react-router-dom";

export const ComprasListado = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Listado de Compras</h1>
      <button className='btn p-2 bg-(--primary)' onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
};

export const loader = () => {
  return null;
};