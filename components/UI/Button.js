import styled from '@emotion/styled'

const Button = styled.a`
  margin: 0 0.5rem;
  font-size: 13px;
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  border-radius: 6px;
  padding: 0.6rem 1.5rem;
  text-align: center;
  background-color: ${props => (props.bgColor ? '#DA552F' : 'white')};
  color: ${props => (props.bgColor ? 'white' : '#000')};

  &:hover {
    cursor: pointer;
  }
`

export default Button
