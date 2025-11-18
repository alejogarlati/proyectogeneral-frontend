import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { createUser, getDomiciliosByUserId } from "@/services/services";
import { getUserByEmail } from "@/services/services.js";
import { Eye, EyeOff, Plus, X } from "lucide-react";

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

  const getUserDomicilios = async (userId) => {
    try {
      const domicilios = (await getDomiciliosByUserId(userId)).data.data.data;
      return domicilios;
    } catch (error) {
      console.log("Error al obtener domicilios:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadDomicilios = async () => {
      const domicilios = await getUserDomicilios(props.user.id);

      console.log(domicilios);

      if (domicilios && domicilios.length > 0) {
        const domicilioPrincipal = domicilios[0];

        setValue("dir1Linea1", domicilioPrincipal.linea1 || "");
        setValue("dir1Linea2", domicilioPrincipal.linea2 || "");
        setValue(
          "provincia",
          domicilioPrincipal.provinciaId
            ? domicilioPrincipal.provinciaId.toString()
            : undefined
        );
        setValue("cityName", domicilioPrincipal.ciudadId || "");
      }
    };

    loadDomicilios();
  }, [props.user.id, setValue]);

  const [password, setPassword] = useState(null);
  const [toggleEye, setToggleEye] = useState(false);
  const [toggleEyeConf, setToggleEyeConf] = useState(false);
  const [newDirField, setNewDirField] = useState(false);
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

  const handleNewDir = () => setNewDirField(!newDirField);

  const [phoneValue, setPhoneValue] = useState();

  console.log("usuario: ", props.user.id);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 p-8"
    >
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Nombre</Label>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Nombre"
              defaultValue={props.user.userName}
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
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Apellido</Label>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              autoComplete="off"
              placeholder="Apellido"
              defaultValue={props.user.userLastName}
              {...register("lastName", {
                required: {
                  value: true,
                  message: "El apellido es obligatorio",
                },
              })}
            />
            {errors.lastName && (
              <p className="text-(--destructive) pl-2 text-xs">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Correo electrónico</Label>
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              autoComplete="off"
              placeholder="micorreo@misitio.com"
              defaultValue={props.user.userEmail}
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
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Fecha de nacimiento</Label>
          <div className="flex flex-col gap-2">
            <Input
              type="date"
              autoComplete="off"
              defaultValue={
                props.user.userBirthDate
                  ? new Date(props.user.userBirthDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              {...register("birthDate")}
            />
            {errors.birthDate && (
              <p className="text-(--destructive) pl-2 text-xs">
                {errors.birthDate.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr></hr>
      <p>Direcciones</p>
      {/* TO DO: Agregar acordeón de direcciones */}
      <div className="bg-(--card) rounded-xl shadow-xl">
        <Accordion
          type="multiple"
          defaultValue={["direccion-1", "direccion-2"]}
        >
          <AccordionItem
            value="direccion-1"
            className="flex flex-col gap-4 p-4"
          >
            <AccordionTrigger>Dirección principal</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <Label className="pl-1">Línea 1</Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      autoComplete="off"
                      // onClick={() => getUserDomicilios(props.user.id)}
                      {...register("dir1Linea1", {
                        required: {
                          value: true,
                          message: "La dirección es obligatoria",
                        },
                      })}
                    />
                    {errors.dir1Linea1 && (
                      <p className="text-(--destructive) pl-2 text-xs">
                        {errors.dir1Linea1.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="pl-1">Línea 2</Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      autoComplete="off"
                      {...register("dir1Linea2")}
                    />
                    {errors.dir1Linea2 && (
                      <p className="text-(--destructive) pl-2 text-xs">
                        {errors.dir1Linea2.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* PROVINCIA CIUDAD ----------------------- */}
              <div className="flex flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col gap-2">
                    <Controller
                      name="provincia"
                      control={control}
                      defaultValue={undefined}
                      rules={{
                        required: {
                          value: true,
                          message: "Provincia obligatoria",
                        },
                      }}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <Label className="pl-1">Provincia</Label>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent
                            position="popper"
                            side="bottom"
                            align="start"
                            sideOffset={6}
                            avoidCollisions={false}
                            className="max-h-60"
                          >
                            {props.provincias.map((provincia) => (
                              <SelectItem
                                key={provincia.id}
                                value={provincia.id.toString()}
                              >
                                {provincia.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.provincia && (
                      <p className="text-(--destructive) pl-2 text-xs">
                        {errors.provincia.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className="pl-1">Ciudad</Label>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="text"
                      autoComplete="off"
                      {...register("cityName", {
                        required: {
                          value: true,
                          message: "La ciudad es obligatoria",
                        },
                      })}
                    />
                    {errors.cityName && (
                      <p className="text-(--destructive) pl-2 text-xs">
                        {errors.cityName.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {!newDirField && (
            <AccordionItem
              value="btn-direccion-2"
              onClick={handleNewDir}
              className="p-4 hover:bg-(--muted) hover:underline cursor-pointer animate ease-in-out duration-200 flex flex-row gap-2 w-full items-center justify-center text-center"
            >
              <Plus />
              Añadir nueva dirección
            </AccordionItem>
          )}
          {newDirField && (
            <AccordionItem
              value="direccion-2"
              className="flex flex-col gap-4 p-4"
            >
              <div className="flex flex-row gap-4 w-full items-center">
                <button type="button" onClick={handleNewDir}>
                  <X />
                </button>
                <AccordionTrigger>Dirección secundaria</AccordionTrigger>
              </div>
              <AccordionContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <Label className="pl-1">Línea 1</Label>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        autoComplete="off"
                        {...register("dir2Linea1")}
                      />
                      {errors.dir2Linea1 && (
                        <p className="text-(--destructive) pl-2 text-xs">
                          {errors.dir2Linea1.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label className="pl-1">Línea 2</Label>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        autoComplete="off"
                        {...register("dir2Linea2")}
                      />
                      {errors.dir2Linea2 && (
                        <p className="text-(--destructive) pl-2 text-xs">
                          {errors.dir2Linea2.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* PROVINCIA CIUDAD ----------------------- */}
                <div className="flex flex-row gap-2 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-2">
                      <Controller
                        name="provincia2"
                        control={control}
                        defaultValue={undefined}
                        rules={{
                          required: {
                            value: true,
                            message: "Provincia obligatoria",
                          },
                        }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <Label className="pl-1">Provincia</Label>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              side="bottom"
                              align="start"
                              sideOffset={6}
                              avoidCollisions={false}
                              className="max-h-60"
                            >
                              {props.provincias.map((provincia2) => (
                                <SelectItem
                                  key={provincia2.id}
                                  value={provincia2.id.toString()}
                                >
                                  {provincia2.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.provincia2 && (
                        <p className="text-(--destructive) pl-2 text-xs">
                          {errors.provincia2.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Label className="pl-1">Ciudad</Label>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        autoComplete="off"
                        {...register("dir2Ciudad", {
                          required: {
                            value: true,
                            message: "La ciudad es obligatoria",
                          },
                        })}
                      />
                      {errors.dir2Ciudad && (
                        <p className="text-(--destructive) pl-2 text-xs">
                          {errors.dir2Ciudad.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-4">
        <p>Teléfono</p>
        <PhoneInput
          defaultCountry="AR"
          placeholder="+01 234 567 8910"
          value={phoneValue}
          onChange={setPhoneValue}
          inputComponent={Input}
          className="rounded-xl text-sm px-1"
          smartCaret={true}
        />
      </div>
      <hr></hr>
      {/* CONTRASEÑAS ----------------------- */}
      <div className="flex flex-row gap-2 justify-between w-full">
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Contraseña</Label>
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
        <div className="flex flex-col gap-2 w-full">
          <Label className="pl-1">Confirmar Contraseña</Label>
          <div className="flex flex-row gap-2">
            <Input
              type={toggleEyeConf ? "text" : "password"}
              autoComplete="off"
              placeholder="Las contraseñas deben coincidir"
              {...register("confirmPassword", {
                required: "La contraseña es obligatoria",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            <button
              type="button"
              onClick={() => setToggleEyeConf(!toggleEyeConf)}
            >
              {toggleEyeConf ? (
                <Eye className="text-(--muted-foreground) hover:text-(--primary) h-5 w-5 hover:scale-110 cursor-pointer animate ease-in-out duration-200" />
              ) : (
                <EyeOff className="text-(--muted-foreground) hover:text-(--primary) h-5 w-5 hover:scale-110 cursor-pointer animate ease-in-out duration-200" />
              )}
              {/* <Eye /> */}
            </button>
            {errors.confirmPassword && (
              <p className="text-(--destructive) pl-2 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr></hr>
      <div className="flex flex-col gap-2">
        <Controller
          name="role"
          control={control}
          defaultValue={props.user.userRole?.toString()}
          rules={{ required: { value: true, message: "Rol obligatorio" } }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <Label className="pl-1">Rol de usuario</Label>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Roles" />
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
      <Button type="submit">Editar Usuario</Button>
    </form>
  );
};
