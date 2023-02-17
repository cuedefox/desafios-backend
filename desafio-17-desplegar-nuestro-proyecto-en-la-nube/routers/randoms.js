import { Router } from "express";
import { fork } from 'child_process'

import logger from '../logger.js'

const router = Router();

router.get('/', (req, res) => {
    let { query: { cant } } = req;
    if (!cant) {
        cant = 100000000;
    }

    // const child = fork('randomGenerator.js')

    // child.on('message', (msg) => {
    //     if (msg === 'ready') {
    //         return child.send(cant);
    //     }
    //     logger.info(`Ruta ${req.originalUrl} metodo GET`);
    //     res.json(msg);
    // })

    let numeros = {};
    for (let i = 0; i < cant; i ++) {
        let num = generador(1, 10);
        if (!numeros[num]) {
            numeros[num] = 0;
        }
        numeros[num] = numeros[num] + 1;
    }
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    res.json(numeros);
})

function generador (inicio, fin) {
    return Math.floor(Math.random() * (fin - inicio + 1) + inicio);
}

export default router;