import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
import {
  findOne,
  updateAdmin,
  deleteAdmin,
  //deleteAll
} from "../controllers/administratifs.js";

import Administratifs from "../models/administratifs.js";
router.get("/getbyid/:id", findOne); // checked
router.patch("/", updateAdmin); // checked
router.delete("/deleteById/:id", deleteAdmin); // checked
//router.delete("/deleteAll", deleteAll);

// Register administratif  --> checked
router.post("/register", async (req, res) => {
  // data=req.body;
  const new_user = {
    login: req.body.login,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    role: "administratif",
  };
  const userData = new Users(new_user);
  const new_user_id = await userData.save();
  const AdministrativeData = {
    idUser: new_user_id._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  const admin = new Administratifs(AdministrativeData);
  admin
    .save()
    .then((saved) => {
      res.status(200).send(saved);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Afficher liste des administratifs --> checked
router.get("/", async (req, res) => {
  // auth --> token of directeur
  try {
    const admins = await Administratifs.find();
    res.status(200).send(admins);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Statistique administratifs  --> checked
router.get("/getcount", async (req, res) => {
  // token of directeur
  const administratifsCount = await Administratifs.countDocuments();
  if (!administratifsCount) {
    res.status(500).send(error);
  }
  res.send({
    administratifsCount: administratifsCount,
  });
});

export default router;
