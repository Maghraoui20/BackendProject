import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 25,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["enseignant", "alumni", "etudiant", "administratif"],
  },
  token: { type: String },
});

const Users = mongoose.model("users", UserSchema);
export default Users;
