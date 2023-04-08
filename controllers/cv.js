import Cv from "../models/cv.js";
//checked
export const createCv = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    Birth_date,
    niveau,
    classe,
    adresse,
    bio,
    experience,
    stage,
    email,
    photo,
    iduser,
  } = req.body;

  const newCv = new Cv({
    firstname,
    lastname,
    phone,
    Birth_date,
    niveau,
    classe,
    adresse,
    bio,
    experience,
    stage,
    email,
    photo,
    iduser,
  });
  try {
    await newCv.save((err) => {
      if (err) return res.status(400).json({ message: " Error " });
    });
    res.status(200).json({ message: "Votre Cv a été créé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//checked
export const getAllCv = async (req, res) => {
  try {
    const cv = await Cv.find();

    res.status(200).json(cv);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCv = async (req, res) => {
  //checked
  const id = req.params.id;

  try {
    await Cv.findById(id).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};

//checked
export const updateCv = (req, res) => {
  //checked
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Cv.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cv with id=${id}. Maybe Cv was not found!`,
        });
      } else res.send({ message: "Cv was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cv with id=" + id,
      });
    });
};
