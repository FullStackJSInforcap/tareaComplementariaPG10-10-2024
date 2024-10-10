const { findAll, findById, insertUno, insertDos } = require("./dao/personaDao");

insertDos(9, '99999999-9', 'nombre cinco', 'apellido cinco', 'correoNueve@mail.com').then((datos) => {
    console.log(datos);
    
});