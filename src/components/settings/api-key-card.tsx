"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface APIKeyCardProps {
  serviceName: string;
  icon?: React.ReactNode;
  status: "live" | "test";
  publicKey: string;
  secretKey?: string;
  accessToken?: string;
  onGenerateNewKey?: () => void;
  onDeactivate?: () => void;
  iconBgColor?: string;
}

export function APIKeyCard({
  serviceName,
  icon,
  status,
  publicKey,
  secretKey,
  accessToken,
  onGenerateNewKey,
  onDeactivate,
  iconBgColor = "#3B82F6",
}: APIKeyCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const statusColor = status === "live" ? "bg-[#10B981]" : "bg-[#F59E0B]";
  const statusText = status === "live" ? "Live" : "Test";

  return (
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon ? (
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center text-lg"
              style={{ backgroundColor: iconBgColor }}
            >
              {icon}
            </div>
          ) : (
            <div className="h-10 w-10 rounded-lg bg-[#3B82F6] flex items-center justify-center" />
          )}
          <div>
            <h3 className="text-base font-medium text-white">{serviceName}</h3>
            <div className="flex items-center gap-2">
              <span className={cn("inline-block h-2 w-2 rounded-full", statusColor)} />
              <span className="text-xs font-medium text-gray-400">{statusText}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Public Key */}
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-2">
            Public Key
          </label>
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={publicKey}
              readOnly
              className="flex-1 rounded-lg border border-[#404254] bg-[#1D1D41] px-3 py-2 text-sm text-gray-400"
            />
            <button
              onClick={() => handleCopy(publicKey, "public")}
              className="p-2 rounded-lg border border-[#404254] hover:bg-[#1D1D41] transition-colors"
            >
              {copiedField === "public" ? (
                <Check size={18} className="text-[#10B981]" />
              ) : (
                <Copy size={18} className="text-[#00D9FF]" />
              )}
            </button>
          </div>
        </div>

        {/* Secret Key or Access Token */}
        {secretKey && (
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Secret Key
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={secretKey}
                readOnly
                className="flex-1 rounded-lg border border-[#404254] bg-[#1D1D41] px-3 py-2 text-sm text-gray-400"
              />
              <button
                onClick={() => handleCopy(secretKey, "secret")}
                className="p-2 rounded-lg border border-[#404254] hover:bg-[#1D1D41] transition-colors"
              >
                {copiedField === "secret" ? (
                  <Check size={18} className="text-[#10B981]" />
                ) : (
                  <Copy size={18} className="text-[#00D9FF]" />
                )}
              </button>
            </div>
          </div>
        )}

        

        {accessToken && (
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Access Token
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={accessToken}
                readOnly
                className="flex-1 rounded-lg border border-[#404254] bg-[#1D1D41] px-3 py-2 text-sm text-gray-400"
              />
              <button
                onClick={() => handleCopy(accessToken, "token")}
                className="p-2 rounded-lg border border-[#404254] hover:bg-[#1D1D41] transition-colors"
              >
                {copiedField === "token" ? (
                  <Check size={18} className="text-[#10B981]" />
                ) : (
                  <Copy size={18} className="text-[#00D9FF]" />
                )}
              </button>
            </div>
          </div>
        )}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-[#404254]">
        <button
          onClick={onGenerateNewKey}
          className="px-4 py-2 rounded-lg border border-[#F59E0B] text-sm font-medium text-[#F59E0B] hover:bg-[#1D1D41] transition-colors"
        >
          ⟳ Generate New Key
        </button>
        <button
          onClick={onDeactivate}
          className="px-4 py-2 rounded-lg border border-[#FF6B6B] text-sm font-medium text-[#FF6B6B] hover:bg-[#1D1D41] transition-colors"
        >
          ✕ Deactivate
        </button>
      </div>
    </div>
  );
}
