-- CreateTable
CREATE TABLE "Takemeds" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "takemed" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,

    CONSTRAINT "Takemeds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Takemeds" ADD CONSTRAINT "Takemeds_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
