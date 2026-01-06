"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  filters?: string[];
}

export function ChartCard({ title, subtitle, children, filters = ["Today", "Weekly", "Monthly"] }: Readonly<ChartCardProps>) {
  return (
    <Card className="bg-[#1a1d3a] border-[#2a2d4a]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{title}</CardTitle>
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            {filters.map((filter, index) => (
              <Badge
                key={filter}
                variant={index === 0 ? "default" : "outline"}
                className={
                  index === 0
                    ? "bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30"
                    : "bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800"
                }
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
