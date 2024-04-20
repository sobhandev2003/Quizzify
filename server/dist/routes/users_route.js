"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_controllers_1 = require("../controllers/users-controllers");
const express_1 = require("express");
const tokenValidator_1 = require("../middiliwer/tokenValidator");
const connectDb_1 = require("../config/connectDb");
const Route = (0, express_1.Router)();
//NOTE - Register new user
Route.route("/").post(users_controllers_1.registerUser);
Route.route("/verify-email/:id/:token").get(users_controllers_1.verifyEmail);
Route.route("/forgot-password").post(users_controllers_1.forgetPasswordRequest);
Route.route("/reset-password").put(users_controllers_1.resetPassword);
Route.route("/login").post(users_controllers_1.loginUser);
Route.route("/logout").get(users_controllers_1.logOutUser);
Route.route("/").get(tokenValidator_1.validation, users_controllers_1.getUserDetails);
Route.route("/profile-photo").post(tokenValidator_1.validation, connectDb_1.upload.single('photo'), users_controllers_1.changeProfilePhoto);
exports.default = Route;
//# sourceMappingURL=users_route.js.map