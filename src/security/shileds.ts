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

export const permissions = shield({
  Query: {
    getAllUsers: isAdmin,
  },
  Mutation: {},
});
