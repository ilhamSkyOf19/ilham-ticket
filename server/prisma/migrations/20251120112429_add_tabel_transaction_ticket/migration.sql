-- CreateTable
CREATE TABLE `TransactionTicket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `movieId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `theaterId` INTEGER NOT NULL,
    `time` INTEGER NOT NULL,
    `seats` VARCHAR(191) NOT NULL,
    `status` ENUM('success', 'pending', 'failed') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TransactionTicket_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransactionTicket` ADD CONSTRAINT `TransactionTicket_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionTicket` ADD CONSTRAINT `TransactionTicket_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionTicket` ADD CONSTRAINT `TransactionTicket_theaterId_fkey` FOREIGN KEY (`theaterId`) REFERENCES `Theater`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
