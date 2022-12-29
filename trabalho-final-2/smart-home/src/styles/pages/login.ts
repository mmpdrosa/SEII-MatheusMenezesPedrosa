import { styled } from "..";

export const SignInContainer = styled('main', {
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  h2: {
    fontSize: '2rem',
    marginBottom: '3rem',
    color: '$grayText'
  }
})

export const SignInForm = styled('form', {
  width: '100%',

  svg: {
    marginRight: '0.5rem'
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#313f57',
    height: '3rem',
    borderRadius: '20px',
    border: 0,
    padding: '0 1rem',
    color: '#92b2f2',
    width: '100%',
    fontSize: '1.25rem',
    marginTop: '2rem',
    transition: 'background-color 0.2s',
  },

  'button:hover': {
    color: '#313f57',
    background: '#92b2f2',
  }
})

export const SignInInputFild = styled('div', {
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },

  input: {
    background: 'transparent',
    height: '2.5rem',
    border: 0,
    borderBottom: '2px solid $grayPlaceholder',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    padding: '0 0.5rem',
    color: '$white',
    marginBottom: '1rem',
    outline: 'transparent',
  }
})

export const ForgotPassword = styled('div', {
  width: '100%',
  textAlign: 'right',
  
  a: {
    color: '$grayText',
    textDecoration: 'none',
    fontSize: '0.875rem'
  },

  'a:hover': {
    color: '#92b2f2'
  }
})