import globals from 'globals';
import pluginJs from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import pluginReact from '@eslint-react/eslint-plugin';
import pluginImport from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'build/**', 'eslint.config.js', 'next.config.mjs'],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs['recommended-typescript'],
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
      '@eslint-react/no-array-index-key': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
