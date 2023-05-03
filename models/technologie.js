import mongoose from "mongoose";
const technologieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const technologie = mongoose.model("technologie", technologieSchema);
export default technologie;