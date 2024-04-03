-- CreateTable
CREATE TABLE "UsersJoinBrowserHistory" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersJoinBrowserHistory_pkey" PRIMARY KEY ("userId","postId")
);

-- AddForeignKey
ALTER TABLE "UsersJoinBrowserHistory" ADD CONSTRAINT "UsersJoinBrowserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersJoinBrowserHistory" ADD CONSTRAINT "UsersJoinBrowserHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
