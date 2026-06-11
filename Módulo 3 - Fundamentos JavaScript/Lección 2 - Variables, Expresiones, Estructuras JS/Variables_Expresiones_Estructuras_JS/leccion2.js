// =====================================================================
// LECCIÓN #2: VARIABLES (var, let, const)
// Ejemplos prácticos de sintaxis y fundamentos
// =====================================================================

// var: Forma tradicional de declarar variables. Su uso ha disminuido porque puede generar problemas de accesibilidad o errores de hoisting en códigos grandes
var nombreTradicional = "Juan";

// let: Permite declarar variables cuyo valor puede cambiar y su ámbito está limitado al bloque
let edadUsuario = 25;

// const: Se utiliza para constantes, valores que no pueden ser modificados una vez asignados
const PI = 3.1416;


// ==========================================
// 2. TIPOS DE DATOS
// ==========================================

// JavaScript cuenta con diferentes tipos de datos primitivos
let texto = "María"; // String (Cadenas de texto)
let numeroEntero = 28; // Number (Números enteros o decimales)
let esMayorDeEdad = true; // Boolean (Valores lógicos true o false)
let variableSinDefinir; // Undefined (Variable declarada pero sin valor)
let direccion = null; // Null (Ausencia intencional de valor)


// ==========================================
// 3. CONCATENACIÓN DE STRINGS
// ==========================================

let nombre = "Juana";
let apellido = "Manso";
let edad = 28;

// Usando el operador + para unir texto
let resultadoSuma = "Pasado el tiempo, " + nombre + " " + apellido + " va a tener " + edad;

// Usando backticks (acento grave) para cadenas interpoladas o template literals
let resultadoTemplate = `Pasado el tiempo, ${nombre} ${apellido} va a tener ${edad}`;


// ==========================================
// 4. OPERADORES ARITMÉTICOS
// ==========================================

let precioProducto = 1500;
let cantidad = 3;

// Multiplicación (*)
let total = precioProducto * cantidad;

let precio = 2000;
let descuento = precio * 0.10;
// Resta (-)
let precioFinal = precio - descuento;

// Operadores de incremento y decremento
let contador = 5;
contador++; // Incremento: ahora es 6

let vidas = 8;
vidas--; // Decremento: ahora es 7


// ==========================================
// 5. OPERADORES DE COMPARACIÓN
// ==========================================

// Evalúan condiciones y devuelven un valor booleano (true o false)
// == compara solo valores, === compara estrictamente valores y tipos de datos
console.log(5 == "5"); // true
console.log(5 === "5"); // false

// Diferente (!=) y Estrictamente diferente (!==)
console.log(5 != "5"); // false
console.log(5 !== "5"); // true


// ==========================================
// 6. OPERADORES LÓGICOS
// ==========================================

let usuarioAdmin = "admin";
let clave = "1234";

// && (AND): Ambas condiciones deben ser verdaderas
if (usuarioAdmin === "admin" && clave === "1234") {
    console.log("Acceso concedido");
} else {
    console.log("Usuario o contraseña incorrectos");
}


// ==========================================
// 7. SENTENCIAS CONDICIONALES (IF - ELSE)
// ==========================================

let edadCliente = 18;

// if ejecuta el código si la condición es verdadera (true)[cite: 243].
if (edadCliente >= 18) {
    console.log("Eres mayor de edad");
// else ejecuta el código alternativo si la condición es falsa (false)
} else {
    console.log("Eres menor de edad");
}


// ==========================================
// 8. LA SENTENCIA SWITCH
// ==========================================

let diaDeSemana = "lunes";

// Evalúa una expresión y ejecuta bloques de código según su valor de forma más concisa
switch (diaDeSemana) {
    case "lunes":
        console.log("Inicio de semana");
        break;
    case "viernes":
        console.log("Fin de semana");
        break;
    default:
        console.log("Día cualquiera");
}


// ==========================================
// 9. OPERADOR TERNARIO
// ==========================================

let comprobacionEdad = 20;
// Estructura: condición ? expresión_si_verdadera : expresión_si_falsa
let mensajeTernario = comprobacionEdad >= 18 ? "Eres mayor de edad" : "Eres menor de edad";
console.log(mensajeTernario);


// ==========================================
// 10. MANEJO DE ERRORES (TRY - CATCH)
// ==========================================

// Se utiliza para capturar y manejar errores de ejecución
try {
    let edadParseada = parseInt("abc");
    // isNaN verifica si el valor no es un número válido
    if (isNaN(edadParseada)) throw new Error("Edad no válida");
    console.log("Edad ingresada: ", edadParseada);
} catch (error) {
    console.log("Error: " + error.message);
}


// ==========================================
// 11. MANEJO DE CONDICIONES DE BORDE
// ==========================================

// Validar entradas para evitar que el programa falle o no se comporte como se espera
// Nota: 'prompt' normalmente se ejecuta en el entorno del navegador web
let notaEstudiante = parseFloat(prompt("Ingrese una nota (0 a 10):"));

// Verificar si no es un número o está fuera del rango
if (isNaN(notaEstudiante) || notaEstudiante < 0 || notaEstudiante > 10) {
    console.error("Error: La nota debe estar entre 0 y 10.");
} else {
    console.log("Nota ingresada: " + notaEstudiante);
}

// Validación de división por cero
let numerador = parseFloat(prompt("Ingrese el numerador:"));
let denominador = parseFloat(prompt("Ingrese el denominador:"));

if (denominador === 0) {
    console.error("Error: No se puede dividir por cero.");
} else {
    let resultadoDivision = numerador / denominador;
    console.log("El resultado de la división es: " + resultadoDivision);
}