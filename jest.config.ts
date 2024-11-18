export { };
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts',
        '!**/vendor/**'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        ".(ts|tsx)": "ts-jest"
    },

    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/coverage",
        "package.json",
        "package-lock.json",
        "reportWebVitals.ts",
        "src/setupTests.ts",
        "src/index.tsx"
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
}
