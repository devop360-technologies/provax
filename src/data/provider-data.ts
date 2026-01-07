// Shared provider mock data to reduce duplication

import { COMMON_DESCRIPTIONS, PLACEHOLDER_IMAGE, ESCROW_TEXT, VEHICLE_TYPES, CERTIFICATION_TYPES, LOCATION_PATTERNS } from './common-constants';

export interface ServiceRequest {
  id: string;
  title: string;
  requestId: string;
  budget: string;
  location: string;
  category: string;
  posted: string;
  clientDescription: string;
  imageSrc: string;
  diagnosticFindings: string[];
  status: 'Open' | 'Closed' | 'Pending';
}

export interface ActiveJob {
  id: string;
  title: string;
  year: string;
  client: string;
  deadline: string;
  jobValue: string;
  escrowStatus: string;
  fullDescription: string;
  escrowInformation: {
    amount: string;
    text: string;
  };
  status: 'In Progress' | 'Completed' | 'Pending';
}

export interface Certification {
  id: string;
  vehicleImage: string;
  vehicleName: string;
  certificationType: string;
  deliveryDate: string;
  status: 'Active' | 'Expired';
}

export const SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: '1',
    title: 'Engine Overhaul & Tune-up',
    requestId: '#REQ-2023-001',
    budget: '$800 - $1,200',
    location: LOCATION_PATTERNS.downtown10Miles,
    category: 'Engine Repair',
    posted: 'June 8, 2023',
    clientDescription: 'My 2018 Toyota Camry is experiencing rough idling and reduced fuel efficiency. The check engine light came on last week.',
    imageSrc: PLACEHOLDER_IMAGE,
    diagnosticFindings: [
      'No major engine component failures detected',
      'Misfire detected in cylinder #3',
      'Oxygen sensor readings abnormal',
      'Fuel injectors may need cleaning',
    ],
    status: 'Open',
  },
  {
    id: '2',
    title: 'Transmission Repair',
    requestId: '#REQ-2023-002',
    budget: '$1,500 - $2,500',
    location: LOCATION_PATTERNS.suburbs15Miles,
    category: 'Transmission',
    posted: 'June 7, 2023',
    clientDescription: '2016 Ford F-150 with automatic transmission. Vehicle not shifting gears, especially from 2nd to 3rd.',
    imageSrc: PLACEHOLDER_IMAGE,
    diagnosticFindings: [
      'Transmission fluid degraded',
      'Shift solenoid malfunction',
      'Torque converter issues',
    ],
    status: 'Open',
  },
  {
    id: '3',
    title: 'Complete Brake System Replacement',
    requestId: '#REQ-2023-003',
    budget: '$600 - $900',
    location: LOCATION_PATTERNS.cityCenter5Miles,
    category: 'Brakes',
    posted: 'June 9, 2023',
    clientDescription: '2019 Honda Civic with 45,000 miles. Brakes are squeaking loudly and pedal feels soft.',
    imageSrc: PLACEHOLDER_IMAGE,
    diagnosticFindings: [
      'Brake pads worn below minimum',
      'Rotors need resurfacing',
      'Brake fluid contaminated',
    ],
    status: 'Open',
  },
];

export const ACTIVE_JOBS: ActiveJob[] = [
  {
    id: '1',
    title: 'AC System Repair - 2017 Honda Accord',
    year: '2017 - Honda Accord',
    client: 'John Doe',
    deadline: 'June 15, 2023',
    jobValue: '$750',
    escrowStatus: 'Funded',
    fullDescription: 'AC blowing warm air. Need diagnosis and repair. Will do replacement if needed.',
    escrowInformation: {
      amount: '$750',
      text: ESCROW_TEXT,
    },
    status: 'In Progress',
  },
  {
    id: '2',
    title: 'Brake Pad Replacement - 2020 Toyota Camry',
    year: '2020 - Toyota Camry',
    client: 'Sarah Johnson',
    deadline: 'June 12, 2023',
    jobValue: '$520',
    escrowStatus: 'Funded',
    fullDescription: 'Front brakes are squeaking badly. Need brake pad replacement and rotor inspection.',
    escrowInformation: {
      amount: '$520',
      text: ESCROW_TEXT,
    },
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'AC Compressor Replacement - 2017 Honda Accord',
    year: '2017 - Honda Accord',
    client: 'Michael Chen',
    deadline: 'June 18, 2023',
    jobValue: '$750',
    escrowStatus: 'Funded',
    fullDescription: 'AC system not cooling. Suspect compressor failure. Will inspect and replace.',
    escrowInformation: {
      amount: '$750',
      text: ESCROW_TEXT,
    },
    status: 'In Progress',
  },
];

const VEHICLE_CERTIFICATION_DATA = [
  { vehicle: VEHICLE_TYPES.toyota2020Camry, type: CERTIFICATION_TYPES.premiumTotal, date: 'Oct 12, 2023', status: 'Active' },
  { vehicle: VEHICLE_TYPES.hondaCivic, type: CERTIFICATION_TYPES.exteriorCombo, date: 'Sep 28, 2023', status: 'Active' },
  { vehicle: VEHICLE_TYPES.fordFocus, type: CERTIFICATION_TYPES.safetyFunction, date: 'Aug 15, 2023', status: 'Expired' },
  { vehicle: VEHICLE_TYPES.tesla2023, type: CERTIFICATION_TYPES.premiumTotal, date: 'Sep 28, 2023', status: 'Active' },
  { vehicle: VEHICLE_TYPES.bmwX5, type: CERTIFICATION_TYPES.safetyFunction, date: 'Oct 12, 2023', status: 'Expired' },
  { vehicle: VEHICLE_TYPES.audiQ7, type: CERTIFICATION_TYPES.exteriorCombo, date: 'Oct 12, 2023', status: 'Active' },
  { vehicle: VEHICLE_TYPES.toyota2020Camry, type: CERTIFICATION_TYPES.premiumTotal, date: 'Oct 12, 2023', status: 'Expired' },
  { vehicle: VEHICLE_TYPES.hondaCivic, type: CERTIFICATION_TYPES.exteriorCombo, date: 'Sep 28, 2023', status: 'Active' },
  { vehicle: VEHICLE_TYPES.fordFocus, type: CERTIFICATION_TYPES.safetyFunction, date: 'Aug 15, 2023', status: 'Expired' },
  { vehicle: VEHICLE_TYPES.tesla2023, type: CERTIFICATION_TYPES.premiumTotal, date: 'Sep 28, 2023', status: 'Active' },
];

export const CERTIFICATIONS: Certification[] = VEHICLE_CERTIFICATION_DATA.map((data, idx) => ({
  id: String(idx + 1),
  vehicleImage: PLACEHOLDER_IMAGE,
  vehicleName: data.vehicle,
  certificationType: data.type,
  deliveryDate: data.date,
  status: data.status as 'Active' | 'Expired',
}));
