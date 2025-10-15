import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex flex-row gap-5 justify-center text-center text-(--color-secondary) h-[8dvh]">
      <div className="flex justify-center gap-5 mt-5">
        <Link to="/">Welcome</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};
