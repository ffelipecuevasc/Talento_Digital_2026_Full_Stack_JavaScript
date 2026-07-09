/**
 * scripts.js
 * Ejercicio integral basado en el "Manual #5 Consumo de apis con javascript"
 */

// ============================================================================
// 1. DOM API: Manipulación de elementos HTML [cite: 43, 69]
// ============================================================================
const btnGeo = document.getElementById('btn-geo');
const geoResult = document.getElementById('geo-result');
const inputCity = document.getElementById('input-city');
const btnSaveLocal = document.getElementById('btn-save-local');
const btnXhr = document.getElementById('btn-xhr');
const btnFetch = document.getElementById('btn-fetch');
const outputConsole = document.getElementById('output-console');

// Función de utilidad para imprimir en nuestra "consola" web
const logToConsole = (message, isError = false) => {
    const colorClass = isError ? 'text-red-400' : 'text-green-400';
    outputConsole.innerHTML = `<span class="${colorClass}">[${new Date().toLocaleTimeString()}] ${message}</span>`;
};

// ============================================================================
// 2. LocalStorage API: Almacenamiento persistente [cite: 46, 76]
// ============================================================================
// Al cargar la página, verificamos si hay datos guardados
document.addEventListener('DOMContentLoaded', () => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
        inputCity.value = savedCity;
        logToConsole(`Dato recuperado de LocalStorage: ${savedCity}`);
    }
});

btnSaveLocal.addEventListener('click', () => {
    const city = inputCity.value.trim();
    if (city) {
        localStorage.setItem('lastCity', city);
        logToConsole(`Ciudad "${city}" guardada exitosamente en LocalStorage.`);
    }
});

// ============================================================================
// 3. Geolocation API: Funcionalidad del entorno del usuario [cite: 45, 75]
// ============================================================================
btnGeo.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        logToConsole("Solicitando permisos de ubicación...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                geoResult.classList.remove('hidden');
                geoResult.innerHTML = `<strong>Latitud:</strong> ${latitude.toFixed(4)} <br> <strong>Longitud:</strong> ${longitude.toFixed(4)}`;
                logToConsole("Ubicación obtenida exitosamente a través de Geolocation API.");
            },
            (error) => {
                logToConsole(`Error obteniendo ubicación: ${error.message}`, true);
            }
        );
    } else {
        logToConsole("La API de Geolocalización no es soportada por este navegador.", true);
    }
});

// ============================================================================
// 4. AJAX Tradicional: Realizando requests con XHR [cite: 105, 118-126]
// ============================================================================
btnXhr.addEventListener('click', () => {
    logToConsole("Iniciando petición XHR (XMLHttpRequest)...");

    // 1. Crear instancia [cite: 128]
    let xhr = new XMLHttpRequest();

    // 2. Configurar solicitud GET [cite: 129]
    // Usamos una API de prueba pública (JSONPlaceholder)
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users/1", true);

    // 3. Definir comportamiento onload [cite: 130, 131]
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Parsear JSON si la respuesta es exitosa [cite: 122, 123]
            const data = JSON.parse(xhr.responseText);
            logToConsole(`(XHR Éxito) Usuario obtenido:\n${JSON.stringify(data, null, 2)}`);
        } else {
            logToConsole(`(XHR Error) Status: ${xhr.status}`, true);
        }
    };

    xhr.onerror = function() {
        logToConsole("(XHR Error) Ocurrió un problema de red.", true);
    }

    // 4. Enviar solicitud [cite: 132]
    xhr.send();
});

// ============================================================================
// 5. Fetch API moderno con Async/Await, API Keys y Manejo de Errores [cite: 150, 190, 200-215, 237-252]
// ============================================================================
btnFetch.addEventListener('click', async () => {
    logToConsole("Iniciando petición con Fetch API (Async/Await)...");

    // Simulamos el uso de una API de terceros (Open Weather API) que requiere API-Key [cite: 81, 185-186].
    // NOTA: Usamos una API pública de geocodificación gratuita para la demostración en vivo
    // pero incluimos la sintaxis `apikey=TU_API_KEY` exigida por la teoría[cite: 190, 195].

    const city = inputCity.value.trim() || "London";
    const apiKey = "DEMO_API_KEY"; // Simulación de API Key

    // URL simulando la integración de la API Key como parámetro [cite: 195]
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&apikey=${apiKey}`;

    // Uso de try/catch para manejo robusto de errores [cite: 201, 241, 270]
    try {
        // Uso de await para esperar la respuesta de forma síncrona visualmente [cite: 211, 212]
        let response = await fetch(url);

        // Comprobar si la respuesta es exitosa (Manejo de Errores) [cite: 224, 231, 243]
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`); // [cite: 225, 244]
        }

        // Convertir respuesta a JSON [cite: 203, 246]
        let data = await response.json();

        if (data.results && data.results.length > 0) {
            logToConsole(`(Fetch Éxito) Datos de "${city}":\n${JSON.stringify(data.results[0], null, 2)}`);
        } else {
            logToConsole(`No se encontraron datos para la ciudad: ${city}`, true);
        }

    } catch (error) {
        // Capturar y manejar el error adecuadamente [cite: 205, 206, 215, 248, 249]
        logToConsole(`Hubo un error en la solicitud Fetch:\n${error.message}`, true);
    }
});