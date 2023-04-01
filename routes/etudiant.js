import express from "express";
const router = express.Router();

import {
  create,
  findAll,
  findOne,
  update,
  updatePost,
  deleteEt,
  deleteAll,
  findAllCond,
  importExcel,
  signin,
} from "../controllers/etudiant.controller.js";

router.post("/create", create);
router.post("/importExcel", importExcel);

router.get("/getAll", findAll);
router.get("/getbyid/:id", findOne);

router.put("/updatebyid/:id", update);
router.put("/updatepost/:id", updatePost);

router.delete("/deletebyid/:id", deleteEt);

router.delete("/deleteAll", deleteAll);
router.post("/signin", signin);
router.get("/finCond?:phone", findAllCond);

export default router;
