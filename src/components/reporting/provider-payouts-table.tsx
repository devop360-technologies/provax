"use client";

import { TableWrapper, TableHeader, TableColumnHeader, TableRow, TableCell, ActionButton } from "@/components/ui/table-components";

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

const defaultRows: ProviderPayoutRow[] = [
  {
    period: "October 2023",
    totalPayouts: "$88,804",
    completed: "$82,544",
    pending: "$4,176",
    failed: "$1,341",
    avgProcessingTime: "2.4 days",
  },
  {
    period: "September 2023",
    totalPayouts: "$78,521",
    completed: "$70,156",
    pending: "$5,840",
    failed: "$1,281",
    avgProcessingTime: "3.1 days",
  },
  {
    period: "August 2023",
    totalPayouts: "$78,454",
    completed: "$74,214",
    pending: "$3,178",
    failed: "$1,223",
    avgProcessingTime: "2.7 days",
  },
  {
    period: "July 2023",
    totalPayouts: "$71,488",
    completed: "$66,341",
    pending: "$4,016",
    failed: "$993",
    avgProcessingTime: "3.3 days",
  },
  {
    period: "June 2023",
    totalPayouts: "$83,874",
    completed: "$82,419",
    pending: "$1,520",
    failed: "$970",
    avgProcessingTime: "2.9 days",
  },
];

export function ProviderPayoutsTable({
  rows = defaultRows,
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
