// scripts.js

// URL solicitada en el ejercicio
const API_URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10";

// Referencias al DOM
const btnGetAll = document.getElementById("btn-get-all");
const btnGroupSpecies = document.getElementById("btn-group-species");
const btnShowCard = document.getElementById("btn-show-card");
const btnClear = document.getElementById("btn-clear");
const resultsContainer = document.getElementById("results-container");
const placeholderText = document.getElementById("placeholder-text");

/**
 * Función principal para obtener los datos.
 * Aplica optimización: revisa localStorage antes de hacer el fetch.
 */
async function fetchCharacters() {
    try {
        // 1. Revisar caché local (Optimización)
        const cachedData = localStorage.getItem("rickAndMortyCharacters");

        if (cachedData) {
            console.log("Cargando datos desde caché local (No hay petición HTTP).");
            return JSON.parse(cachedData);
        }

        // 2. Si no hay caché, consumir la API REST
        console.log("Cargando datos desde la API (Primera vez)...");
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();

        // 3. Guardar en local para futuras peticiones
        localStorage.setItem("rickAndMortyCharacters", JSON.stringify(data));
        return data;

    } catch (error) {
        console.error("Error al obtener personajes:", error);
        resultsContainer.innerHTML = `<p class="text-red-500 font-bold text-center">Error al cargar los datos.</p>`;
        return null;
    }
}

/**
 * Muestra la lista básica de los 10 personajes.
 */
function renderList(characters) {
    if (!characters) return;

    // Ocultar placeholder y mostrar los botones secundarios
    placeholderText.classList.add("hidden");
    btnGroupSpecies.classList.remove("hidden");
    btnShowCard.classList.remove("hidden");

    let html = `<h2 class="text-xl font-bold border-b pb-2 mb-4">Lista de personajes (primeros 10):</h2>`;
    html += `<ul class="space-y-2">`;

    characters.forEach(char => {
        // Mostramos id, name y species según instrucciones
        html += `
            <li class="bg-gray-50 p-3 rounded border border-gray-200">
                <span class="font-bold text-blue-600">ID: ${char.id}</span> - 
                <span class="font-semibold text-gray-800">Nombre: ${char.name}</span> 
                <span class="text-gray-500 text-sm ml-2">(Especie: ${char.species})</span>
            </li>
        `;
    });

    html += `</ul>`;
    resultsContainer.innerHTML = html;
}

/**
 * Agrupa los personajes por especie y los muestra en una lista ordenada.
 */
function renderGrouped(characters) {
    if (!characters) return;

    // Agrupación usando .reduce()
    const grouped = characters.reduce((acc, char) => {
        if (!acc[char.species]) {
            acc[char.species] = [];
        }
        acc[char.species].push(char);
        return acc;
    }, {});

    let html = `<h2 class="text-xl font-bold border-b pb-2 mb-4 text-purple-700">Agrupación por especie:</h2>`;

    for (const species in grouped) {
        html += `<div class="mb-4">`;
        html += `<h3 class="text-lg font-semibold text-gray-700 mb-2">${species}</h3>`;
        html += `<ul class="list-disc list-inside bg-purple-50 p-3 rounded border border-purple-100">`;
        grouped[species].forEach(char => {
            html += `<li class="text-gray-800">${char.name} <span class="text-gray-500 text-sm">(ID: ${char.id})</span></li>`;
        });
        html += `</ul></div>`;
    }

    resultsContainer.innerHTML = html;
}

/**
 * Crea una ficha individual con la información de un personaje.
 */
function renderCard(character) {
    if (!character) return;

    let html = `<h2 class="text-xl font-bold border-b pb-2 mb-4 text-green-700">Ficha de personaje:</h2>`;

    // Diseño de tarjeta usando Tailwind para id, name, species e image
    html += `
        <div class="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img class="w-full h-auto" src="${character.image}" alt="${character.name}" />
            <div class="p-5">
                <p class="text-sm text-gray-500 mb-1">ID: ${character.id}</p>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${character.name}</h5>
                <p class="mb-3 font-normal text-gray-700">
                    <span class="font-semibold">Especie:</span> ${character.species}
                </p>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = html;
}

// ==========================================
// Listeners de Eventos
// ==========================================

btnGetAll.addEventListener("click", async () => {
    const data = await fetchCharacters();
    renderList(data);
});

btnGroupSpecies.addEventListener("click", async () => {
    // Al estar optimizado, esta llamada será instantánea desde caché
    const data = await fetchCharacters();
    renderGrouped(data);
});

btnShowCard.addEventListener("click", async () => {
    const data = await fetchCharacters();
    // Seleccionamos a Rick Sanchez (posición 0) para la ficha individual
    if (data && data.length > 0) {
        renderCard(data[0]);
    }
});

btnClear.addEventListener("click", () => {
    // Limpia el DOM
    resultsContainer.innerHTML = "";
    placeholderText.classList.remove("hidden");
    resultsContainer.appendChild(placeholderText);

    // Oculta botones secundarios
    btnGroupSpecies.classList.add("hidden");
    btnShowCard.classList.add("hidden");

    // Limpia la caché local para obligar a una nueva petición HTTP si se vuelve a probar
    localStorage.removeItem("rickAndMortyCharacters");
    console.log("Pantalla y caché limpiadas.");
});