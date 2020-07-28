// https://tailwindcss.com/docs/configuration/
// const plugin = require('tailwindcss/plugin')
const resolve = require('tailwindcss/resolveConfig')
const defaults = resolve({})
const colors = defaults.theme.colors

const { createTheme } = require('./src/tailwind-variable-theming')

const dayTheme = createTheme({
  name: 'day',
  colors: {
    base: {
      bodyBg: colors.white,
      bodyText: colors.gray['900'],
      linkText: colors.gray['500'],
      linkHoverText: colors.blue['500'],
    },
    input: {
      baseBg: colors.gray['100'],
      baseText: 'var(--base-body-text)',
      baseOutline: '#0000',
      focusBg: colors.white,
      focusOutline: '#4564',
      placeholderText: colors.gray['500'],
    },
    token: {
      activeBg: colors.green['100'],
      activeCursor: 'var(--token-active-text)',
      activeText: colors.green['500'],
      doneErrorLinethrough: colors.red['400'],
      doneErrorText: colors.gray['600'],
      doneText: colors.gray['600'],
      errorBg: colors.red['100'],
      errorCursor: 'var(--token-error-text)',
      errorText: colors.red['500'],
      normalText: 'var(--base-body-text)',
    },
    progress: {
      lead: colors.gray['600'],
      highlight: colors.green['300'],
      track: colors.gray['200'],
    },
    tooltip: {
      good: 'var(--token-active-text)',
      bad: 'var(--token-error-text)',
    },
  },
})

const nightTheme = createTheme({
  name: 'night',
  colors: {
    base: {
      bodyBg: '#1a1a1c',
      bodyText: colors.gray['300'],
      linkText: colors.gray['500'],
      linkHoverText: colors.blue['500'],
    },
    input: {
      baseBg: '#0001',
      baseText: 'var(--base-body-text)',
      baseOutline: '#4562',
      focusBg: '#78a1',
      focusOutline: '#4564',
      placeholderText: colors.gray['500'],
    },
    token: {
      activeBg: colors.green['900'],
      activeCursor: 'var(--token-active-text)',
      activeText: colors.green['300'],
      doneErrorLinethrough: colors.red['700'],
      doneErrorText: colors.gray['700'],
      doneText: colors.gray['700'],
      errorBg: colors.red['900'],
      errorCursor: 'var(--token-error-text)',
      errorText: colors.red['300'],
      normalText: 'var(--base-body-text)',
    },
    progress: {
      lead: colors.gray['600'],
      highlight: colors.green['700'],
      track: colors.gray['900'],
    },
    tooltip: {
      good: colors.green['700'],
      bad: colors.red['700'],
    },
  },
})

module.exports = {
  purge: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        ...dayTheme.config.colors,
      },
    },
  },
  variants: {},
  plugins: [dayTheme.plugin, nightTheme.plugin],
}
