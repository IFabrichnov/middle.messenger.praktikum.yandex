module.exports = {
  extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', 100],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'no-restricted-syntax': 'off',
    'semi': 'off',
    'no-prototype-builtins': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
