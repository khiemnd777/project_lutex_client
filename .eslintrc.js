module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  settings: {
    react: {
      pragma: 'h',
      version: 'detect',
    },
  },
  rules: {
    'react/no-unknown-property': ['error', { ignore: ['class', 'text-anchor'] }], // textAnchor currently not work with preact
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/restrict-plus-operands': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-unknown-property': 0,
  },
};
