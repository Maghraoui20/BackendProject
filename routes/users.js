import express from "express";
const router = express.Router();
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Enseignants from "../models/enseignant0.js";
import Alumnis from "../models/alumnis.js";
import Etudiants from "../models/etudiants.js";
import Administratifs from "../models/administratifs.js";

//const auth = require('../middlewares/auth');
import { check, validationResult } from "express-validator";

// login user  --> checked
router.post("/signin", async (req, res) => {
  // data=req.body;
  const Administratif = await Administratifs.findOne({ phone: req.body.phone });
  const Enseignant = await Enseignants.findOne({ phone: req.body.phone });
  const Etudiant = await Etudiants.findOne({ phone: req.body.phone });
  const Alumni = await Alumnis.findOne({ phone: req.body.phone });

  if (Administratif) {
    const validPass = bcrypt.compareSync(
      req.body.password,
      Administratif.password
    );

    if (!validPass) return res.status(401).send("login or password invalid1");

    const payload = {
      _id: Administratif._id,
      login: Administratif.login,
    };
    const token = jwt.sign(payload, "123456");
    res.status(200).send({ mytoken: token, model: Administratif });
  } else if (Enseignant) {
    const validPass = bcrypt.compareSync(
      req.body.password,
      Enseignant.password
    );

    if (!validPass) return res.status(401).send("login or password invalid");

    const payload = {
      _id: Enseignant._id,
      login: Enseignant.login,
    };
    const token = jwt.sign(payload, "123456");
    res.status(200).send({ mytoken: token, model: Enseignant });
  } else if (Etudiant) {
    const validPass = bcrypt.compareSync(req.body.password, Etudiant.password);

    if (!validPass) return res.status(401).send("login or password invalid");

    const payload = {
      _id: Etudiant._id,
      login: Etudiant.login,
    };
    const token = jwt.sign(payload, "123456");
    res.status(200).send({ mytoken: token, model: Etudiant });
  } else if (Alumni) {
    const validPass = bcrypt.compareSync(req.body.password, Alumni.password);

    if (!validPass) return res.status(401).send("login or password invalid");

    const payload = {
      _id: Alumni._id,
      login: Alumni.login,
    };
    const token = jwt.sign(payload, "123456");
    res.status(200).send({ mytoken: token, model: Alumni });
  } else {
    if (!Administratif && !Enseignant && !Etudiant && !Alumni)
      return res.status(404).send("login or password invalid all");
  }
});

//LOG OUT USER  -->checked
router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// router.post(
//   "/forgotpassword",
//   [check("phone", "Please include a valid phone").isMobilePhone()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { phone } = req.body;

//     try {
//       let user = await Users.findOne({ phone });

//       if (!user) {
//         return res
//           .status(400)
//           .json({ errors: [{ msg: "Invalid Credentials" }] });
//       }
//       //generate and set reset token
//       resetToken = user.getResetPasswordToken();
//       await user.save({ validateBeforeSave: false });

//       //send reset token
//       res.status(200).json({ msg: "Reset password link sent to your phone" });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
//     }
//   }
// );
// @route   POST api/users/resetpassword
// @desc    Reset password
// @access  Public

/*
router.post('/resetpassword',
    [
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
      check('token', 'Token is required').not().isEmpty(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { password, token } = req.body;
  
      try {
        //verify token
        const decoded = jwt.verify(token, ('jwtSecret'));
        const user = await User.findById(decoded.user.id);
        if (!user) {
          return res.status(401).json({ msg: 'Token is not valid' });
        }
  
        //set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
  
        //return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );

*/

// Ajouter user (selon role) --->checked
router.post('/create', async (req, res)=>{
  //checked
  try {
    const userexist = await Users.findOne({phone: req.body.phone, email:req.body.email})
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    if (userexist) {
      res.status(400).send({ message: "User exist" });
      return;
    }else{

      const etd = new Users(req.body);
      const salt = bcrypt.genSaltSync(10);
      const cryptedPass =  bcrypt.hashSync (req.body.password, salt);
      etd.password = cryptedPass;
  
      const saved_etudiant = await etd.save(etd);
      if (!saved_etudiant) {
        return res.status(500).send({
          message: "Some error occurred while creating the Student.",
        });
      }
      return res.status(200).send(etd);
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
});

// Afficher liste des users --> checked
router.get("/getAll", async (req, res) => {
  try {
    const usrs = await Users.find();
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Statistique users  --> checked
router.get("/getcount", async (req, res) => {
  // token of directeur
  const usersCount = await Users.countDocuments();
  if (!usersCount) {
    res.status(500).send(error);
  }
  res.send({
    usersCount: usersCount,
  });
});

//module.exports = router;
export default router;
