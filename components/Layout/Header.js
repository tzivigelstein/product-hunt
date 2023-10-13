import { useContext } from "react"
import Search from "../UI/Search"
import Nav from "./Nav"
import Link from "next/link"
import Button from "../UI/Button"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import FirebaseContext from "../../firebase/context"
import UserIcon from "@components/UI/UserIcon"

const HeaderContainer = styled.header`
  border-bottom: 1px solid var(--light-gray);
  padding: 1.25rem 2rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
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

const UserIconContainer = styled.div`
  background-color: var(--orange);
  display: flex;
  width: max-content;
  border-radius: 100%;
  padding: 0.3rem;
  height: max-content;
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
  }
`

const Header = () => {
  const { user } = useContext(FirebaseContext)

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
          <Link href={`/${user.displayName}`}>
            <UserIconContainer>
              <UserIcon />
            </UserIconContainer>
          </Link>
        )}
        {!user && (
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </HeaderContainer>
  )
}

export default Header
