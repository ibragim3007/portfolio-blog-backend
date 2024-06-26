import { generateJwt } from './jwt/generateJwt';
import { GraphQLError } from 'graphql';
import { Context } from '../../shared/context/context';
import {
  UserCreateInterface,
  UserLoginInterface,
} from './interfaces/UserInterface';
import { RatePostInterface } from './interfaces/PostJointInterfaces/RatePostInterface';

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
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'USER',
        password: data.password,
      },
    });

    const token = generateJwt(result);
    return { token };
  }

  getAllUsers = async (_parent: any, _args: any, context: Context) => {
    const { prisma } = context;
    return await prisma.user.findMany();
  };

  getUserById = async (
    _parent: any,
    args: { id: string },
    context: Context
  ) => {
    const { prisma } = context;

    return await prisma.user.findUnique({
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
    });
  };

  ratePost = async (
    _parent: any,
    args: { data: RatePostInterface },
    context: Context
  ) => {
    const { prisma, user } = context;

    const { data } = args;

    const existingConnection = await prisma.usersJoinLikedPosts.findUnique({
      where: {
        postId_userId: {
          postId: data.postId,
          userId: user!.id,
        },
      },
    });

    if (existingConnection) {
      await prisma.usersJoinLikedPosts.delete({
        where: {
          postId_userId: {
            postId: data.postId,
            userId: user!.id,
          },
        },
      });

      await prisma.post.update({
        where: { id: data.postId },
        data: { likesAmount: { decrement: 1 } },
      });
    } else {
      await prisma.usersJoinLikedPosts.create({
        data: {
          postId: data.postId,
          userId: user!.id,
        },
      });

      await prisma.post.update({
        where: { id: data.postId },
        data: { likesAmount: { increment: 1 } },
      });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: data.postId,
      },
    });

    return post;
  };
}

export default new userController();
