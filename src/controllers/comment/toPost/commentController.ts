import { Context } from '../../../shared/context/context';
import { ApiError } from '../../../shared/service/error.service';
import {
  CommentAddInterface,
  CommentRateInterface,
} from './interface/CommentInteface';

class commentController {
  getCommentById = async (
    _parant: any,
    args: { data: { id: string } },
    context: Context
  ) => {
    const { data } = args;
    const { prisma } = context;

    const comment = await prisma.comment.findUnique({
      where: {
        id: data.id,
      },
      include: {
        likedBy: true,
        user: true,
        post: true,
      },
    });

    return comment;
  };

  addComment = async (
    _parant: any,
    args: { data: CommentAddInterface },
    context: Context
  ) => {
    const { data } = args;
    const { prisma, user } = context;

    if (!user) return ApiError.UnauthorizedError();

    const comment = await prisma.comment.create({
      data: {
        userId: user?.id,
        text: data.text,
        postId: data.postId,
      },
    });

    await prisma.post.update({
      where: {
        id: data.postId,
      },
      data: {
        commentsAmount: { increment: 1 },
      },
    });

    return comment;
  };

  rateComment = async (
    _parant: any,
    args: { data: CommentRateInterface },
    context: Context
  ) => {
    const { data } = args;
    const { prisma, user } = context;

    if (!user) return ApiError.UnauthorizedError();

    const isExistLikeAlready = await prisma.usersJoinLikedComments.findUnique({
      where: {
        commentId_userId: {
          commentId: data.commentId,
          userId: user.id,
        },
      },
    });

    if (isExistLikeAlready) {
      await prisma.usersJoinLikedComments.delete({
        where: {
          commentId_userId: {
            commentId: data.commentId,
            userId: user.id,
          },
        },
      });

      await prisma.comment.update({
        where: {
          id: data.commentId,
        },
        data: {
          likesAmount: { increment: -1 },
        },
      });
    } else {
      await prisma.usersJoinLikedComments.create({
        data: {
          userId: user.id,
          commentId: data.commentId,
        },
      });

      await prisma.comment.update({
        where: {
          id: data.commentId,
        },
        data: {
          likesAmount: { increment: 1 },
        },
      });
    }

    const comment = await prisma.comment.findUnique({
      where: {
        id: data.commentId,
      },
    });

    return comment;
  };
}

export default new commentController();
