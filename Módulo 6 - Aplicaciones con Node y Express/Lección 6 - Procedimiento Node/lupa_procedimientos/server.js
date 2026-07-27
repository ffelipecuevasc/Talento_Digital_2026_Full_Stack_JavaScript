import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import * as catalogService from './services/catalogService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Función para rechazar métodos no permitidos
const methodNotAllowed = (req, res) => res.status(405).json({ error: 'Método no permitido' });

// RUTAS PRINCIPALES
app.route('/api/catalogo')
    .get(async (req, res) => {
        const { tipo } = req.query; // 'peliculas' o 'series'
        if (!tipo || (tipo !== 'peliculas' && tipo !== 'series')) {
            return res.status(400).json({ error: 'Parámetro tipo inválido' });
        }
        try {
            const data = await catalogService.getCatalog(tipo);
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })
    .post(async (req, res) => {
        const { tipo, item } = req.body;
        if (!tipo || !item) return res.status(400).json({ error: 'Cuerpo de petición inválido' });
        try {
            await catalogService.addEntry(tipo, item);
            res.status(201).json({ message: 'Registro creado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al guardar el registro' });
        }
    })
    .all(methodNotAllowed); // Rechazar otros métodos (PUT, PATCH, etc.)

app.route('/api/catalogo/:nombre')
    .delete(async (req, res) => {
        const { nombre } = req.params;
        const { tipo } = req.query;
        if (!tipo) return res.status(400).json({ error: 'Debe especificar el tipo' });

        try {
            await catalogService.deleteEntryPhysically(tipo, nombre);
            res.json({ message: 'Registro eliminado físicamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar' });
        }
    })
    .all(methodNotAllowed);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});