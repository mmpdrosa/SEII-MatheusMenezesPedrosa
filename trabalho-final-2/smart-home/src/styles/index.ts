import { createStitches } from '@stitches/react'

export const {
  config, 
  styled, 
  css,
  globalCss, 
  keyframes,
  getCssText,
  theme,
  createTheme
} = createStitches({
  theme: {
    colors: {
      white: '#fff',
      
      grayBackground: '#121214',
      grayText: '#c4c4cc',
      grayTitle: '#e1e1e6',
      grayElements: '#202024',
      grayPlaceholder: '#7c7c8a',
    }
  }
})