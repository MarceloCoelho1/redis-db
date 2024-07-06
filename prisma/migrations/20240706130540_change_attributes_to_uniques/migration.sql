/*
  Warnings:

  - A unique constraint covering the columns `[environmentId]` on the table `databases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[redisId]` on the table `environments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "databases_environmentId_key" ON "databases"("environmentId");

-- CreateIndex
CREATE UNIQUE INDEX "environments_redisId_key" ON "environments"("redisId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_userId_key" ON "sessions"("userId");
