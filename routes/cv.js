import express from 'express';
const router = express.Router();

import {createCv, getAllCv, getCv, getCvByIdUser, updateCv, getCVByUser} from '../controllers/cv.js';

// all are checked
router.post('/create', createCv);
router.get('/getall', getAllCv);
router.get('/getbyid/:id', getCv);
router.get('/getbyuser', getCVByUser);
router.get('/getbyiduser/:iduser', getCvByIdUser);
router.put('/update/:iduser', updateCv) // ---> params


export default router;