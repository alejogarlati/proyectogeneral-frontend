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

export const EditUserSheet = (props) => {
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
        userLastName: data.lastName,
        userName: data.firstName,
        userEmail: data.email,
        userBirthDate: null,
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
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Apellido</Label>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Apellido"
              {...register("lastName", {
                required: { value: true, message: "El apellido es obligatorio" },
              })}
            />
            {errors.lastName && (
              <p className="text-(--destructive) pl-2 text-xs">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Nombre</Label>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Nombre"
              {...register("firstName", {
                required: { value: true, message: "El nombre es obligatorio" },
              })}
            />
            {errors.firstName && (
              <p className="text-(--destructive) pl-2 text-xs">
                {errors.firstName.message}
              </p>
            )}
          </div>
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
              {/* <SelectContent>
                {props.roles.map((role) => (
                  <SelectItem key={role.id} value={role.id.toString()}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent> */}
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
