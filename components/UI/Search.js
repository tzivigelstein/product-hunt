import { useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Router from 'next/router'
import FindIcon from './FindIcon'

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
  position: relative;
`

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  position: absolute;
  right: 0.7rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

const Search = () => {
  const [search, setSearch] = useState('')

  const searchProduct = e => {
    e.preventDefault()
    if (search.trim() === '') return

    //Redireccionar al user
    Router.push({
      pathname: '/search',
      query: { q: search },
    })
  }

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={searchProduct}
    >
      <InputText type="text" placeholder="Buscar productos" onChange={e => setSearch(e.target.value)} />
      <InputSubmit type="submit">
        <FindIcon />
      </InputSubmit>
    </form>
  )
}

export default Search
