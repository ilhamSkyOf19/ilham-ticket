-- DropForeignKey
ALTER TABLE `booked` DROP FOREIGN KEY `Booked_movieId_fkey`;

-- AddForeignKey
ALTER TABLE `Booked` ADD CONSTRAINT `Booked_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
