import { Router } from "express";
import minimist from 'minimist';
import os from 'os'
import compression from "compression";

import logger from '../logger.js'

const router = Router();

router.get('/', compression(), (req, res) => {
    const info = {
        cpus: os.cpus().length,
        arguments: JSON.stringify(minimist(process.argv.slice(2).map((arg, i) => (i, arg)))),
        path: `${process.argv[0]}`,
        so: process.platform,
        processId: process.pid,
        nodeVer: process.version,
        folder: process.cwd(),
        rss: process.memoryUsage().rss,
    }
    logger.info(`Ruta ${req.originalUrl} metodo GET`);
    console.log(info);
    res.render('info', { layout: 'main' , info: info});
})

export default router;