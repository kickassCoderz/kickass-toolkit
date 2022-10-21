/* eslint-disable no-undef */
module.exports = {
    extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'custom/base'
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
    //   rules: {
    //     'react/jsx-uses-react': 'off',
    //     'react/react-in-jsx-scope': 'off'
    //   }
}
