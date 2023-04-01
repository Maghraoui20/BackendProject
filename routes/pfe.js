import express from 'express';
const router = express.Router();

import {createPfe, deletePFE, getPfe} from '../controllers/pfe.js';
router.post('/:id', createPfe);
router.get('/', getPfe );
router.delete('/delete',deletePFE);



export default router;