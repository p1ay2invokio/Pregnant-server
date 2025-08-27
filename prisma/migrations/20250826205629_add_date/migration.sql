/*
  Warnings:

  - Added the required column `date` to the `Takemeds` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Takemeds" ADD COLUMN     "date" TEXT NOT NULL;
