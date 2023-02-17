import { Router } from "express";
import { faker } from '@faker-js/faker/locale/es_MX'

import productosAPIMock from "../api/productosAPIMock.js";
import logger from '../logger.js'

const router = Router();
const productosFakeMock = new productosAPIMock;

const { commerce, image } = faker;

export function generarProductosFake() {
    return {
        nombre: commerce.product(), 
        precio: parseInt(commerce.price()),
        foto: image.avatar(),
    }
}

router.get('/', (req, res) => {
    const productos = productosFakeMock.listarAll();
    res.status(200).json(productos);
})

router.get('/:id', (req, res) => {
    const producto = productosFakeMock.listar(req.params.id);
    if (producto) {
        res.status(200).json(producto);
    } else {
        res.status(404).json({ error : 'producto no encontrado' })
    }
})

router.post('/', (req, res) => {
    try {
        logger.info(`Ruta ${req.originalUrl} metodo POST`);
        const productos = productosFakeMock.crearObjetos(5);
        res.status(201).json(productos);
    } catch (error) {
        logger.error(error.message);
    }
})

router.put('/:id', (req, res) => {
    const producto = productosFakeMock.actualizar(req.params.id, req);
    if (producto) { 
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'producto no encontrado' })
    )
})

router.delete('/:id', (req, res) => {
    const producto = productosFakeMock.borrar(req.params.id);
    if (producto) {
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'producto no encontrado' })
    )
})

export default router;