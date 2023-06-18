module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    requireConfigFile: false,
  },
  extends: [
    '@wavesenterprise/eslint-config/typescript-pure',
  ],
  rules: {
    '@typescript-eslint/no-empty-function': 'off'
  }
}
