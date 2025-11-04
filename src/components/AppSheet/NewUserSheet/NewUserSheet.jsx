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

  const password = watch("password");

  const [requirements, setRequirements] = useState({
    minLength: false,
    maxLength: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Validar requisitos dinámicamente
  const validatePassword = (value) => {
    setRequirements({
      minLength: value.length >= 8,
      maxLength: value.length <= 20,
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[*+-@$&#]/.test(value),
    });
  };

  const onSubmit = async (data) => {
    const requisitosPassword = Object.values(requirements).some(
      (value) => !value
    );
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex flex-col gap-4">
        <Label>Nombre Completo</Label>
        <Input type="username" placeholder="Nombre y Apellido" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Correo electrónico</Label>
        <Input type="email" placeholder="micorreo@misitio.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Contraseña temporal</Label>
        <Input
          type="password"
          placeholder="Mínimo 8 caracteres"
          onChange={(e) => validatePassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Confirmar Contraseña</Label>
        <Input type="password" placeholder="Las contraseñas deben coincidir" />
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
      <Button>Crear Usuario</Button>
    </div>
  );
};
