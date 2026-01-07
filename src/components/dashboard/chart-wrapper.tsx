'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartWrapperProps {
  title: string;
  subtitle: string;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  children: ReactNode;
  cardClassName?: string;
}

export function ChartWrapper({
  title,
  subtitle,
  filters = ['Daily', 'Weekly', 'Monthly'],
  onFilterChange,
  children,
  cardClassName = "bg-[#1D1D41] border-[#2a2d4a]",
}: Readonly<ChartWrapperProps>) {
  return (
    <Card className={cardClassName}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{title}</CardTitle>
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          </div>
          <div className="flex gap-2">
            {filters.map((filter, idx) => (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange?.(filter)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  idx === 0
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
}
