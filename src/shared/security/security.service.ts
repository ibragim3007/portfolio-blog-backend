import { Context } from '../context/context';

export class Security {
  static async isPostOwner(
    _parant: any,
    args: { id: string },
    context: Context
  ) {
    const { user, prisma } = context;

    if (!args.id || !user) throw new Error('Error...');

    const post = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
      select: {
        authorId: true,
      },
    });

    if (!post) throw new Error('No post...');

    return post.authorId === user.id; // Проверить, является ли текущий пользователь владельцем поста
  }
}
