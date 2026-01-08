/**
 * Tests for provider-data.ts
 */
import {
  SERVICE_REQUESTS,
  ACTIVE_JOBS,
  ServiceRequest,
  ActiveJob,
} from '@/data/provider-data';
import { PLACEHOLDER_IMAGE, ESCROW_TEXT, LOCATION_PATTERNS } from '@/data/common-constants';

describe('Provider Data', () => {
  describe('SERVICE_REQUESTS', () => {
    it('should be an array', () => {
      expect(Array.isArray(SERVICE_REQUESTS)).toBe(true);
    });

    it('should have at least 3 service requests', () => {
      expect(SERVICE_REQUESTS.length).toBeGreaterThanOrEqual(3);
    });

    it('should have service requests with required fields', () => {
      SERVICE_REQUESTS.forEach((request: ServiceRequest) => {
        expect(request).toHaveProperty('id');
        expect(request).toHaveProperty('title');
        expect(request).toHaveProperty('requestId');
        expect(request).toHaveProperty('budget');
        expect(request).toHaveProperty('location');
        expect(request).toHaveProperty('category');
        expect(request).toHaveProperty('posted');
        expect(request).toHaveProperty('clientDescription');
        expect(request).toHaveProperty('imageSrc');
        expect(request).toHaveProperty('diagnosticFindings');
        expect(request).toHaveProperty('status');
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['Open', 'Closed', 'Pending'];
      SERVICE_REQUESTS.forEach((request: ServiceRequest) => {
        expect(validStatuses).toContain(request.status);
      });
    });

    it('should use placeholder image', () => {
      SERVICE_REQUESTS.forEach((request: ServiceRequest) => {
        expect(request.imageSrc).toBe(PLACEHOLDER_IMAGE);
      });
    });

    it('should have diagnostic findings as array', () => {
      SERVICE_REQUESTS.forEach((request: ServiceRequest) => {
        expect(Array.isArray(request.diagnosticFindings)).toBe(true);
        expect(request.diagnosticFindings.length).toBeGreaterThan(0);
      });
    });

    it('should have first service request with correct data', () => {
      const first = SERVICE_REQUESTS[0];
      expect(first.id).toBe('1');
      expect(first.title).toBe('Engine Overhaul & Tune-up');
      expect(first.requestId).toBe('#REQ-2023-001');
      expect(first.category).toBe('Engine Repair');
      expect(first.location).toBe(LOCATION_PATTERNS.downtown10Miles);
    });

    it('should have unique IDs', () => {
      const ids = SERVICE_REQUESTS.map((r: ServiceRequest) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('ACTIVE_JOBS', () => {
    it('should be an array', () => {
      expect(Array.isArray(ACTIVE_JOBS)).toBe(true);
    });

    it('should have at least 3 active jobs', () => {
      expect(ACTIVE_JOBS.length).toBeGreaterThanOrEqual(3);
    });

    it('should have active jobs with required fields', () => {
      ACTIVE_JOBS.forEach((job: ActiveJob) => {
        expect(job).toHaveProperty('id');
        expect(job).toHaveProperty('title');
        expect(job).toHaveProperty('year');
        expect(job).toHaveProperty('client');
        expect(job).toHaveProperty('deadline');
        expect(job).toHaveProperty('jobValue');
        expect(job).toHaveProperty('escrowStatus');
        expect(job).toHaveProperty('fullDescription');
        expect(job).toHaveProperty('escrowInformation');
        expect(job).toHaveProperty('status');
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['In Progress', 'Completed', 'Pending'];
      ACTIVE_JOBS.forEach((job: ActiveJob) => {
        expect(validStatuses).toContain(job.status);
      });
    });

    it('should have escrow information with correct structure', () => {
      ACTIVE_JOBS.forEach((job: ActiveJob) => {
        expect(job.escrowInformation).toHaveProperty('amount');
        expect(job.escrowInformation).toHaveProperty('text');
        expect(job.escrowInformation.text).toBe(ESCROW_TEXT);
      });
    });

    it('should have first active job with correct data', () => {
      const first = ACTIVE_JOBS[0];
      expect(first.id).toBe('1');
      expect(first.client).toBe('John Doe');
      expect(first.escrowStatus).toBe('Funded');
      expect(first.jobValue).toBe('$750');
    });

    it('should have unique IDs', () => {
      const ids = ACTIVE_JOBS.map((j: ActiveJob) => j.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('ServiceRequest Interface', () => {
    it('should allow creating valid ServiceRequest objects', () => {
      const request: ServiceRequest = {
        id: 'test-1',
        title: 'Test Service',
        requestId: '#TEST-001',
        budget: '$100 - $200',
        location: 'Test Location',
        category: 'Test Category',
        posted: 'January 1, 2024',
        clientDescription: 'Test description',
        imageSrc: '/test.png',
        diagnosticFindings: ['Finding 1', 'Finding 2'],
        status: 'Open',
      };
      expect(request.id).toBe('test-1');
      expect(request.status).toBe('Open');
    });
  });

  describe('ActiveJob Interface', () => {
    it('should allow creating valid ActiveJob objects', () => {
      const job: ActiveJob = {
        id: 'test-1',
        title: 'Test Job',
        year: '2024',
        client: 'Test Client',
        deadline: 'January 15, 2024',
        jobValue: '$500',
        escrowStatus: 'Funded',
        fullDescription: 'Test job description',
        escrowInformation: {
          amount: '$500',
          text: 'Escrow text',
        },
        status: 'In Progress',
      };
      expect(job.id).toBe('test-1');
      expect(job.status).toBe('In Progress');
    });
  });
});
