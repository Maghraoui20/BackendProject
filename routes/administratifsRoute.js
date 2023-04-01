import express from "express";
const router = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  findOne,
  updateAdmin,
  deleteAdmin,
  //deleteAll
  


} from "../controllers/administratifs.js";
import Administratifs from "../models/administratifs.js";
router.get("/getbyid/:id", findOne);  // checked
router.patch("/", updateAdmin);  // checked
router.delete("/deleteById/:id", deleteAdmin);  // checked
//router.delete("/deleteAll", deleteAll);

// Register administratif  --> checked
router.post('/register', async (req, res)=>{
  // data=req.body;
 const admin = new Administratifs (req.body);
  const salt = bcrypt.genSaltSync(10);
  const cryptedPass =  bcrypt.hashSync (req.body.password, salt);
   admin.password = cryptedPass;
   admin.save()
   .then ((saved)=>{
       res.status(200).send(saved)
   })
   .catch((err)=>{
   res.status(400).send(err);
})
})

// login administratif -->checked
router.post('/signin', async (req, res)=>{
// data=req.body;
const admin = await Administratifs.findOne({phone: req.body.phone})
if(!admin){
res.status(404).send('login or password invalid')
}else{
const   validPass = bcrypt.compareSync(req.body.password , admin.password)

if(!validPass){
   res.status(401).send('login or password invalid')
}else{
  const payload = {
       _id: admin._id,
       login: admin.login
   }
  const token = jwt.sign(payload, '123456')
   res.status(200).send({success:true, mytoken: token , model: admin,
   })
}
}
})

// Ajouter adminstratif --> checked

router.post('/' , async (req, res)=>{
  try{
     // data=req.body;
    const  admin = new Administratifs (req.body);
    const savedAdmin = await admin.save();
      res.status(200).send(savedAdmin)
  } catch(error){
      res.status(400).send(error)
  }
})

// Afficher liste des administratifs --> checked
router.get('/' , async (req, res)=>{   // auth --> token of directeur
  try{
      const admins = await Administratifs.find();
      res.status(200).send(admins)
  } catch(error){
      res.status(400).send(error)
  }
})


// Statistique administratifs  --> checked
router.get('/getcount', async (req, res) =>{ // token of directeur 
  const administratifsCount = await Administratifs.countDocuments();
  if(!administratifsCount) {
      res.status(500).send(error)
  } 
  res.send({
      administratifsCount: administratifsCount
  });
})



export default router;
