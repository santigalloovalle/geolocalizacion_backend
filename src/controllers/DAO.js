import pool from '../database.js'

const DAO = async(cordinates)=>{
    // res.json(newUsuario);
    const [data] = await pool.query('CALL buscarUsuarios('+cordinates+')');
    return data;
}

export {
    DAO
};
