import { useContext, useState } from "react"
import { useRouter } from "next/router"
import styled from "@emotion/styled"
import Link from "next/link"

import { FirebaseContext } from "../../firebase/index"

import Layout from "@components/Layout/Layout"
import UserIcon from "@components/UI/UserIcon"
import BackIcon from '@components/UI/BackIcon'
import formatDate from "@utils/formatDate"
import { getPostBySlug } from "../../firebase/utils"

const ProductContainer = styled.div``

const Article = styled.article`
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 500px;
`

const GoBackLink = styled(Link)`
  color: #4b587c;
  display: flex;
  padding: 2rem 2rem 2rem 0;
  width: max-content;
  align-items: center;
  gap: 5px;

  svg {
    width: 18px;
  }
`

const ImageAndPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  width: 72px;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 1.04 / 1;
`

const Position = styled.span`
  align-self: flex-start;
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(125, 138, 176);
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
`

const TitleSubtitleAndLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    display: grid;
  }
`

const TitleAndSubtitle = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 24px;
  margin: 1rem 0 0 0;
  color: #21293c;
`

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #4b587c;
`

const Links = styled.div`
  display: flex;
  gap: 1rem;
  flex: 0.8;
`

const Visit = styled.a`
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;

  &:hover {
    border-color: var(--orange);
  }
`

const Upvote = styled.button`
  background-color: ${props => (props.upvoted ? "#fff" : "var(--orange)")};
  color: ${props => (props.upvoted ? "black" : "white")};
  border: ${props => (props.upvoted ? "1px solid var(--orange)" : "none")};
  text-transform: uppercase;
  display: flex;
  padding: 1rem;
  padding-right: 2rem;
  border-radius: 4px;
  width: 100%;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  transition: 200ms ease-out background-color;
  white-space: nowrap;

  &:hover {
    background-color: ${props => (props.upvoted ? "white" : "#ff4582")};
  }
`

const UpvoteIcon = styled.div`
  background-image: url(https://ph-static.imgix.net/upvote-burst-2022.png?format=auto&auto=compress);
  aspect-ratio: 1 / 0.5777778;
  width: 32px;
  background-position: ${props => (props.upvoted ? "100%" : "0%")};
  background-repeat: no-repeat;
  background-size: 2900%;
  transition: 800ms steps(28) background-position;
  filter: brightness(0) saturate(100%)
    ${props =>
    props.upvoted
      ? "filter: invert(70%) sepia(54%) saturate(5290%) hue-rotate(323deg) brightness(95%) contrast(113%)"
      : "invert(100%) sepia(0%) saturate(1190%) hue-rotate(197deg) brightness(119%) contrast(100%)"};
  gap: 1ch;
`

const Description = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #21293c;
`

const Launched = styled.p`
  color: #4b587c;
  font-size: 16px;
  line-height: 24px;
`

const Category = styled.a`
  background-color: #eef2ff;
  border-radius: 999px;
  color: #4b587c;
  font-weight: 600;
  padding: 4px 8px;
  width: max-content;
  margin: 0 0.2rem;
  cursor: pointer;
`

const Form = styled.form`
  display: grid;
  gap: 0.5rem;
  padding-top: 0.5rem;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-bottom: 2rem;
`

const UserIconContainer = styled.div`
  background-color: var(--orange);
  display: flex;
  width: max-content;
  border-radius: 100%;
  padding: 0.3rem;
  height: max-content;
  margin-top: 7px;

  svg {
    width: 28px;
    height: 28px;
  }
`

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: ${props => props.height}px;
  grid-column-end: 4;
  grid-column-start: 2;
  resize: none;
  border: none;
  outline: none;
`

const SubmitContainer = styled.div`
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

const Help = styled.p`
  color: #21293c;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  opacity: 1;
  transition: opacity 0.5s ease;
`

const Submit = styled.button`
  height: max-content;
  padding: 8px 16px;
  background-color: var(--orange);
  border: none;
  width: max-content;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;

  &:hover {
    background-color: #ff4582;
  }
`

const Comments = styled.div``

const CommentsList = styled.ul`
  display: grid;
  gap: 2rem;
`

const CommentUserContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`

const CommentMessage = styled.p`
  width: 100%;
  word-break: break-all;
`

const CommentUser = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
`

const CommentUsername = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #4b587c;
`

const ProductOwner = styled.p`
  display: inline;
  border-radius: 999px;
  color: #21293c;
  background-color: rgba(22, 199, 154, 0.25);
  margin-left: 8px;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 11px;
`

const LaunchTitle = styled.h4`
  margin-bottom: 24px;
  color: #21293c;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  margin-top: 4rem;
`

const LaunchSummary = styled.p`
  margin-bottom: 32px;
  color: #4b587c;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
`

export default function Product({ product }) {
  const [localProduct, setLocalProduct] = useState(null)
  const [minHeight] = useState(64)
  const [maxHeight] = useState(200)
  const [height, setHeight] = useState(minHeight)

  const [comment, setComment] = useState("")
  const [_, setQueryDB] = useState(true)

  const [imageError, setImageError] = useState(false)
  const [imageloading, setImageLoading] = useState(true)

  const handleImageLoaded = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleChange = e => {
    const { scrollHeight } = e.target
    const newHeight = Math.min(maxHeight, Math.max(minHeight, scrollHeight))

    if (e.target.value === "") {
      setHeight(minHeight)
    } else {
      setHeight(newHeight)
    }

    setComment(e.target.value)
  }

  const { user, firebase } = useContext(FirebaseContext)

  const router = useRouter()

  const {
    id,
    name,
    subtitle,
    description,
    company,
    creator,
    url,
    imageurl,
    votes,
    comments,
    hasVoted,
    tags,
    date,
  } = localProduct ? localProduct : product

  const handleVote = () => {
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

    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: totalVotes, hasVoted: usersHaveVoted })

    setLocalProduct({
      ...product,
      votes: totalVotes,
    })

    setQueryDB(true)
  }

  const isCreator = id => {
    if (creator.id === id) {
      return true
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!user) return router.push("/login")

    if (comment.trim() === "") return
    if (comment.length <= 150) return

    const newComment = {}

    newComment.userId = user.uid
    newComment.userName = user.displayName
    newComment.msg = comment.trim()

    const newComments = [...comments, newComment]

    firebase.db.collection("products").doc(id).update({ comments: newComments })

    setLocalProduct({
      ...product,
      comments: newComments,
    })

    setComment("")
    setHeight(minHeight)

    setQueryDB(true)
  }

  return (
    <Layout>
      <Article>
        <GoBackLink href="/">
          <BackIcon /> Go back
        </GoBackLink>
        <ImageAndPosition>
          <ImageContainer>
            {(imageloading || imageError) && <ImagePlaceholder />}
            {!imageError && (
              <Image
                style={imageloading ? { display: "none" } : {}}
                src={imageurl}
                alt={name + " logo"}
                onLoad={handleImageLoaded}
                onError={handleImageError}
              />
            )}
          </ImageContainer>
          <Position>New</Position>
        </ImageAndPosition>

        <TitleSubtitleAndLinks>
          <TitleAndSubtitle>
            <Title>{name}</Title>
            <Subtitle>{subtitle || description}</Subtitle>
          </TitleAndSubtitle>
          <Links>
            <Visit target="_blank" bgColor="true" href={url}>
              Visit
            </Visit>
            <Upvote onClick={handleVote} upvoted={hasVoted.includes(user?.uid)}>
              <UpvoteIcon upvoted={hasVoted.includes(user?.uid)} />
              {hasVoted.includes(user?.uid) ? "Upvoted" : "Upvote"} {votes}
            </Upvote>
          </Links>
        </TitleSubtitleAndLinks>
        <ProductContainer>
          <Description>{description}</Description>
          <Launched>
            Launched in{" "}
            {tags.map(tag => (
              <Link key={tag} href={`/category/${tag}`} legacyBehavior>
                <Category>{tag} </Category>
              </Link>
            ))}{" "}
            by {company}
          </Launched>
          <div>
            {user && (
              <Form onSubmit={onSubmit}>
                <UserIconContainer>
                  <UserIcon />
                </UserIconContainer>
                <TextArea
                  placeholder="What do you think?"
                  height={height}
                  value={comment}
                  onChange={handleChange}
                />
                <SubmitContainer>
                  {comment.trim().length > 0 &&
                    comment.trim().length <= 150 && (
                      <Help>
                        {comment.trim().length < 80 &&
                          "🧐 Makers appreciate thoughtful comments"}
                        {comment.trim().length >= 80 && "🙂 Keep going..."}
                      </Help>
                    )}
                  <Submit type="submit">Comment</Submit>
                </SubmitContainer>
              </Form>
            )}
            <Comments>
              {comments.length > 0 && (
                <CommentsList>
                  {comments.map((comment, i) => (
                    <li key={`${comment.userId}-${i}`}>
                      <CommentUserContainer>
                        <UserIconContainer>
                          <UserIcon />
                        </UserIconContainer>
                        <CommentUser>{comment.userName}</CommentUser>
                        <CommentUsername>
                          @{comment.userName.toLowerCase().replace(" ", "")}
                        </CommentUsername>
                        {isCreator(comment.userId) && (
                          <ProductOwner>Maker</ProductOwner>
                        )}
                      </CommentUserContainer>
                      <CommentMessage>{comment.msg}</CommentMessage>
                    </li>
                  ))}
                </CommentsList>
              )}
            </Comments>
          </div>
          <LaunchTitle>About this launch</LaunchTitle>
          <LaunchSummary>
            {name} was hunted by {company} in{" "}
            {tags.map((s, i) => (
              <span key={s}>{s[0].toUpperCase() + s.slice(1) + (i < tags.length - 1 ? ", " : "")}</span>
            ))}
            . Made by {creator.name}. Posted on {formatDate(date)}.
          </LaunchSummary>
        </ProductContainer>
      </Article>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context

  try {
    const product = await getPostBySlug(slug)

    return {
      props: {
        product,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        notFound: true,
      },
    }
  }
}
