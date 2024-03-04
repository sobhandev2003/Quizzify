import express from "express";
const App = express();
import dotenv from 'dotenv';
dotenv.config();
import usersRoutes from  "./routes/users_route"
App.use("/users",usersRoutes)

const Port=process.env.PORT || 5000 
App.listen(Port, () => {
    console.log(`App is running http://127.0.0.1:${Port}`);

})