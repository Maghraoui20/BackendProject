import Alumni from "../models/alumnis.js";
import Users from "../models/users.js";
import { UniqueString } from "unique-string-generator";
import sendEmail from "../utils/sendEmail.js";

export const findAll = async (req, res) => {
  try {
    Alumni.aggregate([
      {
        $lookup: {
          from: "etudiants",
          localField: "cin",
          foreignField: "cin",
          as: "alumnidetails",
        },
      },
    ]).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
};
export const create = async (req, res) => {
  try {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const body = {
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
      "login": req.body.login,    
      "password": req.body.password,
      "email": req.body.email,
      "phone": req.body.phone,
      "Birth_date":req.body.Birth_date,
      "Cv": req.body.cv,
      "pays": req.body.pays,
      "societe": req.body.societe,
      "promotion": req.body.promotion,    
      "date_diplome": req.body.date_diplome,
      "date_embauche": req.body.date_embauche,
      "demande": false,
      "report": false,
      "code":UniqueString(),
    }

    const alum = new Alumni(body);
    
    const saved_alumni = await alum.save(alum);
    const mail = "Bonjour "+ body.firstname +", votre code compte alumni est : " + body.code; 
    await sendEmail(body.email, "Votre code compte Alumni", mail);
    if (!saved_alumni) {
      return res.status(500).send({
        message: "Some error occurred while creating the Alumni.",
      });
    }
    return res.status(200).send(alum);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Alumni.",
    });
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
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else res.send({ message: "user was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};
export const findAllA = async (req, res) => {
  //checked
  try {
    await Users.find({}).then((result) => {
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
export const getStatus = async (req, res) => { 
  const code = req.params.code;

  try {
    await Alumni.findOne({"code": code}).then((result) => {
      if (result.demande === false){
        res.send({ message: "Dossier pas encore accepté" });
      }else{
        res.send({message :"Dossier accepté, vous pouvez vous connecter à votre espace"});
      }
      
    });
  } catch (err) {
    console.log(err);
  }
};

export const getalumnipays = async (req, res) => {
  try {
    const pays = ["Tunisie", "Palestine", "Syrie", "Afrique"];
    let tab = [];
    const alumnipays = await Alumni.find().select({ pays: 1, _id: 0 });
    let s = "";
    alumnipays.map((e) => {
      var m = e.pays;
      tab.push(m);
    });
    let nbre = [];

    for (let i = 0; i < pays.length; i++) {
      let n = 0;
      for (let j = 0; j < tab.length; j++) {
        if (tab[j] === pays[i]) {
          n = n + 1;
        }
      }
      nbre.push(n);
    }

    console.log(nbre);
    res.status(201).json(nbre);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error.message);
  }
};
export const validerAlumnis = async(req, res) => {
  const data = {
    "demande" : true
  }

  const id = req.params.id;

  Alumni.findByIdAndUpdate(id, data, { useFindAndModify: false })
    .then((item) => {
      if (!item) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. Maybe user was not found!`,
        });
      } else{ 
        //success lazem nthabet ml item chniya fiha

        res.send({ message: "user was updated successfully." });
    }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};
export const getAlumniStatistics = (req, res) => {
  
  // agréger les statistiques par pays
  const alumniByCountry = Alumni.reduce((acc, alumni) => {
    const country = alumni.country;
    acc[country] = acc[country] ? acc[country] + 1 : 1;
    return acc;
  }, {});

  // agréger les statistiques par société
  const alumniByCompany = Alumni.reduce((acc, alumni) => {
    const company = alumni.company;
    acc[company] = acc[company] ? acc[company] + 1 : 1;
    return acc;
  }, {});

  // agréger les statistiques par promotion
  const alumniByGraduationYear = Alumni.reduce((acc, alumni) => {
    const year = alumni.graduationYear;
    acc[year] = acc[year] ? acc[year] + 1 : 1;
    return acc;
  }, {});

  // retourner les statistiques agrégées
  res.send({
    byCountry: alumniByCountry,
    byCompany: alumniByCompany,
    byGraduationYear: alumniByGraduationYear,
  });
}
