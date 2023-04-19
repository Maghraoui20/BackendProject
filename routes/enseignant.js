import express from 'express';
const router = express.Router();

import {signupEnseignant,signin, Statistiqueenseignant,getEnseignant, deleteEnseignant, updateEnseignant, listeAlumnis} from '../controllers/enseignant.js';

// all are checked
router.post('/signup', signupEnseignant);
router.get('/', getEnseignant ); 
router.delete('/delete',deleteEnseignant);
router.get('/listverifAlumni',listeAlumnis);
router.patch('/', updateEnseignant);

router.post('/signin', signin);
router.get('/getcount', Statistiqueenseignant );

export default router;