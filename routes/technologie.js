import express from "express";
const router = express.Router();

import {
  CreateTechnologie,
  GetAllTechnologies,
} from "../controllers/technologie.js";

router.post("/createtechnologie", CreateTechnologie);

router.get("/getAllTechnologies", GetAllTechnologies);

export default router;
