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
router.post("/", createpfa);

router.get("/", getPfa);
router.delete("/delete", deletePFA);

router.patch("/:id", updatePFA);
router.get("/filtre", getFiltrePFA);
router.put("/attribut/:id", getSujet);
export default router;
