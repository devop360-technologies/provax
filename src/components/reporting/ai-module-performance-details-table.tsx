"use client";

import { cn } from "@/lib/utils";
import { TableWrapper, TableHeader, TableColumnHeader, TableRow, TableCell } from "@/components/ui/table-components";

interface AIModulePerformanceRow {
  moduleName: string;
  successRate: string;
  errorRate: string;
  avgProcessingTime: string;
  volumeProcessed: string;
  availability: string;
}

interface AIModulePerformanceDetailsTableProps {
  rows?: AIModulePerformanceRow[];
  className?: string;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

const defaultRows: AIModulePerformanceRow[] = [
  {
    moduleName: "Structure Analysis",
    successRate: "98.2%",
    errorRate: "3.8%",
    avgProcessingTime: "2.4s",
    volumeProcessed: "12,458",
    availability: "99.8%",
  },
  {
    moduleName: "Text Extraction",
    successRate: "96.1%",
    errorRate: "5.9%",
    avgProcessingTime: "1.8s",
    volumeProcessed: "10,678",
    availability: "99.5%",
  },
  {
    moduleName: "Insight Generation",
    successRate: "92.8%",
    errorRate: "7.2%",
    avgProcessingTime: "3.2s",
    volumeProcessed: "8,342",
    availability: "98.3%",
  },
  {
    moduleName: "Glass Inspection",
    successRate: "98.8%",
    errorRate: "1.2%",
    avgProcessingTime: "2.1s",
    volumeProcessed: "6,745",
    availability: "99.7%",
  },
  {
    moduleName: "Functionality Check",
    successRate: "91.3%",
    errorRate: "8.7%",
    avgProcessingTime: "4.5s",
    volumeProcessed: "7,858",
    availability: "98.5%",
  },
];

export function AIModulePerformanceDetailsTable({
  rows = defaultRows,
  className,
  onExportCSV,
  onExportPDF,
}: AIModulePerformanceDetailsTableProps) {
  return (
    <TableWrapper className={className}>
      <TableHeader
        title="AI Module Performance Details"
        onExportCSV={onExportCSV}
        onExportPDF={onExportPDF}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#404254]">
              <TableColumnHeader>AI Module</TableColumnHeader>
              <TableColumnHeader>Success Rate</TableColumnHeader>
              <TableColumnHeader>Error Rate</TableColumnHeader>
              <TableColumnHeader>Average Processing Time</TableColumnHeader>
              <TableColumnHeader>Volume Processed</TableColumnHeader>
              <TableColumnHeader>Availability</TableColumnHeader>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <TableRow key={row.moduleName} rowKey={row.moduleName}>
                <TableCell>{row.moduleName}</TableCell>
                <TableCell variant="success">{row.successRate}</TableCell>
                <TableCell variant="error">{row.errorRate}</TableCell>
                <TableCell>{row.avgProcessingTime}</TableCell>
                <TableCell>{row.volumeProcessed}</TableCell>
                <TableCell variant="success">{row.availability}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </TableWrapper>
  );
}
