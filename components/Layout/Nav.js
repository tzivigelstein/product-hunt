import Link from "next/link"

import styled from "@emotion/styled"

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  padding: 0 2rem;

  @media (max-width: 1100px) {
    display: none;
  }
`

const NavLink = styled.a`
  background-color: transparent;
  text-decoration: none;
  color: #4b587c;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  cursor: pointer;
`

const Nav = () => {
  return (
    <Navigation>
      <Link href="/" legacyBehavior>
        <NavLink>Featured</NavLink>
      </Link>
      <Link href="/?popular" legacyBehavior>
        <NavLink>Popular</NavLink>
      </Link>
    </Navigation>
  );
}

export default Nav
