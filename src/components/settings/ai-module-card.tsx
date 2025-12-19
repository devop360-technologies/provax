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
  thresholdLabel = "Confidence Threshold",
}: AIModuleCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const threshold =
    confidenceThreshold ?? decisivenessThreshold ?? accuracyThreshold ?? 80;
  const onThresholdChange =
    onConfidenceThresholdChange ||
    onDecisivenessThresholdChange ||
    onAccuracyThresholdChange ||
    (() => {});

  const dropdownOptions = [
    "Auto - review on low confidence",
    "Manual - always require review",
    "Auto - review on errors only",
    "Disabled",
  ];

  return (
    <div className="rounded-lg border border-[#404254] bg-[#252850] p-6 mb-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center text-lg"
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-base font-medium text-white">{moduleName}</h3>
          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#10B981] text-xs font-medium text-white">
            Live
          </span>
        </div>
      </div>

      {/* Main Controls Grid */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {/* Threshold Section */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            {thresholdLabel}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => onThresholdChange(Number(e.target.value))}
              className="flex-1 h-2 rounded-lg appearance-none bg-gradient-to-r from-[#3B82F6] to-[#00D9FF] cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #00D9FF ${threshold}%, #404254 ${threshold}%, #404254 100%)`,
              }}
            />
            <span className="text-sm font-medium text-gray-400 w-12 text-right">
              {threshold}%
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            {thresholdLabel.toLowerCase()}
          </p>
        </div>

        {/* Human Review Rule */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Human Review Rule
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[#404254] bg-[#1D1D41] text-sm text-gray-400 hover:border-[#505464]"
            >
              <span>{humanReviewRule}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-[#404254] bg-[#1D1D41] shadow-lg z-10">
                {dropdownOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onHumanReviewRuleChange?.(option);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:bg-[#252850] hover:text-white first:rounded-t-lg last:rounded-b-lg transition-colors"
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
      <div className="pt-4 border-t border-[#404254]">
        <h4 className="text-sm font-medium text-white mb-3">Alert Settings</h4>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={alertSettings.enabled}
              onChange={(e) =>
                onAlertSettingsChange?.({
                  ...alertSettings,
                  enabled: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-[#404254] bg-[#1D1D41] accent-[#00D9FF]"
            />
            <span className="text-sm text-gray-400">Enable Alerts</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={alertSettings.email}
              onChange={(e) =>
                onAlertSettingsChange?.({
                  ...alertSettings,
                  email: e.target.checked,
                })
              }
              className="w-4 h-4 rounded border-[#404254] bg-[#1D1D41] accent-[#00D9FF]"
            />
            <span className="text-sm text-gray-400">Email Alerts</span>
          </label>
        </div>
      </div>
    </div>
  );
}
