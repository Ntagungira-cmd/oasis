import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { AreaChartProps, VisitsData } from "@/types";

const WebsiteVisitsChart: React.FC<AreaChartProps> = ({
  data=[],
  title = "Total visits",
  total,
}) => {
  const trendColor = total?.isPositive ? "text-emerald-500" : "text-red-500";
  const TrendIcon = total?.isPositive ? TrendingUp : TrendingDown;

  // Format the total value
  const formatValue = (value: number | string) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return `${(numValue / 1).toFixed(1)}k`;
  };

  // Calculate percentage with proper decimal places
  const calculatePercentage = (value: number | string) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return (numValue / 1000).toFixed(1);
  };

  //map each visit in data to a day starting from 30 days ago
  const mappedData = mapVisitsToDates(data);

  return (
    <Card className="w-full bg-gradient-to-b from-blue-100 to-blue-600 shadow-none border-0">
      <CardHeader className="pl-10">
        <CardTitle className="text-sm font-medium text-blue-500">
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          <CardDescription className="!text-2xl font-bold text-white">
            {formatValue(total?.value ?? 0 )}
          </CardDescription>
          <div className={cn("flex items-center", trendColor)}>
            <TrendIcon className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">
              {calculatePercentage(total?.value ?? 0)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mappedData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="date"
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              />
              <defs>
                <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#57C3FF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#57C3FF" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg bg-blue-100 p-3 shadow-lg border border-blue-100">
                        <div className="space-y-1">
                          <p className="text-sm text-blue-500 font-semibold">{label}</p>
                          <p className="text-base font-medium text-white">
                            visits: {payload[0].value?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#57C3FF"
                strokeWidth={2}
                fill="url(#visitGradient)"
                fillOpacity={1}
                dot={false}
                activeDot={{
                  r: 4,
                  style: { fill: "#57C3FF", opacity: 1 },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to map visits to dates
function mapVisitsToDates(
  visits: VisitsData[]
): {date:string ,visits: number }[] {
  const today = new Date();
  const mappedData: { date: string; visits: number }[] = [];

  for (let i = 0; i < visits.length; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (visits.length - i));

    mappedData.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      visits: visits[i].visits,
    });
  }

  return mappedData;
}

export default WebsiteVisitsChart;
