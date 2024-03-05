import { NextFunction, Request, Response } from "express";
import { HttpErrorCode } from "../httpError";
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode
    switch (statusCode) {
        case HttpErrorCode.BadRequest:
            res.json({ title: "BadRequest", message: err.message, stackTrace: err.stack })
            break;
        case HttpErrorCode.Unauthorized:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.Forbidden:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.NotFound:
            res.json({ title: "NotFound", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.MethodNotAllowed:
            res.json({ title: "MethodNotAllowed", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.Conflict:
            res.json({ title: "Conflict", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.InternalServerError:
            res.json({ title: "InternalServerError", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.NotImplemented:
            res.json({ title: "NotImplemented", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.ServiceUnavailable:
            res.json({ title: "ServiceUnavailable", message: err.message, stackTrace: err.stack })
            break
        case HttpErrorCode.BadGateway:
            res.json({ title: "BadGateway", message: err.message, stackTrace: err.stack })
            break;
        case HttpErrorCode.GatewayTimeout:
            res.json({ title: "GatewayTimeout", message: err.message, stackTrace: err.stack })
            break

        default:
            res.json({  message: err.message, stackTrace: err.stack })
            break;
    }
}