import type { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ message: "All fields required (name, email, password)." });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ message: `User with email ${email} already exist.` });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res
      .status(201)
      .json({ message: "Registration success, you may continue login." });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Wrong password." });
      return;
    }

    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error("JWT_SECRET not found.");

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1d" });

    res.status(200).json({
      message: "Login successfull",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error: error.message });
  }
};

const logout = (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Logout successfull. Please delete access token on client side.",
  });
};

export { register, login, logout };
