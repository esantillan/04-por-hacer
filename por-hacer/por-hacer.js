const fs = require('fs');
const path = require('path');
// const os = require("os"); //para obtener el salto de línea de la plataforma
const path_db = 'db' + path.sep + 'data.json';

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(path_db, data, (err) => {
        if (err) {
            console.log('Error al crear el archivo');
            throw new Error(err.message);
        } else {
            console.log('Información guardada correctamente');
        }

    });

}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = (inlcuirCompletados = true) => {
    cargarDB();

    console.log(`Recibí como "inlcuirCompletados" [${inlcuirCompletados}]`);

    if (inlcuirCompletados === true) {
        console.log("Devuelvo todo");
        return listadoPorHacer;
    } else {
        return listadoPorHacer.filter(tarea => tarea.completado === false);
    }
}


const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // let tarea = listadoPorHacer.find(tarea => tarea.descripcion === descripcion);

    // if (tarea) {
    //     console.log(`Se encontró [${tarea.descripcion}]`);
    //     tarea.completado = true;
    //     guardarDB();
    // } else {
    //     console.log("no se encontró la tarea");
    // }

    // return tarea;
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListadoPorHacer = listadoPorHacer.filter((tarea) => {
        return tarea.descripcion.toLowerCase() !== descripcion.toLowerCase();
    });

    let modificado = nuevoListadoPorHacer.length !== listadoPorHacer.length;

    listadoPorHacer = nuevoListadoPorHacer;
    guardarDB();

    return modificado;
}

// const borrar = (descripcion) => {
//     cargarDB();
//     let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

//     if (index >= 0) {
//         listadoPorHacer.splice(index, 1);
//         guardarDB();
//         return true;
//     } else {
//         return false;
//     }
// }

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};