import mongoose from "mongoose";
const enseignantSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  responsableforrmation: { type: String, required: true },
  idformation: [{ type: mongoose.Schema.ObjectId, ref: "formation" }],

  idUser: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});
const Enseignant = mongoose.model("Enseignant", enseignantSchema);
export default Enseignant;
