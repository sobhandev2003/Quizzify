import express from "express";
import { createNewQuestion, updateQuestion, getAllQuizQuestion, deleteQuestion } from "../controllers/question-controllers";
import { validation } from "../middiliwer/tokenValidator";
const Router=express.Router();


Router.route("/create").post(validation,createNewQuestion)
Router.route("/get").get(validation,getAllQuizQuestion)

Router.route("/update").put(validation,updateQuestion)
Router.route("/delete").delete(validation,deleteQuestion)

export default Router