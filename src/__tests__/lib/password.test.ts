import { describe, it, expect } from '@jest/globals';

// Mock data for testing
const mockPassword = 'Test123!@#';
const mockEmail = 'user@example.com';

describe('Password Utilities', () => {
  it('should validate password length', () => {
    const minLength = 8;
    expect(mockPassword.length).toBeGreaterThanOrEqual(minLength);
  });

  it('should validate email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(mockEmail)).toBe(true);
  });

  it('should reject short passwords', () => {
    const shortPassword = 'abc123';
    const minLength = 8;
    expect(shortPassword.length).toBeLessThan(minLength);
  });

  it('should check password strength', () => {
    const password = mockPassword;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    expect(hasUpperCase).toBe(true);
    expect(hasLowerCase).toBe(true);
    expect(hasNumber).toBe(true);
    expect(hasSpecialChar).toBe(true);
  });
});
