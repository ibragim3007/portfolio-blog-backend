-- DropForeignKey
ALTER TABLE "UsersJoinBrowserHistory" DROP CONSTRAINT "UsersJoinBrowserHistory_postId_fkey";

-- AddForeignKey
ALTER TABLE "UsersJoinBrowserHistory" ADD CONSTRAINT "UsersJoinBrowserHistory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
