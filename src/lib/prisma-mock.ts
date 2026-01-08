// Temporary mock for Prisma until Express API is implemented
// Returns dummy data to allow build to succeed

const mockUser = {
  id: 'mock-user-123',
  name: 'Mock User',
  email: 'mock@example.com',
  emailVerified: null,
  password: '$2a$10$mockhashedpassword',
  image: null,
  customerId: null,
  priceId: null,
  isAdmin: false,
  hasAccess: false,
  subscribedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const prisma = {
  user: {
    findUnique: async (args?: any) => mockUser,
    findFirst: async (args?: any) => mockUser,
    findMany: async (args?: any) => [mockUser],
    create: async (args?: any) => ({ ...mockUser, id: 'mock-id', ...args?.data }),
    update: async (args?: any) => ({ ...mockUser, ...args?.data }),
    delete: async (args?: any) => mockUser,
    upsert: async (args?: any) => ({ ...mockUser, ...args?.update }),
    count: async (args?: any) => 1,
  },
  account: {
    findUnique: async (args?: any) => null,
    findFirst: async (args?: any) => null,
    findMany: async (args?: any) => [],
    create: async (args?: any) => ({ id: 'mock-id', ...args?.data }),
    update: async (args?: any) => ({ id: 'mock-id', ...args?.data }),
    delete: async (args?: any) => ({ id: 'mock-id' }),
  },
  verificationToken: {
    findUnique: async (args?: any) => ({ id: 'mock-verification-id', identifier: 'mock', token: 'mock-token', expires: new Date(Date.now() + 3600000) }),
    findFirst: async (args?: any) => ({ id: 'mock-verification-id', identifier: 'mock', token: 'mock-token', expires: new Date(Date.now() + 3600000) }),
    create: async (args?: any) => ({ id: 'mock-verification-id', identifier: 'mock', token: 'mock-token', expires: new Date(Date.now() + 3600000) }),
    delete: async (args?: any) => ({ id: 'mock-verification-id', identifier: 'mock', token: 'mock-token', expires: new Date(Date.now() + 3600000) }),
    deleteMany: async (args?: any) => ({ count: 1 }),
  },
  otpToken: {
    findUnique: async (args?: any) => ({ id: 'mock-otp-id', email: 'mock@example.com', otp: '123456', type: 'EMAIL_VERIFICATION', expires: new Date(Date.now() + 600000), createdAt: new Date() }),
    findFirst: async (args?: any) => ({ id: 'mock-otp-id', email: 'mock@example.com', otp: '123456', type: 'EMAIL_VERIFICATION', expires: new Date(Date.now() + 600000), createdAt: new Date() }),
    findMany: async (args?: any) => [],
    create: async (args?: any) => ({ id: 'mock-otp-id', email: args?.data?.email || 'mock@example.com', otp: args?.data?.otp || '123456', type: args?.data?.type || 'EMAIL_VERIFICATION', expires: new Date(Date.now() + 600000), createdAt: new Date() }),
    update: async (args?: any) => ({ id: 'mock-otp-id', email: 'mock@example.com', otp: '123456', type: 'EMAIL_VERIFICATION', expires: new Date(Date.now() + 600000), createdAt: new Date() }),
    delete: async (args?: any) => ({ id: 'mock-otp-id', email: 'mock@example.com', otp: '123456', type: 'EMAIL_VERIFICATION', expires: new Date(Date.now() + 600000), createdAt: new Date() }),
    deleteMany: async (args?: any) => ({ count: 1 }),
  },
  emailVerificationToken: {
    findUnique: async (args?: any) => ({ id: 'mock-token-id', email: 'mock@example.com', token: 'mock-verification-token', expiresAt: new Date(Date.now() + 3600000), createdAt: new Date() }),
    findFirst: async (args?: any) => ({ id: 'mock-token-id', email: 'mock@example.com', token: 'mock-verification-token', expiresAt: new Date(Date.now() + 3600000), createdAt: new Date() }),
    create: async (args?: any) => ({ id: 'mock-token-id', email: args?.data?.email || 'mock@example.com', token: args?.data?.token || 'mock-token', expiresAt: new Date(Date.now() + 3600000), createdAt: new Date() }),
    delete: async (args?: any) => ({ id: 'mock-token-id', email: 'mock@example.com', token: 'mock-verification-token', expiresAt: new Date(Date.now() + 3600000), createdAt: new Date() }),
    deleteMany: async (args?: any) => ({ count: 1 }),
  },
  $disconnect: async () => undefined,
};
