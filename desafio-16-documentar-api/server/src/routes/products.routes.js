import { Router } from "express";
import {
    getProductsControllers,
    addProductControllers,
    getProductByIdControllers,
    updateProductByIdControllers,
    deleteProductByIdControllers
} from '../controllers/products.controller.js';
import { authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/', getProductsControllers);

router.post('/', authAdmin, addProductControllers);

router.get('/:pid', getProductByIdControllers);

router.put('/:pid', authAdmin, updateProductByIdControllers)

router.delete('/:pid', authAdmin, deleteProductByIdControllers);

export default router;
