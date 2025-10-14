import React from "react";
import { Footer } from "../Footer/Footer.jsx";
import {useForm} from "react-hook-form";

export const FormLogin1 = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    resetField,
    setValue
  } = useForm();


  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="form-login-1 flex flex-col gap-12 items-center justify-center h-[92dvh]">
      <div className="bg-white p-18 flex flex-col gap-8 rounded-xl shadow-xl">
        <h1 className="text-5xl text-(--color-secondary) max-w-85 text-center">
          Formulario de Inicio de Sesión
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-6 text-(--color-secondary)">
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="nombreUsuario" className="ml-2 text-xs">
              Usuario
            </label>
            <input
              id="nombreUsuario"
              type="text"
              placeholder="Tu nombre de usuario"
              className="text-sm font-normal p-2 border rounded bg-(--color-armony) p-2 focus:outline-(--color-secondary) transition"
              {...register("nombreUsuario", { 
                  required: "Nombre de usuario inválido", 
                  maxLength: {value: 20, message: "El nombre de usuario no puede exceder los 20 caracteres"}
                  })
              }
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="passUsuario" className="ml-2 text-xs ">
              Contraseña
            </label>
            <input
              id="passUsuario"
              type="text"
              placeholder="Tu contraseña"
              className="text-sm font-normal p-2 border rounded bg-(--color-armony) p-2 focus:outline-(--color-secondary) transition"
              {...register("passUsuario", {
                required: "Contraseña inválida",
                maxLength: {value: 20, message: "La contraseña no puede exceder los 20 caracteres"}
              })}
            />
          </fieldset>
          <button
            type="submit"
            className="mt-4 p-2 bg-(--color-secondary) rounded transition text-(--color-armony)"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
