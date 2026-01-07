"use client";

import { TableWrapper, TableHeader, TableColumnHeader, TableRow, TableCell, ActionButton, StatusBadge } from "@/components/ui/table-components";

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

const defaultRows: RevenueAnalyticsRow[] = [
  {
    id: "ASOP-9541",
    amount: "$1,200",
    description: "John Swan on Tech Startups",
    status: "COMPLETED",
    daysOpen: "5",
    notes: "-",
    resolutions: "-",
  },
  {
    id: "ASOP-8331",
    amount: "$309",
    description: "Sarah Johnson on Global Certifications",
    status: "PENDING",
    daysOpen: "2",
    notes: "-",
    resolutions: "-",
  },
  {
    id: "ASOP-4342",
    amount: "$455",
    description: "Michael Brown on Service Pro",
    status: "VERIFIED",
    daysOpen: "7",
    notes: "Split refund",
    resolutions: "-",
  },
  {
    id: "ASOP-9321",
    amount: "$342",
    description: "Emily Davis on Sushi Master",
    status: "APPROVED",
    daysOpen: "3",
    notes: "-",
    resolutions: "Returned to Processor",
  },
  {
    id: "ASOP-6128",
    amount: "$1,600",
    description: "Robert Miller on AI Experts",
    status: "VERIFIED",
    daysOpen: "8",
    notes: "-",
    resolutions: "Returned to Card",
  },
];

export function RevenueAnalyticsTable({
  rows = defaultRows,
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
