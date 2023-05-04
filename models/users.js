
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const cvSchema = mongoose.Schema({
  title: String
});


const UserSchema = mongoose.Schema({
  //all
  //Cv: cvSchema,
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["enseignant", "alumni", "etudiant", "administratif", "directeur"],
  },
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },
  //alumni
  demande: {
    type: Boolean,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: false,
  },
  societe: {
    type: String,
    required: false,
  },
  promotion: {
    type: Number,
    required: false,
  },

  date_diplome: {
    type: Date,
    required: false,
  },
  date_embauche: {
    type: Date,
    required: false,
  },

  //enseignat
  // responsableformation: { type: String, required: true },
  //  idformation: [{ type: mongoose.Schema.ObjectId, ref: "formation" }],

  status: {
    type: String,
    required: false,
    enum: ["enseignant", "responsable formation"],
  },
  //etudiant
  Birth_date: {
    type: Date,
    required: false,
  },


  depot: {
    type: String,
    required: false,
  },

  niveau: {
    type: String,
    required: false,
    enum: ["licence", "master", "cycle ingénieur"],
  },

  classe: {
    type: String,
    required: false,
  },
  etat: {
    type: String,
    required: false,
    enum: ["alumni", "actuel"],
  },
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  console.log("1111111111111111", 'generate')
  return jwt.sign({ id: this._id, role: this.role }, 'generate', {
    expiresIn: 346000
  })
}


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}


const Users = mongoose.model("users", UserSchema);
export default Users;
