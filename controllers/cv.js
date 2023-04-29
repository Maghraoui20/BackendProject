import Cv from "../models/cv.js";
//checked
export const createCv = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const cv = new Cv(req.body);

    const saved_Cv = await cv.save(cv);
    if (!saved_Cv) {
      return res.status(500).send({
        message: "Some error occurred while creating the CV.",
      });
    }
    return res.status(200).send(cv);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the CV.",
    });
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

export const getCvByUserId = async (req, res) => {

  const idstudent = req.params.iduser;
  try {
    await Cv.find(idstudent).then((result) => {
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

  const idstudent = req.params.iduser;

  Cv.findOneAndUpdate(idstudent, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Cv with id=${idstudent}. Maybe Cv was not found!`,
        });
      } else res.send({ message: "Cv was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cv with id=" + idstudent,
      });
    });
};
