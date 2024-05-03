import express from "express";
import { createNewQuestion, getAllQuizQuestion } from "../controllers/question-controllers";
import { validation } from "../middiliwer/tokenValidator";
const Router=express.Router();


Router.route("/create").post(validation,createNewQuestion)
Router.route("/get").get(validation,getAllQuizQuestion)

export default Router