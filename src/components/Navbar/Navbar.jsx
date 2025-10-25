import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.jsx";

export const Navbar = () => {
  return (
    <div className="bg-white">
      <nav className="flex items-center justify-between h-[6dvh] max-w-[1300px] mx-auto px-6">
        {/* Logo */}
        <div className="logo-container">
          <img src="./src/assets/logo_tradyOne_png.png" alt="Logo TradyOne" />
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-(--color-primary) text-sm font-medium">
          <Link to="/">Welcome</Link>
          <Link to="/login">Login</Link>
          <Button> Log Out </Button>
        </div>
      </nav>
    </div>
  );
};
