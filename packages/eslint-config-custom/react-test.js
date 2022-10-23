// eslint-disable-next-line no-undef
module.exports = {
    overrides: [
        {
            //Only enable tests for matching testing files!
            files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:jest/recommended', 'plugin:jest-dom/recommended', 'plugin:testing-library/react']
        }
    ]
}
