/*
  Warnings:

  - You are about to drop the column `firsName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firsName",
ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT '';
