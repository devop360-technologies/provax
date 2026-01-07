// Shared reporting data to consolidate duplicated table data

export interface ReportingTableConfig {
  columns: Array<{
    key: string;
    label: string;
    align?: 'left' | 'center' | 'right';
    width?: string;
  }>;
  rows: Record<string, any>[];
  showExport?: boolean;
  showActions?: boolean;
}

// Revenue Analytics Table Data
export const REVENUE_ANALYTICS_DATA = [
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
    id: "ASOP-5123",
    amount: "$890",
    description: "Emily Davis on Certifications Inc",
    status: "APPROVED",
    daysOpen: "3",
    notes: "-",
    resolutions: "Resolved",
  },
];

// AI Module Performance Table Data
export const AI_MODULE_PERFORMANCE_DATA = [
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
    avgProcessingTime: "2.8s",
    volumeProcessed: "11,203",
    availability: "99.9%",
  },
];

// Provider Payouts Table Data
export const PROVIDER_PAYOUTS_DATA = [
  {
    period: "October 2023",
    totalPayouts: "$88,804",
    completed: "$82,544",
    pending: "$4,176",
    failed: "$1,341",
    avgProcessingTime: "2.4 days",
  },
  {
    period: "September 2023",
    totalPayouts: "$78,521",
    completed: "$70,156",
    pending: "$5,840",
    failed: "$1,281",
    avgProcessingTime: "3.1 days",
  },
  {
    period: "August 2023",
    totalPayouts: "$78,454",
    completed: "$74,214",
    pending: "$3,178",
    failed: "$1,223",
    avgProcessingTime: "2.7 days",
  },
  {
    period: "July 2023",
    totalPayouts: "$71,488",
    completed: "$66,341",
    pending: "$3,842",
    failed: "$1,305",
    avgProcessingTime: "2.9 days",
  },
];
