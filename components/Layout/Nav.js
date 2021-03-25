import { useContext } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import styled from '@emotion/styled'
import FirebaseContext from '../../firebase/context'

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    font-size: 1.8rem;
    margin: 0.7rem 2rem;
    color: var(--gris2);
    font-family: 'PT Sans', sans-serif;
  }
`

const Nav = () => {
  const route = useRouter().route
  const { user } = useContext(FirebaseContext)

  return (
    <Navigation>
      <Link href="/">
        <a style={route === "/" ? {color: "#da552f"}: {}}>Inicio</a>
      </Link>
      <Link href="/popular">
        <a style={route === "/popular" ? {color: "#da552f"}:{}}>Populares</a>
      </Link>
      {user ? (
        <Link href="/new-product">
          <a>Nuevo producto</a>
        </Link>
      ) : null}
    </Navigation>
  )
}

export default Nav
