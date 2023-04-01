import mongoose from "mongoose";
const pfaSchema = mongoose.Schema({
  Description: {
    type: String,
    required: false,
  },

  sujet: {
    type: String,
    required: false,
  },

  type: {
    type: String,
    required: false,
  },

  nbre_etudiant: {
    type: Number,
    required: false,
  },

  id_enseignant: {
    type: mongoose.Schema.ObjectId,
    ref: "Enseignant",
  },

  id_etudiant: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Etudiant",
    },
  ],
  technologie: {
    type: String,
    default: "Null",
  },
});
const pfa = mongoose.model("listepfa", pfaSchema);
export default pfa;
