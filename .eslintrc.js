module.exports = {
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": null, // ES5 node.js ES6 still parsed
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
      'no-unreachable': 'off',
      'comma-dangle': [ 'error', 'never' ],
      'no-console': 'off',
      'consistent-return': 'off',
      'no-param-reassign': 'off',
      'object-curly-spacing': 'warn',
      'one-var-declaration-per-line': 'off',
      'one-var': ['error', { uninitialized: 'always', initialized: 'never' }],
      'padded-blocks': 'off',
      'radix': 'off',
      'semi': 'warn',
      'space-in-parens': 'warn',
      'spaced-comment': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'import/no-unresolved': 'error',
      'prefer-rest-params': 'off',
      'strict': [ 'error', 'global' ]
    }
}
