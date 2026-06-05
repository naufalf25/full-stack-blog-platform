import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
  }
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environtment variables")
    }

    const decoded = jwt.verify(token, secret) as { id: string };
    req.user = { id: decoded.id }
    next()
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." })
  }
}
