// https://tailwindcss.com/docs/configuration/
// const plugin = require('tailwindcss/plugin')
const resolve = require('tailwindcss/resolveConfig')
const defaults = resolve({})
const colors = defaults.theme.colors

const { createTheme } = require('./src/tailwind-variable-theming')

const theme = createTheme({
  colors: {
    base: {
      bodyBg: colors.white,
      bodyText: colors.gray['900'],
      linkText: colors.gray['500'],
      linkHoverText: colors.blue['500'],
    },
    input: {
      baseBg: colors.gray['100'],
      baseText: colors.gray['900'],
      baseOutline: '#0000',
      focusBg: colors.gray['100'],
      focusOutline: '#4562',
      placeholderText: colors.gray['500'],
    },
    token: {
      activeBg: colors.green['100'],
      activeCursor: colors.green['500'],
      activeText: colors.green['500'],
      doneText: colors.gray['500'],
      errorBg: colors.red['100'],
      errorCursor: colors.red['500'],
      errorLinethrough: colors.red['400'],
      errorText: colors.red['500'],
      normalText: 'var(--base-body-text)',
    },
  },
})

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        ...theme.config.colors,
      },
    },
  },
  variants: {},
  plugins: [theme.plugin],
}
