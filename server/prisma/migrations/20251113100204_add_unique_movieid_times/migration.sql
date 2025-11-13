/*
  Warnings:

  - A unique constraint covering the columns `[movieId,times]` on the table `Booked` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Booked_movieId_times_key` ON `Booked`(`movieId`, `times`);
