"use client";

import { TableWrapper, TableHeader, TableColumnHeader, TableRow, TableCell, ActionButton } from "@/components/ui/table-components";
import { PROVIDER_PAYOUTS_DATA } from "@/data/reporting-data";

interface ProviderPayoutRow {
  period: string;
  totalPayouts: string;
  completed: string;
  pending: string;
  failed: string;
  avgProcessingTime: string;
}

interface ProviderPayoutsTableProps {
  rows?: ProviderPayoutRow[];
  className?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onShowDetails?: () => void;
}

export function ProviderPayoutsTable({
  rows = PROVIDER_PAYOUTS_DATA as any,
  className,
  onExportCSV,
  onExportPDF,
  onShowDetails,
}: ProviderPayoutsTableProps) {
  return (
    <TableWrapper className={className}>
      <TableHeader
        title="Provider Payouts"
        onExportCSV={onExportCSV}
        onExportPDF={onExportPDF}
        extraActions={<ActionButton onClick={onShowDetails} icon="eye" label="Show Details" />}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <TableColumnHeader>Period</TableColumnHeader>
              <TableColumnHeader>Total Payouts</TableColumnHeader>
              <TableColumnHeader>Completed</TableColumnHeader>
              <TableColumnHeader>Pending</TableColumnHeader>
              <TableColumnHeader>Failed</TableColumnHeader>
              <TableColumnHeader>Average Processing Time</TableColumnHeader>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={row.period} rowKey={row.period}>
                <TableCell>{row.period}</TableCell>
                <TableCell className="font-medium">{row.totalPayouts}</TableCell>
                <TableCell>{row.completed}</TableCell>
                <TableCell>{row.pending}</TableCell>
                <TableCell>{row.failed}</TableCell>
                <TableCell variant="muted">{row.avgProcessingTime}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </TableWrapper>
  );
}
