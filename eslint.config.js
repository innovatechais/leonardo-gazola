export default [
  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: { ecmaVersion: 2025, sourceType: 'module' },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': 'error',
      'no-eval': 'error',
      'no-throw-literal': 'error',
      'prefer-template': 'error',
    },
  },
  { ignores: ['.aios-core/**', 'squads/**', 'node_modules/**'] },
]
