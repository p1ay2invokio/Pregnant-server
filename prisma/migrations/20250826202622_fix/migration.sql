/*
  Warnings:

  - You are about to drop the column `line_userId` on the `Behaves` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Behaves` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Behaves" DROP CONSTRAINT "Behaves_line_userId_fkey";

-- DropIndex
DROP INDEX "Users_line_userId_key";

-- AlterTable
ALTER TABLE "Behaves" DROP COLUMN "line_userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Behaves" ADD CONSTRAINT "Behaves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
