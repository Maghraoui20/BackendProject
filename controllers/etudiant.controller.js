import Etudiant from "../models/etudiants.js";
import csvtojson from "csvtojson";
import Users from "../models/users.js";

export const create = async (req, res) => {
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
      role: "etudiant",
    };
    const userData = new Users(new_user);
    const new_user_id = await userData.save();
    const newData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      idUser: new_user_id._id,
      Birth_date: req.body.Birth_date,
      Cv: req.body.cv,
      depot: req.body.depot,
      niveau: req.body.niveau,
      classe: req.body.classe,
      status: req.body.status,
    };
    const etd = new Etudiant(newData);

    //const etd = new Etudiant(req.body);

    const saved_etudiant = await etd.save(etd);
    if (!saved_etudiant) {
      return res.status(500).send({
        message: "Some error occurred while creating the Student.",
      });
    }
    return res.status(200).send(etd);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
  }
};

export const findAll = async (req, res) => {
  //checked
  try {
    await Etudiant.find({}).then((result) => {
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
    await Etudiant.findById(id).then((result) => {
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

  Etudiant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
};

export const deleteEt = (req, res) => {
  //checked
  const id = req.params.id;

  Etudiant.findByIdAndRemove(id)
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
};

export const deleteAll = (req, res) => {
  //checked
  Etudiant.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Etudiants were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Etudiants.",
      });
    });
};
export const findAllCond = (req, res) => {
  //checked
  const phone = req.query.phone;
  var condition = phone
    ? { phone: { $regex: new RegExp(phone), $options: "i" } }
    : {};

  Etudiant.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Etudiants.",
      });
    });
};
export const importExcel = async (req, res) => {
  //checked
  csvtojson()
    .fromFile(req.body.url)
    .then((csvData) => {
      console.log(csvData);
   
  Users.insertMany(csvData)
        .then(function () {
          console.log("Data inserted"); //success
          res.json({ success: "success" });
        })
        .catch(function (error) {
          console.log(error); //failure
        });
    });
};
export const updatePost = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Etudiant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Etudiant with id=${id}. Maybe Etudiant was not found!`,
        });
      } else res.send({ message: "Etudiant Job was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Etudiant with id=" + id,
      });
    });
};
