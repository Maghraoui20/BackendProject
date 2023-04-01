import mongoose from "mongoose";
import Enseignant from "../models/enseignant0.js";
import PFA from "../models/pfa.js";
export const createpfa = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const pf = new PFA(req.body);

    const saved_PFA = await pf.save(pf);
    if (!saved_PFA) {
      return res.status(500).send({
        message: "Some error occurred while creating the Student.",
      });
    }
    return res.status(200).send(pf);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
  /*const { Description, sujet, type, technologie, nbre_etudiant, id_etudiant } =
    req.body;
  console.log(req.params.id, "parm");
  const idensengnant = req.params.id;

  const enseignant = await Enseignant.findOne({ _id: idensengnant });
  const id_enseignant = enseignant._id;
  const newpfa = new PFA({
    Description,
    type,
    sujet,
    id_enseignant,
    technologie,
    nbre_etudiant,
    id_etudiant,
  });
  try {
    await newpfa.save((err) => {
      if (err) return res.status(400).json({ message: " Error " });
    });
    res.status(200).json({ message: "pfa créer avec succès, Merci " });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("err");
  }*/
};

export const getPfa = async (req, res) => {
  //voir la liste des sujet PFA
  try {
    const listepfa = await PFA.find();

    res.status(200).json(listepfa);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePFA = async (req, res) => {
  try {
    const id = req.query.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const listepfa = await PFA.find({ _id: id });
      listepfa.map(async (el) => {
        await PFA.findByIdAndRemove(el._id);
      });
      res.json({ message: "le pfa a ete supprimer avec succés !" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const updatePFA = async (req, res) => {
  try {
    const id = req.query.id;
    const _id = id;

    const pfa = req.body;

    const updatepfa = await PFA.findByIdAndUpdate(
      _id,
      { ...pfa, _id },
      { new: true }
    );
    res.json(updatepfa);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};

export const getFiltrePFA = async (req, res) => {
  try {
    let ids_enseignant = [];
    if (req.query.idenseignant && req.query.idenseignant.length > 0) {
      console.log("in if", req.query.idenseignant);
      ids_enseignant = req.query.idenseignant;
    } else {
      const enseignant = await Enseignant.find({}, { _id: 1 });
      enseignant.map((el) => {
        //console.log(el._id);
        ids_enseignant.push(el._id);
      });
    }

    let ids_technologies = [];
    if (req.query.idtechnologie && req.query.idtechnologie.length > 0) {
      console.log("in if", req.query.idtechnologie);
      ids_technologies = req.query.idtechnologie;
    } else {
      const technologie = await Technologie.find({}, { _id: 1 });
      technologie.map((el) => {
        //console.log(el._id);
        ids_technologies.push(el._id);
      });
    }

    //let idsetudiant =[];

    const filtrepfa = await PFA.find({
      $or: [
        { id_enseignant: { $in: ids_enseignant } },
        { technologie: { $in: ids_technologies } },
        //{id_etudiant : idsetudiant},
      ],
    });
    res.status(200).json({
      filtrepfa,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getSujet = async (req, res) => {
  //checked
  //choisir un sujet PFA par un etudiant
  if (!req.body) {
    return res.status(400).send({
      message: "Data not specified",
    });
  }

  const id = req.params.id;

  PFA.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update PFA with id=${id}. Maybe PFA was not found!`,
        });
      } else res.send({ message: "PFA was updated and given successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PFA with id=" + id,
      });
    });
};
