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
  padding: 1.25rem 2rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
`

const LogoAndSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 480px) {
    align-items: flex-start;
    gap: 1rem;
  }
`

const ProductHuntLogo = styled.picture`
  height: 40px;
`

const NavContainer = styled.div`
  display: flex;
`

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext)

  return (
    <HeaderContainer>
      <NavContainer>
        <LogoAndSearch>
          <Link href="/">
            <ProductHuntLogo>
              <source
                role="presentation"
                media="(max-width: 480px)"
                srcSet="/product-hunt.svg"
              />
              <img alt="Product Hunt Logo" src="/product-hunt-full.svg" />
            </ProductHuntLogo>
          </Link>
          <Search />
        </LogoAndSearch>
        <Nav />
      </NavContainer>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-around;
        `}
      >
        {user && (
          <Button bgColor="true" onClick={() => firebase.signout()}>
            Logout
          </Button>
        )}
        {!user && (
          <Link href="/login">
            <Button bgColor="true">Sign in</Button>
          </Link>
        )}
      </div>
    </HeaderContainer>
  )
}

export default Header
