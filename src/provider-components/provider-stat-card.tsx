'use client';

import { ArrowUpRight, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProvidetStatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  iconSrc?: string;
  iconColor?: string;
  iconBg: string;
}

export function ProvidetStatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconSrc,
  iconColor,
  iconBg,
}: ProvidetStatCardProps) {
  const getChangeTypeBg = () => {
    if (changeType === 'positive') return 'bg-green-400';
    if (changeType === 'negative') return 'bg-red-400';
    return 'bg-gray-400';
  };

  const renderIcon = () => {
    if (iconSrc) {
      return (
        <Image
          src={iconSrc}
          alt={title}
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
      );
    }
    if (Icon) {
      return <Icon className={cn('w-5 h-5', iconColor)} />;
    }
    return null;
  };

  return (
     <div className="bg-gradient-to-b from-[#22224A] to-[#131230] border border-[#2a2d4a] rounded-2xl p-6 hover:border-[#3a3d5a] transition-colors">

     <div className=" items-start gap-4">

      <div className="flex gap-2  w-full mb-4">
        {/* Icon Section */}
        <div className={cn('p-3 rounded-xl flex-shrink-0 flex items-center justify-center', iconBg)}>
          {renderIcon()}
        </div>

        {/* Content Section */}
          <p className="text-sm text-gray-100 font-light my-2">{title}</p>

          </div>

          <div className="flex justify-between items-center w-full">

        {/* Change Indicator */}
          <p className="text-xl font-bold text-white">{value}</p>
        <div className="flex items-center gap-1 flex-shrink-0">
          <span
            className={cn(
              'text-sm font-medium flex items-center gap-1 rounded p-1',
              getChangeTypeBg()
            )}
          >
            {change.split(' ')[0]}
          </span>
        </div>
        </div>
      </div>
    </div>
  );
}
