// Shared card components to reduce duplication

import { cn } from "@/lib/utils";

// Info grid item for card layouts (label + value pairs)
interface InfoGridItemProps {
  label: string;
  value: string;
  className?: string;
}

export function InfoGridItem({ label, value, className }: InfoGridItemProps) {
  return (
    <div className={className}>
      <p className="text-white text-sm font-semibold mb-1">{label}</p>
      <p className="text-gray-400 text-sm">{value}</p>
    </div>
  );
}

// Info grid container
interface InfoGridProps {
  items: { label: string; value: string }[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function InfoGrid({ items, columns = 2, className }: InfoGridProps) {
  const gridClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  }[columns];

  return (
    <div className={cn(`grid ${gridClass} gap-6`, className)}>
      {items.map((item) => (
        <InfoGridItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
}

// Highlighted info section (green border, used for AI reports and escrow info)
interface HighlightedSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function HighlightedSection({ title, subtitle, children, className }: HighlightedSectionProps) {
  return (
    <div className={cn("bg-[#23234B] border-l-4 border-[#00FF88] rounded-lg p-4", className)}>
      <div className={subtitle ? "mb-3" : undefined}>
        <h4 className="text-[#00FF88] text-sm font-semibold mb-1">
          {title}
        </h4>
        {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// Card description section
interface CardDescriptionProps {
  title: string;
  description: string;
  quoted?: boolean;
  className?: string;
}

export function CardDescription({ title, description, quoted = false, className }: CardDescriptionProps) {
  return (
    <div className={className}>
      <p className="text-white text-sm font-semibold mb-2">{title}</p>
      <p className="text-gray-400 text-sm leading-relaxed">
        {quoted ? `"${description}"` : description}
      </p>
    </div>
  );
}
