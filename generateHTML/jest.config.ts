/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
    transform: {
        '^.+\\.ts?$': 'esbuild-jest',
    },
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    testMatch: ['**/tests/unit/*.test.ts'],
    moduleNameMapper: {
        "@libs/(.*)": "<rootDir>/libs/$1",
        "@domains/(.*)": "<rootDir>/domains/$1",
        "@services/(.*)": "<rootDir>/services/$1",
        "@configs": "<rootDir>/configs"
    },
    extensionsToTreatAsEsm: ['.ts'],
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"]
};
