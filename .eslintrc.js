module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'arrow-body-style': 'off',
    'arrow-parens': ['warn', 'as-needed'],
    'consistent-return': 'off',
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'func-style': ['error', 'declaration'],
    'implicit-arrow-linebreak': ['warn', 'beside'],
    'import/export': 'warn',
    'import/named': 'warn',
    'import/namespace': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/prefer-default-export': 'off',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['JSXElement'],
      },
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'max-len': [
      'warn',
      120,
      {
        ignoreStrings: true,
      },
    ],
    'no-console': 'off',
    'no-multi-spaces': 'warn',
    'no-nested-ternary': 'off',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'error',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'object-curly-newline': [
      'warn',
      {
        consistent: true,
        multiline: true,
      },
    ],
    'object-curly-spacing': ['warn', 'always'],
    'operator-assignment': ['warn', 'never'],
    'prefer-arrow-callback': 'error',
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    radix: 'off',
    'react/button-has-type': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-danger': 'off',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/function-component-definition': 'off',
    'sort-keys': [
      'off',
      'asc',
      {
        caseSensitive: false,
        natural: true,
      },
    ],
  },
};
