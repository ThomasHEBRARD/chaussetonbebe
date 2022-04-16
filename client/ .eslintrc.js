// Workaround to use @typescript-eslint recommended rules onlt for TS
const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin').configs.recommended;

module.exports = {
    extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
    parser: 'babel-eslint',
    rules: {
        camelcase: 'off',
        snakecase: 'off',
        'max-len': 'off',

        // JSX
        'react/forbid-prop-types': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/require-default-props': ['warn', { ignoreFunctionalComponents: true }],
        'react/no-unused-prop-types': 'warn',

        // Not fully understood how to fix, to be investigated
        'jsx-a11y/label-has-for': 'off',
        'jsx-a11y/label-has-associated-control': 'off',

        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'src/setupTests.ts',
                    '**/*test*.tsx',
                    '**/*.stories.tsx',
                    '**/*.spec.ts',
                ],
            },
        ],
        'import/extensions': ['never'],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['a'],
            },
        ],
        'no-nested-ternary': 'off',
        'no-lonely-if': 'off',
    },
    globals: {
        window: false,
        document: false,
        localStorage: false,
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
        },
    },
    plugins: ['prettier'],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                sourceType: 'module',
                project: './tsconfig.json',
            },
            plugins: ['@typescript-eslint'],

            rules: Object.assign(typescriptEslintRecommended.rules, {
                '@typescript-eslint/ban-ts-ignore': 'off',
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
                ],
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/indent': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
                'no-undef': 'off',
                'react/jsx-filename-extension': 'off',
                'react/prop-types': 'off',
                'react/no-array-index-key': 'off',
            }),
        },
    ],
};
