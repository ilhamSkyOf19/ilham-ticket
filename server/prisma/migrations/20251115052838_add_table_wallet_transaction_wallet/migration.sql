-- CreateTable
CREATE TABLE `Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` INTEGER NOT NULL,
    `expired` VARCHAR(191) NOT NULL,
    `branch` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Wallet_id_key`(`id`),
    UNIQUE INDEX `Wallet_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionWallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `url_thumbnail` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('plus', 'min') NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `TransactionWallet_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionWallet` ADD CONSTRAINT `TransactionWallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
