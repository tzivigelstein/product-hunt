import commonValidation from "./commonValidation"

const MINIMUM_REQUIRED_NAME_LENGTH = 3

export default function signupValidation(values) {
    let errors = {
        ...commonValidation(values)
    }

    if (!values.name) {
        errors.name = 'The name is empty'
    } else if (values.name.length < MINIMUM_REQUIRED_NAME_LENGTH) {
        errors.name = `The name should be at least ${MINIMUM_REQUIRED_NAME_LENGTH} characters long`
    }

    return errors
}