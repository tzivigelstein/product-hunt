import { useContext, useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { FirebaseContext } from '../../firebase/index'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { es } from 'date-fns/locale'
import NotFound from '../../components/Layout/404'
import Layout from '../../components/Layout/Layout'
import { Field, InputSubmit } from '../../components/UI/Form'
import Button from '../../components/UI/Button'

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`

const ProductOwner = styled.p`
  color: #da552f;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`

const Product = () => {
  //State del componente
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)
  const [comment, setComment] = useState({})
  const [queryDB, setQueryDB] = useState(true)

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
        const query = await firebase.db.collection('products').doc(id)
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

  if (Object.keys(product).length === 0 && !error) return 'Cargando...'

  const { name, date, description, company, url, imageurl, creator, votes, comments, hasVoted } = product

  //Funcion que ejecuta los votos
  const handleVote = () => {
    if (!user) return router.push('/login')

    //Obtener y sumar votos
    const totalVotes = votes + 1

    //Verificar si ya se ha votado con el usuario
    if (hasVoted.includes(user.uid)) return

    //Guardar el id del usuario que votó
    const usersHasVoted = [...hasVoted, user.uid]

    //Actualizar BD
    firebase.db.collection('products').doc(id).update({ votes: totalVotes, hasVoted: usersHasVoted })

    //Actualizar State
    setProduct({
      ...product,
      votes: totalVotes,
    })

    setQueryDB(true)
  }

  //Funcion que ejecuta los comentarios
  const handleComments = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    })
  }

  //Identificar la autoria del comentario
  const isCreator = id => {
    if (creator.id === id) {
      return true
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!user) return router.push('/login')

    comment.userId = user.uid
    comment.userName = user.displayName

    //Tomar copia de los comentarios
    const newComments = [...comments, comment]

    //Actualizar BD
    firebase.db.collection('products').doc(id).update({ comments: newComments })

    setProduct({
      ...product,
      comments: newComments,
    })

    setComment({
      msg: '',
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
      if (!user) return router.push('/login')
      if (creator.id !== user.uid) return router.push('/login')

      await firebase.db.collection('products').doc(id).delete()
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <>
        {error ? (
          <NotFound text="Lo sentimos, el producto que estas buscando no existe" />
        ) : (
          <div className="contenedor">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {name}
            </h1>
            <ProductContainer>
              <div>
                <p>Publicado hace {formatDistanceToNow(new Date(date), { locale: es })}</p>
                <p>
                  Por {creator.name} de {company}
                </p>
                <img src={imageurl} />
                <p>{description}</p>
                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={onSubmit}>
                      <Field>
                        <input type="text" name="msg" value={comment.msg} onChange={handleComments} />
                        <InputSubmit type="submit" value="Comentar" />
                      </Field>
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comments.length === 0 ? (
                  'Aún no hay comentarios'
                ) : (
                  <ul>
                    {comments.map((comment, i) => (
                      <li
                        key={`${comment.userId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <span
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {comment.userName}
                        </span>
                        <p>{comment.msg}</p>
                        {isCreator(comment.userId) && <ProductOwner>Creador</ProductOwner>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside>
                <Button target="_blank" bgColor="true" href={url}>
                  Visitar URL
                </Button>
                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {`${votes} ${votes === 1 ? 'voto' : 'votos'}`}
                  </p>
                  {user && <Button onClick={handleVote}>Votar</Button>}
                </div>
              </aside>
            </ProductContainer>
            {hasPermits() && <Button onClick={deleteProduct}>Eliminar producto</Button>}
          </div>
        )}
      </>
    </Layout>
  )
}

export default Product
