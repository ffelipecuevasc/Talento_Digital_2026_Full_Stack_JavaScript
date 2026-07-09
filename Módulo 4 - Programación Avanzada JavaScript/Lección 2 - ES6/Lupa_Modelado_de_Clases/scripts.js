/**
 * Ejercicio Práctico - Modelado de Clases Orientado a Objetos
 * Archivo: scripts.js
 */

// Utilidad global para imprimir resultados en la pantalla HTML
const consola = document.getElementById('consola-salida');
function imprimir(texto) {
    consola.innerHTML += texto + "\n";
    console.log(texto);
}

imprimir("=== INICIANDO SISTEMA DE MODELADO POO ===\n");

// =========================================================
// ESCENARIO 1: TAXIS URBANOS (Jerarquía de Herencia)
// =========================================================
imprimir("--- 1. ESCENARIO TAXIS URBANOS ---");

// Clase Padre (Base)
class Taxi {
    constructor(tipoConductor, licencia) {
        this.tipoConductor = tipoConductor;
        this.licencia = licencia;
    }

    obtenerDetalles() {
        return `Conductor: ${this.tipoConductor} | Licencia: ${this.licencia}`;
    }
}

// Subclase: Taxi Tradicional
class TaxiTradicional extends Taxi {
    constructor() {
        super("Conductor Profesional", "A1");
        this.techo = "Amarillo";
    }
    mostrarInfo() {
        return `[Taxi Tradicional] Techo ${this.techo} -> ${super.obtenerDetalles()}`;
    }
}

// Subclase: Taxi Particular (Sirve como clase intermedia)
class TaxiParticular extends Taxi {
    constructor() {
        super("Conductor Particular", "B");
    }
}

// Subclases de Taxi Particular (Express y Premium)
class TaxiExpress extends TaxiParticular {
    constructor() {
        super();
        this.categoria = "Autos Típicos";
    }
    mostrarInfo() {
        return `[Taxi Express] Categoría: ${this.categoria} -> ${super.obtenerDetalles()}`;
    }
}

class TaxiPremium extends TaxiParticular {
    constructor() {
        super();
        this.categoria = "Mayor Categoría / Lujo";
    }
    mostrarInfo() {
        return `[Taxi Premium] Categoría: ${this.categoria} -> ${super.obtenerDetalles()}`;
    }
}

// Subclase: Taxi Cargo
class TaxiCargo extends Taxi {
    constructor() {
        super("Conductor de Carga", "A4");
        this.proposito = "Transportar carga en lugar de personas";
    }
    mostrarInfo() {
        return `[Taxi Cargo] Uso: ${this.proposito} -> ${super.obtenerDetalles()}`;
    }
}

// Instanciación de Escenario 1
const flota = [
    new TaxiTradicional(),
    new TaxiExpress(),
    new TaxiPremium(),
    new TaxiCargo()
];

flota.forEach(taxi => imprimir(taxi.mostrarInfo()));


// =========================================================
// ESCENARIO 2: CATÁLOGO SONY CHILE
// =========================================================
imprimir("\n--- 2. ESCENARIO CATÁLOGO SONY ---");

// Clase Padre (Producto genérico)
class ProductoSony {
    constructor(nombre, modelo, precio, categoria) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
        this.categoria = categoria;
    }

    mostrarProducto() {
        return `[${this.categoria}] ${this.nombre} (Mod: ${this.modelo}) - Precio: $${this.precio}`;
    }
}

// Subclases específicas
class Televisor extends ProductoSony {
    constructor(nombre, modelo, precio, resolucion, pulgadas) {
        super(nombre, modelo, precio, "Televisores");
        this.resolucion = resolucion;
        this.pulgadas = pulgadas;
    }
    mostrarProducto() {
        return super.mostrarProducto() + ` | Pantalla: ${this.pulgadas}" ${this.resolucion}`;
    }
}

class Consola extends ProductoSony {
    constructor(nombre, modelo, precio, almacenamiento) {
        super(nombre, modelo, precio, "Consolas");
        this.almacenamiento = almacenamiento;
    }
    mostrarProducto() {
        return super.mostrarProducto() + ` | Disco: ${this.almacenamiento}`;
    }
}

class Camara extends ProductoSony {
    constructor(nombre, modelo, precio, megapixeles) {
        super(nombre, modelo, precio, "Cámaras");
        this.megapixeles = megapixeles;
    }
    mostrarProducto() {
        return super.mostrarProducto() + ` | Lente: ${this.megapixeles} MP`;
    }
}

// Instanciación de Escenario 2
const catalogo = [
    new Televisor("Sony Bravia XR", "A80L", 1299990, "4K OLED", 65),
    new Consola("PlayStation 5", "Slim Edition", 549990, "1TB SSD"),
    new Camara("Sony Alpha", "A7 IV", 2100000, 33)
];

catalogo.forEach(producto => imprimir(producto.mostrarProducto()));
imprimir("\n=== CARGA DE CLASES COMPLETADA ===");


// =========================================================
// ESCENARIO 3: CLASE SUMATORIA (Interacción con UI)
// =========================================================

class Sumatoria {
    constructor(base) {
        this.base = base;
        this.acumulado = base; // Inicia con el valor base
        this.iteracion = 1;

        // La primera línea de salida generada por el constructor
        this.escribirEnPantalla(`[Constructor] Objeto Sumatoria inicializado con base aleatoria: ${this.base}`);
    }

    sumar() {
        this.acumulado += this.base;
        this.iteracion++;
        // Las siguientes líneas generadas por el método avanzar
        this.escribirEnPantalla(`[Iteración ${this.iteracion}] Se sumó ${this.base}. Total acumulado: <strong>${this.acumulado}</strong>`);
    }

    // Método de utilidad para inyectar texto en el panel morado
    escribirEnPantalla(mensaje) {
        const panel = document.getElementById('sumatoria-salida');
        panel.innerHTML += mensaje + "<br><br>";
        console.log(mensaje);
    }
}

// Configuración del objeto y el botón
// Generamos un número aleatorio entre 1 y 10 como indica el PDF
let baseAleatoria = Math.floor(Math.random() * 10) + 1;

// Instanciamos nuestro objeto Sumatoria
const miSumatoria = new Sumatoria(baseAleatoria);

// Conectamos el botón del HTML con el método de nuestro objeto
document.getElementById('btn-sumar').addEventListener('click', () => {
    miSumatoria.sumar();
});