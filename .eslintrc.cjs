module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    '@typescript-eslint/comma-dangle': 0,
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/naming-convention': 0,
    'linebreak-style': ['error', 'unix'],
  },
};
