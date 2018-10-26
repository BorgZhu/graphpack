module.exports = () => ({
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],
    '@babel/preset-typescript',
  ],
});
