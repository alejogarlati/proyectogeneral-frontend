import { Controller, useForm } from "react-hook-form";
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
import { SheetClose } from "@/components/ui/sheet";
import { createUser } from "@/services/services";
import { getUserByEmail } from "@/services/services.js";

import { Eye, EyeOff } from "lucide-react";

export const NewUserSheet = (props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    resetField,
    setValue,
  } = useForm();
  
  const [password, setPassword] = useState(null);
  const [toggleEye, setToggleEye] = useState(false);
  const [open, setOpen] = useState(true);
  const [requirements, setRequirements] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

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
      const datos = {
        userName: data.fullName,
        userMail: data.email,
        userDate: new Date().toISOString(),
        userRole: parseInt(data.role),
        password: data.password,
      };
      try {
        const repeatedEmail = await getUserByEmail({ email: data.email });
        if (repeatedEmail.status === 204) {
          const newUser = await createUser(datos);
          if (newUser.status === 201) {
            toast.success("Usuario creado exitosamente.");
            props.onCreate?.();
            props.closeSheet();
            reset();
          }
        } else {
          toast.error("El email ya se encuentra registrado");
        }
      } catch (error) {
        console.log("Error creating user: ", error);
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 p-4"
    >
      <div className="flex flex-col gap-2">
        <Label className="pl-1">Nombre Completo</Label>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            autoComplete="off"
            placeholder="Nombre y Apellido"
            {...register("fullName", {
              required: { value: true, message: "El nombre es obligatorio" },
            })}
          />
          {errors.fullName && (
            <p className="text-(--destructive) pl-2 text-xs">
              {errors.fullName.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="pl-1">Correo electrónico</Label>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            autoComplete="off"
            placeholder="micorreo@misitio.com"
            {...register("email", {
              required: { value: true, message: "El email es obligatorio" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                message: "Ingrese un email válido",
              },
            })}
          />
          {errors.email && (
            <p className="text-(--destructive) pl-2 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label className="pl-1">Contraseña temporal</Label>
        <div className="flex flex-row gap-2 items-center justify-end">
          <Input
            id="password"
            type={toggleEye ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            {...register("password", {
              required: { value: true, message: "Contraseña Obligatoria" },
            })}
            onChange={(e) => validatePassword(e.target.value)}
          />
          <button type="button" onClick={() => setToggleEye(!toggleEye)}>
            {toggleEye ? (
              <Eye className="text-(--muted-foreground) hover:text-(--primary) h-5 w-5 hover:scale-110 cursor-pointer animate ease-in-out duration-200" />
            ) : (
              <EyeOff className="text-(--muted-foreground) hover:text-(--primary) h-5 w-5 hover:scale-110 cursor-pointer animate ease-in-out duration-200" />
            )}
            {/* <Eye /> */}
          </button>
        </div>
        {errors.password && (
          <p className="text-(--destructive) pl-2 text-xs">
            {errors.password.message}
          </p>
        )}
        {password?.length > 0 && (
          <div className="mt-2 px-2 justify-between text-xs text-(--muted-foreground)">
            <ul className="flex flex-col gap-1">
              <li
                className={
                  requirements.minLength
                    ? "text-(--primary)"
                    : "text-(--muted-foreground)"
                }
              >
                Al menos 8 caracteres
              </li>
              <li
                className={
                  requirements.maxLength
                    ? "text-(--primary)"
                    : "text-(--muted-foreground)"
                }
              >
                Máximo 20 caracteres
              </li>
              <li
                className={
                  requirements.uppercase
                    ? "text-(--primary)"
                    : "text-(--muted-foreground)"
                }
              >
                Una letra mayúscula
              </li>
              <li
                className={
                  requirements.number
                    ? "text-(--primary)"
                    : "text-(--muted-foreground)"
                }
              >
                Un número
              </li>
              <li
                className={
                  requirements.specialChar
                    ? "text-(--primary)"
                    : "text-(--muted-foreground)"
                }
              >
                Un carácter especial (! * + - @ $ & # ¡ ¿ ?)
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label className="pl-1">Confirmar Contraseña</Label>
        <div className="flex flex-col gap-2">
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
          {errors.confirmPassword && (
            <p className="text-(--destructive) pl-2 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-2">
        <Controller
          name="role"
          control={control}
          defaultValue={undefined}
          rules={{ required: { value: true, message: "Rol obligatorio" } }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <Label className="pl-1">Rol de usuario</Label>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Roles"/>
              </SelectTrigger>
              <SelectContent>
                {props.roles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.role && (
          <p className="text-(--destructive) pl-2 text-xs">
            {errors.role.message}
          </p>
        )}
      </div>
      <Button type="submit">Crear Usuario</Button>
    </form>
  );
};
