import { cn, isValidEmail, formatDate, formatCardNumber, formatExpiry } from '../utils';

describe('cn (className merger)', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('should merge tailwind classes correctly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
  });

  it('should handle undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });
});

describe('isValidEmail', () => {
  it('should return true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    expect(isValidEmail('user+tag@example.org')).toBe(true);
  });

  it('should return false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('no@domain')).toBe(false);
    expect(isValidEmail('@nodomain.com')).toBe(false);
    expect(isValidEmail('noat.com')).toBe(false);
  });

  it('should return false for emails with multiple @', () => {
    expect(isValidEmail('test@@example.com')).toBe(false);
    expect(isValidEmail('test@test@example.com')).toBe(false);
  });

  it('should return false for emails with spaces', () => {
    expect(isValidEmail('test @example.com')).toBe(false);
    expect(isValidEmail('test@ example.com')).toBe(false);
  });

  it('should return false for emails with consecutive dots in domain', () => {
    expect(isValidEmail('test@example..com')).toBe(false);
  });

  it('should return false for emails that are too short or too long', () => {
    expect(isValidEmail('a@')).toBe(false);
    expect(isValidEmail('a'.repeat(255) + '@test.com')).toBe(false);
  });
});

describe('formatDate', () => {
  it('should format date string correctly', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('January');
    expect(result).toContain('15');
  });

  it('should format timestamp correctly', () => {
    const timestamp = new Date('2024-06-20').getTime();
    const result = formatDate(timestamp);
    expect(result).toContain('June');
    expect(result).toContain('20');
  });
});

describe('formatCardNumber', () => {
  it('should format card number with spaces', () => {
    expect(formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
  });

  it('should handle partial card numbers', () => {
    expect(formatCardNumber('1234')).toBe('1234');
    expect(formatCardNumber('12345678')).toBe('1234 5678');
  });

  it('should remove non-numeric characters', () => {
    expect(formatCardNumber('1234-5678-9012-3456')).toBe('1234 5678 9012 3456');
    expect(formatCardNumber('1234 5678 9012 3456')).toBe('1234 5678 9012 3456');
  });

  it('should handle empty input', () => {
    expect(formatCardNumber('')).toBe('');
  });
});

describe('formatExpiry', () => {
  it('should format expiry date with slash', () => {
    expect(formatExpiry('1224')).toBe('12/24');
    expect(formatExpiry('0125')).toBe('01/25');
  });

  it('should handle partial input', () => {
    expect(formatExpiry('1')).toBe('1');
    expect(formatExpiry('12')).toBe('12/');
  });

  it('should remove non-numeric characters', () => {
    expect(formatExpiry('12/24')).toBe('12/24');
  });
});
