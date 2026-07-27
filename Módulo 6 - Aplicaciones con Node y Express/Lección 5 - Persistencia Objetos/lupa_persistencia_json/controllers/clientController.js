import * as clientService from '../services/clientService.js';

export const listAll = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error leyendo datos' });
    }
};

export const listRutClients = async (req, res) => {
    try {
        const clients = await clientService.getClientsWithRut();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Error leyendo datos' });
    }
};

export const removeClient = async (req, res) => {
    try {
        const { id } = req.params;
        await clientService.deleteClient(id);
        res.status(200).json({ message: 'Cliente eliminado físicamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cliente' });
    }
};

export const removeRut = async (req, res) => {
    try {
        const { id } = req.params;
        await clientService.deleteRutAccount(id);
        res.status(200).json({ message: 'Cuenta RUT eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar cuenta' });
    }
};