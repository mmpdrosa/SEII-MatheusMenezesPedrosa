import Link from 'next/link'

import { styled } from '..'

export const HomeContainer = styled('div', {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  h1: {
    color: '$gray700',
    fontSize: '$5',
  },
})

export const HomeNav = styled('nav', {
  display: 'flex',
  gap: '1rem',

  button: {
    border: 0,
    padding: 0,
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    color: '$white',
    cursor: 'pointer',
  },
})

export const RoomsContainer = styled('main', {
  margin: '3rem 0',

  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
})

export const RoomCard = styled(Link, {
  variants: {
    type: {
      bedroom: {
        backgroundColor: '$green100',
        color: '$green900',
      },
      kitchen: {
        backgroundColor: '$yellow100',
        color: '$yellow900',
      },
      office: {
        backgroundColor: '$blue100',
        color: '$blue900',
      },
      livingRoom: {
        backgroundColor: '$red100',
        color: '$red900',
      },
    },
  },

  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: '1rem',
  borderRadius: '8px',
  textDecoration: 'none',

  span: {
    fontSize: '$3',
  },
})
