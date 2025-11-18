import { useLoaderData, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar.jsx";
import { VentasVendedoresChart } from "@/components/Charts/VentasVendedoresChart.jsx";

import {Link2} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNoticias, getVentasTotalesVendedor } from "@/services/services.js";

export const Home = () => {
  const navigate = useNavigate();

    const noticias = useLoaderData().noticias.data.data;
  const ventas = useLoaderData().ventasVendedor.data.data;
  
  return (
    <div className="flex flex-col gap-4 p-4">
       <div className="flex w-full flex-col gap-4 p-8 bg-(--card) rounded-xl">
        <h1 className="font-bold">Noticias del día</h1>
        <Carousel
          className="w-full"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="-ml-1 w-full">
            {noticias.map((n) => (
              <CarouselItem
                key={n.article_id}
                className="pl-1 xl:basis-1/4 sm:basis-1/3"
              >
                <div>
                  <Card className="flex flex-col gap-4 max-h-60">
                    <CardHeader>
                      <CardTitle className="text-sm line-clamp-1">
                        {n.title}
                        </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {n.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <img
                        src={n.image_url}
                        className="rounded w-full max-h-15 overflow-hidden object-cover"
                      />
                      <a
                      href={n.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      >
                        <Link2 className="inline-block mr-2 mb-1" size={14} />
                      </a>
                      </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel> 
      </div>
      <div className="flex w-1/2 flex-col gap-4 p-8 bg-(--card) rounded-xl">
        <h1 className="font-bold">Ventas Totales por Vendedor</h1>
        <VentasVendedoresChart ventas={ventas.data}/>
      </div>
    </div>
  );
};

export const loader = async () => {
  const [noticias, ventasVendedor] = await Promise.all([getNoticias(), getVentasTotalesVendedor()]);
  return {noticias, ventasVendedor};
};
