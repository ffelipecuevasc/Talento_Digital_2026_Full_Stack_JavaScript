/**
 * PROYECTO MUNITECH
 * Archivo: scripts.js
 * Descripción: Implementación integral de POO, Prototipos y JSON.
 */

// Utilidad para imprimir en el HTML en lugar de solo en la consola
const consola = document.getElementById('consola-salida');
function imprimir(texto) {
    consola.innerHTML += texto + "\n";
}

imprimir("--- INICIANDO SISTEMA MUNITECH ---\n");

// ==========================================
// 1. ABSTRACCIÓN Y ENCAPSULAMIENTO
// ==========================================
// Protegemos datos confidenciales de los vecinos (como el RUT) mediante encapsulamiento[cite: 417].
// Usamos el símbolo '#' para hacer privadas nuestras propiedades[cite: 173].
class Ciudadano {
    #rut; // Propiedad privada inaccesible desde el exterior

    constructor(nombre, rut) {
        this.nombre = nombre;
        this.#rut = rut;
    }

    // Método público para interactuar con el dato privado de forma segura
    obtenerRutOculto() {
        return `****${this.#rut.slice(-4)}`;
    }
}

// ==========================================
// 2. CLASES BASE Y HERENCIA
// ==========================================
// Utilizamos Clases como plantillas o moldes, a partir de las cuales creamos Objetos[cite: 81].
class ReporteBase {
    constructor(ciudadano, descripcion) {
        this.ciudadano = ciudadano; // Guardamos el objeto Ciudadano completo
        this.descripcion = descripcion;
        this.estado = "Pendiente";
    }

    // Método que será polimórfico
    procesar() {
        return `Registrando reporte general: "${this.descripcion}".`;
    }
}

// La Herencia nos permite crear una nueva clase que hereda propiedades y métodos usando 'extends'[cite: 175].
class ReporteInfraestructura extends ReporteBase {
    constructor(ciudadano, descripcion, gravedad, ubicacion) {
        super(ciudadano, descripcion); // Llama al constructor de ReporteBase
        this.gravedad = gravedad;
        this.ubicacion = ubicacion;
    }

    // ==========================================
    // 3. POLIMORFISMO
    // ==========================================
    // Sobrescribimos el método heredado para darle un comportamiento especializado[cite: 177].
    procesar() {
        return `Despachando cuadrilla a ${this.ubicacion} por problema de ${this.gravedad}: "${this.descripcion}".`;
    }
}

// ==========================================
// 4. INSTANCIACIÓN Y ARREGLOS
// ==========================================
// Instanciamos objetos creando entidades vivas a partir de nuestros moldes[cite: 75].
const vecino1 = new Ciudadano("Ana López", "15234567-8");
const vecino2 = new Ciudadano("Carlos Pérez", "18987654-3");

// Guardamos todo en un arreglo para recorrerlo[cite: 417].
const listaReportes = [
    new ReporteBase(vecino1, "Basura acumulada en la plaza vecinal"),
    new ReporteInfraestructura(vecino2, "Semáforo caído tras tormenta", "Alta", "Av. Central con Los Leones")
];

// ==========================================
// 5. MODIFICACIÓN DINÁMICA DE PROTOTIPOS
// ==========================================
// Modificamos un método en el prototipo principal mientras la aplicación está corriendo[cite: 315].
// Añadimos una nueva funcionalidad a TODOS los reportes (presentes y futuros) sobre la marcha.
ReporteBase.prototype.marcarCompletado = function() {
    this.estado = "Resuelto";
    return `[ÉXITO] El reporte del ciudadano ${this.ciudadano.nombre} (RUT: ${this.ciudadano.obtenerRutOculto()}) ha sido solucionado.`;
};

// ==========================================
// 6. LÓGICA E ITERACIÓN (If-Else)
// ==========================================
imprimir("--- PROCESANDO REPORTES EN LA LÍNEA DE ENSAMBLAJE ---\n");

// Recorremos el arreglo y tomamos decisiones con estructuras lógicas[cite: 417].
listaReportes.forEach((reporte, index) => {
    imprimir(`Reporte #${index + 1}:`);

    // Verificamos de qué tipo de clase es el objeto actual
    if (reporte instanceof ReporteInfraestructura) {
        imprimir("⚠️ ALERTA INFRAESTRUCTURA:");
        imprimir(reporte.procesar()); // Ejecuta el método polimórfico
    } else {
        imprimir("ℹ️ INGRESO NORMAL:");
        imprimir(reporte.procesar()); // Ejecuta el método base
    }

    // Demostramos el uso del método inyectado por prototipo y el encapsulamiento
    imprimir(reporte.marcarCompletado());
    imprimir("--------------------------------------------------");
});

// ==========================================
// 7. MANIPULACIÓN DE JSON (COMUNICACIÓN CON SERVIDOR)
// ==========================================
imprimir("\n--- COMUNICACIÓN CON SERVIDOR CENTRAL (JSON) ---");

// Objeto literal normal simulando una respuesta que generamos nosotros[cite: 389].
const resumenDiario = {
    fecha: "2026-07-08",
    totalReportes: listaReportes.length,
    municipio: "Santiago Centro"
};

// Convertimos tus objetos de JS a texto plano (string) para viajar por la red usando JSON.stringify()[cite: 377].
const jsonParaEnviar = JSON.stringify(resumenDiario);
imprimir("\n1. Empaquetando datos (De Objeto a JSON):");
imprimir(jsonParaEnviar);

// Simulamos que el servidor nos responde con un texto plano[cite: 404].
const respuestaServidorJSON = '{"codigo": 200, "mensaje": "Resumen guardado correctamente en la base de datos", "firmado": true}';

// Convierte el texto plano recién llegado en un objeto interactivo usando JSON.parse()[cite: 377].
const datosDesempaquetados = JSON.parse(respuestaServidorJSON);
imprimir("\n2. Desempaquetando respuesta (De JSON a Objeto):");
if (datosDesempaquetados.codigo === 200) {
    imprimir(`Servidor dice: ${datosDesempaquetados.mensaje}`);
}

imprimir("\n--- FIN DEL SISTEMA MUNITECH ---");