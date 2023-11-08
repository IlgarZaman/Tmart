import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    image: { type: String, require: false },
    role: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
