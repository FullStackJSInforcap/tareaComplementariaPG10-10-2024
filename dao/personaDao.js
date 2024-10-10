const conexion = require("../connection/connection")

const findAll = async () => {
    try {
        const clientBD = conexion();
        await clientBD.connect();
        const datos = await clientBD.query('SELECT * FROM personas');
        if (datos.rowCount == 0) {
            return {
                msg: 'No hay datos en la base de datos',
                status: 204,
                datos: datos.rows
            };
        }
        return {
            msg: `Los datos encontrados son ${datos.rowCount}`,
            status: 200,
            datos: datos.rows
        };
    } catch (error) {
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
}

const findById = async (id) => {
    try {
        const clientBD = conexion();
        await clientBD.connect();
        const query = {
            text: 'SELECT * FROM personas WHERE id = $1',
            values: [id]
        }
        const datos = await clientBD.query(query);
        if (datos.rowCount == 0) {
            return {
                msg: `La persona con id ${id} no existe`,
                status: 204,
                datos: datos.rows
            };
        }
        return {
            msg: `La persona con id ${id}: `,
            status: 200,
            datos: datos.rows
        };
    } catch (error) {
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
}

const insertUno = async (id, rut, nombre, apellido, correo) => {
    try {
        const clientBD = conexion();
        await clientBD.connect();
        const query = {
            text: 'INSERT INTO personas(id, rut, nombre, apellido, correo) VALUES ($1, $2, $3, $4, $5)',
            values: [id, rut, nombre, apellido, correo]
        }
        const respuestaInsert = await clientBD.query(query);
        const datos = await clientBD.query('SELECT * FROM personas');
        if (respuestaInsert.rowCount == 0) {
            return {
                msg: `El registro con id ${id} no se insertó`,
                status: 400,
                datos: datos.rows
            };
        }
        return {
            msg: `El registro con id ${id} se insertó correctamente`,
            status: 201,
            datos: datos.rows
        };
    } catch (error) {
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
}

const insertDos = async (id, rut, nombre, apellido, correo) => {
    try {
        const clientBD = conexion();
        await clientBD.connect();
        const queryId = {
            text: 'SELECT * FROM personas WHERE id = $1',
            values: [id]
        }
        const queryRut = {
            text: 'SELECT * FROM personas WHERE rut = $1',
            values: [rut]
        }
        const queryCorreo = {
            text: 'SELECT * FROM personas WHERE correo = $1',
            values: [correo]
        }
        const existeId = await clientBD.query(queryId);
        const existeRut = await clientBD.query(queryRut);
        const existeCorreo = await clientBD.query(queryCorreo);
        if (existeId.rowCount == 0 && existeRut.rowCount == 0 && existeCorreo.rowCount == 0) {
            const query = {
                text: 'INSERT INTO personas(id, rut, nombre, apellido, correo) VALUES ($1, $2, $3, $4, $5)',
                values: [id, rut, nombre, apellido, correo]
            }
            const respuestaInsert = await clientBD.query(query);
            const datos = await clientBD.query('SELECT * FROM personas');
            if(respuestaInsert.rowCount == 0){
                return {
                    msg: `La persona con id ${id} no se insertó`,
                    status: 400,
                    datos: datos.rows
                }
            }
            return {
                msg: `La persona con id ${id} se insertó correctamente`,
                status: 201,
                datos: datos.rows
            }
        } else {
            const datos = await clientBD.query('SELECT * FROM personas');
            return {
                msg: `La persona con id ${id} no se insertó correctamente, porque el id, rut o correo ya existen`,
                status: 400,
                datos: datos.rows
            }
        }
    } catch (error) {
        return {
            msg: 'Error en el servidor',
            status: 500,
            datos: []
        };
    }
}

module.exports = {
    findAll,
    findById,
    insertUno,
    insertDos
}