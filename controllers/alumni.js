import Alumni from "../models/alumnis.js";

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

    const alum = new Alumni(req.body);

    const saved_alumni = await alum.save(alum);
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
export const getalumnipays = async (req, res) => {
  try {
    const pays= ["Tunisie","Palestine","Syrie", "Afrique"];
    let tab = [];
    const alumnipays = await Alumni.find().select({"pays":1, "_id":0});
    let s ="";
alumnipays.map((e)=> {
  var m = e.pays;
  tab.push(m);
})
let nbre = [];

    for(let i=0; i < pays.length; i++) {
      let n = 0;
      for(let j=0 ; j < tab.length; j++) {
        if(tab [j] === pays[i]) {
          n = n+1;

        }
  
    }
    nbre.push(n);

   }


  console.log(nbre);
   res.status(201).json(nbre);

  
} catch (error) {
  res.status(404).json({ message: error.message });
  console.log(error.message)
}
};
