"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientErrorHandler = void 0;
var error_service_1 = require("../service/error.service");
function clientErrorHandler(err, req, res, _next) {
    console.log(err);
    if (err instanceof error_service_1.ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ mesasge: 'Error on server 500...' });
}
exports.clientErrorHandler = clientErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map