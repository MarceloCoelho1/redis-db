/*
  Warnings:

  - Added the required column `username` to the `databases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "databases" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "username" TEXT NOT NULL;
