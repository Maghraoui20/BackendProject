import mongoose from "mongoose";

const DirecteursSchema = mongoose.Schema({
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
});

const Directeurs = mongoose.model("Directeur", DirecteursSchema);
export default Directeurs;
