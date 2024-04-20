"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const App = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cookieParser = require('cookie-parser');
const users_route_1 = __importDefault(require("./routes/users_route"));
const quiz_route_1 = __importDefault(require("./routes/quiz-route"));
const question_route_1 = __importDefault(require("./routes/question-route"));
const errorHandeler_1 = require("./middiliwer/errorHandeler");
const connectDb_1 = require("./config/connectDb");
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true // Allow cookies with CORS
};
(0, connectDb_1.connectDB)();
App.use((0, cors_1.default)(corsOptions));
App.use(express_1.default.json());
App.use(cookieParser());
// uploadImageInGoogleDrive()
App.use("/users", users_route_1.default);
App.use("/quiz", quiz_route_1.default);
App.use("/question", question_route_1.default);
App.use(errorHandeler_1.errorHandler);
const Port = process.env.PORT || 5000;
App.listen(Port, () => {
    console.log(`App is running http://127.0.0.1:${Port}`);
});
exports.default = App;
//# sourceMappingURL=server.js.map