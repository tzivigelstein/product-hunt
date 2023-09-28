import { Fragment, useState } from "react"
import Layout from "../components/Layout/Layout"
import useValidation from "../hooks/useValidation"
import loginValidation from "../validation/loginValidation"
import Router from "next/router"
import { Form, Field, InputSubmit, Error } from "@components/UI/Form"
import { css } from "@emotion/core"
import firebase from "../firebase/index"

const initialState = {
  password: "",
  email: "",
}

const Login = () => {
  const [error, setError] = useState("")

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, loginValidation, logIn)

  const { password, email } = values

  async function logIn() {
    try {
      await firebase.login(email, password)
      Router.push("/")
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario", error.message)
      setError(error.message)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar sesión
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="name">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="name">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Iniciar sesión" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default Login
