import { css } from '@emotion/core'

const NotFound = ({ text }) => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      {text}
    </h1>
  )
}

export default NotFound
