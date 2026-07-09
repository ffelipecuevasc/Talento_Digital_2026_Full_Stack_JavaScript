/**
 * Ejercicio Práctico - Funciones Callback en JavaScript
 * Archivo: scripts.js
 */

// Utilidades para la interfaz gráfica
const consola = document.getElementById('consola-salida');
const indicadorCarga = document.getElementById('indicador-carga');

function imprimir(texto, color = "text-gray-300") {
    consola.innerHTML += `<span class="${color}">${texto}</span>\n`;
    console.log(texto); // También lo mostramos en la consola del navegador
}

function limpiarConsola() {
    consola.innerHTML = "";
}

// =================================================================
// 1. FUNCIÓN VALIDAR NÚMERO
// Muestra un prompt, valida el dato y ejecuta un callback.
// =================================================================
function validar_numero(callback) {
    let dato = prompt("Ingrese un número para iniciar los cálculos:");

    // Verificamos si es un número válido y no un string vacío
    if (dato !== null && dato.trim() !== "" && !isNaN(dato)) {
        // Es válido: pasamos el mensaje de éxito, un booleano (true) y el número convertido
        callback("Correcto. El dato ingresado es válido.", true, Number(dato));
    } else {
        // Es inválido: pasamos el mensaje de error y un booleano (false)
        callback("Error: Usted ingresó caracteres incorrectos o no numéricos.", false, null);
    }
}

// =================================================================
// 2. FUNCIÓN CALCULAR Y AVISAR DESPUÉS (Asincronía)
// Calcula sumatoria de impares y espera 5 segundos usando setTimeout.
// =================================================================
function calcular_y_avisar_despues(numero, callback) {
    let sumatoriaImpares = 0;

    // Calcular sumatoria de números impares entre 1 y numero
    for (let i = 1; i <= numero; i++) {
        if (i % 2 !== 0) { // Si es impar
            sumatoriaImpares += i;
        }
    }

    // Activamos el indicador visual de carga en el HTML
    indicadorCarga.classList.remove('hidden');

    // Esperar 5 segundos (5000 ms) y luego ejecutar el callback
    setTimeout(() => {
        indicadorCarga.classList.add('hidden'); // Ocultamos el indicador
        let mensaje = `El valor de la sumatoria de impares es ${sumatoriaImpares}. Este resultado se obtuvo hace 5 segundos.`;
        callback(mensaje);
    }, 5000);
}

// =================================================================
// 3. FUNCIÓN CALCULAR Y AVISAR DEPENDIENDO
// Calcula sumatorias sucesivas y decide qué callback ejecutar según el total.
// =================================================================
function calcular_y_avisar_dependiendo(numero, callback_exito, callback_error) {
    let resultadoTotal = 0;
    let sumaActual = 0;

    // Lógica para sumatorias sucesivas (Ej: 1 + (1+2) + (1+2+3)...)
    for (let i = 1; i <= numero; i++) {
        sumaActual += i;
        resultadoTotal += sumaActual;
    }

    // Evaluación de la condición solicitada en el PDF
    if (resultadoTotal < 1000) {
        callback_exito(`Las sumatorias sucesivas de ${numero} es ${resultadoTotal}.`);
    } else {
        callback_error(`ADVERTENCIA: El número es demasiado grande para esta función. De todas formas, el resultado obtenido es ${resultadoTotal}.`);
    }
}


// =================================================================
// EJECUCIÓN INTEGRAL (El encadenamiento de Callbacks)
// =================================================================
document.getElementById('btn-iniciar').addEventListener('click', () => {
    limpiarConsola();
    imprimir("--- INICIANDO SECUENCIA ---", "text-blue-400 font-bold");

    // 1. Iniciamos pidiendo y validando el número
    validar_numero((mensajeValidacion, esValido, numero) => {

        if (!esValido) {
            // Si hay error, imprimimos y detenemos la cadena
            imprimir(mensajeValidacion, "text-red-500");
            imprimir("--- SECUENCIA ABORTADA ---", "text-red-500 font-bold");
            return;
        }

        // Si es válido, continuamos
        imprimir(mensajeValidacion, "text-green-400");
        imprimir(`Número ingresado: ${numero}`);
        imprimir("\nIniciando cálculo de impares y temporizador de 5 segundos...", "text-yellow-400");

        // 2. Llamamos a la segunda función pasando el número validado
        calcular_y_avisar_despues(numero, (mensajeAsincrono) => {
            imprimir(mensajeAsincrono, "text-purple-400");
            imprimir("\nCalculando sumatorias sucesivas...");

            // 3. Finalmente, llamamos a la tercera función pasándole DOS callbacks distintos
            calcular_y_avisar_dependiendo(
                numero,
                // Callback para éxito (< 1000)
                (mensajeExito) => {
                    imprimir(mensajeExito, "text-green-400");
                    imprimir("\n--- SECUENCIA FINALIZADA CON ÉXITO ---", "text-blue-400 font-bold");
                },
                // Callback para error (>= 1000)
                (mensajeError) => {
                    imprimir(mensajeError, "text-orange-400 font-bold");
                    imprimir("\n--- SECUENCIA FINALIZADA CON ADVERTENCIAS ---", "text-blue-400 font-bold");
                }
            );

        });

    });
});