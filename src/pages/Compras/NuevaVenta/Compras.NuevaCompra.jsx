import React from "react";
import { useNavigate } from "react-router-dom";

export const ComprasNuevaCompra = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Nueva Compra</h1>
      <button className='btn p-2 bg-(--primary)' onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
};

export const loader = () => {
  return null;
};