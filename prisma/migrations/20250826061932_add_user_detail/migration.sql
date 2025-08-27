/*
  Warnings:

  - Added the required column `abort` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graduation` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `income` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marry` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pregage` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preghis` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "abort" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "graduation" TEXT NOT NULL,
ADD COLUMN     "income" TEXT NOT NULL,
ADD COLUMN     "job" TEXT NOT NULL,
ADD COLUMN     "marry" TEXT NOT NULL,
ADD COLUMN     "pregage" TEXT NOT NULL,
ADD COLUMN     "preghis" TEXT NOT NULL;
