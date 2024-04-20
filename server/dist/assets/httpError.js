"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorCode = void 0;
var HttpErrorCode;
(function (HttpErrorCode) {
    HttpErrorCode[HttpErrorCode["BadRequest"] = 400] = "BadRequest";
    HttpErrorCode[HttpErrorCode["Unauthorized"] = 401] = "Unauthorized";
    HttpErrorCode[HttpErrorCode["Forbidden"] = 403] = "Forbidden";
    HttpErrorCode[HttpErrorCode["NotFound"] = 404] = "NotFound";
    HttpErrorCode[HttpErrorCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpErrorCode[HttpErrorCode["Conflict"] = 409] = "Conflict";
    HttpErrorCode[HttpErrorCode["InternalServerError"] = 500] = "InternalServerError";
    HttpErrorCode[HttpErrorCode["NotImplemented"] = 501] = "NotImplemented";
    HttpErrorCode[HttpErrorCode["BadGateway"] = 502] = "BadGateway";
    HttpErrorCode[HttpErrorCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpErrorCode[HttpErrorCode["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpErrorCode || (exports.HttpErrorCode = HttpErrorCode = {}));
//# sourceMappingURL=httpError.js.map