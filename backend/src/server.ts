import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.ts";
import postRoutes from "./routes/postRoutes.ts";
import commentRoutes from "./routes/commentRoutes.ts";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Successfull connect with MongoDB");

    app.listen(PORT, () => {
      console.log(`Server run on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect with MongoDB: ", error);
  });

export default app;
