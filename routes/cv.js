import express from 'express';
const router = express.Router();

import {createCv, getAllCv, getCv, updateCv} from '../controllers/cv.js';

// all are checked
router.post('/create', createCv);
router.get('/getall', getAllCv);
router.get('/getbyid/:id', getCv);
router.put('/update/:id', updateCv) // ---> params


export default router;