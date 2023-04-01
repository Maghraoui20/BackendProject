import mongoose from "mongoose";
const enseignantSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
 // responsableformation: { type: String, required: true },
//  idformation: [{ type: mongoose.Schema.ObjectId, ref: "formation" }],

  idUser: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});
const Enseignant0 = mongoose.model("Enseignant0", enseignantSchema);
export default Enseignant0;
