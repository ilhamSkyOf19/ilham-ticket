/*
  Warnings:

  - Added the required column `seats` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatsBooked` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `times` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` ADD COLUMN `seats` INTEGER NOT NULL,
    ADD COLUMN `seatsBooked` VARCHAR(191) NOT NULL,
    ADD COLUMN `times` VARCHAR(191) NOT NULL;
