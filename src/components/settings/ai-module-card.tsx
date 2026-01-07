"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AIModuleCardProps {
  moduleName: string;
  icon?: string;
  confidenceThreshold?: number;
  onConfidenceThresholdChange?: (value: number) => void;
  decisivenessThreshold?: number;
  onDecisivenessThresholdChange?: (value: number) => void;
  accuracyThreshold?: number;
  onAccuracyThresholdChange?: (value: number) => void;
  humanReviewRule?: string;
  onHumanReviewRuleChange?: (value: string) => void;
  alertSettings?: { enabled: boolean; email: boolean };
  onAlertSettingsChange?: (settings: { enabled: boolean; email: boolean }) => void;
  iconBgColor?: string;
  thresholdLabel?: string;
}

export function AIModuleCard({
  moduleName,
  icon = "🤖",
  confidenceThreshold,
  onConfidenceThresholdChange,
  decisivenessThreshold,
  onDecisivenessThresholdChange,
  accuracyThreshold,
  onAccuracyThresholdChange,
  humanReviewRule = "Auto - review on low confidence",
  onHumanReviewRuleChange,
  alertSettings = { enabled: true, email: false },
  onAlertSettingsChange,
  iconBgColor = "#3B82F6",
  thresholdLabel = "Confidence Threshold"
}: AIModuleCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const threshold = confidenceThreshold ?? decisivenessThreshold ?? accuracyThreshold ?? 80;
  const onThresholdChange =
    onConfidenceThresholdChange ||
    onDecisivenessThresholdChange ||
    onAccuracyThresholdChange ||
    (() => {});

  const dropdownOptions = [
    "Auto - review on low confidence",
    "Manual - always require review",
    "Auto - review on errors only",
    "Disabled"
  ];

  return (
    <div className="mb-6 rounded-lg border border-[#404254] bg-[#252850] p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-lg"
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-medium text-white">{moduleName}</h3>
          <span className="mt-1 inline-block rounded bg-[#10B981] px-2 py-0.5 text-xs font-medium text-white">
            Live
          </span>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="mb-6 grid grid-cols-2 gap-8">
        {/* Threshold Section */}
        <div>
          <label htmlFor="threshold-slider" className="mb-3 block text-sm font-medium text-white">{thresholdLabel}</label>
          <div className="flex items-center gap-4">
            <input
              id="threshold-slider"
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => onThresholdChange(Number(e.target.value))}
              className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#00D9FF]"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #00D9FF ${threshold}%, #404254 ${threshold}%, #404254 100%)`
              }}
            />
            <span className="w-12 text-right text-sm font-medium text-gray-400">{threshold}%</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">{thresholdLabel.toLowerCase()}</p>
        </div>

        {/* Human Review Rule */}
        <div>
          <span className="mb-3 block text-sm font-medium text-white">Human Review Rule</span>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-[#404254] bg-[#1D1D41] px-3 py-2 text-sm text-gray-400 hover:border-[#505464]"
            >
              <span>{humanReviewRule}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 left-0 z-10 mt-1 rounded-lg border border-[#404254] bg-[#1D1D41] shadow-lg">
                {dropdownOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onHumanReviewRuleChange?.(option);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-400 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-[#252850] hover:text-white"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alert Settings */}
      <div className="border-t border-[#404254] pt-4">
        <div className="grid grid-cols-2 gap-8">
          {/* Error Rate Threshold */}
          <div>
            <label htmlFor="error-rate-threshold" className="mb-3 block text-sm font-medium text-white">Error Rate Threshold</label>
            <div className="flex items-center gap-2">
              <input
                id="error-rate-threshold"
                type="number"
                defaultValue="3.0"
                step="0.1"
                className="w-[calc(100%-100px)] rounded-lg border border-[#404254] bg-[#1D1D41] px-3 py-2 text-sm text-white focus:border-[#00D9FF] focus:outline-none"
              />
              <span className="text-sm font-medium text-gray-400">%</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">Alert when error rate exceeds this value</p>
          </div>

          {/* Alert Settings */}
          <div>
            <h4 className="mb-3 text-sm font-medium text-white">Alert Settings</h4>
            <div className="flex flex-col gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={alertSettings.email}
                  onChange={(e) =>
                    onAlertSettingsChange?.({
                      ...alertSettings,
                      email: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-[#404254] bg-[#1D1D41] accent-[#00D9FF]"
                />
                <span className="text-sm text-white">Email Alerts</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={alertSettings.enabled}
                  onChange={(e) =>
                    onAlertSettingsChange?.({
                      ...alertSettings,
                      enabled: e.target.checked
                    })
                  }
                  className="h-4 w-4 rounded border-[#404254] bg-[#1D1D41] accent-[#00D9FF]"
                />
                <span className="text-sm text-white">Slack/Webhook Alerts</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
