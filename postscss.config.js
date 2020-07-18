const { resolve } = require('path')

module.exports = (ctx) => {
  return {
    plugins: [
      require('postcss-import')({
        path: resolve(__dirname, 'src'),
      }),
      require('tailwindcss'),
      require('postcss-preset-env')({ stage: 0 }),
    ],
  }
}
