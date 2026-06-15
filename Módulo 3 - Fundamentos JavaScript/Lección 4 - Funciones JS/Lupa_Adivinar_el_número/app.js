// Generar número aleatorio entre 1 y 10
const secreto = Math.floor(Math.random() * 10) + 1;

// Función para detectar si un número ya fue ingresado previamente
function yaUsado(numero, lista) {
    return lista.includes(numero);
}

// Variables iniciales del juego
let intentosRestantes = 3;
let usados = [];
let adivinado = false;

// Retraso breve para asegurar que el HTML cargue antes de lanzar el prompt
setTimeout(() => {

    // Ciclo principal del juego
    while (intentosRestantes > 0 && !adivinado) {
        let entrada = prompt(`Adivina el número (1-10).\nIntentos restantes: ${intentosRestantes}\nIngresa tu número:`);

        // Manejo de cancelación del prompt por parte del usuario
        if (entrada === null) {
            alert("Juego cancelado.");
            break;
        }

        // Convertir la entrada a un número entero
        let numero = parseInt(entrada);

        // Validación 1: Verificar que sea un número válido y esté en el rango de 1 a 10
        if (isNaN(numero) || numero < 1 || numero > 10) {
            alert("Entrada inválida. Por favor, ingresa un número entre 1 y 10.");
            continue; // Vuelve al inicio del ciclo sin gastar un intento
        }

        // Validación 2: Verificar que el número no haya sido ingresado antes
        if (yaUsado(numero, usados)) {
            alert(`El número ${numero} ya fue usado. Intenta con otro.`);
            continue; // Vuelve al inicio del ciclo sin gastar un intento
        }

        // Registrar el intento válido
        usados.push(numero);

        // Actualizar el historial en la página web
        document.getElementById('historial').innerHTML = `Intentos: ${usados.join(', ')}`;

        // Comparar el ingreso con el número secreto
        if (numero === secreto) {
            alert("¡Adivinaste!");
            adivinado = true;
        } else {
            intentosRestantes--;
            if (intentosRestantes > 0) {
                alert(`Incorrecto. Te quedan ${intentosRestantes} intentos.`);
            }
        }
    }

    // Fin del juego si se agotan los intentos sin éxito
    if (!adivinado && intentosRestantes === 0) {
        alert(`Sin aciertos. El número era: ${secreto}`);
    }

}, 500);