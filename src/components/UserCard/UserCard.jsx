import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const UserCard = (props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12">
      <Avatar className="h-25 w-25">
        <AvatarFallback className="text-3xl font-bold">AS</AvatarFallback>
      </Avatar>
      <div className="text-center flex flex-col items-center">
        <h1 className="text-2xl font-semibold">{props.datos.userName}</h1>
        <h3 className="text-sm">{props.datos.userMail}</h3>
        <Button className="w-full mt-4">{props.datos.roleName}</Button>
      </div>
      {/* <h2 className="">Administrador</h2> */}
    </div>
  );
};
