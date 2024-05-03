import { Router } from "express";
import { validation } from "../middiliwer/tokenValidator";
// import { upload } from "./users_route";
import { createNewQuiz, deleteQuiz, updateUnlike, updateLike, submitQuiz, getAllQuiz } from "../controllers/quiz-controllers";
import { upload } from "../config/connectDb";

const Route=Router();

Route.route("/").post(validation,upload.single("poster"),createNewQuiz);
Route.route("/delete").delete(validation,deleteQuiz);
Route.route("/like").put(validation,updateLike)
Route.route("/unlike").put(validation,updateUnlike);
Route.route("/submit").put(validation,submitQuiz)
Route.route("/get").get(getAllQuiz)

export default Route