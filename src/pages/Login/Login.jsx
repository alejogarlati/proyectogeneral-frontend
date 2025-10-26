import React from "react";
import { FormLogin } from "../../components/LoginForm/FormLogin.jsx";
import { Toaster } from "react-hot-toast";

export const Login = () => {
  return (
    <div className="bg-(--color-armony)">
      {/* <Sidebar /> */}
      <div className="login-page flex flex-col items-center justify-center">
        <FormLogin />
      </div>
      <Toaster />
    </div>
  );
};
