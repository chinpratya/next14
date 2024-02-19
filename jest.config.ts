import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: [
    '<rootDir>/src/testing/setup-tests.ts',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '@components/(.*)':
      '<rootDir>/src/components/share-components/$1',
    '@charts/(.*)':
      '<rootDir>/src/components/chart-components/$1',
    '@layoutComponents/(.*)':
      '<rootDir>/src/components/layout-components/$1',
    '@utilComponents/(.*)':
      '<rootDir>/src/components/util-components/$1',
    '@layouts/(.*)': '<rootDir>/src/layouts/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};

module.exports = createJestConfig(customJestConfig);
