import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductosPrecios = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Productos</h1>
      <button className='btn p-2 bg-(--primary)' onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
};

export const loader = () => {
  return null;
};
