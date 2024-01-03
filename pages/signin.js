import { useState } from "react"
import Layout from "../components/Layout/Layout"
import useValidation from "../hooks/useValidation"
import loginValidation from "../validation/loginValidation"
import { useRouter } from "next/router"
import Link from 'next/link'
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

  const router = useRouter()

  async function logIn() {
    try {
      await firebase.login(email, password)
      router.push("/")
    } catch (error) {
      console.error(error.message)
      setError("Oops! This one is on us. There was an error when authenticating.")
    }
  }

  return (
    <div>
      <Layout>
        <Form onSubmit={handleSubmit} noValidate>
          <h1
            css={css`
              margin-top: 2rem;
              margin-bottom: 0;
            `}
          >
            Signin
          </h1>
          <Error>{error}</Error>
          <Field>
            <label htmlFor="name">Email</label>
            <input
              data-error={errors.email !== undefined}
              type="email"
              id="email"
              name="email"
              placeholder="aria.evergreen@exaple.com"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error>{errors.email}</Error>
          </Field>
          <Field>
            <label htmlFor="name">Password</label>
            <input
              data-error={errors.password !== undefined}
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error>{errors.password}</Error>
          </Field>
          <InputSubmit type="submit" value="Signin" />
          <Link
            css={css`
            color: var(--orange);
            text-align: center;
            margin-top: 5px;
            `}
            href="/signup">
            Don't have an account? Signup
          </Link>
        </Form>
      </Layout>
    </div>
  )
}

export default Login
