import mongoose from "mongoose";
interface UserDocument{
  name : string;
  email : string;
  password : string;
  role?: string;
}
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String , default: "member"},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
