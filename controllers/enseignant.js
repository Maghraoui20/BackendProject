import Enseignant from "../models/enseignant.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Formation from "../models/formation.js";
import Users from "../models/users.js";

//checked

export const signupEnseignant = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    responsableforrmation,
    idformation,
    password,
  } = req.body;

  try {
    const enseignantexist = await Users.findOne({ phone });

    if (enseignantexist)
      return res.status(400).json({ message: "Enseignant existant déja !" });

    const new_user = {
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      role: "enseignant",
    };
    const userData = new Users(new_user);
    const new_user_id = await userData.save();
    const newData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      responsableforrmation: req.body.responsableforrmation,
      idUser: new_user_id._id,
      idformation: req.body.idformation,
    };
    const enseignant = new Enseignant(newData);

    // const token = jwt.sign({ phone: result.phone, id: result._id }, "test", {
    //   expiresIn: "1d",
    // });

    let tabFormations = [];
    const formations = await Formation.find({ _id: { $in: idformation } });
    formations.map(async (el) => {
      tabFormations.push(el._id);
    });
    await Formation.updateMany(
      { _id: { $in: tabFormations } },
      { $push: { idenseignant: enseignant._id } }
    );
    await Enseignant.updateOne({
      $push: { idformation: enseignant.idformation },
    });

    enseignant
      .save()
      .then((saved) => {
        res.status(200).send(saved);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(500).json({ message: "erreur " });
    console.log(error.message);
  }
};


export const createEnseignant = async (req, res) => {
  //checked
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const new_user = {
      login: req.body.login,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      role: "enseignant",
    };
    const userData = new Users(new_user);
    const new_user_id = await userData.save();
    const newData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      idUser: new_user_id._id,
      //responsableformation: req.body.responsableformation,
 
    };
    const enseignant = new Enseignant(newData);


    const saved_enseignant= await enseignant.save(enseignant);
    if (!saved_enseignant) {
      return res.status(500).send({
        message: "Some error occurred while creating the teacher.",
      });
    }
    return res.status(200).send(enseignant);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the teacher.",
    });
  }
};


//checked
export const signin = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const enseignant = await Enseignant.findOne({ phone });

    if (enseignant) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        enseignant.password
      );
      if (!isPasswordCorrect)
        return res.status(400).json({ message: "mot de passe incorrect" });
      res.status(200).json({ result: enseignant });
    }
  } catch (err) {
    res.status(500).json({ message: "il ya une erreur" });
  }
};

//checked
export const Statistiqueenseignant = async (req, res) => {
  try {
    const enseignantsCount = await Enseignant.countDocuments();
    if (enseignantsCount) {
      res.send({
        enseignantsCount: enseignantsCount,
      });
    }
  } catch (err) {
    res.status(500).send(error);
  }
};


export const findAll = async (req, res) => {
  //checked
  try {
    await Enseignant.find({}).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const findOne = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await Enseignant.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const update = (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Enseignant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Enseignant with id=${id}. Maybe Enseignant was not found!`,
        });
      } else res.send({ message: "Enseignant was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Enseignant with id=" + id,
      });
    });
};


export const deleteEnseignant = (req, res) => {
  //checked
  const id = req.params.id;

  Enseignant.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Enseignant with id=${id}. Maybe Enseignant was not found!`,
        });
      } else {
        res.send({
          message: "Enseignant was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Enseignant with id=" + id,
      });
    });
};

