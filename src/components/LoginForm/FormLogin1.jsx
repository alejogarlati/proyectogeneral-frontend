import React, { use } from "react";
import { Footer } from "../Footer/Footer.jsx";
import { useForm } from "react-hook-form";
import { getLogin } from "../../services/services.jsx";
import { useNavigate } from "react-router-dom";

export const FormLogin1 = () => {
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
    const user = await getLogin(data);
    console.log(data);
    // console.log(user);
    try {
      if (user.data.data) {
        alert("Inicio de sesión exitoso");
        navigate("/home");
      } else {
        alert("Error en el inicio de sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error interno: ", error.message);
    }
  });

  return (
    <div className="form-login-1 flex flex-col gap-12 items-center justify-center h-[92dvh]">
      <div className="flex flex-col gap-12 items-center justify-center bg-white p-18 flex flex-col gap-8 rounded-xl shadow-xl">
        <div className="logo-container">
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
              className="text-sm font-normal p-2 border rounded bg-(--color-armony) p-2 focus:outline-(--color-secondary) transition"
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
              className="text-sm font-normal p-2 border rounded bg-(--color-armony) p-2 focus:outline-(--color-secondary) transition"
              {...register("password", {
                required: "Contraseña inválida",
                maxLength: { value: 20 },
              })}
            />
          </fieldset>
          <button
            type="submit"
            className="mt-4 p-2 bg-(--color-primary) rounded transition text-(--color-bg)"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
