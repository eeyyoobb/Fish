"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AttendanceData {
  name: string;
  completed: number;
}

interface AttendanceChartProps {
  data: AttendanceData[];
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={40}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className="stroke-muted"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            className="text-muted-foreground text-xs"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            className="text-muted-foreground text-xs"
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelClassName="text-foreground"
          />
          <Bar
            dataKey="completed"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}