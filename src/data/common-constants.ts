/**
 * Shared constants to reduce duplication across data files
 */

// Common descriptions for activities
export const COMMON_DESCRIPTIONS = {
  bannerImageAndSchedule: 'Changed banner image and schedule',
  scheduledFor: (date: string) => `Scheduled for ${date}`,
  subjectAndBody: 'Updated subject line and body content',
  splitRefund: 'Split refund',
  returnedToProcessor: 'Returned to Processor',
  returnedToCard: 'Returned to Card',
} as const;

// Common placeholder image
export const PLACEHOLDER_IMAGE = '/placeholder-300x200.png';

// Common status values
export const COMMON_STATUSES = {
  open: 'Open',
  closed: 'Closed',
  pending: 'Pending',
  inProgress: 'In Progress',
  completed: 'Completed',
  active: 'Active',
  expired: 'Expired',
} as const;

// Common currencies and amounts
export const CURRENCY_FORMATS = {
  formatDollars: (amount: number) => `$${amount.toLocaleString()}`,
  formatPercent: (value: number) => `${value}%`,
} as const;

// Common location patterns
export const LOCATION_PATTERNS = {
  downtown5Miles: 'Downtown, within 5 miles',
  downtown10Miles: 'Downtown, within 10 miles',
  suburbs15Miles: 'Suburbs, within 15 miles',
  cityCenter5Miles: 'City Center, within 5 miles',
} as const;

// Common escrow text
export const ESCROW_TEXT = 'Funds are held securely. Will be released to you upon client approval.';

// Vehicle types
export const VEHICLE_TYPES = {
  toyota2020Camry: '2020 Toyota Camry',
  hondaCivic: '2018 Honda Civic',
  fordFocus: '2015 Ford Focus',
  tesla2023: '2023 Tesla Model 3',
  bmwX5: '2022 BMW X5',
  audiQ7: '2021 Audi Q7',
} as const;

// Certification types
export const CERTIFICATION_TYPES = {
  premiumTotal: 'Premium Total',
  exteriorCombo: 'Exterior Combo',
  safetyFunction: 'Safety & Function',
} as const;
