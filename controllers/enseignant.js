import Enseignant from "../models/enseignant.js";
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

    const enseignant = new Enseignant(req.body)
    const salt = bcrypt.genSaltSync(10);
    const cryptedPass =  bcrypt.hashSync (req.body.password, salt);
    enseignant.password = cryptedPass;

    const saved_enseignant = await enseignant.save(enseignant);
    if (!saved_enseignant) {
      return res.status(500).send({
        message: "Some error occurred while creating the Student.",
      });
    }
    return res.status(200).send(enseignant);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Student.",
    });
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

export const deleteAll = (req, res) => {
  //checked
  Enseignant.deleteMany({})
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
export const findAllCond = (req, res) => {
  //checked
  const phone = req.query.phone;
  var condition = phone
    ? { phone: { $regex: new RegExp(phone), $options: "i" } }
    : {};

  Enseignant.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving enseignants.",
      });
    });
};
export const importExcel = async (req, res) => {
  //checked
  csvtojson()
    .fromFile(req.body.url)
    .then((csvData) => {
      console.log(csvData);
      Enseignant.insertMany(csvData)
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

  Enseignant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Enseignant with id=${id}. Maybe Enseignant was not found!`,
        });
      } else res.send({ message: "Enseignant Job was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Enseignant with id=" + id,
      });
    });
};

// login Enseignant -->checked
export const signin = async (req, res) => {
  // data=req.body;
  const enseignant = await Enseignants.findOne({phone: req.body.phone})
  if(!enseignant){
  res.status(404).send('login or password invalid')
  }else{
  const   validPass = bcrypt.compareSync(req.body.password , enseignant.password)
  
  if(!validPass){
     res.status(401).send('login or password invalid')
  }else{
    const payload = {
         _id: admin._id,
         login: enseignant.login
     }
    const token = jwt.sign(payload, '123456')
     res.status(200).send({success:true, mytoken: token , model: enseignant,
     })
  }
  }
  }