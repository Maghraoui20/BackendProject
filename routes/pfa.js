import express from "express";
const router = express.Router();

import {
  createpfa,
  deletePFA,
  getFiltrePFA,
  getPfa,
  updatePFA,
  getSujet,
} from "../controllers/pfa.js";

router.post("/createpfa", createpfa);

router.get("/getpfabyid/:id", getPfa);
router.delete("/deletepfa", deletePFA);

router.patch("/updatepfa/:id", updatePFA);
router.get("/filtre", getFiltrePFA);
router.put("/attribut/:id", getSujet);
export default router;
