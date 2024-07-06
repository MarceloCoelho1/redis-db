/*
  Warnings:

  - A unique constraint covering the columns `[userAgnt]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userAgnt` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "userAgnt" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userAgnt_key" ON "sessions"("userAgnt");
