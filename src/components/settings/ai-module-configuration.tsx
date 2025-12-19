"use client";

import { useState } from "react";
import { AIModuleCard } from "./ai-module-card";

interface AIModuleConfigurationProps {
  onConfigChange?: (module: string, config: any) => void;
}

export function AIModuleConfiguration({
  onConfigChange,
}: AIModuleConfigurationProps) {
  const [modules, setModules] = useState({
    visionAI: {
      confidence: 85,
      humanReviewRule: "Auto - review on low confidence",
      alerts: { enabled: true, email: false },
    },
    decisionEngine: {
      decisiveness: 82,
      humanReviewRule: "Auto - review on low confidence",
      alerts: { enabled: true, email: false },
    },
    llmModule: {
      accuracy: 88,
      humanReviewRule: "Auto - review on low confidence",
      alerts: { enabled: true, email: false },
    },
  });

  const handleUpdate = (module: string, key: string, value: any) => {
    setModules((prev) => ({
      ...prev,
      [module]: {
        ...prev[module as keyof typeof prev],
        [key]: value,
      },
    }));
    onConfigChange?.(module, { ...modules[module as keyof typeof modules], [key]: value });
  };

  return (
    <div className="space-y-6">
      <AIModuleCard
        moduleName="Vision AI Module"
        icon="👁️"
        iconBgColor="#00D9FF"
        thresholdLabel="Confidence Threshold"
        confidenceThreshold={modules.visionAI.confidence}
        onConfidenceThresholdChange={(value) =>
          handleUpdate("visionAI", "confidence", value)
        }
        humanReviewRule={modules.visionAI.humanReviewRule}
        onHumanReviewRuleChange={(value) =>
          handleUpdate("visionAI", "humanReviewRule", value)
        }
        alertSettings={modules.visionAI.alerts}
        onAlertSettingsChange={(value) =>
          handleUpdate("visionAI", "alerts", value)
        }
      />

      <AIModuleCard
        moduleName="Decision Engine"
        icon="🧠"
        iconBgColor="#FF6B6B"
        thresholdLabel="Decisiveness Threshold"
        decisivenessThreshold={modules.decisionEngine.decisiveness}
        onDecisivenessThresholdChange={(value) =>
          handleUpdate("decisionEngine", "decisiveness", value)
        }
        humanReviewRule={modules.decisionEngine.humanReviewRule}
        onHumanReviewRuleChange={(value) =>
          handleUpdate("decisionEngine", "humanReviewRule", value)
        }
        alertSettings={modules.decisionEngine.alerts}
        onAlertSettingsChange={(value) =>
          handleUpdate("decisionEngine", "alerts", value)
        }
      />

      <AIModuleCard
        moduleName="LLM Module"
        icon="⚙️"
        iconBgColor="#F59E0B"
        thresholdLabel="Accuracy Threshold"
        accuracyThreshold={modules.llmModule.accuracy}
        onAccuracyThresholdChange={(value) =>
          handleUpdate("llmModule", "accuracy", value)
        }
        humanReviewRule={modules.llmModule.humanReviewRule}
        onHumanReviewRuleChange={(value) =>
          handleUpdate("llmModule", "humanReviewRule", value)
        }
        alertSettings={modules.llmModule.alerts}
        onAlertSettingsChange={(value) =>
          handleUpdate("llmModule", "alerts", value)
        }
      />
    </div>
  );
}
