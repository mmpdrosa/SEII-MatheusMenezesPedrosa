import * as Slider from '@radix-ui/react-slider'
import * as Switch from '@radix-ui/react-switch'

import { styled } from '..'

export const RoomContainer = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  header: {
    display: 'flex',
    justifyContent: '',
    alignItems: 'center',
  },

  h1: {
    flex: 1,
    textAlign: 'center',
    marginRight: '1.5rem',
    fontSize: '$5',
  },

  a: {
    display: 'flex',
    alignItems: 'center',
    color: '$white',
  },
})

export const SensorsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(calc((100% - 2rem)/3), 1fr))',
  gap: '1rem',

  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.25rem',
    alignItems: 'center',
    borderRadius: '12px',
    padding: '0.5rem',
    background: '$gray300',
  },

  h2: {
    fontSize: '$2',
  },

  strong: {
    fontSize: '$2',
  },
})

export const DevicesContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',

  '& > div': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    gap: '1rem',

    padding: '1rem',

    background: '$gray400',
    borderRadius: '8px',
  },

  strong: {
    color: '$gray600',
    fontSize: '$2',
  },
})

export const SwitchContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  label: {
    minWidth: '3rem',
    paddingRight: '1rem',
  },
})

export const SwitchRoot = styled(Switch.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$red100',
  borderRadius: '9999px',
  position: 'relative',
  boxShadow: '0 2px 10px $gray300',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&[data-state="checked"]': { backgroundColor: '$green900' },
})

export const SwitchThumb = styled(Switch.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '$white',
  borderRadius: '9999px',
  boxShadow: '0 2px 2px $gray300',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
})

export const SliderRoot = styled(Slider.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
})

export const SliderTrack = styled(Slider.Track, {
  backgroundColor: '$gray200',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
})

export const SliderRange = styled(Slider.Range, {
  position: 'absolute',
  backgroundColor: '$white',
  borderRadius: '9999px',
  height: '100%',
})

export const SliderThumb = styled(Slider.Thumb, {
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: '$white',
  boxShadow: '0 2px 10px $gray300',
  borderRadius: 10,
  '&:hover': { backgroundColor: '$gray700' },
  '&:focus': { outline: 'none', boxShadow: '0 0 0 5px $gray300' },
})
