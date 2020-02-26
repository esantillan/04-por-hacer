const descripcion = {
    demand: true,
    alias: 'd',
    type: 'string',
    description: 'Descripcion que tendrá la tarea'
};
const completado = {
    alias: 'c',
    type: 'boolean',
    default: true,
    desc: 'Marca como completado o pendiente la tarea'
};

const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', {
        descripcion

    })
    .command('borrar', 'Borra una tarea', {
        descripcion

    })
    .command('actualizar', 'Actualiza el estado completado de una tarea por hacer', {
        descripcion,
        completado
    })
    .command('listar', 'Muestra las tareas por hacer', {})
    .help()
    .argv;

module.exports = {
    argv
}