import { Router } from "express";
import { fork } from 'child_process'

const router = Router();

router.get('/', (req, res) => {
    let { query: { cant } } = req;
    if (!cant) {
        cant = 100000000;
    }

    const child = fork('randomGenerator.js')

    child.on('message', (msg) => {
        if (msg === 'ready') {
            return child.send(cant);
        }
        res.json(msg);
    })
})

export default router;