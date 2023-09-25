//Escriba un programa que solicite al usuario ingresar una contraseña. Luego, verifica si la contraseña
//cumple con los siguientes criterios:
//a. Tiene al menos 8 caracteres
//b. Contiene al menos una letra mayuscula y una letra minuscula
//c. Contiene al menos un numero

const contrasenia = 'Pedro123';

const longitud = contrasenia.length;
const regexMay = /[A-Z]/g;
const regexMin = /[a-z]/g;
const regexNum = /[0-9]/g;
const letraMay = contrasenia.match(regexMay);
const letraMin = contrasenia.match(regexMin);
const num = contrasenia.match(regexNum);

if(longitud >= 8 && letraMay && letraMin && num){
    console.log('La contraseña si cumple con los criterios')
}else{
    console.log('La cadena no cumple con los criterios solicitados')
}