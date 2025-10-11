import React from "react";
import { FormLogin1 } from "../../components/LoginForm/FormLogin1.jsx";
import { Navbar } from "../../components/Navbar/Navbar.jsx";

export const Login = () => {
  return (
    <div className="bg-(--color-armony)">
      <Navbar />
      <div className="login-page flex flex-col items-center justify-center">
        <FormLogin1 />
      </div>
    </div>
  );
};
