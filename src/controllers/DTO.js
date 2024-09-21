import pool from '../database.js'

const DTO = async(usuario)=>{
    // res.json(newUsuario);
    await pool.query('CALL crearUsuarios("'+usuario.useNombre+'", "'+usuario.useApellido+'", '+usuario.useDocumento+', "'+usuario.useDireccion+'", "'+usuario.useCoordY+'", "'+usuario. useCoordX+'")')
}

export {
    DTO
}