// https://tailwindcss.com/docs/configuration/
const { colors } = require('tailwindcss/defaultConfig').theme
const { createTheme } = require('./src/tailwind-variable-theming')

const dayTheme = createTheme({
  name: 'day',
  colors: {
    base: {
      bodyBg: colors.white,
      bodyText: colors.gray['900'],
      muteText: colors.gray['500'],
      linkText: colors.gray['700'],
      linkHoverText: colors.blue['500'],
    },
    line: {
      border: '#7894',
    },
    panel: {
      bg: colors.gray['100'],
    },
    input: {
      baseBg: colors.gray['200'],
      baseText: 'var(--base-body-text)',
      baseOutline: '#0000',
      focusBg: colors.white,
      focusOutline: '#4564',
      placeholderText: colors.gray['500'],
      shadowSm: '#44558822',
      shadowLg: '#44558809',
    },
    token: {
      activeBg: colors.green['100'],
      activeCursor: 'var(--token-active-text)',
      activeText: colors.green['600'],
      doneErrorLinethrough: colors.red['400'],
      doneErrorText: colors.gray['600'],
      doneText: colors.gray['600'],
      errorBg: colors.red['100'],
      errorCursor: 'var(--token-error-text)',
      errorText: colors.red['600'],
      normalText: 'var(--base-body-text)',
    },
    progress: {
      lead: colors.green['500'],
      highlight: colors.teal['300'],
      track: '#44558822',
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
      muteText: colors.gray['700'],
      linkText: colors.gray['500'],
      linkHoverText: colors.blue['500'],
    },
    line: {
      border: '#7894',
    },
    panel: {
      bg: '#121212',
    },
    input: {
      baseBg: '#78a1',
      baseText: 'var(--base-body-text)',
      baseOutline: '#0000',
      focusBg: '#78a2',
      focusOutline: '#4561',
      placeholderText: colors.gray['700'],
      shadowSm: '#00000055',
      shadowLg: '#00000022',
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
      lead: colors.green['500'],
      highlight: colors.teal['700'],
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
      fontSize: {
        'size-minus-1': ms(-1),
        'size-0': ms(0),
        'size-1': ms(1),
        'size-2': ms(2),
        'size-3': ms(3),
        'size-4': ms(4),
      },
      fontFamily: {
        article: ['"JetBrains Mono"', 'monospace'],
      },
      constants: {
        articleLines: `var(--article-lines, 7)`,
        lineHeight: 1.5,
      },
    },
  },
  variants: {},
  plugins: [dayTheme.plugin, nightTheme.plugin],
}

/* Simple modular scale helper */
function ms(/** @type {number} */ n) {
  return `${(1.2 ** n).toFixed(2)}em`
}
