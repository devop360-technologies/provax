/**
 * Tests for marketing-data.ts
 */
import { DEFAULT_ACTIVITIES, Activity } from '@/data/marketing-data';
import { COMMON_DESCRIPTIONS } from '@/data/common-constants';

describe('Marketing Data', () => {
  describe('DEFAULT_ACTIVITIES', () => {
    it('should be an array', () => {
      expect(Array.isArray(DEFAULT_ACTIVITIES)).toBe(true);
    });

    it('should have 6 activities', () => {
      expect(DEFAULT_ACTIVITIES).toHaveLength(6);
    });

    it('should have activities with required fields', () => {
      DEFAULT_ACTIVITIES.forEach((activity: Activity) => {
        expect(activity).toHaveProperty('id');
        expect(activity).toHaveProperty('userName');
        expect(activity).toHaveProperty('action');
        expect(activity).toHaveProperty('timestamp');
        expect(typeof activity.id).toBe('string');
        expect(typeof activity.userName).toBe('string');
        expect(typeof activity.action).toBe('string');
        expect(typeof activity.timestamp).toBe('string');
      });
    });

    it('should have first activity with correct data', () => {
      const firstActivity = DEFAULT_ACTIVITIES[0];
      expect(firstActivity.id).toBe('1');
      expect(firstActivity.userName).toBe('Sarah Johnson');
      expect(firstActivity.action).toContain('homepage banner');
      expect(firstActivity.description).toBe(COMMON_DESCRIPTIONS.bannerImageAndSchedule);
    });

    it('should have second activity with scheduled description', () => {
      const secondActivity = DEFAULT_ACTIVITIES[1];
      expect(secondActivity.userName).toBe('Michael Brown');
      expect(secondActivity.description).toBe(COMMON_DESCRIPTIONS.scheduledFor('2023-11-20'));
    });

    it('should have third activity with subject and body description', () => {
      const thirdActivity = DEFAULT_ACTIVITIES[2];
      expect(thirdActivity.userName).toBe('John Smith');
      expect(thirdActivity.description).toBe(COMMON_DESCRIPTIONS.subjectAndBody);
    });

    it('should have valid timestamps', () => {
      DEFAULT_ACTIVITIES.forEach((activity: Activity) => {
        expect(activity.timestamp).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
      });
    });

    it('should have unique IDs', () => {
      const ids = DEFAULT_ACTIVITIES.map((a: Activity) => a.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Activity Interface', () => {
    it('should allow creating valid Activity objects', () => {
      const activity: Activity = {
        id: 'test-1',
        userName: 'Test User',
        action: 'Test Action',
        timestamp: '2023-10-01 12:00',
      };
      expect(activity.id).toBe('test-1');
      expect(activity.userName).toBe('Test User');
    });

    it('should allow optional description field', () => {
      const activityWithDesc: Activity = {
        id: 'test-2',
        userName: 'Test User',
        action: 'Test Action',
        description: 'Optional description',
        timestamp: '2023-10-01 12:00',
      };
      expect(activityWithDesc.description).toBe('Optional description');
    });
  });
});
