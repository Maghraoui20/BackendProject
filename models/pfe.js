import mongoose from "mongoose";
const pfeSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  sujet: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  societe: {
    type: String,
    required: true,
  },
  duree: {
    type: String,
    required: true,
  },
  statutStage: {
    type: String,
    required: true,
    enum: ["pas encore commencé", "en cours", "validé"],
  },
  dateDébutStage: {
    type: Date,
    required: true,
  },
  dateFinStage: {
    type: Date,
    required: true,
  },
  id_enseignant: { type: mongoose.Schema.ObjectId, ref: "users" },
  emailEnseignant: {
    type: String,
    required: false,
  },
  emailEtudiant: {
    type: String,
    required: false,
  },
  id_etudiant: { type: mongoose.Schema.ObjectId, ref: "users" },
  pays:{type:String,
  required:true}
});
const pfe = mongoose.model("listepfe", pfeSchema);
export default pfe;
