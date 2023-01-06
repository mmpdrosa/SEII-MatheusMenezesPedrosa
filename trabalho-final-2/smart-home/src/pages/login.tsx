import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'

import { AuthContext } from '../contexts/AuthContext'
import {
  ForgotPassword,
  SignInContainer,
  SignInForm,
  SignInInputFild,
} from '../styles/pages/login'

type loginFormData = {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit } = useForm<loginFormData>()
  const { logIn } = useContext(AuthContext)

  async function handleSignIn(data: loginFormData) {
    await logIn(data)
  }

  return (
    <>
      <Head>
        <title>Entrar</title>
      </Head>
      <SignInContainer>
        <h1>Entre com a sua conta</h1>
        <SignInForm onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <SignInInputFild>
            <div>
              <label htmlFor="email-address">Email</label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Digite seu email"
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Digite sua senha"
              />
            </div>
          </SignInInputFild>

          <ForgotPassword>
            <a href="#">Esqueceu sua senha?</a>
          </ForgotPassword>

          <button type="submit">Entrar</button>
        </SignInForm>
      </SignInContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'smart-home.token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
