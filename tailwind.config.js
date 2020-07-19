// https://tailwindcss.com/docs/configuration/
// const plugin = require('tailwindcss/plugin')
const resolve = require('tailwindcss/resolveConfig')
const defaults = resolve({})
const colors = defaults.theme.colors

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        token: {
          ['active-bg']: `var(--token-active-bg, ${colors.green['100']})`,
          ['active-cursor']: `var(--token-active-cursor, ${colors.green['500']})`,
          ['active-text']: `var(--token-active-text, ${colors.green['500']})`,
          ['done-text']: `var(--token-done-text, ${colors.gray['500']})`,
          ['error-bg']: `var(--token-error-bg, ${colors.red['100']})`,
          ['error-cursor']: `var(--token-error-cursor, ${colors.red['500']})`,
          ['error-linethrough']: `var(--token-error-linethrough, ${colors.red['400']})`,
          ['error-text']: `var(--token-error-text, ${colors.red['500']})`,
          ['normal-text']: `var(--token-normal-text, ${colors.gray['900']})`,
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
