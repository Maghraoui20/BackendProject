import express from "express";
const router = express.Router();



import { findAll, create , getalumnipays} from "../controllers/alumni.js";


router.get("/getAll", findAll); //-->checked
router.post("/create", create);
router.get("/getalumnipays", getalumnipays); // ---> checked


 
export default router;
