import { useState } from "react"
import Router from "next/router"

import styled from "@emotion/styled"
import { css } from "@emotion/core"

import SearchIcon from "@components/UI/SearchIcon"

const InputText = styled.input`
  border: 1px solid #ccc;
  padding: .6rem;
  border-radius: 4px;
  max-width: 220px;
  position: relative;
  padding-left: 2.5rem;
  font-size: 15px;
`

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  position: absolute;
  left: 0;
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
  const [search, setSearch] = useState("")

  const searchProduct = e => {
    e.preventDefault()
    if (search.trim() === "") return

    Router.push({
      pathname: "/search",
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
      <InputText
        type="text"
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />
      <InputSubmit type="submit">
        <SearchIcon />
      </InputSubmit>
    </form>
  )
}

export default Search
