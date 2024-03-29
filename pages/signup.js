import { useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { css } from "@emotion/core"

import Layout from "../components/Layout/Layout"
import useValidation from "../hooks/useValidation"
import signupValidation from "../validation/signupValidation"
import { Form, Field, InputSubmit, Error } from "../components/UI/Form"
import firebase from "../firebase/index"

const initialState = {
  name: "",
  password: "",
  email: "",
}

const Signup = () => {
  const [error, setError] = useState("")

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(initialState, signupValidation, signUp)

  const { name, password, email } = values
  const router = useRouter()

  async function signUp() {
    try {
      await firebase.signup(name, email, password)
      router.push("/")
    } catch (error) {
      console.error(error.message)
      setError("Oops! This one is on us. There was an error when creating your account.")
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
            Signup
          </h1>
          <Error>{error}</Error>
          <Field>
            <label htmlFor="name">Name</label>
            <input
              data-error={errors.name !== undefined}
              type="text"
              id="name"
              placeholder="Aria Evergreen"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Error>{errors.name}</Error>
          </Field>
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
          <InputSubmit type="submit" value="Signup" />
          <Link
            css={css`
            color: var(--orange);
            text-align: center;
            margin-top: 5px;
            `}
            href="/signin">
            Already have an account? Signin
          </Link>
        </Form>
      </Layout>
    </div>
  )
}

export default Signup
