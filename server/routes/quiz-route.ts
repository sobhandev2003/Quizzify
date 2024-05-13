import { Router } from "express";
import { validation } from "../middiliwer/tokenValidator";
// import { upload } from "./users_route";
import { createNewQuiz, deleteQuiz, updateUnlike, updateLike, submitQuiz, getAllQuiz, getMyQuiz, getQuizById, gateMyQuizById, updateQuiz } from "../controllers/quiz-controllers";
import { upload } from "../config/connectDb";

const Route=Router();

Route.route("/").post(validation,upload.single("poster"),createNewQuiz);
Route.route("/update").put(validation,updateQuiz);
Route.route("/delete").delete(validation,deleteQuiz);
Route.route("/like").patch(validation,updateLike)
Route.route("/unlike").patch(validation,updateUnlike);
Route.route("/submit").put(validation,submitQuiz)
Route.route("/get").get(validation,getAllQuiz)
Route.route("/get/my-quiz").get(validation,getMyQuiz)
Route.route("/get/:id").get(validation,getQuizById)
Route.route("/get/my-quiz/:id").get(validation,gateMyQuizById)
export default Route