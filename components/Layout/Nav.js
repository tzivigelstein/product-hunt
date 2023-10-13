import Link from "next/link"

import styled from "@emotion/styled"

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;

  a {
    font-size: 1.1rem;
    color: var(--medium-gray);
  }

  @media (max-width: 1100px) {
    display: none;
  }
`

const Nav = () => {
  return (
    <Navigation>
      <Link href="/">
        <a>Products</a>
      </Link>
    </Navigation>
  )
}

export default Nav
