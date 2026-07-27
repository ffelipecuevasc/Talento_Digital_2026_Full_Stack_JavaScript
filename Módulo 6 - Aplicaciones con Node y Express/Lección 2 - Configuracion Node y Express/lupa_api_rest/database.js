// database.js
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function initDB() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
    CREATE TABLE IF NOT EXISTS conductores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      edad INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS automoviles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patente TEXT UNIQUE NOT NULL,
      marca TEXT NOT NULL,
      modelo TEXT NOT NULL,
      conductor_id INTEGER,
      FOREIGN KEY(conductor_id) REFERENCES conductores(id)
    );

    -- Insertar datos de prueba si las tablas están vacías
    INSERT OR IGNORE INTO conductores (id, nombre, edad) VALUES 
      (1, 'Ana', 25), (2, 'Carlos', 19), (3, 'Beatriz', 30), (4, 'David', 17);

    INSERT OR IGNORE INTO automoviles (id, patente, marca, modelo, conductor_id) VALUES 
      (1, 'ABC1234', 'Toyota', 'Corolla', 1),
      (2, 'XYZ9876', 'Ford', 'Focus', NULL),
      (3, 'AXX5555', 'Honda', 'Civic', 3);
  `);

    return db;
}

module.exports = initDB;