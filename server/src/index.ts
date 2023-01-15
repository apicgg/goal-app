import path from "path";
import express, { Application, Request, Response } from "express";
import { errorHandler } from "./middleware/errorMiddleware";
import dotenv from "dotenv";
import connectDB from "./config/db";
const port = process.env.PORT || 8000;

dotenv.config();

connectDB();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// For deployment
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (_req: Request, res: Response) =>
  res.sendFile(
    path.resolve(__dirname, "../", "../", "client", "dist", "index.html")
  )
);

app.use(errorHandler);

app.listen(port, () => console.log(`🟢 Server started on port ${port}`));
