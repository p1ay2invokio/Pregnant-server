/*
  Warnings:

  - A unique constraint covering the columns `[line_userId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Behaves" (
    "id" SERIAL NOT NULL,
    "line_userId" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,

    CONSTRAINT "Behaves_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_line_userId_key" ON "Users"("line_userId");

-- AddForeignKey
ALTER TABLE "Behaves" ADD CONSTRAINT "Behaves_line_userId_fkey" FOREIGN KEY ("line_userId") REFERENCES "Users"("line_userId") ON DELETE RESTRICT ON UPDATE CASCADE;
