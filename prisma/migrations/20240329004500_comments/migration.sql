-- CreateTable
CREATE TABLE "CommentToPosts" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likesAmount" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CommentToPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersJoinLikedComments" (
    "commentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersJoinLikedComments_pkey" PRIMARY KEY ("commentId","userId")
);

-- AddForeignKey
ALTER TABLE "CommentToPosts" ADD CONSTRAINT "CommentToPosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersJoinLikedComments" ADD CONSTRAINT "UsersJoinLikedComments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "CommentToPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersJoinLikedComments" ADD CONSTRAINT "UsersJoinLikedComments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
