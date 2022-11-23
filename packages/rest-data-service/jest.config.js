// eslint-disable-next-line no-undef
module.exports = {
    displayName: 'rest-data-service',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // coverageDirectory: '../../coverage/packages/hooks',
    coveragePathIgnorePatterns: ['index.ts'],
    setupFilesAfterEnv: ['./jest.setup.js']
}
