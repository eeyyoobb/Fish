"use client";

import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { More } from "@/components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskData {
  name: string;
  completed: number;
}

export default function PieChartContainer() {
  const [chartData, setChartData] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tribe, setTribe] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/pies");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTribe(data.tribeName);
        setChartData(data.chartData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError("Failed to load task completion data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 overflow-hidden mt-1">
        <CardTitle className="text-base font-medium">Completed Tasks by {tribe } Tribe</CardTitle>
        <More />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="w-full h-[400px] mt-6">
            <Skeleton className="w-full h-full" />
          </div>
        ) : error ? (
          <div className="w-full h-[400px] mt-6 flex items-center justify-center text-muted-foreground">
            {error}
          </div>
        ) : (
          <PieChart data={chartData} />
        )}
      </CardContent>
    </Card>
  );
}