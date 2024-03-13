import express from "express";
import cors from "cors";
const App = express();
import dotenv from 'dotenv';
dotenv.config();
import usersRoutes from  "./routes/users_route"
import quizRoute from "./routes/quiz-route";
import {errorHandler} from './middiliwer/errorHandeler'
import { connectDB } from "./config/connectDb";


connectDB();
App.use(cors())
App.use(express.json());
// uploadImageInGoogleDrive()
App.use("/users",usersRoutes);
App.use("/quiz",quizRoute)
App.use(errorHandler)
const Port=process.env.PORT || 5000 
App.listen(Port, () => {
    console.log(`App is running http://127.0.0.1:${Port}`);
})