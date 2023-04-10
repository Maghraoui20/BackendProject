import mongoose from "mongoose";

const stageEteSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: false,
    },
    societe: {
      type: String,
      required: false,
    },
    sujet: {
      type: String,
      required: true,
    },
    duree: {
      type: String,
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
