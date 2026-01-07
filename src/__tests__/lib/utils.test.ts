import { describe, it, expect } from '@jest/globals';

describe('Data Utilities', () => {
  it('should handle string formatting', () => {
    const format = (str: string) => str.trim().toLowerCase();
    expect(format('  HELLO WORLD  ')).toBe('hello world');
  });

  it('should format currency', () => {
    const formatCurrency = (amount: number) => 
      new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(amount);
    
    const formatted = formatCurrency(1234.56);
    expect(formatted).toContain('1,234');
  });

  it('should format dates', () => {
    const date = new Date('2024-01-15');
    const formatted = date.toLocaleDateString('en-US');
    expect(formatted).toContain('2024');
  });

  it('should handle array operations', () => {
    const items = ['a', 'b', 'c', 'd', 'e'];
    const filtered = items.filter(item => item !== 'c');
    expect(filtered).toEqual(['a', 'b', 'd', 'e']);
    expect(filtered.length).toBe(4);
  });

  it('should handle object transformation', () => {
    const obj = { id: 1, name: 'John', age: 30 };
    const transformed = Object.entries(obj).reduce((acc, [key, val]) => ({
      ...acc,
      [key]: typeof val === 'string' ? val.toUpperCase() : val
    }), {});
    
    expect(transformed).toHaveProperty('name', 'JOHN');
  });

  it('should handle sorting', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(sorted[0]).toBe(1);
    expect(sorted[sorted.length - 1]).toBe(9);
  });

  it('should handle conditional logic', () => {
    const getValue = (status: string) => {
      switch (status) {
        case 'active':
          return 'Active';
        case 'inactive':
          return 'Inactive';
        default:
          return 'Unknown';
      }
    };

    expect(getValue('active')).toBe('Active');
    expect(getValue('inactive')).toBe('Inactive');
    expect(getValue('pending')).toBe('Unknown');
  });

  it('should handle null/undefined checks', () => {
    const safeAccess = (obj: any, path: string, defaultVal: any) => {
      const keys = path.split('.');
      let value = obj;
      for (const key of keys) {
        value = value?.[key];
      }
      return value ?? defaultVal;
    };

    const user = { profile: { name: 'John' } };
    expect(safeAccess(user, 'profile.name', 'Unknown')).toBe('John');
    expect(safeAccess(user, 'profile.age', 0)).toBe(0);
    expect(safeAccess(null, 'any.path', 'Default')).toBe('Default');
  });
});
