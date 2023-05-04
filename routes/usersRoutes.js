import express from 'express';
const router = express.Router();

import {

create ,
Login,
GetUserByToken,
getUserbyId,
findAllEnseignant
  
  } from "../controllers/usersController.js";

  import {
   isEnseignant,
   isSuperadmin  ,
   isUser
      } from "../middlewares/verifytoken.js";
import Users from '../models/users.js';
import { acceptee, listAlumnis, reportAlumnis } from '../controllers/enseignant.js';

router.post('/', Login);

// ################## get user by token API
router.get(
    "/get_user_by_token",
    isUser,
    GetUserByToken
  );

router.post('/createuserbyadmin/', isSuperadmin, create);

router.get("/getAllEtudiant", isSuperadmin, async (req, res) => {
    try {
      const usrs = await Users.find({ role: "etudiant" });
      res.status(200).send(usrs);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.get("/getAllEnseignant",isSuperadmin, findAllEnseignant);

router.get("/getbyid/:id", isSuperadmin,async (req, res) => {
    const id = req.params.id;
  
    try {
      const usrs = await Users.findById(id);
      res.status(200).send(usrs);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.put("/updatebyid/:id",isSuperadmin, async (req, res) => {
    //checked
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
  
    const id = req.params.id;
  
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
          });
        } else res.send({ message: "user was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating user with id=" + id,
        });
      });
  });

router.delete("/deletebyid/:id", isSuperadmin,async (req, res) => {
    const id = req.params.id;
  
    Users.findByIdAndRemove(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`,
          });
        } else {
          res.send({
            message: "user was deleted successfully!",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete user with id=" + id,
        });
      });
  });
router.get("/lists", isEnseignant,listAlumnis);

router.post("/acceptAlumni/:id",isEnseignant, acceptee);

router.put("/report/:id", isEnseignant,reportAlumnis);

router.get('/getuserbyid', isUser, getUserbyId)
export default router;