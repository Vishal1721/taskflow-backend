import { Request, Response } from "express";
import { RegisterData, LoginData } from "../services/userServices";
import generateToken from "../config/jwt";

type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

// REGISTER
const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await RegisterData(name, email, password);

    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

// LOGIN
const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await LoginData(email, password);
    const token = generateToken(user._id.toString());

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

// GET LOGGED-IN USER
const getMe = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Auth successful",
    user: req.user,
  });
};

export { register, login, getMe };
