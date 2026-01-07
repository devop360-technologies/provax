"use client";

import Image from "next/image";

interface ReportsTabProps {
  pdfReportUrl?: string;
  qrCodeUrl?: string;
  shareableLink?: string;
  onViewReport?: () => void;
  onDownload?: () => void;
  onGenerateQR?: () => void;
  onCopyLink?: () => void;
  onShare?: () => void;
}

export function ReportsTab({
  shareableLink = "https://cert.example.com/CERT-4582",
  onViewReport,
  onDownload,
  onGenerateQR,
  onCopyLink,
  onShare
}: ReportsTabProps) {
  return (
    <div className="space-y-6 rounded-2xl bg-[#23234B] p-5">
      <h3 className="mb-6 text-lg font-semibold text-white">Reports</h3>
      <hr className="border-[#4d506a]" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#262656]">
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Image src="/provax-dashboard/file-icons/pdf.png" alt="PDF" width={48} height={48} className="h-20 w-20 p-2" />
            <h4 className="mb-2 text-lg font-semibold text-white">PDF Report</h4>
            <p className="mb-6 text-xs text-gray-400">Complete certification report in PDF format</p>
            <div className="flex w-full gap-3">
              <button type="button" onClick={onViewReport} className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">View Report</button>
              <button type="button" onClick={onDownload} className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#303067] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">Download</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#262156]">
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Image src="/provax-dashboard/file-icons/qr.png" alt="QR Code" width={48} height={48} className="h-20 w-20 p-2" />
            <h4 className="mb-4 text-lg font-semibold text-white">QR Code</h4>
            <p className="mb-4 text-xs text-gray-400">Embedded QR code for quick verification</p>
            <div className="mb-6 bg-white p-1">
              <Image src="/provax-dashboard/file-icons/code.png" alt="QR Code" width={60} height={60} className="h-30 w-30 p-1" />
            </div>
            <button type="button" onClick={onGenerateQR} className="w-full rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">Generate New QR</button>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-xl border border-[#2a2d4a] bg-[#262156]">
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <Image src="/provax-dashboard/file-icons/share.png" alt="Share" width={48} height={48} className="h-20 w-20 p-2" />
            <h4 className="mb-2 text-lg font-semibold text-white">Shareable Link</h4>
            <p className="mb-4 text-xs text-gray-400">Public link for sharing certification</p>
            <div className="mb-6 w-full rounded-lg bg-[#303067] p-3">
              <p className="text-xs break-all text-gray-400">{shareableLink}</p>
            </div>
            <div className="flex w-full gap-3">
              <button type="button" onClick={onCopyLink} className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#1a1d3a] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">Copy Link</button>
              <button type="button" onClick={onShare} className="flex-1 rounded-lg border border-[#2a2d4a] bg-[#303067] py-2 text-xs font-medium text-gray-300 transition-colors hover:border-cyan-400/50">Share</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
