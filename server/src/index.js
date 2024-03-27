import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

const app = express();
const port = process.env.PORT || 5000;
const host = '0.0.0.0';

console.log(process.env.MONGODB_URI);

app.use(express.json());
app.use(cors());

// Define the base route for API endpoints
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Mount user and recipes routes under the /api prefix
apiRouter.use("/auth", userRouter);
apiRouter.use("/recipes", recipesRouter);

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.listen(port, host, () => {
  console.log(`Server is listening on ${host}:${port}`);
});
