import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import { Container } from "../styles/pages/app"
import { AuthProvider } from "../contexts/AuthContext"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      
    </Container>
  )
}

