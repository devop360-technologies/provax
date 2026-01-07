// Shared marketing mock data to reduce duplication

import { COMMON_DESCRIPTIONS } from './common-constants';

export interface Activity {
  id: string;
  userName: string;
  action: string;
  description?: string;
  timestamp: string;
}

export const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: "1",
    userName: "Sarah Johnson",
    action: "Updated homepage banner 'Summer Sale'",
    description: COMMON_DESCRIPTIONS.bannerImageAndSchedule,
    timestamp: "2023-10-16 14:30",
  },
  {
    id: "2",
    userName: "Michael Brown",
    action: "Created new email campaign 'Black Friday Sale'",
    description: COMMON_DESCRIPTIONS.scheduledFor('2023-11-20'),
    timestamp: "2023-10-15 12:15",
  },
  {
    id: "3",
    userName: "John Smith",
    action: "Edited transactional template 'Welcome Email'",
    description: COMMON_DESCRIPTIONS.subjectAndBody,
    timestamp: "2023-10-14 16:45",
  },
  {
    id: "4",
    userName: "Sarah Johnson",
    action: "Sarah Johnson",
    description: COMMON_DESCRIPTIONS.bannerImageAndSchedule,
    timestamp: "2023-10-14 12:20",
  },
  {
    id: "5",
    userName: "Emily Davis",
    action: "Added new highlight section 'Customer Testimonials'",
    description: COMMON_DESCRIPTIONS.bannerImageAndSchedule,
    timestamp: "2023-10-11 09:30",
  },
  {
    id: "6",
    userName: "Michael Brown",
    action: "Created campaign block 'New Year Promotion'",
    description: COMMON_DESCRIPTIONS.scheduledFor('2023-12-26 to 2024-01-05'),
    timestamp: "2023-10-10 11:00",
  },
];
