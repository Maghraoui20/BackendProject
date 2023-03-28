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
    const enseignatexist = await Users.findOne({ phone });

    if (enseignatexist)
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

//checked
export const updateEnseignant = async (req, res) => {
  try {
    const id = req.query.id;
    const _id = id;

    const enseignant = req.body;

    const updateEnseignant = await Enseignant.findByIdAndUpdate(
      _id,
      { ...enseignant, _id },
      { new: true }
    );
    res.json(updateEnseignant);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

//checked
export const getEnseignant = async (req, res) => {
  //checked
  try {
    const enseignant = await Enseignant.find();

    res.status(200).json(enseignant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//checked
export const deleteEnseignant = async (req, res) => {
  try {
    const id = req.query.id;
    const enseignant = await Enseignant.find({ _id: { $in: id } });
    enseignant.map(async (el) => {
      await Enseignant.findByIdAndRemove(el._id);
    });

    res.json({ message: "l'enseignant a ete supprimer avec succés !" });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
