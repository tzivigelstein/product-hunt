import { useState, useContext } from "react"
import Layout from "../../components/Layout/Layout"
import useValidation from "../../hooks/useValidation"
import productValidation from "../../validation/productValidation"
import { useRouter } from "next/router"
import FileUploader from "react-firebase-file-uploader"
import { Form, Field, InputSubmit, Error } from "../../components/UI/Form"
import { css } from "@emotion/core"
import { FirebaseContext } from "../../firebase/index"
import NotFound from "../../components/Layout/404"

const initialState = {
  name: "",
  subtitle: "",
  company: "",
  image: "",
  url: "",
  description: "",
  tags: [],
}

const NewProduct = () => {
  //State de las imagenes
  const [imagename, setImageName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageurl, setImageUrl] = useState("")

  const { user, firebase } = useContext(FirebaseContext)

  //Hook del routing para redireccionar

  const router = useRouter()

  const [error, setError] = useState("")

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, productValidation, newProduct)

  const { name, company, url, description, tags, subtitle } = values

  async function newProduct() {
    //Si el user no esta autenticado
    if (!user) {
      router.push("/login")
    }

    //Crear un nuevo producto como objeto
    const product = {
      name,
      subtitle,
      tags,
      company,
      url,
      imageurl,
      description,
      votes: 0,
      comments: [],
      date: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],
    }

    //Insertar en la base de datos
    firebase.db.collection("products").add(product)
    return router.push("/")
  }

  const handleUploadStart = () => {
    setProgress(0)
    setUploading(true)
  }

  const handleProgress = progress => setProgress({ progress })

  const handleUploadError = error => {
    setUploading(error)
    console.error(error)
  }

  const handleUploadSuccess = name => {
    setProgress(100)
    setUploading(false)
    setImageName(name)
    firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then(url => {
        setImageUrl(url)
      })
  }

  return (
    <div>
      <Layout>
        {!user && (
          <NotFound text="Lo sentimos, no hemos encontrado tu usuario. Prueba iniciando sesión" />
        )}
        {user && (
          <>
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              Nuevo producto
            </h1>
            <Form onSubmit={handleSubmit} noValidate>
              <div>
                <legend>Información general</legend>
                <Field>
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nombre"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.name && <Error>{errors.name}</Error>}

                <Field>
                  <label htmlFor="company">Empresa</label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Empresa"
                    name="company"
                    value={company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.company && <Error>{errors.company}</Error>}

                <Field>
                  <label htmlFor="image">Imagen</label>
                  <FileUploader
                    accept="image/*"
                    randomizeFilename
                    storageRef={firebase.storage.ref("products")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                    id="image"
                    name="image"
                  />
                </Field>

                <Field>
                  <label htmlFor="url">Url</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="Url de tu producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.url && <Error>{errors.url}</Error>}
              </div>

              <div>
                <legend>Sobre tu producto</legend>
                <Field>
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Descripción"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.description && <Error>{errors.description}</Error>}

                <Field>
                  <label htmlFor="tags">Tags</label>
                  <input
                    id="tags"
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    value={tags}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.tags && <Error>{errors.tags}</Error>}

                <Field>
                  <label htmlFor="subtitle">Subtitle</label>
                  <input
                    id="subtitle"
                    type="text"
                    placeholder="Subtitle"
                    name="subtitle"
                    value={subtitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field>

                {errors.subtitle && <Error>{errors.subtitle}</Error>}
              </div>
              {error && <Error>{error}</Error>}

              <InputSubmit type="submit" value="Crear" />
            </Form>
          </>
        )}
      </Layout>
    </div>
  )
}

export default NewProduct
