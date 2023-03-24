import type { Config } from 'jest'

const config: Config = {
    displayName: 'kickass-js',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],
    transform: {
        '^.+\\.(t|j)sx?$': '@swc/jest'
    }
}

export default config
