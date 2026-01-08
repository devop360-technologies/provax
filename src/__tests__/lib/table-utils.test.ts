import { describe, it, expect } from '@jest/globals';
import {
  TABLE_CLASSES,
  STATUS_BADGE_COLORS,
  getHeaderCellClass,
  getCellClass,
  getStatusBadgeClass,
} from '@/lib/table-utils';

describe('Table Utilities', () => {
  describe('TABLE_CLASSES', () => {
    it('has all required class definitions', () => {
      expect(TABLE_CLASSES).toHaveProperty('wrapper');
      expect(TABLE_CLASSES).toHaveProperty('header');
      expect(TABLE_CLASSES).toHaveProperty('headerCell');
      expect(TABLE_CLASSES).toHaveProperty('row');
      expect(TABLE_CLASSES).toHaveProperty('cell');
      expect(TABLE_CLASSES).toHaveProperty('cellMedium');
      expect(TABLE_CLASSES).toHaveProperty('overflowContainer');
    });

    it('wrapper contains proper styling classes', () => {
      expect(TABLE_CLASSES.wrapper).toContain('bg-');
      expect(TABLE_CLASSES.wrapper).toContain('rounded');
      expect(TABLE_CLASSES.wrapper).toContain('border');
    });

    it('header contains background class', () => {
      expect(TABLE_CLASSES.header).toContain('bg-');
    });

    it('row contains hover styles', () => {
      expect(TABLE_CLASSES.row).toContain('hover:');
      expect(TABLE_CLASSES.row).toContain('transition');
    });
  });

  describe('STATUS_BADGE_COLORS', () => {
    const statuses = ['COMPLETED', 'PENDING', 'VERIFIED', 'APPROVED', 'ACTIVE', 'INACTIVE', 'FAILED'] as const;

    it('has all status definitions', () => {
      statuses.forEach(status => {
        expect(STATUS_BADGE_COLORS).toHaveProperty(status);
      });
    });

    it('each status has bg, text, and border properties', () => {
      statuses.forEach(status => {
        expect(STATUS_BADGE_COLORS[status]).toHaveProperty('bg');
        expect(STATUS_BADGE_COLORS[status]).toHaveProperty('text');
        expect(STATUS_BADGE_COLORS[status]).toHaveProperty('border');
      });
    });

    it('COMPLETED has green colors', () => {
      expect(STATUS_BADGE_COLORS.COMPLETED.bg).toContain('green');
      expect(STATUS_BADGE_COLORS.COMPLETED.text).toContain('green');
    });

    it('PENDING has yellow colors', () => {
      expect(STATUS_BADGE_COLORS.PENDING.bg).toContain('yellow');
      expect(STATUS_BADGE_COLORS.PENDING.text).toContain('yellow');
    });

    it('FAILED has red colors', () => {
      expect(STATUS_BADGE_COLORS.FAILED.bg).toContain('red');
      expect(STATUS_BADGE_COLORS.FAILED.text).toContain('red');
    });
  });

  describe('getHeaderCellClass', () => {
    it('returns base class for undefined alignment', () => {
      const result = getHeaderCellClass();
      expect(result).toBe(TABLE_CLASSES.headerCell);
    });

    it('returns base class for left alignment', () => {
      const result = getHeaderCellClass('left');
      expect(result).toBe(TABLE_CLASSES.headerCell);
    });

    it('adds text-center for center alignment', () => {
      const result = getHeaderCellClass('center');
      expect(result).toContain(TABLE_CLASSES.headerCell);
      expect(result).toContain('text-center');
    });

    it('adds text-right for right alignment', () => {
      const result = getHeaderCellClass('right');
      expect(result).toContain(TABLE_CLASSES.headerCell);
      expect(result).toContain('text-right');
    });
  });

  describe('getCellClass', () => {
    it('returns cell class when isMedium is false', () => {
      const result = getCellClass(false);
      expect(result).toBe(TABLE_CLASSES.cell);
    });

    it('returns cellMedium class when isMedium is true', () => {
      const result = getCellClass(true);
      expect(result).toBe(TABLE_CLASSES.cellMedium);
    });

    it('returns cell class by default', () => {
      const result = getCellClass();
      expect(result).toBe(TABLE_CLASSES.cell);
    });

    it('adds text-center for center alignment', () => {
      const result = getCellClass(false, 'center');
      expect(result).toContain(TABLE_CLASSES.cell);
      expect(result).toContain('text-center');
    });

    it('adds text-right for right alignment', () => {
      const result = getCellClass(false, 'right');
      expect(result).toContain(TABLE_CLASSES.cell);
      expect(result).toContain('text-right');
    });

    it('combines isMedium and alignment', () => {
      const result = getCellClass(true, 'center');
      expect(result).toContain(TABLE_CLASSES.cellMedium);
      expect(result).toContain('text-center');
    });
  });

  describe('getStatusBadgeClass', () => {
    it('returns correct classes for COMPLETED status', () => {
      const result = getStatusBadgeClass('COMPLETED');
      expect(result).toContain(STATUS_BADGE_COLORS.COMPLETED.bg);
      expect(result).toContain(STATUS_BADGE_COLORS.COMPLETED.text);
      expect(result).toContain(STATUS_BADGE_COLORS.COMPLETED.border);
      expect(result).toContain('rounded-full');
      expect(result).toContain('px-3');
      expect(result).toContain('py-1');
    });

    it('returns correct classes for PENDING status', () => {
      const result = getStatusBadgeClass('PENDING');
      expect(result).toContain(STATUS_BADGE_COLORS.PENDING.bg);
      expect(result).toContain(STATUS_BADGE_COLORS.PENDING.text);
    });

    it('returns correct classes for FAILED status', () => {
      const result = getStatusBadgeClass('FAILED');
      expect(result).toContain(STATUS_BADGE_COLORS.FAILED.bg);
      expect(result).toContain(STATUS_BADGE_COLORS.FAILED.text);
    });

    it('includes font-medium class', () => {
      const result = getStatusBadgeClass('ACTIVE');
      expect(result).toContain('font-medium');
    });

    it('includes text-xs class', () => {
      const result = getStatusBadgeClass('VERIFIED');
      expect(result).toContain('text-xs');
    });
  });
});
