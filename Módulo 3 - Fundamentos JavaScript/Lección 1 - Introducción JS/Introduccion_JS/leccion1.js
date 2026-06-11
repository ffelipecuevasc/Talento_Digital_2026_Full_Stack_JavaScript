// =====================================================================
// LECCIÓN #1: INTRODUCCIÓN AL LENGUAJE JAVASCRIPT
// Ejemplos prácticos de sintaxis y fundamentos
// =====================================================================

/*
 * TEMA 1: LA CONSOLA DE COMANDOS JAVASCRIPT
 * La consola es una herramienta que permite ejecutar código en tiempo real
 * y es muy útil para probar comandos o depurar errores
 */

// Imprimir mensajes estándar en la consola
console.log("¡Hola, JavaScript!");

// Mostrar un mensaje de error
console.error("Este es un ejemplo de cómo mostrar un error.");

// Generar un mensaje de advertencia
console.warn("Esta es una advertencia para revisar el código.");

// Mostrar datos estructurados en formato de tabla
const estudiante = { nombre: "Ana", curso: "Desarrollo Web", estado: "Activo" };
console.table(estudiante);

// Medir el tiempo de ejecución de un bloque de código específico
console.time("PruebaDeRendimiento");
for (let i = 0; i < 100; i++) {
    // Simulación de una tarea iterativa
}
console.timeEnd("PruebaDeRendimiento");


/*
 * TEMA 2: REGLAS BÁSICAS DE SINTAXIS
 * Reglas fundamentales para estructurar el código correctamente.
 */

// 1. Sensible a mayúsculas y minúsculas
// JavaScript hace distinción; 'miVariable' y 'mivariable' son dos cosas diferentes
let miVariable = 10;
let mivariable = 20;

// 2. Terminación de instrucciones
// El uso de punto y coma (;) es opcional pero se recomienda para evitar errores de interpretación
let saludo = "Bienvenido al curso";

// 3. Comentarios
// Se utilizan dos barras (//) para escribir un comentario de una sola línea
let mensaje = "Hola, mundo"; // También puede ir al final de una línea de código

/*
 * Se utilizan la barra y el asterisco para escribir un comentario
 * de múltiples líneas
 */


/*
 * TEMA 3: TIPOS DE DATOS BÁSICOS EN JAVASCRIPT
 * JavaScript maneja diferentes tipos de datos primitivos
 */

// String (cadenas de texto)
let tipoTexto = "Hola, mundo";

// Number (números enteros o decimales)
let numeroEntero = 42;
let numeroDecimal = 3.14;

// Boolean (valores lógicos)
let esVerdadero = true;
let esFalso = false;

// Undefined (valor no definido de manera inicial)
let tipoIndefinido;

// Null (representa la ausencia intencional de valor)
let tipoNulo = null;