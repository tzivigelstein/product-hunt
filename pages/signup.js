import { Fragment, useState } from 'react'
import Layout from '../components/Layout/Layout'
import useValidation from '../Hooks/useValidation'
import signupValidation from '../validation/signupValidation'
import Router from 'next/router'
import { Form, Field, InputSubmit, Error } from '../components/UI/Form'
import { css } from '@emotion/core'
import firebase from '../firebase/index'

const initialState = {
  name: '',
  password: '',
  email: '',
}

const Signup = () => {
  const [error, setError] = useState('')

  const { values, errors, handleSubmit, handleChange, handleBlur } = useValidation(
    initialState,
    signupValidation,
    signUp
  )

  const { name, password, email } = values

  async function signUp() {
    try {
      await firebase.signup(name, email, password)
      Router.push('/')
    } catch (error) {
      console.error('Hubo un error al crear el usuario', error.message)
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
            Crear cuenta
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
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

            <InputSubmit type="submit" value="Crear cuenta" />
          </Form>
        </>
      </Layout>
    </div>
  )
}

export default Signup
