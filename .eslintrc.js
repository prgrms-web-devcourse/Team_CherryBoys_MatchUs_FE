module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    // 선언되지 않은 전역변수를 사용하는 경우 ESLint에서 경고가 발생하지 않도록한다.
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // 구문 분석을 위한 parser를 기재합니다.
  parser: '@typescript-eslint/parser',
  // ESLint 사용을 위해 지원하려는 JS 언어옵ㅂ션을 지정할 수 있습니다.,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        '': 'never',
      },
    ],
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/require-default-props': [0],
    'react/no-array-index-key': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
  },
};
