import { Context } from '../context/context';

class userController {
  async addUser(
    _parant: any,
    args: { data: { name: string; age?: number; email: string } },
    context: Context
  ) {
    const { prisma } = context;
    const data = args.data;
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        age: data.age,
      },
    });
    return result;
  }

  getAllUsers = async (_parent: any, _args: any, context: Context) => {
    const { prisma } = context;
    return await prisma.user.findMany();
  };
}

export default new userController();
