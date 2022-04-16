module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    'globals': {
        'SpreadsheetApp': 'readonly',
        'UrlFetchApp': 'readonly',
        'DriveApp': 'readonly',
        'ScriptApp': 'readonly',
        'Logger': 'readonly',
        'Utilities': 'readonly',
        'Browser': 'readonly'
    },
    "ignorePatterns": ["node_modules/**/*.js", "/client/**/*.js"],
    'rules': {
        'no-multiple-empty-lines': ['error'],
        'no-multi-spaces': ['error'],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'indent': [
            'error',
            2
        ],
    }
};