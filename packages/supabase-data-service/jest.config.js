// eslint-disable-next-line no-undef
module.exports = {
    displayName: 'supabase-data-service',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coveragePathIgnorePatterns: ['index.ts'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/']
}
