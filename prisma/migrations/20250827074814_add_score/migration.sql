/*
  Warnings:

  - Added the required column `score` to the `Behaves` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Behaves" ADD COLUMN     "score" INTEGER NOT NULL;
