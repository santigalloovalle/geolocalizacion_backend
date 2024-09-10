import { Router } from "express";
import pool from '../database.js'

const router = Router();

router.get('/users/:cordinates', async (req, res) => {
    try {
        const { cordinates } = req.params;
        // res.json(newUsuario);
        const [data] = await pool.query('SELECT users.useNombre, users.useApellido, users.useDocumento, users.useDireccion, users.useCoordinates, ST_Distance_Sphere(useCoordinates, POINT('+cordinates+')) AS distances from users ORDER BY distances ASC');
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

router.post('/users', async (req, res) => {
    try {
        const { useNombre, useApellido, useDocumento, useDireccion, useCordinates} = req.body;
        const newUsuario = {
            useNombre, useApellido, useDocumento, useDireccion, useCordinates
        }
        // res.json(newUsuario);
        await pool.query('INSERT INTO users (useNombre, useApellido, useDocumento, useDireccion, useCoordinates)'+ ' ' +
            'VALUES("'+newUsuario.useNombre+'", "'+newUsuario.useApellido+'", "'+newUsuario.useDocumento+'", "'+newUsuario.useDireccion+'", POINT('+newUsuario.useCordinates+'))')
        res.json({ message: 'Usuario creado', newUsuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;