import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const manager = new ProductManager('../data/products.json');

router.get('/', async (req, res) => {
    try {
      const limit = req.query.limit;
      let products = await manager.getProducts();
      console.log(products)
  
      if (limit) {
        let newProducts = products.slice(0, limit);
        products = newProducts;
      }
  
      res.json({ products });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error en el servidor' });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(parseInt(pid));
    console.log(product);
    if(product) {
        res.json({product});
    }else {
        res.status(404).json({'error': 'Producto no encontrado'});
    }
});

export default router;