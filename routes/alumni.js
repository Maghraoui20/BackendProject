import express from "express";
const router = express.Router();

import {
  findAll,
  create,
  getalumnipays,
  update,
  findOne,
  findAllA,
} from "../controllers/alumni.js";

router.get("/getAll", findAll); //-->checked
router.post("/create", create);
router.get("/getAllA", findAll);
router.put("/updatebyid/:id", update);
router.get("/getbyid/:id", findOne);
router.get("/getalumnipays", getalumnipays); // ---> checked

export default router;
