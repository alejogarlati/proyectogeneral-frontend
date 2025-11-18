import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const VentasVendedoresChart = (props) => {
  const COLORS_PALETTE = [
    "hsl(210 40% 98%)", // light blue
    "hsl(150 60% 50%)", // green
    "hsl(30 90% 60%)", // orange
    "hsl(270 70% 60%)", // purple
    "hsl(0 70% 60%)", // red
    "hsl(200 80% 60%)", // darker blue
    "hsl(60 80% 60%)", // yellow
    "hsl(330 70% 60%)", // pink
    "hsl(90 60% 45%)", // dark green
    "hsl(240 50% 50%)", // indigo
  ];

  const chartData = props.ventas.map((v) => ({
    ...v,
    ventasTotales: parseFloat(v.ventasTotales),
  }));

  const chartConfig = {
    ventasTotales: {
      label: "Ventas Totales",
      color: "hsl(142.1 76.2% 36.3%)",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="max-h-[300px]">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ right: 30, left: 20, top: 5 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="nombreVendedor"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[0]}
        />
        <YAxis
          tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value) =>
                `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              }
            />
          }
        />

        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="ventasTotales" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS_PALETTE[index % COLORS_PALETTE.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
