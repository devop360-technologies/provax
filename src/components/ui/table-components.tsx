// Shared table components for reporting and dashboard tables

import { Download, FileText, Eye, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Export button component
interface ExportButtonProps {
  onClick?: () => void;
  variant: "csv" | "pdf";
}

export function ExportButton({ onClick, variant }: ExportButtonProps) {
  const config = {
    csv: {
      bg: "bg-[#10B981] hover:bg-[#059669]",
      icon: <Download size={14} />,
      label: "Export CSV",
    },
    pdf: {
      bg: "bg-[#FF6B6B] hover:bg-[#EF4444]",
      icon: <FileText size={14} />,
      label: "Export PDF",
    },
  };

  const { bg, icon, label } = config[variant];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded ${bg} px-3 py-1.5 text-xs font-medium text-white transition-colors`}
    >
      {icon}
      {label}
    </button>
  );
}

// Action button (outline style)
interface ActionButtonProps {
  onClick?: () => void;
  icon: "eye" | "clock";
  label: string;
}

export function ActionButton({ onClick, icon, label }: ActionButtonProps) {
  const IconComponent = icon === "eye" ? Eye : Clock;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded border border-[#00D9FF] px-3 py-1.5 text-xs font-medium text-[#00D9FF] hover:bg-[#1D1D41] transition-colors"
    >
      <IconComponent size={14} />
      {label}
    </button>
  );
}

// Table header with export buttons
interface TableHeaderProps {
  title: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  extraActions?: ReactNode;
}

export function TableHeader({ title, onExportCSV, onExportPDF, extraActions }: TableHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-base font-medium text-white">{title}</h3>
      <div className="flex items-center gap-2">
        <ExportButton onClick={onExportCSV} variant="csv" />
        <ExportButton onClick={onExportPDF} variant="pdf" />
        {extraActions}
      </div>
    </div>
  );
}

// Table wrapper
interface TableWrapperProps {
  className?: string;
  children: ReactNode;
}

export function TableWrapper({ className, children }: TableWrapperProps) {
  return (
    <div className={cn("rounded-lg border border-[#404254] bg-[#1D1D41] p-6", className)}>
      {children}
    </div>
  );
}

// Table column header
interface TableColumnHeaderProps {
  children: ReactNode;
}

export function TableColumnHeader({ children }: TableColumnHeaderProps) {
  return (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400">
      {children}
    </th>
  );
}

// Table row
interface TableRowProps {
  children: ReactNode;
  rowKey: string;
}

export function TableRow({ children, rowKey }: TableRowProps) {
  return (
    <tr
      key={rowKey}
      className="border-b border-[#404254] transition-colors hover:bg-[#252850]"
    >
      {children}
    </tr>
  );
}

// Table cell
interface TableCellProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "success" | "error" | "muted";
}

export function TableCell({ children, className, variant = "default" }: TableCellProps) {
  const variantClasses = {
    default: "text-white",
    success: "text-[#22C55E] font-medium",
    error: "text-[#FF6B6B] font-medium",
    muted: "text-gray-300",
  };

  return (
    <td className={cn("px-4 py-3 text-sm", variantClasses[variant], className)}>
      {children}
    </td>
  );
}

// Status badge
interface StatusBadgeProps {
  status: string;
  colorMap?: Record<string, { bg: string; text: string }>;
}

const defaultStatusColors: Record<string, { bg: string; text: string }> = {
  COMPLETED: { bg: "bg-[#F59E0B]/20", text: "text-[#F59E0B]" },
  PENDING: { bg: "bg-[#3B82F6]/20", text: "text-[#3B82F6]" },
  VERIFIED: { bg: "bg-[#10B981]/20", text: "text-[#10B981]" },
  APPROVED: { bg: "bg-[#8B5CF6]/20", text: "text-[#8B5CF6]" },
};

export function StatusBadge({ status, colorMap = defaultStatusColors }: StatusBadgeProps) {
  const statusStyle = colorMap[status] || { bg: "bg-gray-500/20", text: "text-gray-400" };

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 rounded text-xs font-medium",
        statusStyle.bg,
        statusStyle.text
      )}
    >
      {status}
    </span>
  );
}
