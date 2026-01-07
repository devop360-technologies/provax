import { User } from "@/types/user";

interface UserData {
  id: string;
  name: string;
  email: string;
  hasAccess: boolean;
  createdAt: string;
  subscribedAt: string | null;
  isAdmin: boolean;
  gender: "women" | "men";
  imageNum: number;
  customerId: string | null;
  priceId: string | null;
}

const userData: UserData[] = [
  { id: "1", name: "Alice Johnson", email: "alice.johnson@example.com", hasAccess: true, createdAt: "2023-12-01T10:45:00Z", subscribedAt: "2024-01-15T08:00:00Z", isAdmin: false, gender: "women", imageNum: 1, customerId: "cus_001a", priceId: "price_basic" },
  { id: "2", name: "Mark Davis", email: "mark.davis@example.com", hasAccess: true, createdAt: "2024-02-12T12:20:00Z", subscribedAt: "2024-02-15T09:00:00Z", isAdmin: false, gender: "men", imageNum: 2, customerId: "cus_002b", priceId: "price_pro" },
  { id: "3", name: "Sarah Lee", email: "sarah.lee@example.com", hasAccess: true, createdAt: "2024-03-10T14:30:00Z", subscribedAt: "2024-03-12T11:15:00Z", isAdmin: true, gender: "women", imageNum: 3, customerId: "cus_003c", priceId: "price_enterprise" },
  { id: "4", name: "John Smith", email: "john.smith@example.com", hasAccess: true, createdAt: "2024-04-05T16:45:00Z", subscribedAt: "2024-04-07T13:00:00Z", isAdmin: false, gender: "men", imageNum: 4, customerId: "cus_004d", priceId: "price_basic" },
  { id: "5", name: "Emily White", email: "emily.white@example.com", hasAccess: false, createdAt: "2024-05-01T09:20:00Z", subscribedAt: null, isAdmin: false, gender: "women", imageNum: 5, customerId: null, priceId: null },
  { id: "6", name: "Robert King", email: "robert.king@example.com", hasAccess: true, createdAt: "2024-03-20T11:00:00Z", subscribedAt: "2024-03-22T10:00:00Z", isAdmin: false, gender: "men", imageNum: 6, customerId: "cus_005e", priceId: "price_pro" },
  { id: "7", name: "Sophia Turner", email: "sophia.turner@example.com", hasAccess: true, createdAt: "2024-06-18T18:00:00Z", subscribedAt: "2024-06-20T12:30:00Z", isAdmin: true, gender: "women", imageNum: 7, customerId: "cus_006f", priceId: "price_enterprise" },
  { id: "8", name: "Tom Harris", email: "tom.harris@example.com", hasAccess: true, createdAt: "2024-01-22T17:15:00Z", subscribedAt: "2024-01-25T14:00:00Z", isAdmin: false, gender: "men", imageNum: 8, customerId: "cus_007g", priceId: "price_basic" },
  { id: "9", name: "Lily Adams", email: "lily.adams@example.com", hasAccess: false, createdAt: "2024-07-10T08:00:00Z", subscribedAt: null, isAdmin: false, gender: "women", imageNum: 9, customerId: null, priceId: null },
  { id: "10", name: "Daniel Brown", email: "daniel.brown@example.com", hasAccess: true, createdAt: "2024-02-14T10:10:00Z", subscribedAt: "2024-02-16T09:10:00Z", isAdmin: false, gender: "men", imageNum: 10, customerId: "cus_008h", priceId: "price_pro" },
  { id: "11", name: "Ava Green", email: "ava.green@example.com", hasAccess: true, createdAt: "2024-06-12T19:00:00Z", subscribedAt: "2024-06-15T17:00:00Z", isAdmin: false, gender: "women", imageNum: 11, customerId: "cus_009i", priceId: "price_basic" },
  { id: "12", name: "Henry Clark", email: "henry.clark@example.com", hasAccess: false, createdAt: "2024-05-10T13:15:00Z", subscribedAt: null, isAdmin: false, gender: "men", imageNum: 12, customerId: null, priceId: null },
  { id: "13", name: "Grace Hall", email: "grace.hall@example.com", hasAccess: true, createdAt: "2024-04-20T10:10:00Z", subscribedAt: "2024-04-21T11:00:00Z", isAdmin: true, gender: "women", imageNum: 13, customerId: "cus_010j", priceId: "price_enterprise" },
  { id: "14", name: "Logan Scott", email: "logan.scott@example.com", hasAccess: true, createdAt: "2024-03-14T16:45:00Z", subscribedAt: "2024-03-16T09:30:00Z", isAdmin: false, gender: "men", imageNum: 14, customerId: "cus_011k", priceId: "price_pro" },
  { id: "15", name: "Natalie Young", email: "natalie.young@example.com", hasAccess: false, createdAt: "2024-01-10T08:30:00Z", subscribedAt: null, isAdmin: false, gender: "women", imageNum: 15, customerId: null, priceId: null },
  { id: "16", name: "Ethan Baker", email: "ethan.baker@example.com", hasAccess: true, createdAt: "2024-02-05T12:00:00Z", subscribedAt: "2024-02-07T10:00:00Z", isAdmin: false, gender: "men", imageNum: 16, customerId: "cus_012l", priceId: "price_basic" },
  { id: "17", name: "Zoe Campbell", email: "zoe.campbell@example.com", hasAccess: true, createdAt: "2024-06-01T13:20:00Z", subscribedAt: "2024-06-03T10:00:00Z", isAdmin: true, gender: "women", imageNum: 17, customerId: "cus_013m", priceId: "price_enterprise" },
  { id: "18", name: "Lucas Moore", email: "lucas.moore@example.com", hasAccess: true, createdAt: "2024-05-14T11:45:00Z", subscribedAt: "2024-05-15T08:00:00Z", isAdmin: false, gender: "men", imageNum: 18, customerId: "cus_014n", priceId: "price_pro" },
  { id: "19", name: "Chloe Brooks", email: "chloe.brooks@example.com", hasAccess: false, createdAt: "2024-07-05T07:15:00Z", subscribedAt: null, isAdmin: false, gender: "women", imageNum: 19, customerId: null, priceId: null },
  { id: "20", name: "Mason Rivera", email: "mason.rivera@example.com", hasAccess: true, createdAt: "2024-07-01T10:10:00Z", subscribedAt: "2024-07-03T09:00:00Z", isAdmin: false, gender: "men", imageNum: 20, customerId: "cus_015o", priceId: "price_basic" },
];

function createUser(data: UserData): User {
  const createdDate = new Date(data.createdAt);
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    hasAccess: data.hasAccess,
    createdAt: createdDate,
    subscribedAt: data.subscribedAt ? new Date(data.subscribedAt) : null,
    emailVerified: data.hasAccess ? createdDate : null,
    isAdmin: data.isAdmin,
    image: `https://randomuser.me/api/portraits/${data.gender}/${data.imageNum}.jpg`,
    customerId: data.customerId,
    priceId: data.priceId,
  };
}

export const users: User[] = userData.map(createUser);
