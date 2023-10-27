import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import styled from "@emotion/styled"
import { default as formatTimeToNow } from "date-fns/formatDistanceToNow"
import { enUS } from "date-fns/locale"

import { FirebaseContext } from "../../../firebase/index"

const Product = styled.li`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: relative;

  &::before {
    content: "";
    border-radius: 8px;
    transition: 600ms ease-out opacity;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%;
    height: 80%;
    opacity: 0;
    background: linear-gradient(12deg, #fff 60%, var(--light-orange));
    z-index 1;
  }

  @media (max-width: 480px) {
    &::before {
      all: unset;
    }
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    cursor: pointer;
  }
`

const ProductDescription = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`

const ProductDetails = styled.div`
  padding: 0.5rem 0;
`

const DescriptionText = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #667190;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`

const Title = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #21293c;

  @media (max-width: 480px) {
    font-size: 13px;
  }
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
  aspect-ratio: 1.06 / 1;
`

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 1.06 / 1.03;
  background-color: #f0f0f0;
`

const TagsAndComments = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    display: none;
  }
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
  z-index: 2;

  p {
    transition: 800ms steps(28) color;
    color: ${props => (props.upvoted ? "var(--orange)" : "initial")};
    margin: 0;
    font-size: 13px;
    font-weight: 600;
  }

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    border: none;
    border-radius: 0px;
    border-left: 1px solid #ccc;
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
  const {
    id,
    name,
    subtitle,
    date,
    description,
    imageurl,
    votes,
    tags,
    comments,
    hasVoted,
  } = product

  const [upvoted, setUpvoted] = useState(false)

  const router = useRouter()

  const { user, firebase } = useContext(FirebaseContext)

  useEffect(() => {
    if (user) {
      setUpvoted(hasVoted.includes(user.uid))
    }
  }, [])

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleImageLoaded = () => {
    setLoading(false)
  }

  const handleImageError = () => {
    setError(true)
  }

  function handleVote(e) {
    e.stopPropagation()

    if (!user) return router.push("/login")

    let totalVotes = votes
    let usersHaveVoted = [...hasVoted]

    if (hasVoted.includes(user.uid)) {
      totalVotes = votes - 1
      usersHaveVoted = usersHaveVoted.filter(uid => uid !== user.uid)
    } else {
      totalVotes = votes + 1
      usersHaveVoted = [...usersHaveVoted, user.uid]
    }

    setUpvoted(usersHaveVoted.includes(user.uid))

    //Actualizar BD
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: totalVotes, hasVoted: usersHaveVoted })
  }

  return (
    <Link href={`/products/${id}`}>
      <Product>
        <ProductDescription>
          <ImageContainer>
            {(loading || error) && <ImagePlaceholder />}
            {!error && (
              <Image
                style={loading ? { display: "none" } : {}}
                src={imageurl}
                alt={name + " logo"}
                onLoad={handleImageLoaded}
                onError={handleImageError}
              />
            )}
          </ImageContainer>
          <ProductDetails>
            <Title>{name}</Title>
            <DescriptionText>{subtitle || description}</DescriptionText>
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
          </ProductDetails>
        </ProductDescription>
        <Votes onClick={handleVote} upvoted={upvoted}>
          <UpVote upvoted={upvoted} />
          <p>{votes}</p>
        </Votes>
      </Product>
    </Link>
  )
}
