const MINIMUM_REQUIRED_PASSWORD_LENGTH = 8

export default function commonValidation(values) {
    let errors = {}

    if (!values.email) {
        errors.email = 'The email is empty'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "This is email isn't valid"
    }

    if (!values.password) {
        errors.password = 'The password is empty'
    } else if (values.password.length < MINIMUM_REQUIRED_PASSWORD_LENGTH) {
        errors.password = `The password should be at least ${MINIMUM_REQUIRED_PASSWORD_LENGTH} characters long`
    }

    return errors
}