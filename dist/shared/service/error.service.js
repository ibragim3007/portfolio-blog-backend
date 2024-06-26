"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(status, message, errors) {
        if (errors === void 0) { errors = []; }
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.errors = errors;
        return _this;
    }
    ApiError.UnauthorizedError = function () {
        return new ApiError(401, 'User not authorized');
    };
    ApiError.BadRequest = function (message, errors) {
        if (errors === void 0) { errors = []; }
        return new ApiError(400, message, errors);
    };
    ApiError.BadPermission = function (message, errors) {
        if (message === void 0) { message = 'No permission'; }
        if (errors === void 0) { errors = []; }
        return new ApiError(401, message, errors);
    };
    return ApiError;
}(Error));
exports.ApiError = ApiError;
//# sourceMappingURL=error.service.js.map