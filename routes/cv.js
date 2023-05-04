import express from 'express';
const router = express.Router();

import {createCv, getAllCv, getCv, getCvByUserId,getcvbyuserr,CreateC, updateCv} from '../controllers/cv.js';
import Users from '../models/users.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
// all are checked
router.post('/create', createCv);
router.get('/getall', getAllCv);
router.get('/getbyid/:id', getCv);
router.get('/getbyiduser/:id', getCvByUserId);
router.put('/update/:id', updateCv) // ---> params


router.post(
    "/createcc",
  CreateC
  );
  
  router.get("/get_cv_by_user", getcvbyuserr);
export default router;