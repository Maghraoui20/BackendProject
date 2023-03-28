import mongoose from "mongoose";

const administratifsSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
const Administratif = mongoose.model("administratif", administratifsSchema);
export default Administratif;
