const { Pool } = require('pg');

const conexion = () => {
    const pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'root',
        database: 'personas'
    });
    return pool;
}

module.exports = conexion;