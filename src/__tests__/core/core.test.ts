import { describe, it, expect } from '@jest/globals';

describe('String Utilities', () => {
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
  const truncate = (str: string, length: number) => 
    str.length > length ? str.slice(0, length) + '...' : str;
  const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

  it('should capitalize strings', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('WORLD')).toBe('WORLD');
  });

  it('should truncate strings', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
    expect(truncate('Hi', 5)).toBe('Hi');
  });

  it('should slugify strings', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('My Product Name')).toBe('my-product-name');
  });

  it('should handle string case operations', () => {
    const str = 'TeSt StRiNg';
    expect(str.toUpperCase()).toBe('TEST STRING');
    expect(str.toLowerCase()).toBe('test string');
  });

  it('should handle string splitting', () => {
    const csv = 'apple,banana,orange';
    expect(csv.split(',')).toEqual(['apple', 'banana', 'orange']);
  });

  it('should handle string replacement', () => {
    const str = 'Hello World';
    expect(str.replace('World', 'Earth')).toBe('Hello Earth');
  });

  it('should handle string padding', () => {
    const str = '5';
    expect(str.padStart(2, '0')).toBe('05');
    expect(str.padEnd(3, '0')).toBe('500');
  });

  it('should check string patterns', () => {
    const isNumber = (str: string) => /^\d+$/.test(str);
    const isAlpha = (str: string) => /^[a-z]+$/i.test(str);

    expect(isNumber('12345')).toBe(true);
    expect(isNumber('12a34')).toBe(false);
    expect(isAlpha('Hello')).toBe(true);
    expect(isAlpha('Hello123')).toBe(false);
  });
});

describe('Number Utilities', () => {
  it('should round numbers', () => {
    expect(Math.round(4.6)).toBe(5);
    expect(Math.round(4.4)).toBe(4);
  });

  it('should floor and ceil', () => {
    expect(Math.floor(4.9)).toBe(4);
    expect(Math.ceil(4.1)).toBe(5);
  });

  it('should find min and max', () => {
    const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
    expect(Math.min(...numbers)).toBe(1);
    expect(Math.max(...numbers)).toBe(9);
  });

  it('should format numbers', () => {
    const num = 1234567;
    expect(num.toLocaleString()).toContain(',');
  });

  it('should calculate percentages', () => {
    const percentage = (value: number, total: number) => (value / total) * 100;
    expect(percentage(50, 200)).toBe(25);
    expect(percentage(100, 400)).toBe(25);
  });

  it('should handle floating point operations', () => {
    const total = 0.1 + 0.2;
    expect(Math.abs(total - 0.3) < 0.0001).toBe(true);
  });
});

describe('Array Utilities', () => {
  it('should filter arrays', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.filter(x => x > 2)).toEqual([3, 4, 5]);
  });

  it('should map arrays', () => {
    const arr = [1, 2, 3];
    expect(arr.map(x => x * 2)).toEqual([2, 4, 6]);
  });

  it('should reduce arrays', () => {
    const arr = [1, 2, 3, 4];
    const sum = arr.reduce((a, b) => a + b, 0);
    expect(sum).toBe(10);
  });

  it('should find elements', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr.find(x => x > 3)).toBe(4);
    expect(arr.findIndex(x => x === 3)).toBe(2);
  });

  it('should check array conditions', () => {
    const arr = [2, 4, 6];
    expect(arr.every(x => x % 2 === 0)).toBe(true);
    expect(arr.some(x => x > 5)).toBe(true);
  });

  it('should flatten arrays', () => {
    const arr = [1, [2, 3], [4, [5, 6]]];
    expect(arr.flat(2)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should remove duplicates', () => {
    const arr = [1, 2, 2, 3, 3, 3];
    expect([...new Set(arr)]).toEqual([1, 2, 3]);
  });
});

describe('Object Utilities', () => {
  it('should merge objects', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    expect({ ...obj1, ...obj2 }).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should get object keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(Object.keys(obj)).toEqual(['a', 'b', 'c']);
  });

  it('should get object values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(Object.values(obj)).toEqual([1, 2, 3]);
  });

  it('should get object entries', () => {
    const obj = { a: 1, b: 2 };
    expect(Object.entries(obj)).toEqual([['a', 1], ['b', 2]]);
  });

  it('should check object properties', () => {
    const obj = { a: 1, b: 2 };
    expect('a' in obj).toBe(true);
    expect('c' in obj).toBe(false);
  });

  it('should delete object properties', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const { b, ...rest } = obj;
    expect(rest).toEqual({ a: 1, c: 3 });
  });
});
