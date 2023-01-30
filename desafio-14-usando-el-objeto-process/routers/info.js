import { Router } from "express";
import minimist from 'minimist';

const router = Router();

router.get('/', (req, res) => {
    const info = {
        arguments: JSON.stringify(minimist(process.argv.slice(2).map((arg, i) => (i, arg)))),
        path: `${process.argv[0]}`,
        so: process.platform,
        processId: process.pid,
        nodeVer: process.version,
        folder: process.cwd(),
        rss: process.memoryUsage().rss,
    }
    res.render('info', { layout: 'main' , info: info});
})

export default router;