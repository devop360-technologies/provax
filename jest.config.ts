import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts?(x)', '**/__tests__/**/*.spec.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', String.raw`\.d\.ts$`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'src/lib/**/*.{ts,tsx}',
    'src/utils/**/*.{ts,tsx}',
    'src/data/**/*.{ts,tsx}',
    'src/components/**/*.{tsx}',
    'src/hooks/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
    // Exclude server-only files that cannot be tested in jsdom
    '!src/lib/prisma.ts',
    '!src/lib/prisma-mock.ts',
    '!src/lib/stripe.ts',
    '!src/lib/s3.ts',
    '!src/lib/smtp-mailer.ts',
    '!src/lib/resend.ts',
    '!src/lib/fonts.ts',
    '!src/lib/metadata.ts',
    '!src/lib/auth/**',
    '!src/lib/api/**',
    '!src/hooks/queries/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
