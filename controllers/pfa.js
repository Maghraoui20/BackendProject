import mongoose from "mongoose";
import axios from 'axios';
import Users from "../models/users.js";
import PFA from "../models/pfa.js";
import Technologie from "../models/technologie.js"

export const saveTechnologies = async (technologies) => {
  const technologyIds = [];
  for (const element of technologies) {
    const existTechnologie = await Technologie.findOne({ title: element });
    if (existTechnologie) {
      technologyIds.push(existTechnologie._id);
    } else {
      const newTechnologie = new Technologie({
        title: element,
      });
      const createdTechnologie = await newTechnologie.save();
      // technologyIds.push(createdTechnologie._id);
    }
  }
  return technologyIds;
};



export const createpfa = async (req, res) => {
  try {
    const {
      sujet,
      titre,
      nbre_etudiant,
      Description,
      technologies,
      id_enseignant,
      id_etudiant,
    } = req.body;

    const technologyIds = await saveTechnologies(technologies);

    const newPfa = new PFA({
      sujet: sujet,
      titre: titre,
      nbre_etudiant: nbre_etudiant,
      Description: Description,
      technologies: technologyIds,
      id_enseignant: id_enseignant,
      id_etudiant: id_etudiant,
    });

    const createdPfa = await newPfa.save();
    return res.status(200).json({
      Message: "PFA created sucessfully",
      Success: true,
      data: createdPfa,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      Message: "Error creating PFA",
      Success: false,
      Error: error.message,
    });
  }
};



/*  

    const pf = new PFA(req.body);

    const saved_PFA = await pf.save(pf);
    if (!saved_PFA) {
      return res.status(500).send({
        message: "Some error occurred while creating the PFA.",
      });
    }
    return res.status(200).send(pf);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the PFA.",
    });
  } */
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

export const getPfa = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await PFA.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllPfa = async (req, res) => {
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
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  
  PFA.findByIdAndUpdate({ id }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update pfa with id=${id}. Maybe pfa was not found!`,
        });
      } else res.send({ message: "PFA was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating PFA with id=" + id,
      });
    });
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
