import path from 'path';
import express, { Application, Request, Response } from 'express';
import { errorHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import goalRoutes from './routes/goalRoutes';

const port = process.env.PORT || 8000;

dotenv.config();

connectDB();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);
app.use('/api/users', userRoutes);

// For deployment
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (_req: Request, res: Response) =>
  res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
);

app.use(errorHandler);

app.listen(port, () => console.log(`🟢 Server started on port ${port}`));
