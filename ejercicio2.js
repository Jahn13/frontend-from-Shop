//Escribe un programa que cree una lista de numeros y luego modifique el segundo elemento de la lista
//para que sea el doble de su valor original. Luego, muestra la lista resultante.

const lista = []

for(i=1;i<10;i++){
    const numRandom = Math.floor(Math.random() * 9)
    lista.push(numRandom);
}

console.log(lista)

lista[1] = lista[1] * 2;

console.log(lista)