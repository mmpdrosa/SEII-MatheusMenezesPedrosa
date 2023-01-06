import { styled } from '..'

export const SignInContainer = styled('main', {
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  h1: {
    fontSize: '$5',
    marginBottom: '3rem',
    color: '$gray700',
  },
})

export const SignInForm = styled('form', {
  width: '100%',

  svg: {
    marginRight: '0.5rem',
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '$blue100',
    height: '3rem',
    borderRadius: '20px',
    border: 0,
    padding: '0 1rem',
    color: '$blue900',
    width: '100%',
    fontSize: '$2',
    marginTop: '2rem',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  },

  'button:hover': {
    background: '$blue900',
    color: '$blue100',
  },
})

export const SignInInputFild = styled('div', {
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  input: {
    background: 'transparent',
    height: '2.5rem',
    border: 0,
    borderBottom: '2px solid $gray300',
    fontWeight: 'bold',
    fontSize: '$2',
    padding: '0 0.5rem',
    color: '$gray700',
    marginBottom: '1rem',
    outline: 'transparent',
  },
})

export const ForgotPassword = styled('div', {
  width: '100%',
  textAlign: 'right',

  a: {
    textDecoration: 'none',
    fontSize: '$1',
    color: '$gray600',
    cursor: 'pointer',
  },

  'a:hover': {
    color: '$blue900',
  },
})
