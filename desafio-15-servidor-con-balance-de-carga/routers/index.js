import { Router } from 'express';

import auth from './auth.js'
import productosTest from './productosTest.js';
import info from './info.js'
import randoms from './randoms.js'

const router = Router();

router.use('/', auth);
router.use('/productos-test', productosTest);
router.use('/info', info);
router.use('/randoms', randoms);

export default router;