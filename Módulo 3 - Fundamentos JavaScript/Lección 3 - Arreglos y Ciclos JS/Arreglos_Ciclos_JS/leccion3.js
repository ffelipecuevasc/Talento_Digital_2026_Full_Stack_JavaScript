// =====================================================================
// LECCIÓN #3: ARREGLOS Y CICLOS EN JAVASCRIPT
// Ejemplos prácticos de sintaxis y fundamentos
// =====================================================================

// --- 1. DEFINICIÓN Y CREACIÓN DE ARREGLOS ---

// Forma más común: Usando corchetes
let frutas = ["Manzana", "Banana", "Naranja"];

// Usando el constructor Array
let numeros = new Array(1, 2, 3, 4, 5);

// Creando un arreglo vacío y agregando elementos por índice
let colores = [];
colores[0] = "Rojo";
colores[1] = "Verde";


// --- 2. ACCEDER, MODIFICAR Y CONTAR ELEMENTOS ---

let comidas = ["Pizza", "Hamburguesa", "Sushi"];
console.log(comidas[0]); // Muestra "Pizza"

// Modificar un valor existente
comidas[1] = "Comida China";

// Conocer la cantidad de elementos usando la propiedad .length
console.log("Cantidad de comidas:", comidas.length); // 3


// --- 3. ÁLGEBRA CON ARREGLOS ---

let a = [1, 2, 3];
let b = [3, 4, 5];

// Unión: Combina ambos arreglos sin repetir valores
let union = [...new Set([...a, ...b])];

// Intersección: Elementos que existen en ambos arreglos
let interseccion = a.filter(valor => b.includes(valor));

// Diferencia: Elementos de 'a' que no están en 'b'
let diferencia = a.filter(valor => !b.includes(valor));


// --- 4. MATRICES (Arreglos bidimensionales) ---

let matriz = [
[1, 2, 3], // Fila 0
    [4, 5, 6], // Fila 1
    [7, 8, 9]  // Fila 2
];

// Acceder a la fila 1 (segunda fila), columna 2 (tercer elemento)
console.log("Elemento en la matriz:", matriz[1][2]); // 6


// --- 5. ARREGLOS ASOCIATIVOS (Objetos) ---

// En JS no hay arreglos asociativos puros, se usan objetos
let usuario = {
nombre: "Sofía",
edad: 28,
bandaFavorita: "Almas Perdidas"
};

// Dos formas de acceder a las propiedades:
console.log(usuario["nombre"]); // Usando corchetes
console.log(usuario.edad);      // Usando punto


// --- 6. MÉTODOS DE ARREGLOS (Mutables - Modifican el original) ---

let mascotas = ["Perro", "Gato"];

mascotas.push("Loro");      // Agrega "Loro" al final
mascotas.pop();             // Elimina y devuelve el último elemento
mascotas.unshift("Hamster");// Agrega "Hamster" al inicio
mascotas.shift();           // Elimina y devuelve el primer elemento

// splice: Elimina y/o inserta elementos en posiciones específicas
let numSplice = [1, 2, 3, 4, 5];
numSplice.splice(1, 2); // Desde el índice 1, elimina 2 elementos


// --- 7. MÉTODOS DE ARREGLOS (Inmutables - Crean uno nuevo) ---

let nombres = ["Sofía", "Lucas", "Gonzalo", "Anto"];

// slice: Extrae una parte del arreglo (desde índice 1 hasta 3, sin incluir el 3)
let seleccionados = nombres.slice(1, 3);

// concat: Une dos arreglos en uno nuevo
let unidos = seleccionados.concat(["Juan"]);


// --- 8. MÉTODOS PARA ITERAR, FILTRAR Y REDUCIR  ---

let edades = [15, 22, 30, 18];

// forEach: Solo ejecuta código por cada elemento, no retorna nada
edades.forEach(edad => console.log(`Edad registrada: ${edad}`));

// map: Crea un nuevo arreglo transformando cada elemento
let dobles = edades.map(num => num * 2);

// filter: Crea un nuevo arreglo solo con los elementos que cumplan la condición
let mayores = edades.filter(edad => edad >= 18);

// find: Devuelve el PRIMER elemento que cumpla la condición
let primerMayor = edades.find(edad => edad >= 18);

// reduce: Acumula todos los valores en un solo resultado final
// (acumulador inicia en 0, y suma cada 'edad')
let sumaTotal = edades.reduce((total, edad) => total + edad, 0);

// sort: Ordenar elementos
edades.sort((a, b) => a - b); // Orden numérico ascendente

// reverse: Invierte el orden de los elementos
edades.reverse();


// --- 9. CICLOS DE REPETICIÓN (Básicos) ---

// Bucle for: Útil cuando se sabe cuántas veces se repetirá (Inicio; Condición; Incremento)
for (let i = 0; i < 3; i++) {
    console.log(`Bucle for, iteración: ${i}`);
}

// Bucle while: Se ejecuta MIENTRAS la condición sea verdadera
let intentos = 0;
while (intentos < 3) {
    console.log(`Bucle while, intento: ${intentos}`);
    intentos++; // Precaución: siempre modificar la variable de control
}

// Bucle do...while: Se ejecuta AL MENOS UNA VEZ, luego evalúa la condición
let confirmar = false;
do {
    console.log("Esto se ejecuta aunque 'confirmar' sea false");
} while (confirmar);

// Operador de asignación += (Sumatoria en ciclos)
let totalAcumulado = 0;
totalAcumulado += 5; // Lo mismo que totalAcumulado = totalAcumulado + 5


// --- 10. BUCLES ESPECIALIZADOS PARA ARREGLOS Y OBJETOS ---

let valores = [10, 20, 30];

// for...of: Itera directamente sobre los VALORES del arreglo
for (let num of valores) {
    console.log(num);
}

// for...in: Itera sobre las CLAVES (propiedades) de un objeto
let personaInfo = { nombre: "Sofía", edad: 28 };
for (let clave in personaInfo) {
    console.log(clave + ": " + personaInfo[clave]);
}


// --- 11. CONTROL DE FLUJO: BREAK Y CONTINUE ---

for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // continue: Salta la iteración actual (no imprime el 2) y sigue
    }
    if (i === 4) {
        break; // break: Rompe y detiene el bucle por completo
    }
    console.log(i);
}


// --- 12. BUENAS PRÁCTICAS Y CONVENCIONES ---

// 1. Evitar var, preferir const para valores fijos y let para variables
const PI = 3.1416;
let edadActual = 25;

// 2. Usar === (igualdad estricta) en lugar de == para evitar conversiones inesperadas
console.log(5 === "5"); // Devuelve false de forma segura

// 3. Nombres descriptivos para variables y funciones (Evitar 'x' o 'data')
let precioProducto = 100; // Claro y descriptivo

// 4. Evitar anidaciones innecesarias usando Optional Chaining (?.)
let empleado = { activo: true };
if (empleado?.activo) {
    console.log("Empleado activo");
}