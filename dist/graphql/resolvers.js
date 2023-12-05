"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var postController_1 = __importDefault(require("../controllers/post/postController"));
var userController_1 = __importDefault(require("../controllers/user/userController"));
exports.resolvers = {
    Query: {
        getAllUsers: function (_parant, _args, context) {
            return userController_1.default.getAllUsers(_parant, _args, context);
        },
        me: function (_parant, _args, context) {
            return userController_1.default.me(_parant, _args, context);
        },
        getAllPosts: function (_parant, _args, context) {
            return postController_1.default.getAllPosts(_parant, _args, context);
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
    },
};
//# sourceMappingURL=resolvers.js.map