export default function productValidation(values) {
    let errors = {}

    if (!values.name) {
        errors.name = 'El nombre es obligatorio'
    }

    if (!values.subtitle) {
        errors.subtitle = "Introduce a subtitle"
    }

    if (!values.company) {
        errors.company = 'El nombre de la empresa es obligatorio'
    }

    if (!values.url) {
        errors.url = 'La url es obligatoria'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'La url no es válida'
    }

    if (!values.description) {
        errors.description = 'La description es obligatoria'
    }

    if(!values.tags){
        errors.tags = "Define at least 2 tags"
    }

    return errors
}