"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieData {
  name: string;
  completed: number;
}

interface PieChartProps {
  data: PieData[];
}

export default function CustomPieChart({ data }: PieChartProps) {
  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelClassName="text-foreground"
          />
          <Pie
            data={data}
            dataKey="completed"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="hsl(var(--chart-1))"
            paddingAngle={5}
            label={({ name, completed }) => `${name}: ${completed}`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`hsl(var(--chart-${(index % 5) + 1}))`} // Change color for each slice
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
