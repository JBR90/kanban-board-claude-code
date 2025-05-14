import type { Config } from 'jest';

const config: Config = {
  // Basic test environment for React components
  testEnvironment: 'jest-environment-jsdom',
  // Load setup file with testing-library configuration
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Transform files for TypeScript and JSX
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest'
  },
  // Handle module paths/aliases used in Next.js
  moduleNameMapper: {
    // Handle CSS imports
    '^.+\\.(css|sass|scss)$': '<rootDir>/test/styleMock.ts',
    // Handle Next.js module aliases
    '^@/(.*)$': '<rootDir>/$1'
  },
  // Define test patterns
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  // Configure coverage collection
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  // Ignore coverage from certain files
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/']
};

export default config;