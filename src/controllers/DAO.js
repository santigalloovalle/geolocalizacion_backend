import pool from '../database.js'

export const DAO = async(cordinates)=>{
    // res.json(newUsuario);
    const [data] = await pool.query('SELECT users.useNombre, users.useApellido, users.useDocumento, users.useDireccion, users.useCoordinates, ST_Distance_Sphere(useCoordinates, POINT('+cordinates+')) AS distances from users ORDER BY distances ASC');
    return data;
}
