"use client";

import { cn } from "@/lib/utils";
import { TableWrapper, TableHeader, TableColumnHeader, TableRow, TableCell } from "@/components/ui/table-components";
import { AI_MODULE_PERFORMANCE_DATA } from "@/data/reporting-data";

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

export function AIModulePerformanceDetailsTable({
  rows = AI_MODULE_PERFORMANCE_DATA as any,
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
