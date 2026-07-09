/**
 * Ejercicio Práctico - Clases y Objetos
 * Archivo: scripts.js
 */

// Utilidad para imprimir en el HTML (simulando console.log para mejor visualización)
const consola = document.getElementById('consola-salida');
function imprimir(texto) {
    consola.innerHTML += texto + "\n";
    console.log(texto); // Mantenemos el log original por buenas prácticas
}

imprimir("=== INICIANDO SISTEMA DE OBJETOS ===\n");

// ==========================================
// 1. CLASE ALUMNO
// ==========================================
// Define una clase que modele a un alumno con atributos: nombre, edad, carrera[cite: 438, 439].
class Alumno {
    constructor(nombre, edad, carrera) {
        this.nombre = nombre;
        this.edad = edad;
        this.carrera = carrera;
    }

    // Método que muestre ordenadamente todos sus atributos[cite: 440].
    mostrarInfo() {
        return `[Alumno] Nombre: ${this.nombre}, Edad: ${this.edad}, Carrera: ${this.carrera}`;
    }
}

// ==========================================
// 2. CLASE BANDA MUSICAL
// ==========================================
// Define una clase con atributos: nombre, genero, integrantes y discos[cite: 452, 453].
class BandaMusical {
    constructor(nombre, genero, integrantes, discos) {
        this.nombre = nombre;
        this.genero = genero;
        this.integrantes = integrantes;
        this.discos = discos; // Se espera que sea un Array [cite: 467]
    }

    // Método para mostrar todos los atributos[cite: 454].
    mostrarInfo() {
        return `[Banda] Banda: ${this.nombre}, Género: ${this.genero}, Integrantes: ${this.integrantes}`;
    }

    // Método para listar solo los discos publicados[cite: 454].
    listarDiscos() {
        return `Discos: ${this.discos.join(", ")}`;
    }
}

// ==========================================
// 3. CLASE PERRO
// ==========================================
// Define una clase que modele a un perro con atributos: nombre, raza, edad[cite: 480, 481].
class Perro {
    constructor(nombre, raza, edad) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
    }

    // Método para mostrar todos sus atributos[cite: 482].
    mostrarInfo() {
        return `[Perro] Nombre: ${this.nombre}, Raza: ${this.raza}, Edad: ${this.edad}`;
    }

    // Método para "ladrar"[cite: 482].
    ladrar() {
        return "¡Guau guau!";
    }
}

// ==========================================
// EJECUCIÓN E INSTANCIACIÓN
// ==========================================

imprimir("--- DATOS DEL ALUMNO ---");
const estudiante = new Alumno("Valentina Rojas", 25, "Desarrollo Full Stack");
imprimir(estudiante.mostrarInfo());

imprimir("\n--- DATOS DE LA BANDA MUSICAL ---");
// Instanciamos un objeto con los datos de una banda favorita[cite: 455].
const miBanda = new BandaMusical(
    "Daft Punk",
    "Música Electrónica",
    2,
    ["Homework", "Discovery", "Human After All", "Random Access Memories"]
);
imprimir(miBanda.mostrarInfo());
imprimir(miBanda.listarDiscos());

imprimir("\n--- DATOS DEL PERRO ---");
// Instanciamos un objeto con los datos de un perro[cite: 483].
const miPerro = new Perro("Firulais", "Mestizo", 4);
imprimir(miPerro.mostrarInfo());
imprimir(`Sonido: ${miPerro.ladrar()}`);

imprimir("\n=== EJECUCIÓN FINALIZADA CORRECTAMENTE ===");