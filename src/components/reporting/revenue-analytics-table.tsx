"use client";

import { TableWrapper, TableHeader, TableColumnHeader, TableRow, TableCell, ActionButton, StatusBadge } from "@/components/ui/table-components";
import { REVENUE_ANALYTICS_DATA } from "@/data/reporting-data";

type StatusBadgeType = "COMPLETED" | "PENDING" | "VERIFIED" | "APPROVED";

interface RevenueAnalyticsRow {
  id: string;
  amount: string;
  description: string;
  status: StatusBadgeType;
  daysOpen?: string;
  notes?: string;
  resolutions?: string;
}

interface RevenueAnalyticsTableProps {
  rows?: RevenueAnalyticsRow[];
  className?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onViewTimeline?: () => void;
}

export function RevenueAnalyticsTable({
  rows = REVENUE_ANALYTICS_DATA as any,
  className,
  onExportCSV,
  onExportPDF,
  onViewTimeline,
}: RevenueAnalyticsTableProps) {
  return (
    <TableWrapper className={className}>
      <TableHeader
        title="Escrow Analytics"
        onExportCSV={onExportCSV}
        onExportPDF={onExportPDF}
        extraActions={<ActionButton onClick={onViewTimeline} icon="clock" label="View Timeline" />}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <TableColumnHeader>Dispute ID</TableColumnHeader>
              <TableColumnHeader>Amount</TableColumnHeader>
              <TableColumnHeader>Parties</TableColumnHeader>
              <TableColumnHeader>Status</TableColumnHeader>
              <TableColumnHeader>Days Open</TableColumnHeader>
              <TableColumnHeader>Resolution</TableColumnHeader>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={row.id} rowKey={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell className="font-medium">{row.amount}</TableCell>
                <TableCell variant="muted">{row.description}</TableCell>
                <TableCell>
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell variant="muted">{row.daysOpen}</TableCell>
                <TableCell className="text-gray-500">{row.resolutions}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </TableWrapper>
  );
}
