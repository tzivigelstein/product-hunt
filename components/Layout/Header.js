import { useContext } from 'react'
import Search from '../UI/Search'
import Nav from './Nav'
import Link from 'next/link'
import Button from '../UI/Button'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import FirebaseContext from '../../firebase/context'

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`

const Logo = styled.a`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`

const NavContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext)

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gris3);
        padding: 1rem 0;
        background-color: #fff;
      `}
    >
      <HeaderContainer>
        <NavContainer>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Link href="/">
              <Logo>P</Logo>
            </Link>
            <Search />
          </div>
          <Nav />
        </NavContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-around;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hola {user.displayName}
              </p>
              <Button bgColor="true" onClick={() => firebase.signout()}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor="true">Iniciar sesión</Button>
              </Link>
              <Link href="/signup">
                <Button>Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  )
}

export default Header
