"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var commentController_1 = __importDefault(require("../controllers/comment/toPost/commentController"));
var postController_1 = __importDefault(require("../controllers/post/postController"));
var userController_1 = __importDefault(require("../controllers/user/userController"));
exports.resolvers = {
    Query: {
        getAllUsers: function (_parant, _args, context) {
            return userController_1.default.getAllUsers(_parant, _args, context);
        },
        getUserById: function (_parant, _args, context) {
            return userController_1.default.getUserById(_parant, _args, context);
        },
        me: function (_parant, _args, context) {
            return userController_1.default.me(_parant, _args, context);
        },
        getAllPosts: function (_parant, _args, context) {
            return postController_1.default.getAllPosts(_parant, _args, context);
        },
        getPostById: function (_parant, _args, context) {
            return postController_1.default.getPostById(_parant, _args, context);
        },
        getCommentById: function (_parant, _args, context) {
            return commentController_1.default.getCommentById(_parant, _args, context);
        },
    },
    Mutation: {
        addUser: function (_parant, args, context) {
            return userController_1.default.addUser(_parant, args, context);
        },
        login: function (_parant, _args, context) {
            return userController_1.default.login(_parant, _args, context);
        },
        addPost: function (_parant, _args, context) {
            return postController_1.default.addPost(_parant, _args, context);
        },
        ratePost: function (_parant, _args, context) {
            return userController_1.default.ratePost(_parant, _args, context);
        },
        deletePost: function (_parant, _args, context) {
            return postController_1.default.deletePost(_parant, _args, context);
        },
        editPost: function (_parant, _args, context) {
            return postController_1.default.editPost(_parant, _args, context);
        },
        addComment: function (_parant, _args, context) {
            return commentController_1.default.addComment(_parant, _args, context);
        },
        rateComment: function (_parant, _args, context) {
            return commentController_1.default.rateComment(_parant, _args, context);
        },
    },
};
//# sourceMappingURL=resolvers.js.map