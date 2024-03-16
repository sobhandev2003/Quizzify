import express from "express";
import { createNewQuestion } from "../controllers/question-controllers";
const Router=express.Router();


Router.route("/create").post(createNewQuestion)

export default Router