// Shared dashboard mock data to reduce duplication

export interface Transaction {
  id: string;
  date: string;
  payer: { name: string; avatar: string };
  receiver: string;
  amount: string;
  gateway: string;
  gatewayColor: string;
  status: string;
  statusColor: string;
}

export const TRANSACTIONS: Transaction[] = [
  {
    id: "#TX-7845",
    date: "2023-10-15",
    payer: { name: "John Smith", avatar: "🧑‍💼" },
    receiver: "ABC Services",
    amount: "$245.00",
    gateway: "Stripe",
    gatewayColor: "bg-blue-600",
    status: "Completed",
    statusColor: "bg-teal-600"
  },
  {
    id: "#TX-7844", 
    date: "2023-10-14",
    payer: { name: "Sarah Johnson", avatar: "👩‍💼" },
    receiver: "Tech Solutions Inc.",
    amount: "$1,200.00",
    gateway: "Mercado Pago",
    gatewayColor: "bg-green-600",
    status: "Completed",
    statusColor: "bg-teal-600"
  },
  {
    id: "#TX-7843",
    date: "2023-10-14", 
    payer: { name: "Michael Brown", avatar: "👨‍💼" },
    receiver: "Global Certifications",
    amount: "$89.99",
    gateway: "Stripe",
    gatewayColor: "bg-blue-600",
    status: "Pending",
    statusColor: "bg-yellow-600"
  },
  {
    id: "#TX-7842",
    date: "2023-10-13",
    payer: { name: "Emily Davis", avatar: "👩‍💻" },
    receiver: "Service Pro",
    amount: "$450.00", 
    gateway: "Mercado Pago",
    gatewayColor: "bg-green-600",
    status: "Failed",
    statusColor: "bg-red-600"
  }
];
