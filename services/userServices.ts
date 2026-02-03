import User from "../models/userModels";
import { hashPassword, validPassword } from "../utils/bcrypt";

// REGISTER SERVICE
const RegisterData = async (
  name: string,
  email: string,
  password: string,
): Promise<any> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: "member",
  });

  await user.save();
  return user;
};

// LOGIN SERVICE
const LoginData = async (email: string, password: string): Promise<any> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await validPassword(user.password, password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return user;
};

export { RegisterData, LoginData };
