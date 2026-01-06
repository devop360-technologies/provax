'use client';

import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Alert {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: 'warning' | 'error' | 'info';
  color: 'red' | 'pink' | 'cyan' | 'blue';
}

interface RealTimeAlertsProps {
  alerts?: Alert[];
}

const defaultAlerts: Alert[] = [
  {
    id: '1',
    title: 'New Dispute Reported',
    description: 'Transaction #45872 has a new dispute claim',
    time: '5 min ago',
    icon: 'warning',
    color: 'red',
  },
  {
    id: '2',
    title: 'Failed Payment',
    description: 'Subscription payment failed for user #8921',
    time: '12 min ago',
    icon: 'error',
    color: 'pink',
  },
  {
    id: '3',
    title: 'AI Certification Error',
    description: 'Vehicle certification process encountered an error',
    time: '25 min ago',
    icon: 'info',
    color: 'cyan',
  },
  {
    id: '4',
    title: 'Expiring Certifications',
    description: '14 vehicle certifications expiring in next 7 days',
    time: '1 hour ago',
    icon: 'info',
    color: 'blue',
  },
];

const iconBgMap = {
  red: 'bg-red-500/20',
  pink: 'bg-pink-500/20',
  cyan: 'bg-cyan-500/20',
  blue: 'bg-blue-500/20',
};

const iconColorMap = {
  red: 'text-red-400',
  pink: 'text-pink-400',
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
};

const borderColorMap = {
  red: 'border-l-red-500',
  pink: 'border-l-pink-500',
  cyan: 'border-l-cyan-500',
  blue: 'border-l-blue-500',
};

export function RealTimeAlerts({ alerts = defaultAlerts }: Readonly<RealTimeAlertsProps>) {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'warning':
        return AlertTriangle;
      case 'error':
        return AlertTriangle;
      case 'info':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  return (
    <Card className="bg-[#1D1D41] border-[#2a2d4a]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">Real - Time Alerts</CardTitle>
        <button className="text-[10px] p-1 border rounded bg-gray-600 hover:text-white transition-colors">View All</button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {alerts.map((alert) => {
            const Icon = getIcon(alert.icon);
            const bgColor = iconBgMap[alert.color];
            const iconColor = iconColorMap[alert.color];
            const borderColor = borderColorMap[alert.color];

            return (
              <div
                key={alert.id}
                className={`bg-[#23234B]/50 border border-[#2a2d4a] border-l-4 ${borderColor} rounded-lg p-4 flex gap-3`}
              >
                {/* Icon */}
                <div className={`${bgColor} rounded-lg p-3 flex-shrink-0 flex items-center justify-center`}>
                  <Icon className={`${iconColor} w-5 h-5`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm">{alert.title}</h4>
                  <p className="text-gray-400 text-xs mt-1">{alert.description}</p>
                </div>

                {/* Time */}
                <div className="text-gray-500 text-xs flex-shrink-0 whitespace-nowrap">{alert.time}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
