import mongoose from "mongoose";

const EtudiantsSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  idUser: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  Birth_date: {
    type: Date,
    required: true,
  },
  Cv: {
    type: String,
    required: false,
  },

  depot: {
    type: String,
    required: false,
  },
  niveau: {
    type: String,
    required: true,
    enum: ["licence", "master", "cycle ingénieur"],
  },

  classe: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["alumni", "actuel"],
  },
});
const Etudiants = mongoose.model("Etudiant", EtudiantsSchema);
export default Etudiants;
