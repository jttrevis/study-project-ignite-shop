
import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import logoImg from '@/assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Link from 'next/link'


globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href={'/'}>
          <img src={logoImg.src} alt="two green triangles positioned diagonally" />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
