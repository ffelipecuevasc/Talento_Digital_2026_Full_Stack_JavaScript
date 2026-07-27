import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { listAll, listRutClients, removeClient, removeRut } from './controllers/clientController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
// Sirve el frontend desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints de la API
app.get('/api/clients', listAll);
app.get('/api/clients/rut', listRutClients);
app.delete('/api/clients/:id', removeClient);
app.delete('/api/clients/:id/rut', removeRut);

app.listen(PORT, () => {
    console.log(`Servidor bancario corriendo en http://localhost:${PORT}`);
});