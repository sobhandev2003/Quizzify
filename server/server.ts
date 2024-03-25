import express from "express";
import cors from "cors";
const App = express();
import dotenv from 'dotenv';
dotenv.config();
const cookieParser = require('cookie-parser')
import usersRoutes from  "./routes/users_route"
import quizRoute from "./routes/quiz-route";
import questionRoute from "./routes/question-route";
import {errorHandler} from './middiliwer/errorHandeler'
import { connectDB } from "./config/connectDb";
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies with CORS
};

connectDB();
App.use(cors(corsOptions))
App.use(express.json());
App.use(cookieParser())
// uploadImageInGoogleDrive()
App.use("/users",usersRoutes);
App.use("/quiz",quizRoute)
App.use("/question",questionRoute)
App.use(errorHandler)
const Port=process.env.PORT || 5000 
App.listen(Port, () => {
    console.log(`App is running http://127.0.0.1:${Port}`);
})