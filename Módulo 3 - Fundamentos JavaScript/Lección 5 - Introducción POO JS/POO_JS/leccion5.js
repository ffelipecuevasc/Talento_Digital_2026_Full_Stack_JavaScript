// ============================================================
//  LECCIÓN #5: CREACIÓN DE OBJETOS EN JAVASCRIPT
//  Recorrido histórico desde las formas antiguas hasta ES6+
// ============================================================


// ------------------------------------------------------------
// 1) OBJETO LITERAL
//    La forma más directa: definir propiedades entre llaves {}.
//    Ideal para objetos únicos y de configuración rápida.
//    Limitación: no sirve para crear múltiples objetos
//    con la misma estructura (no es reutilizable).
// ------------------------------------------------------------

const objetoLiteral = {
    nombre: "Juan",
    edad: 25,
};

console.log("=== Objeto Literal ===");
console.log(objetoLiteral.nombre); // "Juan"


// ------------------------------------------------------------
// 2) CONSTRUCTOR OBJECT (new Object())
//    Equivalente al objeto literal pero más verboso.
//    Hoy en día está en desuso: el objeto literal es preferido
//    por ser más limpio y legible. Se muestra aquí solo
//    por contexto histórico.
// ------------------------------------------------------------

const objetoConstructor = new Object();
objetoConstructor.nombre = "Ana";
objetoConstructor.edad = 25;

console.log("\n=== Constructor Object ===");
console.log(objetoConstructor.nombre); // "Ana"


// ------------------------------------------------------------
// 3) FUNCIÓN CONSTRUCTORA (new + función)
//    Antes de ES6, esta era la forma de "simular" clases.
//    Se usa la palabra clave "new" para crear instancias.
//    "this" dentro de la función hace referencia al nuevo objeto.
//    Limitación: no hay sintaxis explícita de clase, lo que
//    hace el código menos legible y propenso a errores.
// ------------------------------------------------------------

function Desarrollador(nombre, lenguajePrioritario) {
    this.nombre = nombre;
    this.lenguajePrioritario = lenguajePrioritario;
}

const objetoDev = new Desarrollador("Roberto", "JavaScript");

console.log("\n=== Función Constructora ===");
console.log(objetoDev.nombre); // "Roberto"


// ------------------------------------------------------------
// 4) Object.create()
//    Crea un nuevo objeto usando otro como prototipo.
//    El nuevo objeto hereda las propiedades del objeto origen,
//    pero no las posee directamente (herencia prototípica pura).
//    Útil en escenarios avanzados de herencia, pero poco común
//    en código de aplicación cotidiano.
// ------------------------------------------------------------

const prototipoPersona = { nombre: "Julia", edad: 28 };
const objetoHeredado = Object.create(prototipoPersona);

console.log("\n=== Object.create() ===");
console.log(objetoHeredado.nombre);               // "Julia" (heredado del prototipo)
console.log(objetoHeredado.hasOwnProperty("nombre")); // false (no es propiedad propia)


// ============================================================
//
//  LA FORMA DEFINITIVA: CLASES ES6 (ECMAScript 2015)
//
//  A partir de ES6, JavaScript incorporó la sintaxis de CLASES,
//  que es hoy el estándar recomendado para crear objetos
//  con estructura compartida.
//
//  ¿Por qué ES6 es superior?
//  - Sintaxis clara y expresiva (similar a otros lenguajes OOP)
//  - Separación explícita entre atributos y métodos
//  - Soporte nativo para herencia con "extends" y "super"
//  - Mejor integración con herramientas modernas y linters
//  - Más fácil de leer, mantener y escalar
//
// ============================================================


// ------------------------------------------------------------
//  ANATOMÍA DE UNA CLASE ES6 + ES2022
//
//  class NombreClase {
//
//    campoPublico = "valor por defecto"; // <-- class field (ES2022)
//                                        //     se declara fuera del constructor
//                                        //     y aplica igual a todas las instancias
//
//    constructor(param1, param2) {       // <-- inicializa atributos dinámicos
//      this.atributo1 = param1;          //     (valores que vienen de parámetros)
//      this.atributo2 = param2;
//    }
//
//    nombreMetodo() {                    // <-- define comportamientos
//      // lógica del método
//    }
//  }
//
//  REGLA PRÁCTICA:
//  · ¿El valor viene de un parámetro?  → va en el constructor (this.x = param)
//  · ¿Es un valor fijo o por defecto?  → va como class field  (x = "valor")
// ------------------------------------------------------------


// ------------------------------------------------------------
//  CLASE: Alumno
//
//  Representa a un estudiante con nombre, apellido y edad.
//  Incorpora CLASS FIELDS (ES2022) para atributos con valor
//  por defecto que no dependen de parámetros externos.
// ------------------------------------------------------------

class Alumno {

    // --- CLASS FIELDS (ES2022) ----------------------------
    // Se declaran directamente en el cuerpo de la clase,
    // antes del constructor. Cada instancia recibe este valor
    // automáticamente al crearse, sin necesidad de recibirlo
    // como parámetro.
    // Si más adelante se modifica (alumno.curso = "JavaScript"),
    // el cambio aplica solo a esa instancia, no a las demás.
    curso    = "Sin asignar"; // Campo público con valor por defecto
    activo   = true;          // Campo público con valor booleano por defecto
    // ------------------------------------------------------

    // El constructor se ejecuta automáticamente cada vez que
    // se crea una nueva instancia con "new Alumno(...)".
    // Recibe los datos iniciales y los asigna a "this",
    // que representa al objeto que se está creando.
    constructor(nombre, apellido, edad) {
        this.nombre   = nombre;   // Atributo dinámico: viene del parámetro
        this.apellido = apellido; // Atributo dinámico: viene del parámetro
        this.edad     = edad;     // Atributo dinámico: viene del parámetro
    }

    // Los métodos son funciones definidas dentro de la clase.
    // Describen qué puede HACER el objeto.
    // Tienen acceso tanto a los atributos del constructor
    // como a los class fields mediante "this".
    presentarse() {
        const estadoCurso = this.curso === "Sin asignar"
            ? "aún sin curso asignado"
            : `cursando ${this.curso}`;
        console.log(`Hola, soy ${this.nombre} ${this.apellido}, tengo ${this.edad} años y estoy ${estadoCurso}.`);
    }
}

// Crear instancias (objetos concretos) a partir de la clase
const estudiante1 = new Alumno("Felipe", "Cuevas", 37);
const estudiante2 = new Alumno("Kathia", "Cid", 25);

console.log("\n=== Clase Alumno (ES6 + Class Fields) ===");

// Ambos arrancan con los valores por defecto de los class fields
estudiante1.presentarse(); // "...estoy aún sin curso asignado."
estudiante2.presentarse(); // "...estoy aún sin curso asignado."

// Modificar el class field en una instancia no afecta a las demás
estudiante1.curso = "JavaScript";
estudiante1.presentarse(); // "...estoy cursando JavaScript."
estudiante2.presentarse(); // Sigue "...aún sin curso asignado." (no se vio afectada)


// ------------------------------------------------------------
//  CLASE: Docente
//
//  Representa a un docente con nombre, apellido, especialidad
//  y profesión. Muestra cómo reutilizar el mismo patrón
//  de clase para modelar distintas entidades.
// ------------------------------------------------------------

class Docente {

    constructor(nombre, apellido, especialidad, profesion) {
        this.nombre       = nombre;
        this.apellido     = apellido;
        this.especialidad = especialidad;
        this.profesion    = profesion;
    }

    saludar() {
        console.log(
            `Hola, soy ${this.nombre} ${this.apellido}. ` +
            `Soy ${this.profesion} y mi especialidad es ${this.especialidad}.`
        );
    }
}

const docente1 = new Docente("Felipe", "Cuevas", "Desarrollo Full Stack", "Ingeniería Informática");
const docente2 = new Docente("Chuck",  "Norris", "Artes Marciales Web",   "Instructor Todopderoso");

console.log("\n=== Clase Docente (ES6) ===");
docente1.saludar();
docente2.saludar();