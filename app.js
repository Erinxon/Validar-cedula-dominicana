const formulario = document.getElementById('formulario')
const textCedula = document.getElementById('cedula')
const text = document.querySelector('.isValidate')

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    let cedula = formatCedula(textCedula.value)
    if (isNaN(cedula)) {
        message(`Lo que digito no es un número`, `alert-danger`)
    } else if (cedula === '') {
        message(`El campo no puede estar vacio`, `alert-danger`)
    } else {
        validateCedula(cedula) ?
            message(`La Cédula ${cedula} es valida`, `alert-success`) :
            message(`La Cédula ${cedula} no es valida`, `alert-danger`)
    }
})

const validateCedula = (cedula) => {
    return (getVerificador(cedula) == getUltimoDigito(cedula) && validateLongitud(cedula)) ?
        true : false
}

const validateLongitud = (cedula) => {
    return cedula.length === 11 ? true : false
}

const getVerificador = (cedula) => {
    let sumDigitos, ultimoDigito, decenaMasCercana, concatenateDigitos = ''
    const digitosCedulas = Array.from(cedula)
    const DigitosMultiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    for (let i = 0; i < 10; i++) {
        let digito = digitosCedulas[i] * DigitosMultiplicadores[i]
        concatenateDigitos += digito
    }
    sumDigitos = getSumDigitos(concatenateDigitos);
    ultimoDigito = getUltimoDigito(sumDigitos.toString())
    decenaMasCercana = sumDigitos + (10 - ultimoDigito)
    return Math.abs(sumDigitos - decenaMasCercana)
}

const getSumDigitos = (listDigitos) => {
    let sum = 0;
    let lista = Array.from(listDigitos)
    lista.forEach(digito => {
        sum += Number.parseInt(digito)
    });
    return sum
}

const getUltimoDigito = (text) => {
    return text.charAt(text.length - 1)
}

const formatCedula = (cedula) => {
    let newCedula;
    for(let i=0; i<=cedula.length;i++){
        cedula = cedula.replace('-','');
        newCedula = cedula
    }
    return newCedula
}

const message = (textMessage, typeClassAlert) => {
    text.style.display = 'block'
    addClassAlert(typeClassAlert)
    text.textContent = textMessage
}

const addClassAlert = (typeClassAlert) => {
    const classSuccess = 'alert-success';
    const classDanger = 'alert-danger';
    if (text.classList.length > 2 && text.classList.contains(classSuccess)
        && classSuccess != typeClassAlert) {
        text.classList.remove(classSuccess)
        text.classList.add(typeClassAlert)
    }
    else if (text.classList.length > 2 && text.classList.contains(classDanger)
        && classDanger != typeClassAlert) {
        text.classList.remove(classDanger)
        text.classList.add(typeClassAlert)
    } else {
        text.classList.add(typeClassAlert)
    }
}