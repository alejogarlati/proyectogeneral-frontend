import React from "react";
import { useNavigate } from "react-router-dom";

export const Preferencias = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Preferencias</h1>
      <button className='btn p-2 bg-(--primary)' onClick={() => navigate("/")}>Ir al Home</button>
    </div>
  );
};

export const loader = () => {
  return null;
};
