/**
 * PROYECTO: Panel de Control DOM
 * Archivo: scripts.js
 * Descripción: Ejercicio integral aplicando todos los conceptos del DOM y Eventos.
 */

// ==========================================
// 1. SELECCIÓN DE ELEMENTOS (El Radar del DOM)
// ==========================================
// Método Tradicional
const cuerpoPagina = document.getElementById("cuerpo-pagina");
const titulo = document.getElementById("titulo-principal");
const inputTarea = document.getElementById("input-tarea");
const formTarea = document.getElementById("form-tarea");
const btnAgregar = document.getElementById("btn-agregar");
const btnBloquear = document.getElementById("btn-bloquear");
const btnTema = document.getElementById("btn-tema");

// Método Moderno (querySelector)
const listaTareas = document.querySelector("#lista-tareas");
const zonaMensajes = document.querySelector("#zona-mensajes");

// ==========================================
// 2. MODIFICACIÓN DE ESTILOS Y CLASES
// ==========================================
// classList.toggle() para aplicar el modo oscuro dinámicamente
btnTema.addEventListener("click", () => {
    cuerpoPagina.classList.toggle("modo-oscuro");

    // Modificación de estilos en línea usando camelCase
    if (cuerpoPagina.classList.contains("modo-oscuro")) {
        titulo.style.color = "#63b3ed"; // Azul claro para modo oscuro
        btnTema.textContent = "☀️ Modo Claro";
    } else {
        titulo.style.color = "#3182ce"; // Azul original
        btnTema.textContent = "🌙 Modo Oscuro";
    }
});

// ==========================================
// 3. EVENTOS DE TECLADO Y RATÓN
// ==========================================
// Evento keyup para dar feedback visual al escribir
inputTarea.addEventListener("keyup", (evento) => {
    if (inputTarea.value.length > 0) {
        inputTarea.classList.add("borde-resaltado");
    } else {
        inputTarea.classList.remove("borde-resaltado");
    }
});

// Eventos mouseover y mouseout para el botón agregar
btnAgregar.addEventListener("mouseover", () => {
    btnAgregar.style.transform = "scale(1.05)";
    btnAgregar.style.transition = "transform 0.2s";
});
btnAgregar.addEventListener("mouseout", () => {
    btnAgregar.style.transform = "scale(1)";
});

// ==========================================
// 4. CREACIÓN, INSERCIÓN Y SEGURIDAD (textContent vs innerHTML)
// ==========================================
// BUENA PRÁCTICA: Definimos la función nominal para poder eliminarla después
const manejarEnvioFormulario = (evento) => {
    // Evitamos que la página se recargue (comportamiento por defecto del form)
    evento.preventDefault();

    const textoUsuario = inputTarea.value;
    if (textoUsuario.trim() === "") return;

    // A) CREACIÓN DE NODOS
    const nuevoLi = document.createElement("li");

    // B) SEGURIDAD: Usamos textContent para evitar inyección XSS de usuarios
    // Si el usuario escribe <h1>Hola</h1>, se mostrará literalmente como texto.
    nuevoLi.textContent = textoUsuario;

    // Añadimos clases de Tailwind al nuevo elemento
    nuevoLi.className = "p-3 bg-gray-50 border border-gray-200 rounded flex justify-between items-center text-gray-800";

    // Creamos un botón de eliminar para cada tarea
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌";
    btnEliminar.className = "text-red-500 hover:text-red-700";

    // EVENTO DE ELIMINACIÓN: Moldeando el DOM a voluntad (remove)
    btnEliminar.addEventListener("click", () => {
        nuevoLi.remove(); // Eliminamos el nodo del DOM
    });

    // C) INSERCIÓN: Construimos la jerarquía
    nuevoLi.appendChild(btnEliminar);

    // Insertamos la nueva tarea al PRINCIPIO de la lista usando insertBefore
    listaTareas.insertBefore(nuevoLi, listaTareas.firstChild);

    // D) INNERHTML: Lo usamos de forma controlada para mensajes del sistema
    zonaMensajes.classList.remove("hidden");
    zonaMensajes.innerHTML = `<strong>¡Éxito!</strong> Tarea agregada correctamente a las ${new Date().toLocaleTimeString()}.`;

    // Limpiamos el input y los estilos
    inputTarea.value = "";
    inputTarea.classList.remove("borde-resaltado");
};

// Vinculamos la función nominal al evento submit del formulario
formTarea.addEventListener("submit", manejarEnvioFormulario);

// ==========================================
// 5. GESTIÓN DE ATRIBUTOS Y ELIMINACIÓN DE EVENTOS
// ==========================================
btnBloquear.addEventListener("click", () => {
    // Leemos y modificamos atributos dataset (data-estado)
    const estadoActual = btnAgregar.dataset.estado;

    if (estadoActual === "activo") {
        // ELIMINACIÓN DEL EVENTO: Pasamos EXACTAMENTE la misma referencia nominal
        formTarea.removeEventListener("submit", manejarEnvioFormulario);

        // Modificamos atributos estándar (disabled) y dataset
        btnAgregar.setAttribute("disabled", "true");
        btnAgregar.dataset.estado = "bloqueado";

        // Feedback visual
        btnAgregar.classList.replace("bg-blue-500", "bg-gray-400");
        btnAgregar.classList.remove("hover:bg-blue-600");
        inputTarea.setAttribute("disabled", "true");

        zonaMensajes.innerHTML = `<span class="text-red-600"><strong>Sistema Bloqueado:</strong> Se han removido los escuchadores de eventos.</span>`;
        btnBloquear.textContent = "Desbloquear Sistema";
        btnBloquear.classList.replace("bg-red-500", "bg-green-500");

    } else {
        // Restauramos el sistema
        formTarea.addEventListener("submit", manejarEnvioFormulario);
        btnAgregar.removeAttribute("disabled");
        btnAgregar.dataset.estado = "activo";

        btnAgregar.classList.replace("bg-gray-400", "bg-blue-500");
        btnAgregar.classList.add("hover:bg-blue-600");
        inputTarea.removeAttribute("disabled");

        zonaMensajes.classList.add("hidden");
        btnBloquear.textContent = "Bloquear Sistema";
        btnBloquear.classList.replace("bg-green-500", "bg-red-500");
    }
});

// Mensaje inicial indicando que el DOM está listo
console.log("El DOM ha sido cargado. Eventos listos para escuchar.");