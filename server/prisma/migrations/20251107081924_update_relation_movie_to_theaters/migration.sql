-- DropForeignKey
ALTER TABLE `movie` DROP FOREIGN KEY `Movie_theaterId_fkey`;

-- DropIndex
DROP INDEX `Movie_theaterId_fkey` ON `movie`;

-- CreateTable
CREATE TABLE `MovieTheater` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movieId` INTEGER NOT NULL,
    `theaterId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MovieTheater` ADD CONSTRAINT `MovieTheater_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovieTheater` ADD CONSTRAINT `MovieTheater_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theater`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
