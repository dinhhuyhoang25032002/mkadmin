"use client";

// import { TrendingUp } from "lucide-react";
import moment from "moment";
import { useCallback } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  /// CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

type BarChartComponentProps = {
  dataX: Array<number>;
  dataTemperature?: Array<number>;
  dataHumidy?: Array<number>;
  title: string;
  dataLight?: Array<number>;
};
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartComponent({
  dataHumidy,
  dataLight,
  title,
  dataTemperature,
  dataX,
}: BarChartComponentProps) {
  const chartData = useCallback(() => {
    return dataX.map((xValue, index) => ({
      x: moment(xValue * 1000).format("D/M"),
      temperature: dataTemperature ? dataTemperature[index] : 0,
      light: dataLight ? dataLight[index] : 0,
      humidy: dataHumidy ? dataHumidy[index] : 0,
    }));
  }, [dataHumidy, dataLight, dataTemperature, dataX]);
  return (
    <Card className="">
      <CardHeader className="xs:p-2">
        <CardTitle className="xs:text-lg">{title}</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData()}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="x"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              interval={0}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="temperature" fill="#2596be" radius={4} />
            <Bar dataKey="light" fill="#e28743" radius={4} />
            <Bar dataKey="humidy" fill="#349425" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
