import express from "express";
const router = express.Router();

import { findAll, create } from "../controllers/stageete.controller.js";

router.get("/getAll", findAll);
router.post("/create", create);
export default router;
