import express from "express";
const router = express.Router();

import {
  findAll,
  create,
  getalumnipays,
  update,
  findOne,
  findAllA,
  getStatus,
  getAlumniStatistics
} from "../controllers/alumni.js";

router.get("/getAll", findAll); //-->checked
router.post("/create", create);
router.get("/getAllA", findAll);
router.put("/updatebyid/:id", update);
router.get("/getbyid/:id", findOne);
router.get("/getalumnipays", getalumnipays); // ---> checked
router.get("/check/:code", getStatus);


export default router;
