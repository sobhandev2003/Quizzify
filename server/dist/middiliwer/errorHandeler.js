"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const httpError_1 = require("../assets/httpError");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode;
    switch (statusCode) {
        case httpError_1.HttpErrorCode.BadRequest:
            res.json({ title: "BadRequest", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.Unauthorized:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.Forbidden:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.NotFound:
            res.json({ title: "NotFound", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.MethodNotAllowed:
            res.json({ title: "MethodNotAllowed", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.Conflict:
            res.json({ title: "Conflict", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.InternalServerError:
            res.json({ title: "InternalServerError", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.NotImplemented:
            res.json({ title: "NotImplemented", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.ServiceUnavailable:
            res.json({ title: "ServiceUnavailable", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.BadGateway:
            res.json({ title: "BadGateway", message: err.message, stackTrace: err.stack });
            break;
        case httpError_1.HttpErrorCode.GatewayTimeout:
            res.json({ title: "GatewayTimeout", message: err.message, stackTrace: err.stack });
            break;
        default:
            res.json({ message: err.message, stackTrace: err.stack });
            break;
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandeler.js.map