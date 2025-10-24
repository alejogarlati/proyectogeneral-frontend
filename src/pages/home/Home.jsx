import React from 'react'
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");
  }


  return (
    <div>
        <h1> Home Page </h1>
          <button onClick={logout} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            LogOut
          </button>
    </div>
  )
}

export const loader = () => {
    return null;
}

