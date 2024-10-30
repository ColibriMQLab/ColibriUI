const config = {
  coverageProvider: 'v8',
  moduleFileExtensions: ['tsx', 'ts', 'js'],
  testRegex: '\\.test\\.tsx?$',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['!*.d.ts', '!*.props.ts', '!*.stories.tsx', '!*.constants.ts'],
  coverageReporters: ['text', 'text-summary', 'cobertura'],
  coverageDirectory: '.coverage',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

export default config;
