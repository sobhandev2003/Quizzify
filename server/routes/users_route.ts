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

import multer from "multer"
// const upload = multer({ dest: 'uploads/' })
// const upload = multer().single('avatar')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
            return cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        const fileName=Date.now()+"quizzify-profile-photo"+file.originalname;
            cb(null,fileName)
    }
})
const upload = multer({ storage: storage })
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