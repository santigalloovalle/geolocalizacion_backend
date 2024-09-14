import pool from '../database.js'

export const DTO = async(usuario)=>{
    // res.json(newUsuario);
    await pool.query('INSERT INTO users (useNombre, useApellido, useDocumento, useDireccion, useCoordinates)'+ ' ' +
        'VALUES("'+usuario.useNombre+'", "'+usuario.useApellido+'", "'+usuario.useDocumento+'", "'+usuario.useDireccion+'", POINT('+usuario.useCordinates+'))')
        return 'Usuario creado exitosamente';
}