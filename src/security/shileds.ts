import { rule, shield } from 'graphql-shield';
import { Context } from '../context/context';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx: Context, info) => {
    return ctx.user?.role === 'ADMIN';
  }
);

const all = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx: Context, info) => {
    return true;
  }
);

export const permissions = shield({
  Query: {
    getAllUsers: isAdmin,
    getUserById: isAuthenticated,
  },
  Mutation: {
    addPost: isAdmin,
    ratePost: isAuthenticated,
    deletePost: isAuthenticated,
    editPost: isAuthenticated,
    login: all,
  },
});
