const apiService = require('../services/apiService');

const getConductores = async (req, res) => {
    try {
        const data = await apiService.getAllConductores();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAutomoviles = async (req, res) => {
    try {
        const data = await apiService.getAllAutomoviles();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getConductoresSinAuto = async (req, res) => {
    try {
        const edad = parseInt(req.query.edad, 10);
        if (isNaN(edad)) return res.status(400).json({ error: 'Parámetro edad inválido' });

        const data = await apiService.getConductoresSinAutoPorEdad(edad);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSolitos = async (req, res) => {
    try {
        const data = await apiService.getSolitos();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAuto = async (req, res) => {
    try {
        const { patente, iniciopatente } = req.query;
        let data;

        if (patente) {
            data = await apiService.getAutoPorPatenteExacta(patente);
            if (!data) return res.status(404).json({ error: 'Automóvil no encontrado' });
        } else if (iniciopatente) {
            data = await apiService.getAutosPorInicioPatente(iniciopatente);
        } else {
            return res.status(400).json({ error: 'Debe proveer patente o iniciopatente' });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getConductores,
    getAutomoviles,
    getConductoresSinAuto,
    getSolitos,
    getAuto
};