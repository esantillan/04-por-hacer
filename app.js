const argv = require('./config/yargs').argv;
const colors = require('colors');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];



colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});






switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = porHacer.getListado();

        for (const tarea of listado) {
            console.log('<Por-Hacer>'.green);
            console.log('<Descripcion>', tarea.descripcion, '</Descripcion>');
            console.log('<Estado>', tarea.completado, '</Estado>');
            console.log('</Por-Hacer>'.green);
        }

        break;
    case 'actualizar':
        let acutalizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(acutalizado);
        break;
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando desconocido');
        break;
}

// console.log(argv);