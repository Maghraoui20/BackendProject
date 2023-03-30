import express from 'express';
const router = express.Router();

import {signupEnseignant,signin, Statistiqueenseignant, deleteEnseignant , findAll,findOne,update} from '../controllers/enseignant.js';

// all are checked
router.post('/signup', signupEnseignant);

router.get("/getAll", findAll);
router.get("/getbyid/:id", findOne);

router.put("/updatebyid/:id", update);
router.delete("/deletebyid/:id", deleteEnseignant);


router.post('/signin', signin);
router.get('/getcount', Statistiqueenseignant );

export default router;