import express from "express";
const router = express.Router();

import {
  createpfa,
  deletePFA,
  getAllPfa,
  //getFiltrePFA,
  getPfa,
  updatepfa,
  getTechnologiesByPfaId,
  getStudentByPfaId,
  getPfaWithoutEtudiant,
  updatePfaIdEtudiant,
  getTeacherByPfaId,
  getPfaByEnseignantId,
  //getSujet,
} from "../controllers/pfa.js";

router.post("/updateidstudentinpfa/:id", updatePfaIdEtudiant);
router.get("/getpfawithoutetudiant", getPfaWithoutEtudiant);
router.get("/getpfabyenseignant/:id", getPfaByEnseignantId);
router.post("/createpfa", createpfa);
router.get("/gettechnologiebypfaid/:id", getTechnologiesByPfaId);
router.get("/getstudentbypfaid/:id", getStudentByPfaId);
router.get("/getteacherbypfaid/:id", getTeacherByPfaId);
router.get("/getpfabyid/:id", getPfa);
router.delete("/deletepfa/:id", deletePFA);
router.get("/getAllPfa", getAllPfa)
router.put("/updatepfa/:id", updatepfa);
/*router.get("/filtre", getFiltrePFA);
router.put("/attribut/:id", getSujet);*/
export default router;
