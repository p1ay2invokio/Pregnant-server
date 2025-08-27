/*
  Warnings:

  - You are about to drop the `Notify` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `line_userId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "line_userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Notify";
