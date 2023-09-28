import Link from "next/link"
import { useContext } from "react"

import styled from "@emotion/styled"

import FirebaseContext from "../../firebase/context"

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
`

const Nav = () => {
  const { user } = useContext(FirebaseContext)

  return (
    <Navigation>
      {user && (
        <Link href="/new-product">
          <a>Nuevo producto</a>
        </Link>
      )}
    </Navigation>
  )
}

export default Nav
