import commentController from '../controllers/comment/toPost/commentController';
import postController from '../controllers/post/postController';
import userController from '../controllers/user/userController';
import { Context } from '../shared/context/context';

export const resolvers = {
  Query: {
    getAllUsers: (_parant: any, _args: any, context: Context) =>
      userController.getAllUsers(_parant, _args, context),
    getUserById: (_parant: any, _args: any, context: Context) =>
      userController.getUserById(_parant, _args, context),
    me: (_parant: any, _args: any, context: Context) =>
      userController.me(_parant, _args, context),
    getAllPosts: (_parant: any, _args: any, context: Context) =>
      postController.getAllPosts(_parant, _args, context),
    getPostById: (_parant: any, _args: any, context: Context) =>
      postController.getPostById(_parant, _args, context),
    getCommentById: (_parant: any, _args: any, context: Context) =>
      commentController.getCommentById(_parant, _args, context),
  },
  Mutation: {
    addUser: (_parant: any, args: any, context: Context) =>
      userController.addUser(_parant, args, context),
    login: (_parant: any, _args: any, context: Context) =>
      userController.login(_parant, _args, context),
    addPost: (_parant: any, _args: any, context: Context) =>
      postController.addPost(_parant, _args, context),
    ratePost: (_parant: any, _args: any, context: Context) =>
      userController.ratePost(_parant, _args, context),
    deletePost: (_parant: any, _args: any, context: Context) =>
      postController.deletePost(_parant, _args, context),
    editPost: (_parant: any, _args: any, context: Context) =>
      postController.editPost(_parant, _args, context),
    addComment: (_parant: any, _args: any, context: Context) =>
      commentController.addComment(_parant, _args, context),
    rateComment: (_parant: any, _args: any, context: Context) =>
      commentController.rateComment(_parant, _args, context),
    addBrowserHistory: (_parant: any, _args: any, context: Context) =>
      postController.addBrowserHistory(_parant, _args, context),
  },
  Subscription: {
    getCommentByPostId: {
      subscribe: (_parant: any, _args: any, context: Context) =>
        commentController.getCommentByPostId(_parant, _args, context),
    },
  },
};
