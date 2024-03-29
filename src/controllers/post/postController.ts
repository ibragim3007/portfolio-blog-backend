import { Context } from '../../shared/context/context';
import { Security } from '../../shared/security/security.service';
import { ApiError } from '../../shared/service/error.service';

import {
  PostAddInterface,
  PostDeleteInterface,
  PostEditInterface,
} from './interfaces/PostInterface';

class postController {
  getPostById = async (
    _parant: any,
    args: { data: { id: string } },
    context: Context
  ) => {
    const { data } = args;
    const { prisma } = context;

    const post = await prisma.post.findUnique({
      where: {
        id: data.id,
      },
      include: {
        author: true,
        likedBy: true,
      },
    });

    return post;
  };

  getAllPosts = async (
    _parant: any,
    args: { data?: { skip: number; take: number } },
    context: Context
  ) => {
    const { prisma } = context;
    const { data } = args;

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

  deletePost = async (
    _parant: any,
    args: { data: PostDeleteInterface },
    context: Context
  ) => {
    const { prisma } = context;
    const { data } = args;

    if (!(await Security.isPostOwner(_parant, { id: data.id }, context)))
      return ApiError.BadPermission();

    const deletedPost = prisma.post.delete({
      where: {
        id: data.id,
      },
    });

    return deletedPost;
  };

  editPost = async (
    _parant: any,
    args: { data: PostEditInterface },
    context: Context
  ) => {
    const { prisma } = context;
    const { data } = args;

    if (!(await Security.isPostOwner(_parant, { id: data.id }, context)))
      return ApiError.BadPermission();

    const editedPost = prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        article: data.article,
      },
    });

    return editedPost;
  };
}

export default new postController();
