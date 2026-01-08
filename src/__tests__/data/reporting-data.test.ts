/**
 * Tests for reporting-data.ts
 */
import {
  REVENUE_ANALYTICS_DATA,
  AI_MODULE_PERFORMANCE_DATA,
  PROVIDER_PAYOUTS_DATA,
  ReportingTableConfig,
} from '@/data/reporting-data';

describe('Reporting Data', () => {
  describe('REVENUE_ANALYTICS_DATA', () => {
    it('should be an array', () => {
      expect(Array.isArray(REVENUE_ANALYTICS_DATA)).toBe(true);
    });

    it('should have at least 4 entries', () => {
      expect(REVENUE_ANALYTICS_DATA.length).toBeGreaterThanOrEqual(4);
    });

    it('should have entries with required fields', () => {
      REVENUE_ANALYTICS_DATA.forEach((entry) => {
        expect(entry).toHaveProperty('id');
        expect(entry).toHaveProperty('amount');
        expect(entry).toHaveProperty('description');
        expect(entry).toHaveProperty('status');
        expect(entry).toHaveProperty('daysOpen');
        expect(entry).toHaveProperty('notes');
        expect(entry).toHaveProperty('resolutions');
      });
    });

    it('should have valid status values', () => {
      const validStatuses = ['COMPLETED', 'PENDING', 'VERIFIED', 'APPROVED'];
      REVENUE_ANALYTICS_DATA.forEach((entry) => {
        expect(validStatuses).toContain(entry.status);
      });
    });

    it('should have amounts in dollar format', () => {
      REVENUE_ANALYTICS_DATA.forEach((entry) => {
        expect(entry.amount).toMatch(/^\$[\d,]+$/);
      });
    });

    it('should have first entry with correct data', () => {
      const first = REVENUE_ANALYTICS_DATA[0];
      expect(first.id).toBe('ASOP-9541');
      expect(first.amount).toBe('$1,200');
      expect(first.status).toBe('COMPLETED');
    });

    it('should have unique IDs', () => {
      const ids = REVENUE_ANALYTICS_DATA.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('AI_MODULE_PERFORMANCE_DATA', () => {
    it('should be an array', () => {
      expect(Array.isArray(AI_MODULE_PERFORMANCE_DATA)).toBe(true);
    });

    it('should have at least 4 modules', () => {
      expect(AI_MODULE_PERFORMANCE_DATA.length).toBeGreaterThanOrEqual(4);
    });

    it('should have entries with required fields', () => {
      AI_MODULE_PERFORMANCE_DATA.forEach((module) => {
        expect(module).toHaveProperty('moduleName');
        expect(module).toHaveProperty('successRate');
        expect(module).toHaveProperty('errorRate');
        expect(module).toHaveProperty('avgProcessingTime');
        expect(module).toHaveProperty('volumeProcessed');
        expect(module).toHaveProperty('availability');
      });
    });

    it('should have rates in percentage format', () => {
      AI_MODULE_PERFORMANCE_DATA.forEach((module) => {
        expect(module.successRate).toMatch(/^\d+\.?\d*%$/);
        expect(module.errorRate).toMatch(/^\d+\.?\d*%$/);
        expect(module.availability).toMatch(/^\d+\.?\d*%$/);
      });
    });

    it('should have processing time in seconds format', () => {
      AI_MODULE_PERFORMANCE_DATA.forEach((module) => {
        expect(module.avgProcessingTime).toMatch(/^\d+\.?\d*s$/);
      });
    });

    it('should have first module with correct data', () => {
      const first = AI_MODULE_PERFORMANCE_DATA[0];
      expect(first.moduleName).toBe('Structure Analysis');
      expect(first.successRate).toBe('98.2%');
      expect(first.availability).toBe('99.8%');
    });

    it('should have unique module names', () => {
      const names = AI_MODULE_PERFORMANCE_DATA.map((m) => m.moduleName);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe('PROVIDER_PAYOUTS_DATA', () => {
    it('should be an array', () => {
      expect(Array.isArray(PROVIDER_PAYOUTS_DATA)).toBe(true);
    });

    it('should have at least 1 entry', () => {
      expect(PROVIDER_PAYOUTS_DATA.length).toBeGreaterThanOrEqual(1);
    });

    it('should have entries with required fields', () => {
      PROVIDER_PAYOUTS_DATA.forEach((entry) => {
        expect(entry).toHaveProperty('period');
        expect(entry).toHaveProperty('totalPayouts');
        expect(entry).toHaveProperty('completed');
        expect(entry).toHaveProperty('pending');
        expect(entry).toHaveProperty('failed');
        expect(entry).toHaveProperty('avgProcessingTime');
      });
    });

    it('should have amounts in dollar format', () => {
      PROVIDER_PAYOUTS_DATA.forEach((entry) => {
        expect(entry.totalPayouts).toMatch(/^\$[\d,]+$/);
        expect(entry.completed).toMatch(/^\$[\d,]+$/);
        expect(entry.pending).toMatch(/^\$[\d,]+$/);
        expect(entry.failed).toMatch(/^\$[\d,]+$/);
      });
    });

    it('should have first entry with correct data', () => {
      const first = PROVIDER_PAYOUTS_DATA[0];
      expect(first.period).toBe('October 2023');
      expect(first.totalPayouts).toBe('$88,804');
    });
  });

  describe('ReportingTableConfig Interface', () => {
    it('should allow creating valid ReportingTableConfig objects', () => {
      const config: ReportingTableConfig = {
        columns: [
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name', align: 'left' },
          { key: 'value', label: 'Value', align: 'right', width: '100px' },
        ],
        rows: [
          { id: '1', name: 'Test', value: 100 },
        ],
        showExport: true,
        showActions: false,
      };
      expect(config.columns).toHaveLength(3);
      expect(config.rows).toHaveLength(1);
      expect(config.showExport).toBe(true);
      expect(config.showActions).toBe(false);
    });

    it('should have optional properties', () => {
      const config: ReportingTableConfig = {
        columns: [{ key: 'id', label: 'ID' }],
        rows: [],
      };
      expect(config.showExport).toBeUndefined();
      expect(config.showActions).toBeUndefined();
    });
  });
});
