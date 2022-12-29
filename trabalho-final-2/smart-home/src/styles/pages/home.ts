import { styled } from "..";
import Link from 'next/link'

export const HomeContainer = styled('div', {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
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
    cursor: 'pointer'
  }
})

export const RoomsContainer = styled('main', {
  margin: '3rem 0',

  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1rem',
})

export const Room = styled(Link, {
  variants: {
    type: {
      bedroom: {
        backgroundColor: '#324438',
        color: '#91C799'
      },
      kitchen: {
        backgroundColor: '#574B2F',
        color: '#F6D775'
      },
      office: {
        backgroundColor: '#823333',
        color: '#ED8484'
      },
      livingRoom: {
        backgroundColor: '#313F57',
        color: '#92B2F2'
      }
    }
  },

  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: '1rem',
  borderRadius: '8px',
  backgroundColor: '$white',
  textDecoration: 'none',

  span: {
    fontSize: '1.25rem',
  }
})