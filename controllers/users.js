import Users from "../models/users.js";
import csvtojson from "csvtojson";
import bcrypt from 'bcrypt';



export const create = async (req, res) => {
  //checked
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    const user = new Users(req.body)
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass =  bcrypt.hashSync (req.body.password, salt);
    user.password = cryptedPass;

    const saved_user = await user.save(user);
    if (!saved_user) {
      return res.status(500).send({
        message: "Some error occurred while creating the teacher.",
      });
    }
    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the teacher.",
    });
  }
};

export const findAll = async (req, res) => {
  //checked
  try {
    await Users.find({role : "enseignant"}).then((result) => {
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
    await Users.findById(id).then((result) => {
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

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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


export const deleteUser = (req, res) => {
  //checked
  const id = req.params.id;

  Users.findByIdAndRemove(id)
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

export const deleteAll = (req, res) => {
  //checked
  Users.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Enseignants were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Enseignants.",
      });
    });
};

