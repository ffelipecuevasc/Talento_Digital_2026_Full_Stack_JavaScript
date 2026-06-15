// 1. Solicitar al usuario cuántas palabras desea ingresar
let cantidad = parseInt(prompt("¿Cuántas palabras deseas ingresar?"));

// Validar que se haya ingresado un número válido mayor a cero
if (!isNaN(cantidad) && cantidad > 0) {
    let palabras = [];

    // 2. Solicitar las palabras y almacenarlas en un array
    for (let i = 0; i < cantidad; i++) {
        let palabraIngresada = prompt("Ingresa la palabra " + (i + 1) + ":");
        // Asegurarnos de no agregar valores nulos si el usuario cancela el prompt
        if(palabraIngresada !== null) {
            palabras.push(palabraIngresada);
        }
    }

    // 3. Función de conteo de vocales (Función expresiva)
    const contarVocales = function(cadena) {
        let contador = 0;
        // Definimos el conjunto de vocales (incluyendo acentos comunes en español para mayor precisión)
        const vocales = "aeiouáéíóúü";

        // Usar toLowerCase() para evitar problemas entre mayúsculas y minúsculas
        let textoMinusc = cadena.toLowerCase();

        // Recorrer cada carácter de la cadena
        for (let i = 0; i < textoMinusc.length; i++) {
            // Utilizar includes() para comparar el carácter contra el conjunto de vocales
            if (vocales.includes(textoMinusc[i])) {
                contador++;
            }
        }
        return contador;
    };

    // 4. Unificación de palabras en una sola cadena usando join("")
    let cadenaCompleta = palabras.join("");

    // Aplicar la función de conteo sobre la cadena completa
    let totalVocales = contarVocales(cadenaCompleta);
    let mensaje = "El número total de vocales en las palabras ingresadas es: " + totalVocales;

    // 5. Salida de resultados
    // Mostrar en consola
    console.log(mensaje);

    // Mostrar en alerta
    window.alert(mensaje);

    // Insertar en la página HTML
    document.getElementById("resultado").innerHTML = "<strong>" + mensaje + "</strong>";

} else {
    // Manejo en caso de que el usuario no ingrese un número inicial válido
    let errorMsg = "Debes recargar la página e ingresar un número válido de palabras.";
    console.log(errorMsg);
    alert(errorMsg);
    document.getElementById("resultado").innerHTML = errorMsg;
}