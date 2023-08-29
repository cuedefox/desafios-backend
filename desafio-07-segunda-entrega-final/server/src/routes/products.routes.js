import { Router } from "express";
import ProductManager from "../services/db/product.service.js";
import { getIO } from "../app.js";

const router = Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, query, category, availability } = req.query;

        const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
        };
        
        const optionsQuery = {};
        
        if (query) {
            optionsQuery.title = { $regex: new RegExp(query, "i") };
        }
        
        if (category) {
            optionsQuery.category = category;
        }
        
        const availabilityMap = {
            available: true,
            unavailable: false,
        };
        
        if (availability in availabilityMap) {
            optionsQuery.status = availabilityMap[availability];
        }
        
        const sortMap = {
            asc: 1,
            desc: -1,
        };
        
        if (sort in sortMap) {
            options.sort = { price: sortMap[sort] };
        }
        
        const result = await manager.getProducts(optionsQuery, options);
        
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
});

router.post('/', async (req, res) => {
    try {
        let productToAdd = req.body;
        if (!('status' in productToAdd)) {
            productToAdd.status = true;
        }
        let status = await manager.addProduct(productToAdd);
        const io = getIO();
        io.emit('newProduct', status.product);
        res.status(status.code).json({status: status.status})
    } catch (error) {
        res.status(500).json({ error: `Ocurrió un error en el servidor: ${error}` });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(pid);
    if(product) {
        res.send({status: "success", payload: product });
    } else {
        res.status(404).json({'error': 'Producto no encontrado'});
    }
});

router.put('/:pid', async (req, res) => {
    const {pid} = req.params;
    let productToUpdate = req.body;
    let status = await manager.updateProduct(pid, productToUpdate);
    res.status(status.code).json({status: status.status});
})

router.delete('/:pid', async (req, res) => {
  const { pid } = req.params;
  const status = await manager.deleteProductById(pid);
  const io = getIO();
  io.emit('deleteProduct', pid);
  res.status(status.code).json({ status: status.status });
});

export default router;
