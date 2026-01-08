/**
 * Tests for common-constants.ts
 */
import {
  COMMON_DESCRIPTIONS,
  PLACEHOLDER_IMAGE,
  COMMON_STATUSES,
  CURRENCY_FORMATS,
  LOCATION_PATTERNS,
  ESCROW_TEXT,
  VEHICLE_TYPES,
  CERTIFICATION_TYPES,
} from '@/data/common-constants';

describe('Common Constants', () => {
  describe('COMMON_DESCRIPTIONS', () => {
    it('should have bannerImageAndSchedule description', () => {
      expect(COMMON_DESCRIPTIONS.bannerImageAndSchedule).toBe('Changed banner image and schedule');
    });

    it('should have scheduledFor function that returns formatted string', () => {
      expect(COMMON_DESCRIPTIONS.scheduledFor('2023-10-15')).toBe('Scheduled for 2023-10-15');
      expect(COMMON_DESCRIPTIONS.scheduledFor('January 1, 2024')).toBe('Scheduled for January 1, 2024');
    });

    it('should have subjectAndBody description', () => {
      expect(COMMON_DESCRIPTIONS.subjectAndBody).toBe('Updated subject line and body content');
    });

    it('should have splitRefund description', () => {
      expect(COMMON_DESCRIPTIONS.splitRefund).toBe('Split refund');
    });

    it('should have returnedToProcessor description', () => {
      expect(COMMON_DESCRIPTIONS.returnedToProcessor).toBe('Returned to Processor');
    });

    it('should have returnedToCard description', () => {
      expect(COMMON_DESCRIPTIONS.returnedToCard).toBe('Returned to Card');
    });
  });

  describe('PLACEHOLDER_IMAGE', () => {
    it('should be the correct placeholder path', () => {
      expect(PLACEHOLDER_IMAGE).toBe('/placeholder-300x200.png');
    });
  });

  describe('COMMON_STATUSES', () => {
    it('should have open status', () => {
      expect(COMMON_STATUSES.open).toBe('Open');
    });

    it('should have closed status', () => {
      expect(COMMON_STATUSES.closed).toBe('Closed');
    });

    it('should have pending status', () => {
      expect(COMMON_STATUSES.pending).toBe('Pending');
    });

    it('should have inProgress status', () => {
      expect(COMMON_STATUSES.inProgress).toBe('In Progress');
    });

    it('should have completed status', () => {
      expect(COMMON_STATUSES.completed).toBe('Completed');
    });

    it('should have active status', () => {
      expect(COMMON_STATUSES.active).toBe('Active');
    });

    it('should have expired status', () => {
      expect(COMMON_STATUSES.expired).toBe('Expired');
    });
  });

  describe('CURRENCY_FORMATS', () => {
    it('should format dollars correctly', () => {
      expect(CURRENCY_FORMATS.formatDollars(1000)).toBe('$1,000');
      expect(CURRENCY_FORMATS.formatDollars(0)).toBe('$0');
      expect(CURRENCY_FORMATS.formatDollars(1234567)).toBe('$1,234,567');
    });

    it('should format percent correctly', () => {
      expect(CURRENCY_FORMATS.formatPercent(50)).toBe('50%');
      expect(CURRENCY_FORMATS.formatPercent(0)).toBe('0%');
      expect(CURRENCY_FORMATS.formatPercent(100)).toBe('100%');
    });
  });

  describe('LOCATION_PATTERNS', () => {
    it('should have downtown5Miles pattern', () => {
      expect(LOCATION_PATTERNS.downtown5Miles).toBe('Downtown, within 5 miles');
    });

    it('should have downtown10Miles pattern', () => {
      expect(LOCATION_PATTERNS.downtown10Miles).toBe('Downtown, within 10 miles');
    });

    it('should have suburbs15Miles pattern', () => {
      expect(LOCATION_PATTERNS.suburbs15Miles).toBe('Suburbs, within 15 miles');
    });

    it('should have cityCenter5Miles pattern', () => {
      expect(LOCATION_PATTERNS.cityCenter5Miles).toBe('City Center, within 5 miles');
    });
  });

  describe('ESCROW_TEXT', () => {
    it('should contain escrow information', () => {
      expect(ESCROW_TEXT).toBe('Funds are held securely. Will be released to you upon client approval.');
    });
  });

  describe('VEHICLE_TYPES', () => {
    it('should have toyota2020Camry', () => {
      expect(VEHICLE_TYPES.toyota2020Camry).toBe('2020 Toyota Camry');
    });

    it('should have hondaCivic', () => {
      expect(VEHICLE_TYPES.hondaCivic).toBe('2018 Honda Civic');
    });

    it('should have fordFocus', () => {
      expect(VEHICLE_TYPES.fordFocus).toBe('2015 Ford Focus');
    });

    it('should have tesla2023', () => {
      expect(VEHICLE_TYPES.tesla2023).toBe('2023 Tesla Model 3');
    });

    it('should have bmwX5', () => {
      expect(VEHICLE_TYPES.bmwX5).toBe('2022 BMW X5');
    });

    it('should have audiQ7', () => {
      expect(VEHICLE_TYPES.audiQ7).toBe('2021 Audi Q7');
    });
  });

  describe('CERTIFICATION_TYPES', () => {
    it('should have premiumTotal', () => {
      expect(CERTIFICATION_TYPES.premiumTotal).toBe('Premium Total');
    });

    it('should have exteriorCombo', () => {
      expect(CERTIFICATION_TYPES.exteriorCombo).toBe('Exterior Combo');
    });

    it('should have safetyFunction', () => {
      expect(CERTIFICATION_TYPES.safetyFunction).toBe('Safety & Function');
    });
  });
});
