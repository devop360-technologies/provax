// User type matching Express backend response
export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: "ADMIN" | "USER" | "PROVIDER" | "CLIENT";
  hasAccess: boolean;
  isAdmin: boolean;
  customerId: string | null;
  priceId: string | null;
  createdAt: Date;
  subscribedAt: Date | null;
}
