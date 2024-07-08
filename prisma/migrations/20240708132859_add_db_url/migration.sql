/*
  Warnings:

  - A unique constraint covering the columns `[dbUrl]` on the table `databases` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dbUrl` to the `databases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "databases" ADD COLUMN     "dbUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "databases_dbUrl_key" ON "databases"("dbUrl");
