import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar.jsx";

export const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="grid grid-cols-12">
      <div className="sidebar col-span-2">
        <div className='flex flex-col gap-5 justify-between bg-(--color-primary) h-[90dvh] mx-auto p-10'>
          <h1> Home Page </h1>
          <h1 className="text-xxl"> ME FUI A COMER </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            LogOut
          </button>
        </div>
      </div>
      <div className="col-span-10 p-10">
        {/* <Dashboard /> */}
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export const loader = () => {
  return null;
};
