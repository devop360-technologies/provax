'use client';

import { ArrowUpRight, LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BaseStatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly change: string;
  readonly changeType: 'positive' | 'negative' | 'neutral';
  readonly icon?: LucideIcon;
  readonly iconSrc?: string;
  readonly iconColor?: string;
  readonly iconBg: string;
  readonly variant?: 'badge' | 'text' | 'arrow';
}

const CHANGE_TEXT_COLORS = {
  positive: 'text-green-400',
  negative: 'text-red-400',
  neutral: 'text-gray-400',
};

const CHANGE_BG_COLORS = {
  positive: 'bg-green-400',
  negative: 'bg-red-400',
  neutral: 'bg-gray-400',
};

export function BaseStatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconSrc,
  iconColor,
  iconBg,
  variant = 'arrow',
}: BaseStatCardProps) {
  const getChangeStyle = () => {
    if (variant === 'badge') {
      return CHANGE_BG_COLORS[changeType] + ' rounded p-1';
    }
    return CHANGE_TEXT_COLORS[changeType];
  };

  return (
    <div className="bg-gradient-to-b from-[#22224A] to-[#131230] border border-[#2a2d4a] rounded-2xl p-6 hover:border-[#3a3d5a] transition-colors">
      <div className="items-start gap-4">
        <div className="flex gap-2 w-full mb-4">
          <div className={cn('p-3 rounded-xl flex-shrink-0 flex items-center justify-center', iconBg)}>
            {iconSrc ? (
              <Image src={iconSrc} alt={title} width={20} height={20} className="w-5 h-5 object-contain" />
            ) : Icon ? (
              <Icon className={cn('w-5 h-5', iconColor)} />
            ) : null}
          </div>
          <p className="text-sm text-gray-100 font-light my-2">{title}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-xl font-bold text-white">{value}</p>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={cn('text-sm font-medium flex items-center gap-1', getChangeStyle())}>
              {variant === 'arrow' && changeType === 'positive' && <ArrowUpRight className="w-4 h-4" />}
              {change.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-export for backward compatibility
export { BaseStatCard as StatCard };
export { BaseStatCard as ProviderStatCard };
export { BaseStatCard as ProvidetStatCard };
