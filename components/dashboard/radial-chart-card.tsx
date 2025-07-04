import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Pie, PieChart, ResponsiveContainer, Text } from "recharts";

interface RadialChartCardProps {
  title: string;
  value: number;
  description: string;
}

export function RadialChartCard({ title, value, description }: RadialChartCardProps) {
  const chartData = [{
    browser: "desktop",
    visitors: value,
    fill: "var(--color-primary)",
  }, {
    browser: "mobile",
    visitors: 100 - value,
    fill: "var(--color-muted)",
  }];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
        <div className="flex items-center justify-center gap-2 text-2xl font-bold tabular-nums leading-none">
          {value}%
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center justify-center pb-0">
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-48 w-48"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="visitors"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={2}
              cornerRadius={5}
              startAngle={90}
              endAngle={450}
            />
            <Text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-3xl font-bold"
            >
              {value}%
            </Text>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardContent className="flex flex-col gap-2 text-center text-sm">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}