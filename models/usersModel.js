import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Name is required!"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
});
const userModel = mongoose.models.users || mongoose.model("users", userSchema);
export default userModel;
