"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const question_controllers_1 = require("../controllers/question-controllers");
const tokenValidator_1 = require("../middiliwer/tokenValidator");
const Router = express_1.default.Router();
Router.route("/create").post(tokenValidator_1.validation, question_controllers_1.createNewQuestion);
Router.route("/get").get(tokenValidator_1.validation, question_controllers_1.getAllQuizQuestion);
exports.default = Router;
//# sourceMappingURL=question-route.js.map