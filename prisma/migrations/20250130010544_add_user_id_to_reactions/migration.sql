/*
  Warnings:

  - You are about to drop the `Midia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Midia" DROP CONSTRAINT "Midia_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "images" TEXT[];

-- DropTable
DROP TABLE "Midia";

-- CreateTable
CREATE TABLE "Reactions" (
    "id" SERIAL NOT NULL,
    "reaction_type" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reactions" ADD CONSTRAINT "Reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
