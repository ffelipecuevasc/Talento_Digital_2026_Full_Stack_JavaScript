const initDB = require('../database');

class ApiService {
    constructor() {
        this.dbPromise = initDB();
    }

    async getAllConductores() {
        const db = await this.dbPromise;
        return db.all('SELECT * FROM conductores');
    }

    async getAllAutomoviles() {
        const db = await this.dbPromise;
        return db.all('SELECT * FROM automoviles');
    }

    async getConductoresSinAutoPorEdad(edad) {
        const db = await this.dbPromise;
        return db.all(`
      SELECT c.* 
      FROM conductores c 
      LEFT JOIN automoviles a ON c.id = a.conductor_id 
      WHERE c.edad < ? AND a.id IS NULL
    `, [edad]);
    }

    async getSolitos() {
        const db = await this.dbPromise;
        const conductoresSinAuto = await db.all(`
      SELECT c.* FROM conductores c 
      LEFT JOIN automoviles a ON c.id = a.conductor_id 
      WHERE a.id IS NULL
    `);
        const autosSinConductor = await db.all(`
      SELECT * FROM automoviles WHERE conductor_id IS NULL
    `);
        return { conductoresSinAuto, autosSinConductor };
    }

    async getAutoPorPatenteExacta(patente) {
        const db = await this.dbPromise;
        return db.get(`
      SELECT a.*, c.nombre AS conductor_nombre, c.edad AS conductor_edad 
      FROM automoviles a 
      LEFT JOIN conductores c ON a.conductor_id = c.id 
      WHERE a.patente = ?
    `, [patente]);
    }

    async getAutosPorInicioPatente(letra) {
        const db = await this.dbPromise;
        return db.all(`
      SELECT a.*, c.nombre AS conductor_nombre, c.edad AS conductor_edad 
      FROM automoviles a 
      LEFT JOIN conductores c ON a.conductor_id = c.id 
      WHERE a.patente LIKE ?
    `, [`${letra}%`]);
    }
}

module.exports = new ApiService();