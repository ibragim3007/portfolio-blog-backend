"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateJwt = function (data) {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || '', {
        expiresIn: '24h',
    });
};
exports.generateJwt = generateJwt;
//# sourceMappingURL=generateJwt.js.map