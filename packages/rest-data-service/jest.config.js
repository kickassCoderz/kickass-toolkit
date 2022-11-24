// eslint-disable-next-line no-undef
module.exports = {
    displayName: 'rest-data-service',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(t|j)s$': ['@swc/jest']
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    coveragePathIgnorePatterns: ['index.ts'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/']
}
