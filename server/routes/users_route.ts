import express from 'express';
import {
    forgetPasswordRequest,
    registerUser,
    resetPassword,
    verifyEmail
} from '../controllers/users-controllers';


import { Request, Response, Router } from 'express';
const Route = Router();

//NOTE - Register new user
Route.route("/").post(registerUser)
Route.route("/verify-email/:id/:token").get(verifyEmail);
Route.route("/forgot-password").post(forgetPasswordRequest);
Route.route("/reset-password").put(resetPassword)

export default Route;