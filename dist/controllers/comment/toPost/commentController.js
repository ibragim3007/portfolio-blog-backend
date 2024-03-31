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
var error_service_1 = require("../../../shared/service/error.service");
var commentController = /** @class */ (function () {
    function commentController() {
        var _this = this;
        this.getCommentById = function (_parant, args, context) { return __awaiter(_this, void 0, void 0, function () {
            var data, prisma, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = args.data;
                        prisma = context.prisma;
                        return [4 /*yield*/, prisma.comment.findUnique({
                                where: {
                                    id: data.id,
                                },
                                include: {
                                    likedBy: true,
                                    user: true,
                                    post: true,
                                },
                            })];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                }
            });
        }); };
        this.addComment = function (_parant, args, context) { return __awaiter(_this, void 0, void 0, function () {
            var data, prisma, user, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = args.data;
                        prisma = context.prisma, user = context.user;
                        if (!user)
                            return [2 /*return*/, error_service_1.ApiError.UnauthorizedError()];
                        if (data.text.trim() === '')
                            return [2 /*return*/, error_service_1.ApiError.BadRequest("Field can't be empty")];
                        return [4 /*yield*/, prisma.comment.create({
                                data: {
                                    userId: user === null || user === void 0 ? void 0 : user.id,
                                    text: data.text,
                                    postId: data.postId,
                                },
                            })];
                    case 1:
                        comment = _a.sent();
                        return [4 /*yield*/, prisma.post.update({
                                where: {
                                    id: data.postId,
                                },
                                data: {
                                    commentsAmount: { increment: 1 },
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, comment];
                }
            });
        }); };
        this.rateComment = function (_parant, args, context) { return __awaiter(_this, void 0, void 0, function () {
            var data, prisma, user, isExistLikeAlready, comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = args.data;
                        prisma = context.prisma, user = context.user;
                        if (!user)
                            return [2 /*return*/, error_service_1.ApiError.UnauthorizedError()];
                        return [4 /*yield*/, prisma.usersJoinLikedComments.findUnique({
                                where: {
                                    commentId_userId: {
                                        commentId: data.commentId,
                                        userId: user.id,
                                    },
                                },
                            })];
                    case 1:
                        isExistLikeAlready = _a.sent();
                        if (!isExistLikeAlready) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma.usersJoinLikedComments.delete({
                                where: {
                                    commentId_userId: {
                                        commentId: data.commentId,
                                        userId: user.id,
                                    },
                                },
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.comment.update({
                                where: {
                                    id: data.commentId,
                                },
                                data: {
                                    likesAmount: { increment: -1 },
                                },
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, prisma.usersJoinLikedComments.create({
                            data: {
                                userId: user.id,
                                commentId: data.commentId,
                            },
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, prisma.comment.update({
                                where: {
                                    id: data.commentId,
                                },
                                data: {
                                    likesAmount: { increment: 1 },
                                },
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, prisma.comment.findUnique({
                            where: {
                                id: data.commentId,
                            },
                        })];
                    case 8:
                        comment = _a.sent();
                        return [2 /*return*/, comment];
                }
            });
        }); };
    }
    return commentController;
}());
exports.default = new commentController();
//# sourceMappingURL=commentController.js.map