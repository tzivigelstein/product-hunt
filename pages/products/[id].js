import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import styled from "@emotion/styled"

import { FirebaseContext } from "../../firebase/index"

import NotFound from "@components/Layout/404"
import Layout from "@components/Layout/Layout"
import UserIcon from "@components/UI/UserIcon"

const ProductContainer = styled.div``

const Article = styled.article`
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 500px;
`

const ImageAndPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ImageContainer = styled.div`
  width: 80px;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 1.04 / 1;
`

const Position = styled.span`
  font-size: 1rem;
  color: rgb(125, 138, 176);
  &:first-letter {
    font-size: 2.5rem;
    font-weight: 600;
  }
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TitleSubtitleAndLinks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 1rem 2rem 1rem 1rem;
  border-radius: 4px;
  width: 100%;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
  transition: 200ms ease-out background-color;

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

const Submit = styled.button`
  height: max-content;
  padding: 8px 16px;
  background-color: var(--orange);
  border: none;
  grid-row: 2;
  grid-column-start: 3;
  grid-column-end: 4;
  width: max-content;
  margin-left: auto;
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

const CommentUserContainer = styled.div`
  display: flex;
  gap: 0.7rem;
  align-items: center;
`

const CommentUser = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
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

const Product = () => {
  //State del componente
  const [minHeight] = useState(64) // Minimum height in pixels
  const [maxHeight] = useState(200) // Maximum height in pixels
  const [height, setHeight] = useState(minHeight)

  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const [comment, setComment] = useState("")
  const [queryDB, setQueryDB] = useState(true)

  //Funcion que ejecuta los comentarios
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

  //Firebase context
  const { user, firebase } = useContext(FirebaseContext)

  //Routing para obtener el id del producto
  const router = useRouter()
  const {
    query: { id },
  } = router

  useEffect(() => {
    if (id && queryDB) {
      const getProduct = async () => {
        const query = await firebase.db.collection("products").doc(id)
        const product = await query.get()
        if (product.exists) {
          setProduct(product.data())
          setQueryDB(false)
        } else {
          setError(true)
          setQueryDB(false)
        }
      }
      getProduct()
    }
  }, [id, product])

  if (Object.keys(product).length === 0 && !error) return "Cargando..."

  const {
    name,
    date,
    description,
    company,
    creator,
    url,
    imageurl,
    votes,
    comments,
    hasVoted,
  } = product

  const position = 1

  //Funcion que ejecuta los votos
  const handleVote = () => {
    if (!user) return router.push("/login")

    let totalVotes = votes
    let usersHaveVoted = [...hasVoted]

    if (hasVoted.includes(user.uid)) {
      //Obtener y sumar votos
      totalVotes = votes - 1
      usersHaveVoted = usersHaveVoted.filter(uid => uid !== user.uid)
    } else {
      totalVotes = votes + 1
      usersHaveVoted = [...usersHaveVoted, user.uid]
    }

    //Actualizar BD
    firebase.db
      .collection("products")
      .doc(id)
      .update({ votes: totalVotes, hasVoted: usersHaveVoted })

    //Actualizar State
    setProduct({
      ...product,
      votes: totalVotes,
    })

    setQueryDB(true)
  }

  //Identificar la autoria del comentario
  const isCreator = id => {
    if (creator.id === id) {
      return true
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!user) return router.push("/login")

    comment.userId = user.uid
    comment.userName = user.displayName

    //Tomar copia de los comentarios
    const newComments = [...comments, comment]

    //Actualizar BD
    firebase.db.collection("products").doc(id).update({ comments: newComments })

    setProduct({
      ...product,
      comments: newComments,
    })

    setComment({
      msg: "",
    })

    setQueryDB(true)
  }

  //Funcion para revisar los privilegios
  const hasPermits = () => {
    if (!user) return false
    if (creator.id === user.uid) return true
  }

  //Funcion para eliminar productos
  const deleteProduct = async () => {
    try {
      if (!user) return router.push("/login")
      if (creator.id !== user.uid) return router.push("/login")

      await firebase.db.collection("products").doc(id).delete()
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  if (error)
    return <NotFound text="The product you are looking for doesn't exist" />

  return (
    <Layout>
      <Article>
        <ImageAndPosition>
          <ImageContainer>
            <Image src={imageurl} />
          </ImageContainer>
          <Position>#{position}</Position>
        </ImageAndPosition>

        <TitleSubtitleAndLinks>
          <TitleAndSubtitle>
            <Title>{name}</Title>
            <Subtitle>{description}</Subtitle>
          </TitleAndSubtitle>
          <Links>
            <Visit target="_blank" bgColor="true" href={url}>
              Visit
            </Visit>
            <Upvote onClick={handleVote} upvoted={hasVoted.includes(user.uid)}>
              <UpvoteIcon upvoted={hasVoted.includes(user.uid)} />
              {user &&
                (hasVoted.includes(user.uid) ? "Upvoted" : "Upvote")}{" "}
              {votes}
            </Upvote>
          </Links>
        </TitleSubtitleAndLinks>
        <ProductContainer>
          <Description>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            repellat voluptates eius vero fugit inventore nulla, iure delectus
            unde, in expedita quam magnam, libero id sed officia autem ea
            aliquid praesentium dolores saepe. Vel accusantium, quisquam neque
            magnam mollitia quas! Sint nemo, nulla alias, quas hic culpa quos
            veniam tempora fugiat eos ratione. Voluptatem, temporibus quasi, eos
            saepe aliquam provident natus at ad perferendis accusamus id, ut rem
            excepturi consequatur ipsam mollitia esse voluptas ratione vero
            maxime quisquam consequuntur nulla.
          </Description>
          <Launched>Launched by {company}</Launched>
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
                <Submit type="submit">Comment</Submit>
              </Form>
            )}
            {comments.length === 0 && "Be the first to comment!"}
            <Comments>
              {comments.length > 0 && (
                <ul>
                  {comments.map((comment, i) => (
                    <li key={`${comment.userId}-${i}`}>
                      <CommentUserContainer>
                        <UserIconContainer>
                          <UserIcon />
                        </UserIconContainer>
                        <CommentUser>{comment.userName}</CommentUser>
                        {isCreator(comment.userId) && (
                          <ProductOwner>Maker</ProductOwner>
                        )}
                      </CommentUserContainer>
                      <p>{comment.msg}</p>
                    </li>
                  ))}
                </ul>
              )}
            </Comments>
          </div>
        </ProductContainer>
      </Article>
    </Layout>
  )
}

export default Product
