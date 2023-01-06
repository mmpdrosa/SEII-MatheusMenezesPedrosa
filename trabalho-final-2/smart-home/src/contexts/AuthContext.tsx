import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import Router from 'next/router'
import { destroyCookie, setCookie } from 'nookies'
import { createContext, ReactNode, useEffect, useState } from 'react'

import { firebase } from '../lib/firebase'

type SignInData = {
  email: string
  password: string
}

type User = {
  uid: string | null
  email: string | null
  name: string | null
}

type AuthContextType = {
  user: User | null
  logIn: (data: SignInData) => Promise<void>
  logOut: () => Promise<void>
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

const auth = getAuth(firebase)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName: name, uid } = user

        setUser({ email, name, uid })
      } else {
        setUser(null)
        destroyCookie(undefined, 'smart-home.token')
      }
    })
  }, [])

  async function logIn({ email, password }: SignInData) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        const { token, expirationTime } = await user.getIdTokenResult()

        setCookie(undefined, 'smart-home.token', token, {
          expires: new Date(expirationTime),
        })

        setUser({
          uid: user.uid,
          email,
          name: user.displayName,
        })

        Router.push(`/`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async function logOut() {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  )
}
