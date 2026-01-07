export interface InspectionData {
  id?: string;
  userId: string;
  vehicle: string;
  owner: { name: string; image: string };
  date: string;
  aiModule: string;
  comboType: string;
  integrityScore: string;
  status: string;
  statusColor: string;
}

export const inspectionData: InspectionData[] = [
  { id: "insp-001", userId: "#USR-001", vehicle: "Toyota Camry 2022", owner: { name: "John Smith", image: "" }, date: "2023-10-15", aiModule: "Structure Analysis", comboType: "Premium Package", integrityScore: "92%", status: "Approved", statusColor: "bg-green-500/20 text-green-400" },
  { id: "insp-002", userId: "#USR-002", vehicle: "Honda Civic 2021", owner: { name: "Sarah Johnson", image: "" }, date: "2023-10-14", aiModule: "Paint Analysis", comboType: "Basic Inspection", integrityScore: "87%", status: "Processing", statusColor: "bg-yellow-500/20 text-yellow-400" },
  { id: "insp-003", userId: "#USR-003", vehicle: "Ford F-150 2020", owner: { name: "Michael Brown", image: "" }, date: "2023-10-12", aiModule: "Ballistic Glass", comboType: "Comprehensive", integrityScore: "78%", status: "Pending", statusColor: "bg-yellow-500/20 text-yellow-400" },
  { id: "insp-004", userId: "#USR-004", vehicle: "BMW X5 2023", owner: { name: "Emily Davis", image: "" }, date: "2023-10-10", aiModule: "Interior Inspection", comboType: "Premium Package", integrityScore: "95%", status: "Approved", statusColor: "bg-green-500/20 text-green-400" },
  { id: "insp-005", userId: "#USR-005", vehicle: "Tesla Model 3 2023", owner: { name: "Robert Wilson", image: "" }, date: "2023-10-08", aiModule: "Functionality Test", comboType: "Comprehensive", integrityScore: "89%", status: "Rejected", statusColor: "bg-red-500/20 text-red-400" },
];

export function getInspectionStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    "Approved": "bg-green-500/20 text-green-400",
    "Processing": "bg-yellow-500/20 text-yellow-400",
    "Pending": "bg-blue-500/20 text-blue-400",
  };
  return statusMap[status] ?? "bg-red-500/20 text-red-400";
}

export function getIntegrityScoreClass(score: string): string {
  const scoreNum = parseInt(score, 10);
  if (scoreNum >= 90) return "bg-green-500/20 text-green-400";
  if (scoreNum >= 80) return "bg-orange-500/20 text-orange-400";
  if (scoreNum >= 70) return "bg-yellow-500/20 text-yellow-400";
  return "bg-red-500/20 text-red-400";
}

export function calculatePrice(integrityScore: string): number {
  const score = parseInt(integrityScore, 10);
  return (score * 400) + 15000;
}
