import type { Config } from 'jest'

const config: Config = {
    displayName: 'kickass-rds',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}

export default config
