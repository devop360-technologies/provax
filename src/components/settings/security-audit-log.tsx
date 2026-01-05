"use client";

import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuditLogFilters } from "./audit-log-filters";
import { AuditLogTable, AuditLogEntry } from "./audit-log-table";
import { AuditLogDetailsModal } from "./audit-log-details-modal";

interface SecurityAuditLogProps {
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

export function SecurityAuditLog({
  onExportCSV,
  onExportPDF,
}: SecurityAuditLogProps) {
  const [selectedEntry, setSelectedEntry] = useState<AuditLogEntry | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    eventType: "All Events",
    user: "All User",
    fromDate: "01/01/2023",
    toDate: "12/31/2023",
  });

  const handleViewDetails = (entry: AuditLogEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEntry(undefined), 300);
  };

  return (
    <>
      {/* Filters */}
      <AuditLogFilters
        eventType={filters.eventType}
        onEventTypeChange={(value) =>
          setFilters({ ...filters, eventType: value })
        }
        user={filters.user}
        onUserChange={(value) => setFilters({ ...filters, user: value })}
        fromDate={filters.fromDate}
        onFromDateChange={(value) =>
          setFilters({ ...filters, fromDate: value })
        }
        toDate={filters.toDate}
        onToDateChange={(value) => setFilters({ ...filters, toDate: value })}
        onApplyFilters={() => { /* TODO: Implement filter application */ }}
      />

      {/* Export Buttons */}
      <div className="flex items-center justify-end gap-4 mb-6">
        <Button
          onClick={onExportCSV}
          className="flex items-center gap-2 h-10 rounded-lg bg-[#10B981] px-6 text-sm font-medium text-white hover:bg-[#059669]"
        >
          <Download size={18} />
          Export CSV
        </Button>
        <Button
          onClick={onExportPDF}
          className="flex items-center gap-2 h-10 rounded-lg bg-[#FF6B6B] px-6 text-sm font-medium text-white hover:bg-[#EF4444]"
        >
          <FileText size={18} />
          Export PDF
        </Button>
      </div>

      {/* Table */}
      <div className="bg-[#252850] rounded-lg border border-[#404254]">
        <AuditLogTable onViewDetails={handleViewDetails} />
      </div>

      {/* Modal */}
      <AuditLogDetailsModal
        isOpen={isModalOpen}
        entry={selectedEntry}
        onClose={handleCloseModal}
      />
    </>
  );
}
