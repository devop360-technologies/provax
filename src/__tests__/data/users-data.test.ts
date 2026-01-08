/**
 * Tests for users.ts
 */
import { users } from '@/data/users';

describe('Users Data', () => {
  describe('users array', () => {
    it('should be an array', () => {
      expect(Array.isArray(users)).toBe(true);
    });

    it('should have 20 users', () => {
      expect(users).toHaveLength(20);
    });

    it('should have users with required fields', () => {
      users.forEach((user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('hasAccess');
        expect(user).toHaveProperty('createdAt');
        expect(user).toHaveProperty('subscribedAt');
        expect(user).toHaveProperty('emailVerified');
        expect(user).toHaveProperty('isAdmin');
        expect(user).toHaveProperty('image');
        expect(user).toHaveProperty('customerId');
        expect(user).toHaveProperty('priceId');
      });
    });

    it('should have valid email format', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      users.forEach((user) => {
        expect(user.email).toMatch(emailRegex);
      });
    });

    it('should have valid image URLs', () => {
      users.forEach((user) => {
        expect(user.image).toContain('randomuser.me/api/portraits');
      });
    });

    it('should have createdAt as Date object', () => {
      users.forEach((user) => {
        expect(user.createdAt).toBeInstanceOf(Date);
      });
    });

    it('should have subscribedAt as Date or null', () => {
      users.forEach((user) => {
        if (user.subscribedAt !== null) {
          expect(user.subscribedAt).toBeInstanceOf(Date);
        } else {
          expect(user.subscribedAt).toBeNull();
        }
      });
    });

    it('should have users without access having null subscribedAt', () => {
      const usersWithoutAccess = users.filter((u) => !u.hasAccess);
      usersWithoutAccess.forEach((user) => {
        expect(user.subscribedAt).toBeNull();
        expect(user.customerId).toBeNull();
        expect(user.priceId).toBeNull();
      });
    });

    it('should have some admin users', () => {
      const adminUsers = users.filter((u) => u.isAdmin);
      expect(adminUsers.length).toBeGreaterThan(0);
    });

    it('should have users with different price tiers', () => {
      const priceIds = users.map((u) => u.priceId).filter(Boolean);
      const uniquePriceIds = new Set(priceIds);
      expect(uniquePriceIds.size).toBeGreaterThanOrEqual(3);
    });

    it('should have unique IDs', () => {
      const ids = users.map((u) => u.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have unique emails', () => {
      const emails = users.map((u) => u.email);
      const uniqueEmails = new Set(emails);
      expect(uniqueEmails.size).toBe(emails.length);
    });

    it('should have first user with correct data', () => {
      const first = users[0];
      expect(first.name).toBe('Alice Johnson');
      expect(first.email).toBe('alice.johnson@example.com');
      expect(first.hasAccess).toBe(true);
      expect(first.isAdmin).toBe(false);
    });

    it('should have users with women gender having correct image paths', () => {
      const womenUsers = users.filter((u) => u?.image?.includes('/women/'));
      expect(womenUsers.length).toBeGreaterThan(0);
    });

    it('should have users with men gender having correct image paths', () => {
      const menUsers = users.filter((u) => u?.image?.includes('/men/'));
      expect(menUsers.length).toBeGreaterThan(0);
    });
  });
});
