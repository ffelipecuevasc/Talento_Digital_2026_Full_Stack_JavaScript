/**
 * Archivo: scripts.js
 * Lógica integral para los 4 ejercicios del DOM.
 */

// ==========================================
// EJERCICIO 1: REPETIR
// Conceptos: Lectura de valores (.value), Ciclos (for), textContent.
// ==========================================
document.getElementById('btn-repetir').addEventListener('click', () => {
    // 1. Leer la palabra ingresada y el número de repeticiones
    const palabra = document.getElementById('palabra-input').value;
    const veces = parseInt(document.getElementById('veces-input').value);
    const contenedorResultado = document.getElementById('resultado-repetir');

    // Validación básica
    if (!palabra || isNaN(veces) || veces <= 0) {
        contenedorResultado.textContent = "Por favor, ingresa una palabra y un número válido.";
        return;
    }

    let resultadoFinal = "";

    // 2. Ciclo (for) para repetir texto
    for (let i = 0; i < veces; i++) {
        resultadoFinal += palabra + " ";
    }

    // 3. Mostrar la palabra repetida modificando textContent (seguridad frente a HTML inyectado)
    contenedorResultado.textContent = resultadoFinal.trim();
});

// ==========================================
// EJERCICIO 2: APLICAR
// Conceptos: input type="color", Modificación de estilos (style.backgroundColor).
// ==========================================
document.getElementById('btn-aplicar').addEventListener('click', () => {
    // 1. Obtener el color seleccionado
    const colorSeleccionado = document.getElementById('color-input').value;

    // 2. Cambiar el color de fondo del párrafo
    const parrafo = document.getElementById('parrafo-aplicar');
    parrafo.style.backgroundColor = colorSeleccionado;
});

// ==========================================
// EJERCICIO 3: CALCULAR
// Conceptos: Conversión a números (parseFloat), Operaciones matemáticas, innerHTML.
// ==========================================
document.getElementById('btn-calcular').addEventListener('click', () => {
    // 1. Lectura y conversión de cadenas a números
    const num1 = parseFloat(document.getElementById('num1-input').value);
    const num2 = parseFloat(document.getElementById('num2-input').value);
    const contenedorResultado = document.getElementById('resultado-calcular');

    // Validación básica
    if (isNaN(num1) || isNaN(num2)) {
        contenedorResultado.innerHTML = "<span class='text-red-500'>Por favor, ingresa ambos números.</span>";
        return;
    }

    // 2. Operaciones matemáticas
    const suma = num1 + num2;
    const resta = num1 - num2;
    const multiplicacion = num1 * num2;
    const division = num1 / num2;

    // Calcular la suma de todos los resultados obtenidos
    const sumaTotal = suma + resta + multiplicacion + division;

    // 3. Modificación del contenido usando innerHTML (para inyectar saltos de línea <br>)
    contenedorResultado.innerHTML = `
        ${num1} + ${num2} = ${suma} <br>
        ${num1} - ${num2} = ${resta} <br>
        ${num1} * ${num2} = ${multiplicacion} <br>
        ${num1} / ${num2} = ${division} <br><br>
        <strong>La suma de los resultados es ${sumaTotal}</strong>
    `;
});

// ==========================================
// EJERCICIO 4: INVERTIR
// Conceptos: Manipulación de cadenas (split, reverse, join), textContent.
// ==========================================
document.getElementById('btn-invertir').addEventListener('click', () => {
    // 1. Leer el texto ingresado
    const textoOriginal = document.getElementById('texto-invertir-input').value;

    // 2. Manipulación de cadenas (invertir texto carácter por carácter)
    // - split(''): convierte el string en un arreglo de caracteres.
    // - reverse(): invierte el orden de los elementos del arreglo.
    // - join(''): une el arreglo de vuelta en un solo string.
    const textoInvertido = textoOriginal.split('').reverse().join('');

    // 3. Mostrar la cadena completamente invertida
    document.getElementById('resultado-invertir').textContent = textoInvertido;
});