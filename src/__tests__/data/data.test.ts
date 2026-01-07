import { describe, it, expect } from '@jest/globals';

// Mock data
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  active: true
};

const mockTransaction = {
  id: 'txn_1',
  amount: 1500,
  status: 'completed',
  date: '2024-01-15'
};

describe('Data Constants', () => {
  it('should have valid user structure', () => {
    expect(mockUser).toHaveProperty('id');
    expect(mockUser).toHaveProperty('name');
    expect(mockUser).toHaveProperty('email');
    expect(mockUser.role).toBe('admin');
  });

  it('should have valid transaction structure', () => {
    expect(mockTransaction).toHaveProperty('id');
    expect(mockTransaction).toHaveProperty('amount');
    expect(mockTransaction).toHaveProperty('status');
    expect(mockTransaction.amount).toBeGreaterThan(0);
  });

  it('should validate user email', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(mockUser.email)).toBe(true);
  });

  it('should validate transaction status', () => {
    const validStatuses = ['pending', 'completed', 'failed', 'cancelled'];
    expect(validStatuses).toContain(mockTransaction.status);
  });

  it('should handle data filtering', () => {
    const users = [
      { ...mockUser, id: '1' },
      { ...mockUser, id: '2', role: 'user' },
      { ...mockUser, id: '3', role: 'admin' }
    ];

    const admins = users.filter(u => u.role === 'admin');
    expect(admins.length).toBe(2);
    expect(admins.every(u => u.role === 'admin')).toBe(true);
  });

  it('should calculate totals', () => {
    const transactions = [
      { ...mockTransaction, id: '1', amount: 1500 },
      { ...mockTransaction, id: '2', amount: 2500 },
      { ...mockTransaction, id: '3', amount: 3000 }
    ];

    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    expect(total).toBe(7000);
  });

  it('should group data', () => {
    const items = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'A', value: 30 }
    ];

    const grouped = items.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, typeof items>);

    expect(grouped['A'].length).toBe(2);
    expect(grouped['B'].length).toBe(1);
  });
});
