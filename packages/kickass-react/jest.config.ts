import type { Config } from 'jest'

const config: Config = {
    displayName: 'Kickass React',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>'],
    modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
    }
}

export default config
