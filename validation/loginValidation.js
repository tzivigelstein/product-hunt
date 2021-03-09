export default function loginValidation(values) {
    let errors = {}

    if (!values.email) {
        errors.email = 'El email es obligatorio'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'El email no es válido'
    }

    if (!values.password) {
        errors.password = 'La contraseña es obligatoria'
    }

    return errors
}