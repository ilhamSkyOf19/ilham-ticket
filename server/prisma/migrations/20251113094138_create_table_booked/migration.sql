/*
  Warnings:

  - You are about to drop the column `seatsBooked` on the `movie` table. All the data in the column will be lost.
  - You are about to drop the column `times` on the `movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movie` DROP COLUMN `seatsBooked`,
    DROP COLUMN `times`;

-- CreateTable
CREATE TABLE `Booked` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `times` VARCHAR(191) NOT NULL,
    `seatsBooked` VARCHAR(191) NOT NULL,
    `movieId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booked` ADD CONSTRAINT `Booked_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
