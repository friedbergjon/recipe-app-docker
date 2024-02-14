import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';




const app = express();
console.log(process.env.MONGODB_URI);
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
);
app.listen(5000, () => console.log("SERVER STARTED!"));

