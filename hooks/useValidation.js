import { useEffect, useState } from 'react'

const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if (submit) {
      const isError = Object.keys(errors).length === 0
      if (isError) {
        fn()
      }
      setSubmit(false)
    }
  }, [errors])

  //Funcion que se ejecuta conforme el usuario escribe en el form
  const handleChange = e => {
    // Keep the all the fields errors but the one its changing
    setErrors(prev => {
      const previousErrorsWithoutCurrentField = Object.entries(prev).filter(([name]) => name !== e.target.name)
      return previousErrorsWithoutCurrentField.reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value
      }), {})
    })

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  //Función que se ejecuta cuando el usuario sale del input del form
  const handleBlur = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  //Función que se ejecuta cuando el usuario hace un submit
  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmit(true)
  }

  return {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  }
}

export default useValidation
