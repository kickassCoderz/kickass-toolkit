module.exports = {
    displayName: 'hooks',
    preset: '../../jest.preset.ts',
    transform: {
        '^.+\\.[tj]sx?$': ['@swc/jest', { jsc: { transform: { react: { runtime: 'automatic' } } } }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../coverage/libs/hooks'
}
