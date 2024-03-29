"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var generateJwt_1 = require("./jwt/generateJwt");
var graphql_1 = require("graphql");
var userController = /** @class */ (function () {
    function userController() {
        var _this = this;
        this.getAllUsers = function (_parent, _args, context) { return __awaiter(_this, void 0, void 0, function () {
            var prisma;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = context.prisma;
                        return [4 /*yield*/, prisma.user.findMany()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getUserById = function (_parent, args, context) { return __awaiter(_this, void 0, void 0, function () {
            var prisma;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = context.prisma;
                        return [4 /*yield*/, prisma.user.findUnique({
                                where: {
                                    id: args.id,
                                },
                                include: {
                                    writtenPosts: {
                                        include: {
                                            likedBy: true,
                                            author: true,
                                        },
                                    },
                                },
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.ratePost = function (_parent, args, context) { return __awaiter(_this, void 0, void 0, function () {
            var prisma, user, data, existingConnection, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = context.prisma, user = context.user;
                        data = args.data;
                        return [4 /*yield*/, prisma.usersJoinLikedPosts.findUnique({
                                where: {
                                    postId_userId: {
                                        postId: data.postId,
                                        userId: user.id,
                                    },
                                },
                            })];
                    case 1:
                        existingConnection = _a.sent();
                        if (!existingConnection) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma.usersJoinLikedPosts.delete({
                                where: {
                                    postId_userId: {
                                        postId: data.postId,
                                        userId: user.id,
                                    },
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.post.update({
                                where: { id: data.postId },
                                data: { likesAmount: { decrement: 1 } },
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, prisma.usersJoinLikedPosts.create({
                            data: {
                                postId: data.postId,
                                userId: user.id,
                            },
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, prisma.post.update({
                                where: { id: data.postId },
                                data: { likesAmount: { increment: 1 } },
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, prisma.post.findUnique({
                            where: {
                                id: data.postId,
                            },
                        })];
                    case 8:
                        post = _a.sent();
                        return [2 /*return*/, post];
                }
            });
        }); };
    }
    userController.prototype.me = function (_parant, _args, context) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = context.prisma, user = context.user;
                        return [4 /*yield*/, prisma.user.findUnique({
                                where: {
                                    id: user === null || user === void 0 ? void 0 : user.id,
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    userController.prototype.login = function (_parant, args, context) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, data, result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = context.prisma;
                        data = args.data;
                        return [4 /*yield*/, prisma.user.findUnique({
                                where: {
                                    email: data.email,
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        if ((result === null || result === void 0 ? void 0 : result.password) !== data.password)
                            throw new graphql_1.GraphQLError('Invalid data', {
                                extensions: {
                                    code: 'BAD_USER_INPUT',
                                },
                            });
                        token = (0, generateJwt_1.generateJwt)(result);
                        return [2 /*return*/, { token: token }];
                }
            });
        });
    };
    userController.prototype.addUser = function (_parant, args, context) {
        return __awaiter(this, void 0, void 0, function () {
            var prisma, data, result, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prisma = context.prisma;
                        data = args.data;
                        return [4 /*yield*/, prisma.user.create({
                                data: {
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    role: 'USER',
                                    password: data.password,
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        token = (0, generateJwt_1.generateJwt)(result);
                        return [2 /*return*/, { token: token }];
                }
            });
        });
    };
    return userController;
}());
exports.default = new userController();
//# sourceMappingURL=userController.js.map