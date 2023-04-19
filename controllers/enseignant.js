import Enseignant from "../models/enseignant.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import Formation from "../models/formation.js";
import Alumins from "../models/alumnis.js";

//checked
export const signupEnseignant = async (req, res) => {
    const { 
      firstname,
      lastname,
      phone,
      responsableforrmation ,
      idformation,
       password,
        } = req.body;
     try {
      const enseignatexist = await Enseignant.findOne({ phone });
    
      if (enseignatexist) return res.status(400).json({ message: 'Enseignant existant déja !' });
        const hashedpassword = await bcrypt.hashSync(password, 12);
        const result = await Enseignant.create({
    
            firstname,
            lastname,
            phone,
            responsableforrmation , 
            idformation,
            password: hashedpassword});
      //console.log("ici");
        const token = jwt.sign({phone: result.phone, id: result._id}, 'test', {expiresIn:"1d"});
  
        let tabFormations = [];
        const formations=  await Formation.find({_id:{$in : idformation}});
        formations.map(async(el)=> {
            tabFormations.push(el._id);
         } )
         await Formation.updateMany({_id : {$in : tabFormations }}, {$push:{ idenseignant : result._id}})
         await Enseignant.updateOne( {$push:{ idformation : result.idformation}})

         res.status(200).json({result, token});
     }
     catch (error) {
         res.status(500).json({message:"erreur "});
         console.log(error.message);
     }
    };

//checked
export const signin = async (req, res) => {
      const {  phone, password } = req.body;
      try {
        const enseignant = await Enseignant.findOne({ phone });
    
        if (enseignant) {
          const isPasswordCorrect = await bcrypt.compare(password, enseignant.password);
          if (!isPasswordCorrect) return res.status(400).json({ message: "mot de passe incorrect" });
          res.status(200).json({ result: enseignant });
        }
          
      } catch (err) {
        res.status(500).json({ message: "il ya une erreur" });
      }
};


//checked
export const Statistiqueenseignant =async(req, res)=>{
try{
  const enseignantsCount = await Enseignant.countDocuments();
  if(enseignantsCount) {
    res.send({
      enseignantsCount: enseignantsCount
  })  }

}catch(err){
  res.status(500).send(error)
}
}
    
//checked
export const updateEnseignant = async (req, res) => {
  try {
    const id = req.query.id;
    const _id = id;
  
    const enseignant = req.body;
  
    const updateEnseignant= await Enseignant.findByIdAndUpdate(
      _id,
      { ...enseignant, _id },
      { new: true }
    );
    res.json(updateEnseignant);
    }
    catch(error) {
      res.status(404).json({message: error.message});
      console.log(error.message)
    }
  }
    
//checked
export const getEnseignant = async (req,res) => {  //checked
        try {
         
          const enseignant = await Enseignant.find();
         
          res.status(200).json(
            enseignant
                 );
        } catch (error) {
          res.status(404).json({ message: error.message });
    
        };
};
//checked
export const deleteEnseignant = async (req, res) => {
        try {
        const  id  = req.query.id;
        const enseignant = await Enseignant.find({_id: {$in: id}});
    enseignant.map(async(el)=>{
      await Enseignant.findByIdAndRemove(el._id);
   
    })
       
        
        res.json({ message: "l'enseignant a ete supprimer avec succés !" });
        }catch (error) {
          res.status(404).json({ message: error.message });
          console.log(error.message)
        }
};
export const listeAlumnis = async (req, res) => {
  
  try{
    const newAlumnis = await Alumins.find({demande: false, report: false});
    const oldAlumnis = await Alumins.find({demande: false, report: true});
    res.status(200).json( newAlumnis, oldAlumnis );
  }catch{
    res.status(404).json({ message: error.message });
  }
};