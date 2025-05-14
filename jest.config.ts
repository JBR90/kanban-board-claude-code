import { config } from 'process';
import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Add custom test environment for React
  testEnvironment: 'jest-environment-jsdom',
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

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);