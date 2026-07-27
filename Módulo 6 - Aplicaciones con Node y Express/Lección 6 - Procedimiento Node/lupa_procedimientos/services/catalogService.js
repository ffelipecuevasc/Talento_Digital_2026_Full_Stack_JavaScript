import fs from 'fs/promises';
import path from 'path';

const getFilePath = (type) => path.resolve(`${type === 'series' ? 'series' : 'peliculas'}.txt`);

// Helper para parsear cada línea según el formato exigido
const parseLine = (line, type) => {
    const parts = line.split(',').map(s => s.trim());
    if (type === 'peliculas') {
        return { nombre: parts[0], director: parts[1], anio: parseInt(parts[2]) };
    }
    return { nombre: parts[0], anio: parseInt(parts[1]), temporadas: parseInt(parts[2]) };
};

export const getCatalog = async (type) => {
    try {
        const data = await fs.readFile(getFilePath(type), 'utf-8');
        return data.split('\n').filter(line => line.trim() !== '').map(line => parseLine(line, type));
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
};

export const addEntry = async (type, entry) => {
    let newLine = '';
    if (type === 'peliculas') {
        newLine = `\n${entry.nombre}, ${entry.director}, ${entry.anio}`;
    } else {
        newLine = `\n${entry.nombre}, ${entry.anio}, ${entry.temporadas}`;
    }
    await fs.appendFile(getFilePath(type), newLine, 'utf-8');
};

export const deleteEntryPhysically = async (type, name) => {
    const filePath = getFilePath(type);
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Filtrar la línea para efectuar la eliminación física
    const newLines = lines.filter(line => !line.toLowerCase().startsWith(name.toLowerCase() + ','));

    // Sobrescribir el archivo con los datos restantes
    await fs.writeFile(filePath, newLines.join('\n'), 'utf-8');
};