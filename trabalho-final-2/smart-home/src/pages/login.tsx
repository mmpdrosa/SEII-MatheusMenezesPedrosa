import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { useForm } from 'react-hook-form'
import { AuthContext } from "../contexts/AuthContext";
import { 
  SignInContainer, 
  SignInForm, 
  SignInInputFild, 
  ForgotPassword,
} from "../styles/pages/login";

type loginFormData = {
  email: string;
  password: string;
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
        <title>Sign In</title>
      </Head>
      <SignInContainer>
        <h2>Sign in to your account</h2>
        <SignInForm onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <SignInInputFild>
            <div>
              <label htmlFor="email-address">
                Email
              </label>
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Type your email"
              />
            </div>
            <div>
              <label htmlFor="password">
                Password
              </label>
              <input
              {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Type your password"
              />
            </div>
          </SignInInputFild>

          <ForgotPassword>
            <a href="#">
              Forgot your password?
            </a>
          </ForgotPassword>

          <button type="submit">
            Sign in
          </button>
        </SignInForm>
      </SignInContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['smart-home.token']: token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}