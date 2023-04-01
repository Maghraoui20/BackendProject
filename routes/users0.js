import express from "express";
const router = express.Router();

import {
  create,
  findAll,
  findOne,
  update,
  deleteUser,

} from "../controllers/users.js";

router.post("/create", create);
//router.post("/importExcel", importExcel);

router.get("/getAll", findAll);
router.get("/getbyid/:id", findOne);

router.put("/updatebyid/:id", update);
//router.put("/updatepost/:id", updatePost);

router.delete("/deletebyid/:id", deleteUser);

//router.delete("/deleteAll", deleteAll);

//router.get("/finCond?:phone", findAllCond);

export default router;
