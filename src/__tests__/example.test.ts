import { describe, it, expect } from '@jest/globals';

// Test for utility functions example
describe('Utility Functions', () => {
  it('should be able to run basic tests', () => {
    expect(true).toBe(true);
  });

  it('should perform basic string operations', () => {
    const str = 'hello world';
    expect(str.toUpperCase()).toBe('HELLO WORLD');
    expect(str.split(' ')).toEqual(['hello', 'world']);
  });

  it('should handle arrays correctly', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.length).toBe(5);
    expect(arr.includes(3)).toBe(true);
    expect(arr.map(x => x * 2)).toEqual([2, 4, 6, 8, 10]);
  });

  it('should handle objects correctly', () => {
    const obj = { name: 'John', age: 30 };
    expect(obj.name).toBe('John');
    expect(obj.age).toBe(30);
    expect(Object.keys(obj)).toEqual(['name', 'age']);
  });
});

describe('Common JavaScript Operations', () => {
  it('should filter arrays', () => {
    const numbers = [1, 2, 3, 4, 5];
    const even = numbers.filter(n => n % 2 === 0);
    expect(even).toEqual([2, 4]);
  });

  it('should reduce arrays', () => {
    const numbers = [1, 2, 3, 4];
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    expect(sum).toBe(10);
  });

  it('should merge objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const merged = { ...obj1, ...obj2 };
    expect(merged).toEqual({ a: 1, b: 3, c: 4 });
  });
});
