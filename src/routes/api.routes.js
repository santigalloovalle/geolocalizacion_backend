import { Router } from "express";
import {DAO} from '../controllers/DAO.js'
import {DTO} from '../controllers/DTO.js'
const router = Router();

router.get('/users/:cordinates', async (req, res) => {
    try {
        const { cordinates } = req.params;
        // res.json(cordinates);
        const [data] = await DAO(cordinates)
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.post('/users', async (req, res) => {
    try {
        const { useNombre, useApellido, useDocumento, useDireccion, useCoordY, useCoordX} = req.body;
        const newUsuario = {
            useNombre, useApellido, useDocumento, useDireccion, useCoordY, useCoordX
        }
        await DTO(newUsuario);
        return res.status(200).json(['Usuario creado exitosamente',newUsuario]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;