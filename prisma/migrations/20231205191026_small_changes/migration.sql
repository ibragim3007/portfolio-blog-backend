/*
  Warnings:

  - You are about to drop the column `postId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UsersJoinLikedPosts_postId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postId";
