import mongoose from "mongoose";

const stageEteSchema = new mongoose.Schema(
  {
    Description: {
      type: String,
      required: false,
    },
    societe: {
      type: String,
      required: false,
    },
    sujet: {
      type: String,
      required: false,
    },
    date_debut: {
      type: Date,
      required: true,
    },

    date_fin: {
      type: Date,
      required: true,
    },

    id_etudiant: [{ type: mongoose.Schema.ObjectId, ref: "Etudiant" }],
  },
  {
    timestamps: true,
  }
);

const StageEte = mongoose.model("StageEte", stageEteSchema);
export default StageEte;
