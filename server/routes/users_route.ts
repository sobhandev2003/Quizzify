import express from 'express';
import {
    registerUser,
    verifyEmail
} from '../controllers/users-controllers';


import { Request, Response, Router } from 'express';
const Route = Router();

//NOTE - Register new user
Route.route("/").post(registerUser)
Route.route("/verify-email/:id/:token").get(verifyEmail)
export default Route;