import express from 'express';
import {
    changeProfilePhoto,
    forgetPasswordRequest,
    getUserDetails,
    loginUser,
    registerUser,
    resetPassword,
    verifyEmail
} from '../controllers/users-controllers';


import { Request, Response, Router } from 'express';
import { validation } from '../middiliwer/tokenValidator';
import { upload } from '../config/connectDb';


const Route = Router();

//NOTE - Register new user
Route.route("/").post(registerUser)
Route.route("/verify-email/:id/:token").get(verifyEmail);
Route.route("/forgot-password").post(forgetPasswordRequest);
Route.route("/reset-password").put(resetPassword);
Route.route("/login").post(loginUser);
Route.route("/").get(validation,getUserDetails);
Route.route("/profile-photo").post(validation,upload.single('photo'),changeProfilePhoto)
export default Route;