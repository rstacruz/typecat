const { resolve } = require('path')

module.exports = {
  plugins: [
    ['postcss-import', { path: resolve(__dirname, 'src') }],
    'tailwindcss',
    ['postcss-preset-env', { stage: 1 }],
  ],
}
