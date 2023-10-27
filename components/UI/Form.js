import styled from "@emotion/styled"

export const Form = styled.form`
  max-width: 500px;
  margin: 5rem auto 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Field = styled.div`
  display: flex;
  font-size: 1rem;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin: 0 0.7rem 1rem 0;
    font-size: 1rem;
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
  background-color: var(--orange);
  width: 100%;
  padding: 1rem;
  text-align: center;
  color: white;
  font-size: 1.1rem;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
  }
`

export const Error = styled.p`
  background-color: #f53a29;
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`
