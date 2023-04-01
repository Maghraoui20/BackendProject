import mongoose from "mongoose";
const enseignantSchema = mongoose.Schema({

  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },


  password: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  Role: {
    type: String,
    default: "enseignant",
  },
  status:{
    type: String,
    required: true,
    enum: [ "enseignant", "responsable formation"],
  }
});
const Enseignant = mongoose.model("Enseignant", enseignantSchema);
export default Enseignant;
