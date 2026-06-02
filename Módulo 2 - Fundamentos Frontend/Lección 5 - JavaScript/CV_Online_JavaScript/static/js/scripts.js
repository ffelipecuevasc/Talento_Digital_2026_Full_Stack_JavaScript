// Vamos a generar un mensaje que solo se verá en la consola del navegador para avisar de que el HTML se conectó a el JS
console.log("El HTML vinculó correctamente el archivo JS y el navegador lo procesó bien");

// MODO OSCURO
// 1) Capturo el botón que dice APARIENCIA
const btnTheme = document.getElementById('btn-theme');

// 2) Quedo atento a cuando la persona haga CLICK en el botón de APARIENCIA
btnTheme.addEventListener('click', (e) => {

    // 3) Activo una transición por defecto que hace el cambio al MODO OSCURO
    document.startViewTransition(() =>{

        // 4) Ejecuto el cambio de clase CSS al modo oscuro
        document.body.classList.toggle('dark-theme');
    });
});

// Acá guardamos el "botón" del HTML (formulario) en una variable llamada 'bntEnviar'
const bntEnviar = document.querySelector('button[name="enviar"]');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputMensaje = document.getElementById('mensaje');

// ==========================================
// RETO 1: EL GUARDIÁN DEL CORREO
// ==========================================
// Escuchamos cada vez que el usuario teclea en el campo de email
inputEmail.addEventListener('input', (evento) => {
    const textoActual = evento.target.value;

    // Si el texto está vacío o NO incluye un arroba, bloqueamos todo
    if (textoActual === '' || !textoActual.includes('@')) {
        inputEmail.classList.add('borde-error'); // Pintamos de rojo
        bntEnviar.disabled = true; // Deshabilitamos el botón
    } else {
        // Si es válido, quitamos el error y reactivamos el botón
        inputEmail.classList.remove('borde-error');
        bntEnviar.disabled = false;
    }
});

// ==========================================
// RETO 2: EL ORGANIZADOR MÁGICO
// ==========================================
// 1. Capturamos los botones de filtro
const btnTodas = document.getElementById('btn-todas');
const btnBackend = document.getElementById('btn-backend');
const btnCloud = document.getElementById('btn-cloud');

// 2. Capturamos TODAS las habilidades en una lista (Nodos Múltiples)
const listaHabilidades = document.querySelectorAll('.habilidad-item');

// 3. Lógica para el botón "Backend"
btnBackend.addEventListener('click', () => {
    // Recorremos cada habilidad una por una
    listaHabilidades.forEach((habilidad) => {
        // ¿Tiene la clase cat-backend?
        if (habilidad.classList.contains('cat-backend')) {
            habilidad.classList.remove('ocultar-habilidad'); // Mostrar
        } else {
            habilidad.classList.add('ocultar-habilidad'); // Ocultar
        }
    });
});

// 4. Lógica para el botón "Cloud"
btnCloud.addEventListener('click', () => {
    listaHabilidades.forEach((habilidad) => {
        if (habilidad.classList.contains('cat-cloud')) {
            habilidad.classList.remove('ocultar-habilidad');
        } else {
            habilidad.classList.add('ocultar-habilidad');
        }
    });
});

// 5. Lógica para el botón "Todas" (El reinicio)
btnTodas.addEventListener('click', () => {
    // A todas les quitamos la clase de invisibilidad
    listaHabilidades.forEach((habilidad) => {
        habilidad.classList.remove('ocultar-habilidad');
    });
});

// Acá estamos "atentos" (escuchando) al evento de click
bntEnviar.addEventListener('click', (evento) => {
    // Evitamos que el navegador web envíe el formulario y recargue la página
    evento.preventDefault();

    // Escribo en la consola un mensaje cuando el usuario hizo click
    console.log("¡El usuario hizo clic en el botón para ENVIAR MENSAJE!");

    // Capturando los valores del formulario
    // Al momento de hacer clic, extraemos el valor de las etiquetas INPUT en el HTML
    const valorNombre = inputNombre.value;
    const valorEmail = inputEmail.value;
    const valorMensaje = inputMensaje.value;

    // Acá muestro los valores de los input
    console.log("Nombre del remitente: ", valorNombre);
    console.log("Correo electrónico del remitente: ", valorEmail);
    console.log("Mensaje: ", valorMensaje);

});