// Declarar el arreglo vacío
let numeros = [];

// Solicitar al usuario ingresar 3 números
for (let i = 0; i < 3; i++) {
    let entrada = prompt("Ingresa el número " + (i + 1) + ":");

    // Convertir el valor ingresado a flotante
    let numero = parseFloat(entrada);

    // Validar que el usuario haya ingresado un número válido
    if (!isNaN(numero)) {
        // Almacenar el número en el arreglo
        numeros.push(numero);
    } else {
        alert("Valor inválido. Por favor, ingresa un número.");
        i--; // Restar al contador para repetir el intento
    }
}

// Implementación del ordenamiento burbuja con do-while
let intercambiado;
do {
    intercambiado = false;
    for (let i = 0; i < numeros.length - 1; i++) {
        // Si el elemento actual es mayor que el siguiente, se intercambian
        if (numeros[i] > numeros[i + 1]) {
            let temporal = numeros[i];
            numeros[i] = numeros[i + 1];
            numeros[i + 1] = temporal;
            intercambiado = true; // Se registró un cambio, el ciclo debe repetirse
        }
    }
} while (intercambiado);

// Determinar el menor y el mayor
let menor = numeros[0];
let mayor = numeros[numeros.length - 1];

// Evaluar e imprimir el resultado por pantalla
if (menor === mayor) {
    document.write("<p class='mensaje'>Los tres números ingresados son iguales: <strong>" + menor + "</strong></p>");
} else {
    document.write("<div class='resultados'>");
    document.write("<p>El número <strong>menor</strong> es: " + menor + "</p>");
    document.write("<p>El número <strong>mayor</strong> es: " + mayor + "</p>");
    document.write("<p><em>Arreglo ordenado: [" + numeros.join(", ") + "]</em></p>");
    document.write("</div>");
}