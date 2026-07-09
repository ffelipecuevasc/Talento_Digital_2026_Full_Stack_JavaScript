/**
 * Archivo: scripts.js
 * Proyecto Integral: Evolución de la Asincronía en JavaScript
 */

const consola = document.getElementById('consola');

// Función de utilidad para imprimir en la pantalla
function imprimir(texto, color = "text-gray-300") {
    consola.innerHTML += `<span class="${color}">${texto}</span>\n`;
    console.log(texto);
}

function limpiarConsola() {
    consola.innerHTML = "";
}

// =====================================================================
// FASE 1: CÓDIGO BLOQUEANTE (El Hilo Único)
// =====================================================================
document.getElementById('btn-bloqueante').addEventListener('click', () => {
    limpiarConsola();
    imprimir("=== INICIANDO TAREA BLOQUEANTE ===", "text-red-400");
    imprimir("1. Fíjate en el Spinner giratorio de arriba. ¡Se va a congelar!", "text-yellow-400");

    // Forzamos un retraso para que el navegador actualice el DOM antes de bloquearse
    setTimeout(() => {
        const inicioBloqueo = Date.now();
        // Bucle síncrono que secuestra el Hilo Principal (Single-Thread)
        while (Date.now() - inicioBloqueo < 3000) {
            // El navegador no puede pintar, ni animar el CSS, ni escuchar clics
        }
        imprimir("2. Tarea pesada terminada (Fueron 3 segundos de parálisis).");
        imprimir("3. La interfaz ya no está congelada.\n");
    }, 100);
});

// =====================================================================
// FASE 2: CALLBACKS (La pirámide de la fatalidad)
// =====================================================================
document.getElementById('btn-callbacks').addEventListener('click', () => {
    limpiarConsola();
    imprimir("=== INICIANDO TAREA CON CALLBACKS ===", "text-yellow-400");
    imprimir("-> Observa cómo el código se anida hacia la derecha...\n");

    // Función asíncrona que usa un callback (instrucción a futuro)
    const prepararHamburguesa = (callback) => {
        setTimeout(() => {
            callback(null, "Hamburguesa Clásica");
        }, 1000);
    };

    const agregarPapas = (comida, callback) => {
        setTimeout(() => {
            callback(null, `${comida} con Papas Fritas`);
        }, 1000);
    };

    // EL INFIERNO DE LOS CALLBACKS EN ACCIÓN
    prepararHamburguesa((error, comida1) => {
        if (error) return imprimir("Error: " + error, "text-red-500");
        imprimir(`-> Paso 1: ${comida1} lista.`);

        agregarPapas(comida1, (error, comida2) => {
            if (error) return imprimir("Error: " + error, "text-red-500");
            imprimir(`-> Paso 2: ${comida2} listas.`);
            imprimir("¡Proceso finalizado! (Pero el código es difícil de leer)\n", "text-green-400");
        });
    });
});

// =====================================================================
// FASE 3: PROMESAS (Valores futuros y encadenamiento .then)
// =====================================================================
// Creamos una función que retorna un objeto Promesa
const pedirComidaPromesa = (pedidoValido) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (pedidoValido) {
                resolve("Pizza de Pepperoni"); // Estado: Cumplida
            } else {
                reject("No hay masa disponible"); // Estado: Rechazada
            }
        }, 1000);
    });
};

document.getElementById('btn-promesas').addEventListener('click', () => {
    limpiarConsola();
    imprimir("=== INICIANDO TAREA CON PROMESAS ===", "text-green-400");
    imprimir("-> Encadenamiento lineal (sin pirámides)...\n");

    pedirComidaPromesa(true)
        .then((comida) => {
            imprimir(`-> Paso 1: Recibí mi ${comida}.`);
            // El propio método then siempre devuelve una nueva promesa.
            return comida + " y Refresco gigante";
        })
        .then((comboCompleto) => {
            imprimir(`-> Paso 2: Ahora tengo ${comboCompleto}.`);
            imprimir("¡Proceso limpio finalizado!\n", "text-green-400");
        })
        .catch((error) => {
            // Centralizamos los errores
            imprimir(`Error: ${error}`, "text-red-500");
        });
});

// =====================================================================
// FASE 4: ASYNC / AWAIT (La sintaxis moderna y elegante)
// =====================================================================
document.getElementById('btn-async').addEventListener('click', async () => {
    limpiarConsola();
    imprimir("=== INICIANDO TAREA CON ASYNC/AWAIT ===", "text-blue-400");
    imprimir("-> El código se lee como síncrono, pero no bloquea el hilo...\n");

    try {
        // 'await' pausa la ejecución interna de esta función
        // pero el Hilo Principal (y el Spinner CSS) siguen libres.
        const comida = await pedirComidaPromesa(true);
        imprimir(`-> Paso 1: Recibí mi ${comida}.`);

        const comboCompleto = comida + " y Postre Helado";
        imprimir(`-> Paso 2: Ahora tengo ${comboCompleto}.`);

        imprimir("¡Proceso finalizado! (La sintaxis perfecta)\n", "text-green-400");
    } catch (error) {
        // Bloque robusto try/catch
        imprimir(`Houston, tenemos un problema: ${error}`, "text-red-500");
    }
});