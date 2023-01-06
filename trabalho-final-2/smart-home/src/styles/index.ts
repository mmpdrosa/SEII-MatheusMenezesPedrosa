import { createStitches } from '@stitches/react'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  theme: {
    colors: {
      white: '#fff',

      gray100: '#121214',
      gray200: '#202024',
      gray300: '#29292e',
      gray400: '#323238',
      gray500: '#7c7c8a',
      gray600: '#c4c4cc',
      gray700: '#e1e1e6',

      green100: '#324438',
      green900: '#91C799',

      yellow100: '#574B2F',
      yellow900: '#F6D775',

      red100: '#823333',
      red900: '#ED8484',

      blue100: '#313F57',
      blue900: '#92B2F2',
    },
    fontSizes: {
      1: '0.875rem',
      2: '1.125rem',
      3: '1.25rem',
      4: '1.5rem',
      5: '2rem',
    },
  },
})
