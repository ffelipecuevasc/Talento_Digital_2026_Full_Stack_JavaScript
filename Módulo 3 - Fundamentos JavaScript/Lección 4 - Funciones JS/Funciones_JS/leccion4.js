// =====================================================================
// LECCIÓN #4: FUNCIONES EN JAVASCRIPT
// Ejemplos prácticos de sintaxis y fundamentos
// =====================================================================

// ============================================================================
// 1. FUNCIONES DECLARATIVAS
// Se definen con la palabra clave 'function' y tienen soporte para "hoisting" (se pueden llamar antes de declararlas)
// ============================================================================
console.log("--- 1. Funciones Declarativas ---");
console.log("Suma (llamada antes de declarar):", sumar(2, 3)); // Funciona por el hoisting

function sumar(a, b) {
    return a + b;
}


// ============================================================================
// 2. FUNCIONES EXPRESIVAS
// Se asignan a una variable. NO tienen soporte para hoisting, por lo que solo pueden usarse después de ser declaradas.
// ============================================================================
console.log("\n--- 2. Funciones Expresivas ---");
const restar = function(a, b) {
    return a - b;
};
console.log("Resta:", restar(5, 3));


// ============================================================================
// 3. FUNCIONES ANÓNIMAS AUTOEJECUTABLES (IIFE)
// Son funciones que se ejecutan inmediatamente después de ser definidas
// ============================================================================
console.log("\n--- 3. Funciones Autoejecutables (IIFE) ---");
(function() {
    console.log("Esta función anónima se ejecuta de inmediato sin ser llamada explícitamente.");
})();


// ============================================================================
// 4. FUNCIONES DE FLECHA (Arrow Functions)
// Sintaxis más corta introducida en ES6. No tienen su propio 'this' ni acceso al objeto 'arguments'
// ============================================================================
console.log("\n--- 4. Funciones de Flecha ---");
const multiplicar = (a, b) => a * b;
console.log("Multiplicación:", multiplicar(4, 3));

// Ejemplo conciso de una sola línea con un parámetro:
const saludar = nombre => `Hola, ${nombre}`;
console.log(saludar("Carlos"));


// ============================================================================
// 5. FUNCIONES DE PRIMERA CLASE
// En JS, las funciones son valores. Se pueden guardar en variables, pasar como argumentos o retornar desde otras funciones
// ============================================================================
console.log("\n--- 5. Funciones de Primera Clase ---");

// Guardadas en un array
const operaciones = [
    function(a, b) { return a + b; }, // Índice 0 (Suma)
    function(a, b) { return a - b; }  // Índice 1 (Resta)
];
console.log("Suma desde array:", operaciones[0](5, 3));

// Pasadas como argumentos (Callbacks)
function ejecutarOperacion(operacion, a, b) {
    return operacion(a, b);
}
console.log("Operación dinámica:", ejecutarOperacion((x, y) => x + y, 5, 3));


// ============================================================================
// 6. FUNCIONES DE ORDEN SUPERIOR
// Reciben o devuelven otras funciones. Ejemplos clásicos: map, filter, reduce
// ============================================================================
console.log("\n--- 6. Funciones de Orden Superior ---");
const numeros = [1, 2, 3];

// map(): Transforma cada elemento
const dobles = numeros.map(x => x * 2);
console.log("Map (dobles):", dobles); // [2, 4, 6]

// filter(): Filtra según condición
const pares = numeros.filter(x => x % 2 === 0);
console.log("Filter (pares):", pares); // [2]

// reduce(): Acumula valores en un solo resultado
const sumaTotal = numeros.reduce((acc, x) => acc + x, 0);
console.log("Reduce (suma total):", sumaTotal); // 6


// ============================================================================
// 7. PARÁMETROS Y ARGUMENTOS
// Parámetros por defecto para cuando no se envían argumentos
// ============================================================================
console.log("\n--- 7. Parámetros por Defecto ---");
function presentar(nombre = "Invitado", edad = 18) {
    console.log(`Hola ${nombre}, tienes ${edad} años.`);
}
presentar(); // Usa valores por defecto: Invitado, 18
presentar("Ana", 25); // Usa valores dados: Ana, 25


// ============================================================================
// 8. FUNCIONES ANIDADAS Y CLOSURES
// Funciones dentro de funciones que recuerdan el entorno donde fueron creadas (Closure)
// ============================================================================
console.log("\n--- 8. Funciones Anidadas y Closures ---");
function contador() {
    let numero = 0;

    function incrementar() {
        numero++;
        return numero;
    }
    return incrementar; // Retornamos la función interna
}

const miContador = contador();
console.log("Contador 1:", miContador()); // 1
console.log("Contador 2:", miContador()); // 2


// ============================================================================
// 9. REPASO DE HOISTING
// Demostración de por qué una función expresiva falla si se llama antes de declararla
// ============================================================================
console.log("\n--- 9. Demostración de Hoisting ---");
// Si intentamos llamar a una función expresiva antes de declararla, dará error:
// console.log(dividir(10, 2)); // Descomentar esto causaría un "ReferenceError"

const dividir = function(a, b) {
    return a / b;
};
console.log("División (después de declarar):", dividir(10, 2));