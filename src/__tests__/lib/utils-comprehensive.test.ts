import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { cn, isValidEmail, formatDate, formatCardNumber, formatExpiry, browserConsoleError, isTrialPeriod } from '@/lib/utils';

describe('Utils Library - Comprehensive Tests', () => {
  describe('cn (className merge utility)', () => {
    it('merges multiple class names', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('bg-blue-500');
    });

    it('handles undefined and null values', () => {
      const result = cn('px-4', undefined, null, 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('handles empty strings', () => {
      const result = cn('px-4', '', 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('handles boolean false values', () => {
      const result = cn('px-4', false && 'hidden', 'py-2');
      expect(result).toBe('px-4 py-2');
    });

    it('handles conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('active-class');
    });

    it('handles arrays of class names', () => {
      const result = cn(['px-4', 'py-2'], 'bg-blue-500');
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).toContain('bg-blue-500');
    });

    it('handles object syntax', () => {
      const result = cn({ 'px-4': true, 'py-2': true, hidden: false });
      expect(result).toContain('px-4');
      expect(result).toContain('py-2');
      expect(result).not.toContain('hidden');
    });

    it('merges tailwind classes correctly (last wins)', () => {
      const result = cn('px-4', 'px-8');
      expect(result).toBe('px-8');
    });

    it('handles complex tailwind merging', () => {
      const result = cn('bg-red-500', 'bg-blue-500');
      expect(result).toBe('bg-blue-500');
    });

    it('handles empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('preserves non-conflicting classes', () => {
      const result = cn('text-white', 'bg-blue-500', 'hover:bg-blue-700');
      expect(result).toContain('text-white');
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('hover:bg-blue-700');
    });
  });

  describe('isValidEmail', () => {
    it('validates correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
      expect(isValidEmail('a@b.co')).toBe(true);
    });

    it('rejects emails without @', () => {
      expect(isValidEmail('testexample.com')).toBe(false);
    });

    it('rejects emails with multiple @', () => {
      expect(isValidEmail('test@@example.com')).toBe(false);
      expect(isValidEmail('test@exam@ple.com')).toBe(false);
    });

    it('rejects emails with @ at start', () => {
      expect(isValidEmail('@example.com')).toBe(false);
    });

    it('rejects emails with @ at end', () => {
      expect(isValidEmail('test@')).toBe(false);
    });

    it('rejects emails without domain dot', () => {
      expect(isValidEmail('test@example')).toBe(false);
    });

    it('rejects emails with dot at domain start', () => {
      expect(isValidEmail('test@.example.com')).toBe(false);
    });

    it('rejects emails with dot at domain end', () => {
      expect(isValidEmail('test@example.')).toBe(false);
    });

    it('rejects emails with consecutive dots', () => {
      expect(isValidEmail('test@example..com')).toBe(false);
    });

    it('rejects emails with spaces', () => {
      expect(isValidEmail('test @example.com')).toBe(false);
      expect(isValidEmail('test@ example.com')).toBe(false);
      expect(isValidEmail('test@exam ple.com')).toBe(false);
    });

    it('rejects empty strings', () => {
      expect(isValidEmail('')).toBe(false);
    });

    it('rejects null/undefined', () => {
      expect(isValidEmail(null as unknown as string)).toBe(false);
      expect(isValidEmail(undefined as unknown as string)).toBe(false);
    });

    it('rejects emails that are too short', () => {
      expect(isValidEmail('a@')).toBe(false);
      expect(isValidEmail('ab')).toBe(false);
    });

    it('rejects emails that are too long', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(isValidEmail(longEmail)).toBe(false);
    });
  });

  describe('formatDate', () => {
    it('formats string date input', () => {
      const result = formatDate('2024-01-15');
      expect(result).toContain('January');
      expect(result).toContain('15');
    });

    it('formats numeric timestamp input', () => {
      const timestamp = new Date('2024-06-20').getTime();
      const result = formatDate(timestamp);
      expect(result).toContain('June');
      expect(result).toContain('20');
    });

    it('formats ISO date string', () => {
      const result = formatDate('2024-12-25T00:00:00Z');
      expect(result).toContain('December');
    });

    it('handles various date formats', () => {
      expect(formatDate('2024-03-01')).toContain('March');
      expect(formatDate('2024-07-04')).toContain('July');
      expect(formatDate('2024-11-28')).toContain('November');
    });
  });

  describe('formatCardNumber', () => {
    it('formats 16 digit card number', () => {
      const result = formatCardNumber('1234567890123456');
      expect(result).toBe('1234 5678 9012 3456');
    });

    it('formats card number with existing spaces', () => {
      const result = formatCardNumber('1234 5678 9012 3456');
      expect(result).toBe('1234 5678 9012 3456');
    });

    it('removes non-numeric characters', () => {
      const result = formatCardNumber('1234-5678-9012-3456');
      expect(result).toBe('1234 5678 9012 3456');
    });

    it('handles partial card numbers', () => {
      expect(formatCardNumber('1234')).toBe('1234');
      expect(formatCardNumber('12345678')).toBe('1234 5678');
      expect(formatCardNumber('123456789012')).toBe('1234 5678 9012');
    });

    it('handles empty string', () => {
      const result = formatCardNumber('');
      expect(result).toBe('');
    });

    it('handles very short input', () => {
      expect(formatCardNumber('12')).toBe('12');
      expect(formatCardNumber('123')).toBe('123');
    });

    it('handles input with letters', () => {
      const result = formatCardNumber('1234abcd5678');
      expect(result).toBe('1234 5678');
    });

    it('truncates to 16 digits', () => {
      const result = formatCardNumber('12345678901234567890');
      expect(result).toBe('1234 5678 9012 3456');
    });
  });

  describe('formatExpiry', () => {
    it('formats complete expiry date', () => {
      const result = formatExpiry('1225');
      expect(result).toBe('12/25');
    });

    it('handles partial input', () => {
      expect(formatExpiry('1')).toBe('1');
      expect(formatExpiry('12')).toBe('12/');
      expect(formatExpiry('122')).toBe('12/2');
    });

    it('removes spaces', () => {
      const result = formatExpiry('12 25');
      expect(result).toBe('12/25');
    });

    it('removes non-numeric characters', () => {
      const result = formatExpiry('12/25');
      expect(result).toBe('12/25');
    });

    it('handles empty string', () => {
      const result = formatExpiry('');
      expect(result).toBe('');
    });

    it('truncates to 4 digits', () => {
      const result = formatExpiry('123456');
      expect(result).toBe('12/34');
    });
  });

  describe('browserConsoleError', () => {
    let originalEnv: string | undefined;
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      originalEnv = process.env.NODE_ENV;
      consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });

    it('logs in development mode', () => {
      process.env.NODE_ENV = 'development';
      browserConsoleError('Test error message');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('does not log in production mode', () => {
      process.env.NODE_ENV = 'production';
      browserConsoleError('Test error message');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('does not log in test mode', () => {
      process.env.NODE_ENV = 'test';
      browserConsoleError('Test error message');
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('isTrialPeriod', () => {
    it('returns true for recently created user', () => {
      const createdAt = new Date();
      expect(isTrialPeriod(createdAt)).toBe(true);
    });

    it('returns false for user created long ago', () => {
      const createdAt = new Date('2020-01-01');
      expect(isTrialPeriod(createdAt)).toBe(false);
    });

    it('handles Date object input', () => {
      const recentDate = new Date(Date.now() - 1000); // 1 second ago
      expect(isTrialPeriod(recentDate)).toBe(true);
    });
  });
});
