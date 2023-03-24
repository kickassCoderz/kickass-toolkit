import type { Config } from 'jest'

const config: Config = {
    displayName: 'kickass-rds',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
    },
     setupFilesAfterEnv: ['./jest.setup.js']
}

export default config
