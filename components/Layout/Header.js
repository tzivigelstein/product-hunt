import { useContext } from "react"
import Search from "../UI/Search"
import Nav from "./Nav"
import Link from "next/link"
import Button from "../UI/Button"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import FirebaseContext from "../../firebase/context"

const HeaderContainer = styled.header`
  border-bottom: 1px solid var(--light-gray);
  padding: 1rem 2rem;
  background-color: #fff;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`

const ProductHuntLogo = styled.img`
  height: 40px;
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
    <HeaderContainer>
      <NavContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 2rem;
          `}
        >
          <Link href="/">
            <ProductHuntLogo
              src="/product-hunt-full.svg"
              alt="Product Hunt Logo"
            />
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
              Bienvenido, {user.displayName}
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
              <Button style={{ color: "#222", borderColor: "#222" }}>
                Registrarse
              </Button>
            </Link>
          </>
        )}
      </div>
    </HeaderContainer>
  )
}

export default Header
