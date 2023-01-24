import { Router } from "express";
import { faker } from '@faker-js/faker/locale/es_MX'
import productosAPIMock from "../api/productosAPIMock.js";

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
        res.status(404).json({ error : 'product not found' })
    }
})

router.post('/', (req, res) => {
    const productos = productosFakeMock.crearObjetos(5);
    res.status(201).json(productos);
})

router.put('/:id', (req, res) => {
    const producto = productosFakeMock.actualizar(req.params.id, req);
    if (producto) { 
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'product not found' })
    )
})

router.delete('/:id', (req, res) => {
    const producto = productosFakeMock.borrar(req.params.id);
    if (producto) {
        res.status(204).end();
    } else (
        res.status(404).json({ error : 'product not found' })
    )
})

export default router;