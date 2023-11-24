import { generateJwt } from './jwt/generateJwt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { Context } from '../../context/context';
import {
  UserCreateInterface,
  UserLoginInterface,
} from './interfaces/UserInterface';

class userController {
  async me(_parant: any, _args: any, context: Context) {
    const { prisma, user } = context;

    const result = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return result;
  }

  async login(
    _parant: any,
    args: { data: UserLoginInterface },
    context: Context
  ) {
    const { prisma } = context;
    const { data } = args;

    const result = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (result?.password !== data.password)
      throw new GraphQLError('Invalid data', {
        extensions: {
          code: 'BAD_USER_INPUT',
        },
      });

    const token = generateJwt(result);

    return { token };
  }
  async addUser(
    _parant: any,
    args: { data: UserCreateInterface },
    context: Context
  ) {
    const { prisma } = context;
    const data = args.data;
    const result = await prisma.user.create({
      data: {
        email: data.email,
        firsName: data.firsName,
        lastName: data.lastName,
        role: 'USER',
        password: data.password,
      },
    });

    console.log(result);

    const token = generateJwt(result);
    return { token };
  }

  getAllUsers = async (_parent: any, _args: any, context: Context) => {
    const { prisma } = context;
    return await prisma.user.findMany();
  };
}

export default new userController();
