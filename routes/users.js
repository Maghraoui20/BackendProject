import express from "express";
const router = express.Router();
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {

  importExcel
} from "../controllers/etudiant.controller.js";
//const auth = require('../middlewares/auth');
import { check, validationResult } from "express-validator";

// login user  --> checked
router.post("/signin", async (req, res) => {
  // data=req.body;

  const users = await Users.findOne({ phone: req.body.phone });

  if (users) {
    const validPass = bcrypt.compareSync(req.body.password, users.password);

    if (!validPass) return res.status(401).send("login or password invalid1");

    const payload = {
      _id: users._id,
      login: users.login,
    };
    const token = jwt.sign(payload, "123456");
    res.status(200).send({ mytoken: token, model: users });
  } else {
    if (!users) return res.status(404).send("login or password invalid all");
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

/*
router.post( '/forgotpassword',
    [
      check('phone', 'Please include a valid phone').isMobilePhone(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { phone } = req.body;
  
      try {
        let user = await Users.findOne({ phone });

        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        //generate and set reset token
         resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });
  
        //send reset token
        res.status(200).json({ msg: 'Reset password link sent to your phone' });
  
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );


  */
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

/* // Ajouter user (selon role) --->checked
router.post('/create', async (req, res)=>{
    try{
   
        //data=req.body;
       const usr = new Users (req.body);
       const password=req.body.password;
       const hashedpassword =  bcrypt.hashSync(password, 12);
       const result = await Users.create({
    
        usr,
        password: hashedpassword});

      console.log(result);
        res.status(200).send(result)
    } catch(error){
        res.status(400).send(error)
    }
               
       
    }) */

router.post("/create", async (req, res) => {
  //checked
  try {
    const userexist = await Users.findOne({
      phone: req.body.phone,
      email: req.body.email,
    });
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    if (userexist) {
      res.status(400).send({ message: "User exist" });
      return;
    } else {
      const etd = new Users(req.body);
      const salt = bcrypt.genSaltSync(10);
      const cryptedPass = bcrypt.hashSync(req.body.password, salt);
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

router.put("/updatebyid/:id", async (req, res) => {
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
          message: `Cannot update Etudiant with id=${id}. Maybe Etudiant was not found!`,
        });
      } else res.send({ message: "Etudiant was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Etudiant with id=" + id,
      });
    });
});
router.put("/update/:id", async (req, res) => {
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
router.delete("/deletebyid/:id", async (req, res) => {
  const id = req.params.id;

  Users.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Etudiant with id=${id}. Maybe Etudiant was not found!`,
        });
      } else {
        res.send({
          message: "Etudiant was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Etudiant with id=" + id,
      });
    });
});

router.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const usrs = await Users.findById(id);
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/findol/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const usrs = await Users.findById(id);
    if (usrs.demande === false) {
      res.status(200).send("non validé");
    } else if (usrs.demande === true) {
      res.status(200).send("validé");
    } else {
      res.status(401).send("pas alumni");
    }
  } catch (error) {
    res.status(400).send(error);
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
// Afficher liste des etudiants --> checked
router.get("/getAllEtudiant", async (req, res) => {
  try {
    const usrs = await Users.find({ role: "etudiant" });
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
router.get("/findAllA", async (req, res) => {
  //checked
  try {
    await Users.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/find", async (req, res) => {
  const id = req.params.id;

  try {
    const usrs = await Users.findById(id);
    res.status(200).send(usrs);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/importExcel", importExcel);


//module.exports = router;
export default router;
