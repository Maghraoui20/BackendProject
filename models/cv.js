import mongoose from "mongoose";
const cvSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  Birth_date: {
    type: Date,
    required: false,
  },
  niveau: {
    type: String,
    required: false,
    enum: ["licence", "master", "cycle ingénieur"],
  },
  classe: {
    type: String,
    required: false,
  },
  adresse: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  stage: {
    type: String,
    required: false,
    enum: ["stage d'été", "stage PFE"],
  },
  iduser: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
});

const cv = mongoose.model("cv", cvSchema);
export default cv;
