import { useState } from "react"
import Link from "next/link"

import styled from "@emotion/styled"
import { default as formatTimeToNow } from "date-fns/formatDistanceToNow"
import { enUS } from "date-fns/locale"

const Product = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  align-items: center;

  @media (max-width: 480px) {
    padding: 2rem;
  }

  &:hover {
    cursor: pointer;
    background: linear-gradient(12deg, #fff 60%, var(--light-orange));
  }
`

const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`

const DescriptionText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #667190;
`

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #21293c;
`

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TagsAndComments = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Tags = styled.p`
  color: #667190;
  font-size: 14px;
`

const Comments = styled.p`
  font-size: 14px;
  color: #21293c;
`

const TimeAgo = styled.span`
  font-size: 14px;
  color: #21293c;
`

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  text-align: center;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  padding: 1rem 0.5rem;
  border-radius: 4px;

  p {
    transition: 800ms steps(28) color;
    color: ${props => (props.upvoted ? "var(--orange)" : "initial")};
    margin: 0;
    font-size: 13px;
    font-weight: 700;
  }

  &:hover {
    cursor: pointer;
  }
`

const UpVote = styled.div`
  background-image: url(https://ph-static.imgix.net/upvote-burst-2022.png?format=auto&auto=compress);
  width: 45px;
  height: 26px;
  background-position: ${props => (props.upvoted ? "100%" : "0%")};
  background-repeat: no-repeat;
  background-size: 2900%;
  transition: 800ms steps(28) background-position;
`

export default function ProductDetail({ product }) {
  const { id, name, date, description, imageurl, votes, tags, comments } =
    product

  const [upvoted, setUpvoted] = useState(false)

  const handleUpvote = event => {
    event.stopPropagation()

    setUpvoted(prev => !prev)
  }

  return (
    <Link href={`/products/${id}`}>
      <Product>
        <ProductDescription>
          <ImageContainer>
            <Image src={imageurl} />
          </ImageContainer>
          <div>
            <Title>{name}</Title>
            <DescriptionText>{description}</DescriptionText>
            <TagsAndComments>
              <Tags>{tags?.map(tag => `#${tag}`).join(" ")}</Tags>
              {tags && comments && <span>·</span>}
              {comments.length > 0 && (
                <Comments>
                  {comments.length}{" "}
                  {comments.length > 1 ? "comments" : "comment"}
                </Comments>
              )}
              {comments.length !== 0 && <span>·</span>}
              <TimeAgo>
                {formatTimeToNow(new Date(date), { locale: enUS })} ago
              </TimeAgo>
            </TagsAndComments>
          </div>
        </ProductDescription>
        <Votes onClick={handleUpvote} upvoted={upvoted}>
          <UpVote upvoted={upvoted} />
          <p>{votes}</p>
        </Votes>
      </Product>
    </Link>
  )
}
