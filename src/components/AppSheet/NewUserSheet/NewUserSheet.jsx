import { useForm } from "react-hook-form";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import toast from "react-hot-toast";

export const NewUserSheet = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    resetField,
    setValue,
  } = useForm();

  const [password, setPassword] = useState(null);

  const [requirements, setRequirements] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Validar requisitos dinámicamente
  const validatePassword = (value) => {
    setPassword(value);
    setRequirements({
      minLength: value.length >= 8,
      maxLength: value.length <= 20,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[*+\-@$&#!¡¿?]/.test(value),
    });
  };

  const onSubmit = async (data) => {
    const requisitosPassword = Object.values(requirements).some(
      (value) => !value
    );
    if (requisitosPassword) {
      toast.error("La contraseña no cumple con los requisitos.");
    } else {
      // Lógica para enviar los datos al servidor o manejar el formulario
      console.log("Datos del formulario:", data);
      toast.success("Usuario creado exitosamente.");
      reset();
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-4">
        <Label>Nombre Completo</Label>
        <Input
          type="text"
          autoComplete="off"
          placeholder="Nombre y Apellido"
          {...register("fullName", { required: "El nombre es obligatorio" })}
        />
        {errors.fullName && (
          <p className="text-danger">{"Ingrese un nombre válido"}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Correo electrónico</Label>
        <Input
          type="email"
          autoComplete="off"
          placeholder="micorreo@misitio.com"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
          })}
        />
        {errors.email && (
          <p className="text-danger">{"Ingrese un email válido"}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Contraseña temporal</Label>
        <Input
          type="password"
          autoComplete="off"
          placeholder="Mínimo 8 caracteres"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          onChange={(e) => validatePassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        {password?.length > 0 && (
          <div className="mt-2 px-2 justify-between text-xs text-(--muted-foreground)">
            <ul className="flex flex-col gap-1">
              <li className={requirements.minLength ? "text-(--primary)" : "text-(--muted-foreground)"}>
                Al menos 8 caracteres
              </li>
              <li className={requirements.maxLength ? "text-(--primary)" : "text-(--muted-foreground)"}>
                Máximo 20 caracteres
              </li>
              <li className={requirements.uppercase ? "text-(--primary)" : "text-(--muted-foreground)"}>
                Una letra mayúscula
              </li>
              <li className={requirements.number ? "text-(--primary)" : "text-(--muted-foreground)"}>
                Un número
              </li>
              <li className={requirements.specialChar ? "text-(--primary)" : "text-(--muted-foreground)"}>
                Un carácter especial (! * + - @ $ & # ¡ ¿ ?)
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Confirmar Contraseña</Label>
        <Input
          type="password"
          autoComplete="off"
          placeholder="Las contraseñas deben coincidir"
          {...register("confirmPassword", {
            required: "La contraseña es obligatoria",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
      </div>
      <hr></hr>
      <div className="flex flex-col gap-2">
        <Select>
          <Label>Rol de usuario</Label>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Roles" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectGroup className="flex flex-col p-2 gap-1"> */}
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
            {/* </SelectGroup> */}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Crear Usuario</Button>
    </form>
  );
};
