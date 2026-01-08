/**
 * Tests for password.ts utility
 */
import { hashPassword, verifyPassword } from '@/lib/password';

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
      expect(hashedPassword).not.toBe(password);
    });

    it('should produce different hashes for same password', async () => {
      const password = 'testPassword123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty password', async () => {
      const password = '';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
    });

    it('should handle special characters in password', async () => {
      const password = 'Test@123!#$%^&*()';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
    });

    it('should handle unicode characters in password', async () => {
      const password = 'пароль密码🔐';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
    });

    it('should handle very long passwords', async () => {
      const password = 'a'.repeat(1000);
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(typeof hashedPassword).toBe('string');
    });
  });

  describe('verifyPassword', () => {
    it('should return true for matching password', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword(password, hashedPassword);
      
      expect(result).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword456';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword(wrongPassword, hashedPassword);
      
      expect(result).toBe(false);
    });

    it('should return false for empty password comparison', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword('', hashedPassword);
      
      expect(result).toBe(false);
    });

    it('should handle case sensitivity', async () => {
      const password = 'TestPassword123';
      const differentCase = 'testpassword123';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword(differentCase, hashedPassword);
      
      expect(result).toBe(false);
    });

    it('should handle special characters comparison', async () => {
      const password = 'Test@123!#$%^&*()';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword(password, hashedPassword);
      
      expect(result).toBe(true);
    });

    it('should handle unicode comparison', async () => {
      const password = 'пароль密码🔐';
      const hashedPassword = await hashPassword(password);
      const result = await verifyPassword(password, hashedPassword);
      
      expect(result).toBe(true);
    });
  });
});
