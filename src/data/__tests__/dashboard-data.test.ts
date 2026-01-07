import { TRANSACTIONS, Transaction } from '../dashboard-data';

describe('TRANSACTIONS', () => {
  it('should have 4 transactions', () => {
    expect(TRANSACTIONS).toHaveLength(4);
  });

  it('should have required properties for each transaction', () => {
    TRANSACTIONS.forEach((transaction) => {
      expect(transaction).toHaveProperty('id');
      expect(transaction).toHaveProperty('date');
      expect(transaction).toHaveProperty('payer');
      expect(transaction).toHaveProperty('receiver');
      expect(transaction).toHaveProperty('amount');
      expect(transaction).toHaveProperty('gateway');
      expect(transaction).toHaveProperty('gatewayColor');
      expect(transaction).toHaveProperty('status');
      expect(transaction).toHaveProperty('statusColor');
    });
  });

  it('should have payer with name and avatar', () => {
    TRANSACTIONS.forEach((transaction) => {
      expect(transaction.payer).toHaveProperty('name');
      expect(transaction.payer).toHaveProperty('avatar');
      expect(typeof transaction.payer.name).toBe('string');
      expect(typeof transaction.payer.avatar).toBe('string');
    });
  });

  it('should have unique ids', () => {
    const ids = TRANSACTIONS.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid date format', () => {
    TRANSACTIONS.forEach((transaction) => {
      expect(transaction.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it('should have valid amount format', () => {
    TRANSACTIONS.forEach((transaction) => {
      expect(transaction.amount).toMatch(/^\$[\d,]+\.\d{2}$/);
    });
  });

  it('should have valid gateway values', () => {
    const validGateways = ['Stripe', 'Mercado Pago'];
    TRANSACTIONS.forEach((transaction) => {
      expect(validGateways).toContain(transaction.gateway);
    });
  });

  it('should have valid status values', () => {
    const validStatuses = ['Completed', 'Pending', 'Failed'];
    TRANSACTIONS.forEach((transaction) => {
      expect(validStatuses).toContain(transaction.status);
    });
  });

  it('should have valid color classes', () => {
    TRANSACTIONS.forEach((transaction) => {
      expect(transaction.gatewayColor).toMatch(/^bg-\w+-\d+$/);
      expect(transaction.statusColor).toMatch(/^bg-\w+-\d+$/);
    });
  });
});

describe('Transaction interface', () => {
  it('should allow creating valid transaction object', () => {
    const transaction: Transaction = {
      id: '#TX-0001',
      date: '2024-01-01',
      payer: { name: 'Test User', avatar: '🧑' },
      receiver: 'Test Receiver',
      amount: '$100.00',
      gateway: 'Stripe',
      gatewayColor: 'bg-blue-600',
      status: 'Completed',
      statusColor: 'bg-green-600',
    };
    expect(transaction.id).toBe('#TX-0001');
    expect(transaction.payer.name).toBe('Test User');
  });

  it('should have proper types for all fields', () => {
    const transaction = TRANSACTIONS[0];
    expect(typeof transaction.id).toBe('string');
    expect(typeof transaction.date).toBe('string');
    expect(typeof transaction.payer).toBe('object');
    expect(typeof transaction.receiver).toBe('string');
    expect(typeof transaction.amount).toBe('string');
    expect(typeof transaction.gateway).toBe('string');
    expect(typeof transaction.gatewayColor).toBe('string');
    expect(typeof transaction.status).toBe('string');
    expect(typeof transaction.statusColor).toBe('string');
  });
});
