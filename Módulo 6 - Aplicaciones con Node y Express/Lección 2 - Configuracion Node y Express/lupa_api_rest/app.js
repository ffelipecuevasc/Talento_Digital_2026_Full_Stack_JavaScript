const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Montar rutas
app.use('/', apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;