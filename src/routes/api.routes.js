import { Router } from "express";
import {DAO} from '../controllers/DAO.js';
import {DTO} from '../controllers/DTO.js';

const router = Router();

router.get('/users/:cordinates', async (req, res) => {
    try {
        const { cordinates } = req.params;
        const data = await DAO(cordinates);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.post('/users', async (req, res) => {
    try {
        const { useNombre, useApellido, useDocumento, useDireccion, useCordinates} = req.body;
        const newUsuario = {useNombre, useApellido, useDocumento, useDireccion, useCordinates}
        const data = await DTO(newUsuario);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;