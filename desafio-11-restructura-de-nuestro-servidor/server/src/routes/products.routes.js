import { Router } from "express";
import {
    getProductsControllers,
    addProductControllers,
    getProductByIdControllers,
    updateProductByIdControllers,
    deleteProductByIdControllers
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getProductsControllers);

router.post('/', addProductControllers);

router.get('/:pid', getProductByIdControllers);

router.put('/:pid', updateProductByIdControllers)

router.delete('/:pid', deleteProductByIdControllers);

export default router;
