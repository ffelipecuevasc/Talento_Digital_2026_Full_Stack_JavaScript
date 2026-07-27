import express from 'express';

// ==========================================
// CONFIGURACIÓN INICIAL
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// FUNCIONES AUXILIARES (Lógica de Negocio)
// ==========================================

// Obtiene la fecha actual con el formato requerido
const getFormattedDate = () => {
    const now = new Date();
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    return {
        dayName: days[now.getDay()],
        dayNum: String(now.getDate()).padStart(2, '0'),
        month: String(now.getMonth() + 1).padStart(2, '0'),
        year: now.getFullYear(),
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        seconds: String(now.getSeconds()).padStart(2, '0')
    };
};

// Genera una palabra aleatoria de entre 3 y 10 letras
const getRandomWord = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    let word = '';
    for (let i = 0; i < length; i++) {
        word += letters[Math.floor(Math.random() * letters.length)];
    }
    return word;
};

// ==========================================
// ENRUTAMIENTO (Endpoints)
// ==========================================

// Endpoint Principal (GET)
app.get('/', (req, res) => {
    const date = getFormattedDate();

    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Fecha y Hora del Servidor</title>
        </head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h2>Fecha y Hora Actual</h2>
            <p><strong>Día:</strong> ${date.dayName}</p>
            <p><strong>Fecha:</strong> ${date.dayNum} / ${date.month} / ${date.year}</p>
            <p><strong>Hora:</strong> ${date.hours}:${date.minutes}:${date.seconds}</p>
        </body>
        </html>
    `;

    // Express configura automáticamente el Content-Type a text/html al usar send() con HTML,
    // pero lo definimos explícitamente como buena práctica según el requerimiento.
    res.type('text/html').send(htmlResponse);
});

// Endpoint Secundario (/random-data)
app.route('/random-data')
    .get((req, res) => {
        // Responde a GET con una palabra aleatoria en HTML
        res.type('text/html').send(`<h1>Palabra Aleatoria: ${getRandomWord()}</h1>`);
    })
    .put((req, res) => {
        // Responde a PUT con un número aleatorio entre 10 y 50.000 en HTML
        const randomNum = Math.floor(Math.random() * (50000 - 10 + 1)) + 10;
        res.type('text/html').send(`<h1>Número Aleatorio: ${randomNum}</h1>`);
    })
    .all((req, res) => {
        // Responde a cualquier otro método (POST, DELETE, PATCH, etc.) en texto plano
        res.type('text/plain').send(`Aún no estoy preparado para responder al método ${req.method}`);
    });

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});