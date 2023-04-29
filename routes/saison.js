import Saison from "../models/saison.js";
import express from "express";
const router = express.Router();
router.post("/createSaison", async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
        }
    
        const saison = new Saison(req.body);
    
        const saved_saison= await saison.save(saison);
        if (!saved_saison) {
          return res.status(500).send({
            message: "Some error occurred while creating the Intership.",
          });
        }
        return res.status(200).send(saison);
      } catch (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Intership.",
        });
      }
   
  });

  export default router;
