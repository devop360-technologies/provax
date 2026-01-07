"use client";

interface Metric {
  label: string;
  score: number;
}

interface ModuleResult {
  title: string;
  status: string;
  metrics: Metric[];
}

interface AIModuleResultsProps {
  results?: ModuleResult[];
  title?: string;
}

const SCORE_COLORS = {
  high: "bg-green-500/20 text-green-400",
  medium: "bg-orange-500/20 text-orange-400",
} as const;

function getScoreColor(score: number): string {
  return score >= 90 ? SCORE_COLORS.high : SCORE_COLORS.medium;
}

export function AIModuleResults({ results = DEFAULT_MODULE_RESULTS, title = "AI Module Results" }: AIModuleResultsProps) {
  return (
    <div className="space-y-6">
      <h3 className="mb-6 text-lg font-semibold text-white">{title}</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((module) => (
          <div
            key={module.title}
            className="overflow-hidden rounded-xl border border-l-4 border-[#2a2d4a] border-l-[#00FF88] bg-[#1a1d3a]"
          >
            <div className="flex items-center justify-between border-b border-[#2a2d4a] bg-[#252850] px-6 py-3">
              <h4 className="text-sm font-semibold text-white">{module.title}</h4>
              <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs font-medium text-cyan-400">
                {module.status}
              </span>
            </div>
            <div className="space-y-3 p-4">
              {module.metrics.map((metric) => (
                <div key={`${module.title}-${metric.label}`} className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">{metric.label}:</span>
                  <span className={`rounded px-3 py-1 text-xs font-bold ${getScoreColor(metric.score)}`}>
                    {metric.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const DEFAULT_MODULE_RESULTS: ModuleResult[] = [
  {
    title: "Structure Analysis",
    status: "Complete",
    metrics: [
      { label: "Frame Integrity", score: 96 },
      { label: "Chassis Alignment", score: 95 },
      { label: "Suspension Check", score: 87 },
      { label: "Rust Detection", score: 96 }
    ]
  },
  {
    title: "Paint Analysis",
    status: "Complete",
    metrics: [
      { label: "Paint Thickness", score: 92 },
      { label: "Color Consistency", score: 94 },
      { label: "Surface Imperfections", score: 86 },
      { label: "Clear Coat Quality", score: 91 }
    ]
  },
  {
    title: "Ballistic Glass Assessment",
    status: "Complete",
    metrics: [
      { label: "Impact Resistance", score: 96 },
      { label: "Optical Clarity", score: 98 },
      { label: "Lamination Integrity", score: 95 },
      { label: "Installation Quality", score: 88 }
    ]
  },
  {
    title: "Interior Inspection",
    status: "Complete",
    metrics: [
      { label: "Upholstery Condition", score: 93 },
      { label: "Electronic Systems", score: 88 },
      { label: "Safety Features", score: 97 },
      { label: "Cleanliness Score", score: 91 }
    ]
  },
  {
    title: "Functionality Test",
    status: "Complete",
    metrics: [
      { label: "Engine Performance", score: 94 },
      { label: "Braking System", score: 96 },
      { label: "Transmission", score: 89 },
      { label: "Steering Response", score: 92 }
    ]
  }
];
