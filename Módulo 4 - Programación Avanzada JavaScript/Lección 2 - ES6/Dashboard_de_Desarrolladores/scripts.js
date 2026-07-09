/**
 * PROYECTO: Dashboard ES6+
 * Archivo: scripts.js
 * Descripción: Ejercicio integral aplicando las características de JS ES6+ del manual.
 */

// ==========================================
// 1. MÓDULOS (Export / Import)
// El manual indica que permiten dividir el código en archivos separados[cite: 843].
// Como usamos 1 solo archivo, la sintaxis real sería así:
// export class Persona { ... } (en un archivo)
// import { Persona } from './Persona.js'; (en otro archivo)
// ==========================================

// ==========================================
// 2. VARIABLES: let y const
// const no puede ser reasignada, let tiene alcance de bloque[cite: 768, 769].
// ==========================================
const contenedorApp = document.getElementById('app');
let estadoSistema = "Iniciando";

// ==========================================
// 3. FUNCIONES: Arrow Functions y Parámetros por Defecto
// Sintaxis más compacta y valores por defecto para parámetros opcionales[cite: 775, 779].
// ==========================================
const registrarLog = (mensaje, nivel = "INFO") => {
    // 4. INTERPOLADO DE STRINGS (Template Literals) [cite: 786, 791]
    console.log(`[${nivel}] ${estadoSistema}: ${mensaje}`);
};

registrarLog("Cargando clases base");

// ==========================================
// 5. CLASES: Definición y Herencia
// Sistema de clases similar a otros lenguajes[cite: 817].
// ==========================================
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    obtenerInfoBasica() {
        return `${this.nombre}, ${this.edad} años`;
    }
}

// Herencia usando 'extends' y 'super'[cite: 831, 835].
class Desarrollador extends Persona {
    constructor(nombre, edad, rol) {
        super(nombre, edad);
        this.rol = rol;
    }

    presentarse() {
        return `¡Hola! Soy ${this.nombre}, un ${this.rol}.`;
    }
}

// ==========================================
// 6. PROMESAS: Simulación de Operación Asincrónica
// Representan una operación asincrónica que se completará en el futuro[cite: 865].
// ==========================================
const obtenerDatosDelServidor = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = true;
            if (exito) {
                // Objeto simulado desde una Base de Datos
                resolve({
                    nombre: "Carlos",
                    edad: 29,
                    rol: "Full Stack Developer",
                    ubicacion: { ciudad: "Santiago", pais: "Chile" },
                    habilidadesBrutas: ["React", "Node.js", "React", "MongoDB", "CSS", "Node.js"] // Tiene duplicados intencionales
                });
            } else {
                reject("Error de conexión al servidor");
            }
        }, 1500); // Simulamos 1.5 segundos de carga
    });
};

// ==========================================
// 7. ASYNC / AWAIT y MANEJO DE DATOS MODERNOS
// Hacen que las promesas sean más fáciles de trabajar[cite: 864].
// ==========================================
const inicializarDashboard = async () => {
    try {
        estadoSistema = "Conectando API";
        registrarLog("Solicitando datos...");

        // Await pausa la ejecución hasta que la promesa se resuelva [cite: 875, 877]
        const datosApi = await obtenerDatosDelServidor();

        // ==========================================
        // 8. DESTRUCTURING (Objetos)
        // Extrae valores y los asigna a variables con sintaxis clara [cite: 795, 797]
        // ==========================================
        const { nombre, edad, rol, ubicacion, habilidadesBrutas } = datosApi;

        // ==========================================
        // 9. SETS (Colecciones de valores únicos)
        // No pueden tener elementos repetidos [cite: 855]
        // Limpiamos los duplicados del array habilidadesBrutas
        // ==========================================
        const habilidadesUnicas = new Set(habilidadesBrutas);

        // ==========================================
        // 10. SPREAD OPERATOR (...)
        // Expande elementos de un objeto o arreglo
        // ==========================================
        // Convertimos el Set de nuevo a Array usando Spread
        const arrayHabilidades = [...habilidadesUnicas];

        // Combinamos objetos usando Spread [cite: 812]
        const perfilExtra = { experiencia: "5 años", nivel: "Senior" };
        const perfilCompleto = { ...ubicacion, ...perfilExtra };

        // ==========================================
        // 11. MAPS (Pares Clave-Valor)
        // Almacenan pares donde las claves pueden ser de cualquier tipo [cite: 857]
        // ==========================================
        const mapaEvaluaciones = new Map();
        mapaEvaluaciones.set('React', 'Aprobado (95%)');
        mapaEvaluaciones.set('Node.js', 'Aprobado (90%)');
        mapaEvaluaciones.set('MongoDB', 'Pendiente');

        // Instanciamos la clase con los datos procesados
        const devActivo = new Desarrollador(nombre, edad, rol);

        // ==========================================
        // 12. RENDERIZADO (Template Literals Avanzado)
        // ==========================================
        estadoSistema = "Renderizando";
        registrarLog("Generando interfaz de usuario");

        const html = `
            <div class="w-full">
                <div class="border-b pb-4 mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">${devActivo.presentarse()}</h2>
                    <p class="text-gray-500">${devActivo.obtenerInfoBasica()} | ${perfilCompleto.ciudad}, ${perfilCompleto.pais}</p>
                    <span class="inline-block mt-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                        ${perfilCompleto.nivel} - ${perfilCompleto.experiencia}
                    </span>
                </div>

                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Stack Tecnológico:</h3>
                        <ul class="list-disc pl-5 text-gray-600">
                            ${arrayHabilidades.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Evaluaciones Técnicas:</h3>
                        <ul class="space-y-2">
                            ${Array.from(mapaEvaluaciones).map(([tecnologia, nota]) => `
                                <li class="flex justify-between border-b border-gray-100 pb-1">
                                    <span class="font-medium text-gray-600">${tecnologia}</span>
                                    <span class="${nota.includes('Aprobado') ? 'text-green-500' : 'text-yellow-500'}">${nota}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Inyectamos el resultado en el HTML
        contenedorApp.innerHTML = html;
        registrarLog("Proceso completado exitosamente", "SUCCESS");

    } catch (error) {
        // Manejo de errores de la promesa
        contenedorApp.innerHTML = `
            <div class="text-center text-red-500">
                <p class="text-4xl mb-2">⚠️</p>
                <p class="font-bold">${error}</p>
            </div>
        `;
        registrarLog(error, "ERROR");
    }
};

// Arrancamos la aplicación
inicializarDashboard();