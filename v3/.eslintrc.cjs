/* eslint-env node */
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc', 'simple-import-sort'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './packages/*/tsconfig.json']
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:turbo/recommended',
        'plugin:unicorn/recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        'tsdoc/syntax': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    kebabCase: true,
                    pascalCase: true
                }
            }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        },
        next: {
            rootDir: ['apps/*/']
        }
    }
}
