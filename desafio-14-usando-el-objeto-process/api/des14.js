console.log('process.argv', process.argv); //[0] ruta de node, [1] ruta de ejecucion

process.argv.slice(2) //evito los primeros 2

//Minimist

import minimist from 'minimist';

// const params = minimist(process.argv.slice(2))

console.log('params', params);

const opts = {
    default: {
        p: 8080,
    },
    alias: {
        p: 'PORT',
    }
}

const params = minimist(process.argv.slice(2), opts);

console.log('params', params);

console.log(`Directorio actual de trabajo: ${process.cwd()}`);
console.log(`Id del proceso: ${process.pid}`);
console.log(`Version de Node: ${process.version}`);
console.log(`Titulo del proceso: ${process.title}`);
console.log(`Sistema operativo: ${process.platform}`);
console.log(`Directorio de ejecución: ${process.execPath}`);
console.log(`Uso de de la memoria: ${JSON.stringify(process.memoryUsage(), null, 2)}`);