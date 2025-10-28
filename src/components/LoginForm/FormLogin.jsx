import React, { use } from "react";
import { Footer } from "../Footer/Footer.jsx";
import { useForm } from "react-hook-form";
import { getLogin } from "../../services/services.js";
import { useNavigate } from "react-router-dom";
import "./FormLogin.css";
import toast from "react-hot-toast";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    resetField,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const user = await getLogin(data);

      if (user.data.success) {
        toast.success("Inicio de sesión exitoso");
        sessionStorage.setItem("accessToken", user.data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(user.data.data));
        navigate("/");
      } else {
        toast.error("Error en el inicio de sesión");
      }
    } catch (error) {
      toast.error("Error en el inicio de sesión");
    }
  });

  return (
    <div className="form-login-1 flex flex-col gap-12 items-center justify-center h-[92dvh]">
      <div className="flex flex-col items-center justify-center bg-white p-18  gap-8 rounded-xl shadow-xl">
        <div className="logo-container w-40">
          <img
            src="./src/assets/logo_tradyOne_png.png"
            alt="Logo Kiosco Campus"
          />
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 text-(--color-secondary)"
        >
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="nombreUsuario" className="ml-2 text-xs">
              Usuario
            </label>
            <input
              id="email"
              type="text"
              placeholder="Tu correo electrónico"
              className="input-colors text-sm font-normal p-2 border rounded transition"
              {...register("email", {
                required: "Correo inválido",
              })}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="password" className="ml-2 text-xs ">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              className="input-colors text-sm font-normal p-2 border rounded transition"
              {...register("password", {
                required: "Contraseña inválida",
                maxLength: { value: 20 },
              })}
            />
          </fieldset>
          <button
            type="submit"
            className="mt-4 p-2 bg-(--primary) rounded transition text-(--primary-foreground) hover:bg-(--secondary) cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <div className="footer h-[1dvh] mt-4">
        <p className="footer-text text-xs">
          © 2025 P*A(2). Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};
