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

  @media (max-width: 760px) {
    padding: 1.25rem 1rem;
  }
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
  border-radius: 100%;
  width: 40px;
  aspect-ratio: 1;
  cursor: pointer;
  overflow: hidden;
  justify-content: center;
  align-items: center;

  svg,
  img {
    width: 100%; 
    padding: 0;
    margin: 0;
    object-fit: cover;
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
          <Link href={`/@${user.displayName}`}>
            <UserIconContainer>
              {user.photoURL ? <img src={user.photoURL} /> : <UserIcon />}
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
