import { Context } from '../../context/context';
import { PostAddInterface } from './interfaces/PostInterface';

class postController {
  getAllPosts = async (_parant: any, _args: any, context: Context) => {
    const { prisma } = context;
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likedBy: {
          include: {
            user: true,
            post: true,
          },
        },
      },
    });

    posts.map((post, index) => {
      console.log(post.likedBy);
    });

    return posts;
  };

  addPost = async (
    _parant: any,
    args: { data: PostAddInterface },
    context: Context
  ) => {
    const { prisma, user } = context;
    const { data } = args;

    const newPost = prisma.post.create({
      data: {
        article: data.article,
        title: data.title,
        authorId: user!.id,
      },
    });

    return newPost;
  };
}

export default new postController();
