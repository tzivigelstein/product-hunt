import styled from '@emotion/styled'

export const Form = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 5rem auto;

  div {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-right: 0.7rem;
    font-size: 1.8rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }

  textarea {
    height: 180px;
  }
`

export const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: white;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-family: 'PT Sans', sans-serif;

  &:hover {
    cursor: pointer;
  }
`

export const Error = styled.p`
  background-color: #f53a29;
  padding: 1rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`
