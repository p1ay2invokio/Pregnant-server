-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "aborttimes" INTEGER,
ADD COLUMN     "lastabortmonth" TEXT,
ADD COLUMN     "lastabortyear" TEXT,
ADD COLUMN     "lastchildmonth" TEXT,
ADD COLUMN     "lastchildyear" TEXT,
ADD COLUMN     "qtychild" INTEGER;
