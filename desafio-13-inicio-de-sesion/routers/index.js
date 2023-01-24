import { Router } from 'express';

import auth from './auth.js'
import productosTest from './productosTest.js';

const router = Router();

router.use('/', auth);
router.use('/productos-test', productosTest);

export default router;