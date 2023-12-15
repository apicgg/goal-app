import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import path from "path";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";
import goalRoutes from "./routes/goalRoutes";
import userRoutes from "./routes/userRoutes";

const port = process.env.PORT || 8000;

dotenv.config();

connectDB();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

// For deployment
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (_req: Request, res: Response) =>
  res.sendFile(
    path.resolve(__dirname, "../", "frontend", "build", "index.html")
  )
);

app.use(errorHandler);

app.listen(port, () => console.log(`🟢 Server started on port ${port}`));
