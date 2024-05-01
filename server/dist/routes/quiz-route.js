"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidator_1 = require("../middiliwer/tokenValidator");
// import { upload } from "./users_route";
const quiz_controllers_1 = require("../controllers/quiz-controllers");
const connectDb_1 = require("../config/connectDb");
const Route = (0, express_1.Router)();
Route.route("/").post(tokenValidator_1.validation, connectDb_1.upload.single("poster"), quiz_controllers_1.createNewQuiz);
Route.route("/delete").delete(tokenValidator_1.validation, quiz_controllers_1.deleteQuiz);
Route.route("/like").put(tokenValidator_1.validation, quiz_controllers_1.updateLike);
Route.route("/unlike").put(tokenValidator_1.validation, quiz_controllers_1.updateUnlike);
Route.route("/submit").put(tokenValidator_1.validation, quiz_controllers_1.submitQuiz);
exports.default = Route;
//# sourceMappingURL=quiz-route.js.map