import styled from "@emotion/styled"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import {es} from "date-fns/locale"
import Link from "next/link"
import CommentIcon from "../UI/CommentIcon"

const Product = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;

  @media (max-width: 480px) {
    padding: 2rem;
  }
`

const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const DescriptionText = styled.p`
  font-size: 13px;
  margin: 0;
  color: #6f6f6f;
`

const Title = styled.a`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #222;

  &:hover {
    cursor: pointer;
  }
`

const ImageContainer = styled.div`
  width: 80px;
`

const Image = styled.img`
  width: 100%;
`

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.2rem;
    padding-left: 0.7rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 13px;
  }
  p {
    margin: 0;
    font-size: 13px;
    font-weight: 700;
  }
`

const ProductDetails = ({product}) => {
  const {id, name, subtitle, date, description, imageurl, votes, comments} = product
  return (
    <Product>
      <ProductDescription>
        <ImageContainer>
          <Image src={imageurl} />
        </ImageContainer>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <Title>{name}</Title>
          </Link>
          <DescriptionText>{subtitle || description}</DescriptionText>
          <Comments>
            <div>
              <CommentIcon />
              <p>{comments.length}</p>
            </div>
          </Comments>
          <p style={{fontSize: "13px"}}>Publicado hace {formatDistanceToNow(new Date(date), {locale: es})}</p>
        </div>
      </ProductDescription>
      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </Product>
  )
}

export default ProductDetails
