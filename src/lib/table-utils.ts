/**
 * Shared table configuration and utilities to reduce duplication
 * across reporting and dashboard tables
 */

export interface TableHeaderConfig {
  title: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  extraActions?: React.ReactNode;
}

export interface ColumnDefinition {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  render?: (value: any, row?: any) => React.ReactNode;
}

export const TABLE_CLASSES = {
  wrapper: 'bg-[#1D1D41] rounded-lg border border-[#2a2d4a] overflow-hidden',
  header: 'bg-[#252850] border-b border-[#2a2d4a]',
  headerCell: 'px-6 py-4 text-left text-sm font-semibold text-gray-300',
  row: 'border-b border-[#2a2d4a] hover:bg-[#252850]/50 transition-colors',
  cell: 'px-6 py-4 text-sm text-gray-300',
  cellMedium: 'px-6 py-4 text-sm font-medium text-white',
  overflowContainer: 'overflow-x-auto',
} as const;

/**
 * Common status badge colors
 */
export const STATUS_BADGE_COLORS = {
  COMPLETED: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
  PENDING: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50' },
  VERIFIED: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
  APPROVED: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/50' },
  ACTIVE: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/50' },
  INACTIVE: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50' },
  FAILED: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
} as const;

/**
 * Generate table header class names
 */
export function getHeaderCellClass(align?: 'left' | 'center' | 'right'): string {
  const baseClass = TABLE_CLASSES.headerCell;
  if (align === 'center') return `${baseClass} text-center`;
  if (align === 'right') return `${baseClass} text-right`;
  return baseClass;
}

/**
 * Generate table cell class names
 */
export function getCellClass(isMedium = false, align?: 'left' | 'center' | 'right'): string {
  const baseClass = isMedium ? TABLE_CLASSES.cellMedium : TABLE_CLASSES.cell;
  if (align === 'center') return `${baseClass} text-center`;
  if (align === 'right') return `${baseClass} text-right`;
  return baseClass;
}

/**
 * Get status badge styles
 */
export function getStatusBadgeClass(status: keyof typeof STATUS_BADGE_COLORS): string {
  const colors = STATUS_BADGE_COLORS[status];
  return `${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-medium border ${colors.border}`;
}
