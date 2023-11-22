import userController from '../controllers/userController';
import { Context } from './../context/context';

export const resolvers = {
  Query: {
    getAllUsers: (_parant: any, _args: any, context: Context) =>
      userController.getAllUsers(_parant, _args, context),
  },
  Mutation: {
    addUser: (_parant: any, args: any, context: Context) =>
      userController.addUser(_parant, args, context),
  },
};
